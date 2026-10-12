import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

export interface ParticleTransitionHandle {
  triggerTransition: (direction: 'up' | 'down') => void;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseRadius: number;
  colorType: 'cyan' | 'blue' | 'white' | 'deepBlue';
  alpha: number;
  maxAlpha: number;
  decayRate: number;
  phase: number;
  swirlSpeed: number;
  orbitRadius: number;
}

/**
 * 3D Particle Dissolve Transition Canvas Overlay
 * Renders glowing electric blue, cyan, and white digital particles
 * that swirl in a 3D energy wave when transitioning between sections.
 */
export const ParticleTransition = forwardRef<ParticleTransitionHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const isRunningRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const durationRef = useRef<number>(1150); // ~1.15s cinematic duration
  const directionRef = useRef<'up' | 'down'>('down');
  const particlesRef = useRef<Particle[]>([]);
  const spriteCacheRef = useRef<{ [key: string]: HTMLCanvasElement }>({});

  // Helper to create pre-rendered soft glow sprites for maximum 60fps blitting
  const createGlowSprite = (
    coreColor: string,
    midColor: string,
    edgeColor: string,
    radius: number
  ): HTMLCanvasElement => {
    const sprite = document.createElement('canvas');
    const size = radius * 4;
    sprite.width = size;
    sprite.height = size;
    const ctx = sprite.getContext('2d');
    if (!ctx) return sprite;

    const center = size / 2;
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
    gradient.addColorStop(0, coreColor);
    gradient.addColorStop(0.3, midColor);
    gradient.addColorStop(0.65, edgeColor);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(center, center, center, 0, Math.PI * 2);
    ctx.fill();

    return sprite;
  };

  // Initialize cached glow sprites
  useEffect(() => {
    try {
      spriteCacheRef.current = {
        cyan: createGlowSprite(
          'rgba(255, 255, 255, 1)',
          'rgba(0, 240, 255, 0.95)',
          'rgba(0, 240, 255, 0.22)',
          16
        ),
        blue: createGlowSprite(
          'rgba(200, 230, 255, 1)',
          'rgba(0, 102, 255, 0.9)',
          'rgba(0, 102, 255, 0.2)',
          16
        ),
        white: createGlowSprite(
          'rgba(255, 255, 255, 1)',
          'rgba(235, 245, 255, 0.9)',
          'rgba(180, 230, 255, 0.25)',
          14
        ),
        deepBlue: createGlowSprite(
          'rgba(0, 240, 255, 1)',
          'rgba(30, 90, 255, 0.85)',
          'rgba(30, 90, 255, 0.2)',
          18
        ),
      };
    } catch (e) {
      console.warn('Particle sprite cache init error:', e);
    }
  }, []);

  // Spawn dynamic particles centered around the viewport with 3D perspective
  const spawnParticles = (width: number, height: number, direction: 'up' | 'down') => {
    const isMobile = width < 768;
    const particleCount = isMobile ? 1200 : 2600;
    const particles: Particle[] = [];
    const dirMult = direction === 'down' ? 1 : -1;

    for (let i = 0; i < particleCount; i++) {
      // Color distribution: 55% cyan, 30% electric blue, 10% white sparkles, 5% deep neon
      const randType = Math.random();
      const colorType: 'cyan' | 'blue' | 'white' | 'deepBlue' =
        randType < 0.55 ? 'cyan' :
        randType < 0.85 ? 'blue' :
        randType < 0.95 ? 'white' : 'deepBlue';

      // Distribute particles across the viewport with density centered along the transition wave
      const x = (Math.random() - 0.5) * (width * 1.3);
      // Spawn biased towards the top or bottom depending on direction
      const yOffset = dirMult * (Math.random() * 0.4 - 0.2) * height;
      const y = (Math.random() - 0.5) * (height * 0.9) + yOffset;
      // 3D Depth z: between -250 (close) and +550 (deep)
      const z = Math.random() * 800 - 250;

      // Velocity vectors for explosive dissolve + swirling flow
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4.5 + 1.2;
      const vx = Math.cos(angle) * speed + (Math.random() - 0.5) * 2;
      const vy = Math.sin(angle) * speed * 0.7 - (dirMult * (Math.random() * 5.5 + 2.5));
      const vz = (Math.random() - 0.5) * 4.2;

      const baseRadius = colorType === 'white' 
        ? Math.random() * 1.5 + 0.8 
        : Math.random() * 2.8 + 1.2;

      particles.push({
        x,
        y,
        z,
        vx,
        vy,
        vz,
        baseRadius,
        colorType,
        alpha: Math.random() * 0.4 + 0.6,
        maxAlpha: Math.random() * 0.35 + 0.65,
        decayRate: Math.random() * 0.0006 + 0.0008,
        phase: Math.random() * Math.PI * 2,
        swirlSpeed: (Math.random() * 0.04 + 0.02) * (Math.random() > 0.5 ? 1 : -1),
        orbitRadius: Math.random() * 60 + 20,
      });
    }

    particlesRef.current = particles;
  };

  const renderLoop = (timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const totalDuration = durationRef.current;
    const progress = Math.min(1, elapsed / totalDuration);

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const focalLength = 550; // 3D Camera focal length

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Use additive blending for optical laser bloom
    ctx.globalCompositeOperation = 'lighter';

    // 1. Dynamic Electric Blue Screen Energy Wash & Glow Surge
    let blueAuraAlpha = 0;
    if (progress < 0.25) {
      blueAuraAlpha = progress / 0.25;
    } else if (progress < 0.55) {
      blueAuraAlpha = 1.0;
    } else {
      blueAuraAlpha = Math.max(0, 1 - ((progress - 0.55) / 0.45));
    }

    if (blueAuraAlpha > 0.01) {
      // Fullscreen radial electric blue aura
      const auraRadius = Math.max(width, height) * 0.8;
      const auraGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, auraRadius);
      auraGrad.addColorStop(0, `rgba(0, 240, 255, ${blueAuraAlpha * 0.42})`);
      auraGrad.addColorStop(0.35, `rgba(0, 120, 255, ${blueAuraAlpha * 0.35})`);
      auraGrad.addColorStop(0.7, `rgba(0, 60, 200, ${blueAuraAlpha * 0.22})`);
      auraGrad.addColorStop(1, 'rgba(0, 10, 40, 0)');

      ctx.fillStyle = auraGrad;
      ctx.fillRect(0, 0, width, height);

      // Central glowing energy beam across the screen
      const beamHeight = height * 0.45;
      const beamGrad = ctx.createLinearGradient(0, cy - beamHeight / 2, 0, cy + beamHeight / 2);
      beamGrad.addColorStop(0, 'rgba(0, 140, 255, 0)');
      beamGrad.addColorStop(0.5, `rgba(0, 240, 255, ${blueAuraAlpha * 0.3})`);
      beamGrad.addColorStop(1, 'rgba(0, 140, 255, 0)');

      ctx.fillStyle = beamGrad;
      ctx.fillRect(0, cy - beamHeight / 2, width, beamHeight);

      // Expanding 3D energy ring
      const ringRadius = (progress * 0.85) * (Math.max(width, height) * 0.65);
      const ringAlpha = (1 - progress) * blueAuraAlpha * 0.35;
      if (ringAlpha > 0.01) {
        ctx.strokeStyle = `rgba(0, 240, 255, ${ringAlpha})`;
        ctx.lineWidth = 3.5 * (1 - progress) + 1;
        ctx.beginPath();
        ctx.ellipse(cx, cy, ringRadius * 1.25, ringRadius * 0.7, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    const particles = particlesRef.current;
    const dirMult = directionRef.current === 'down' ? 1 : -1;

    // Dissolve envelope: ease in quick burst, hold wave, disperse smoothly
    // 0 -> 0.25 (bloom rise), 0.25 -> 0.65 (flow), 0.65 -> 1.0 (disperse & fade out)
    let globalAlpha = 1;
    if (progress < 0.2) {
      globalAlpha = progress / 0.2;
    } else if (progress > 0.6) {
      globalAlpha = 1 - ((progress - 0.6) / 0.4);
    }
    globalAlpha = Math.max(0, Math.min(1, globalAlpha));

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Update position with swirl physics and direction drift
      p.phase += p.swirlSpeed;
      const waveEffect = Math.sin(p.phase + progress * 8) * 3.5;

      p.x += p.vx + waveEffect;
      p.y += p.vy - (dirMult * Math.sin(progress * Math.PI) * 2.2);
      p.z += p.vz;

      // Gentle deceleration as particles disperse
      p.vx *= 0.985;
      p.vy *= 0.985;
      p.vz *= 0.985;

      // 3D Perspective Projection
      const zDistance = focalLength + p.z;
      if (zDistance <= 10) continue; // Behind camera

      const scale = focalLength / zDistance;
      const screenX = cx + p.x * scale;
      const screenY = cy + p.y * scale;

      // Cull offscreen particles
      if (screenX < -50 || screenX > width + 50 || screenY < -50 || screenY > height + 50) {
        continue;
      }

      // Projected radius
      const radius = Math.max(0.6, p.baseRadius * scale * (1 + (1 - progress) * 0.4));
      const particleAlpha = p.alpha * globalAlpha;

      if (particleAlpha <= 0.01) continue;

      const sprite = spriteCacheRef.current[p.colorType];
      if (sprite) {
        ctx.globalAlpha = particleAlpha;
        const renderSize = radius * 4.5;
        ctx.drawImage(
          sprite,
          screenX - renderSize / 2,
          screenY - renderSize / 2,
          renderSize,
          renderSize
        );
      } else {
        ctx.globalAlpha = particleAlpha;
        ctx.fillStyle = p.colorType === 'white' ? '#ffffff' : (p.colorType === 'cyan' ? '#00f0ff' : '#0066ff');
        ctx.beginPath();
        ctx.arc(screenX, screenY, Math.max(1, radius), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;

    if (progress < 1) {
      animFrameRef.current = requestAnimationFrame(renderLoop);
    } else {
      // Transition complete: clean up and halt loop
      ctx.clearRect(0, 0, width, height);
      isRunningRef.current = false;
      animFrameRef.current = null;
    }
  };

  // Expose trigger method to coordinator hook
  useImperativeHandle(ref, () => ({
    triggerTransition: (direction: 'up' | 'down') => {
      // Reduced motion check
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const canvas = canvasRef.current;
      if (!canvas) return;

      directionRef.current = direction;
      startTimeRef.current = 0;

      // Set canvas size to full viewport resolution
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      // Initialize particles
      spawnParticles(w, h, direction);

      // Flash ambient electric blue screen wash
      if (auraRef.current) {
        auraRef.current.style.opacity = '1';
        window.setTimeout(() => {
          if (auraRef.current) {
            auraRef.current.style.opacity = '0';
          }
        }, 550);
      }

      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }

      isRunningRef.current = true;
      animFrameRef.current = requestAnimationFrame(renderLoop);
    },
  }));

  // Handle window resizing cleanly
  useEffect(() => {
    const handleResize = () => {
      if (!isRunningRef.current || !canvasRef.current) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvasRef.current.width = Math.round(window.innerWidth * dpr);
      canvasRef.current.height = Math.round(window.innerHeight * dpr);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={auraRef}
        className="particle-blue-ambient-aura"
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 47,
          background: 'radial-gradient(ellipse 90% 80% at 50% 50%, rgba(0, 160, 255, 0.28) 0%, rgba(0, 90, 230, 0.16) 45%, rgba(0, 20, 70, 0) 80%)',
          opacity: 0,
          transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          mixBlendMode: 'screen',
        }}
      />
      <canvas
        ref={canvasRef}
        className="particle-dissolve-canvas"
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 48, // Below header (z-50) & modals (z-60+), above page content
          transform: 'translateZ(0)', // Force GPU layer
        }}
      />
    </>
  );
});

ParticleTransition.displayName = 'ParticleTransition';
