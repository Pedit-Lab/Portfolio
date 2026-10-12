import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { ParticleTransitionHandle } from '../components/ParticleTransition';

interface UseSectionTransitionOptions {
  particleRef: React.RefObject<ParticleTransitionHandle | null>;
  activeSection: string;
  onSectionChange?: (sectionId: string) => void;
}

/**
 * Coordinates 3D particle dissolve transitions between existing sections.
 * Automatically identifies all sections under <main> dynamically.
 */
export function useSectionTransition({
  particleRef,
  activeSection,
}: UseSectionTransitionOptions) {
  const previousSectionRef = useRef<string>(activeSection);
  const isTransitioningRef = useRef<boolean>(false);
  const lastTransitionTimeRef = useRef<number>(0);
  const currentTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Dynamic discovery of existing sections in document order
  const getOrderedSections = (): HTMLElement[] => {
    return Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
  };

  const executeTransition = (fromId: string, toId: string) => {
    if (!fromId || !toId || fromId === toId) return;

    const sections = getOrderedSections();
    const fromIndex = sections.findIndex(s => s.id === fromId);
    const toIndex = sections.findIndex(s => s.id === toId);

    if (fromIndex === -1 || toIndex === -1) {
      previousSectionRef.current = toId;
      return;
    }

    // Keep the Home section free of the transition when returning to it. Leaving
    // Home is allowed so the incoming About section still gets its reveal.
    if (toId === 'hero') {
      previousSectionRef.current = toId;
      return;
    }

    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      previousSectionRef.current = toId;
      return;
    }

    const now = Date.now();
    // Cooldown prevents overlapping glitching during rapid wheel spins
    if (now - lastTransitionTimeRef.current < 450) {
      previousSectionRef.current = toId;
      return;
    }

    const direction: 'up' | 'down' = toIndex > fromIndex ? 'down' : 'up';
    const outgoingEl = sections[fromIndex];
    const incomingEl = sections[toIndex];

    lastTransitionTimeRef.current = now;
    isTransitioningRef.current = true;

    // Trigger 3D Particle Wave
    particleRef.current?.triggerTransition(direction);

    // Cancel any previous GSAP timeline cleanly and reset props
    if (currentTimelineRef.current) {
      currentTimelineRef.current.kill();
      const allSections = getOrderedSections();
      gsap.set(allSections, { clearProps: 'opacity,filter,transform' });
    }

    // Synchronized GSAP Cinematic Dissolve & Reveal
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set([outgoingEl, incomingEl], { clearProps: 'opacity,filter,transform' });
        isTransitioningRef.current = false;
      },
    });

    currentTimelineRef.current = tl;

    // 1. Outgoing section dissolves into glowing digital dust with electric blue aura (skip distortion on hero)
    if (outgoingEl.id !== 'hero') {
      tl.to(outgoingEl, {
        opacity: 0.35,
        filter: 'blur(5px) brightness(1.28) drop-shadow(0 0 35px rgba(0, 180, 255, 0.7))',
        scale: direction === 'down' ? 0.98 : 1.02,
        duration: 0.45,
        ease: 'power2.inOut',
      }).to(outgoingEl, {
        opacity: 1,
        filter: 'blur(0px) brightness(1) drop-shadow(0 0 0px rgba(0, 0, 0, 0))',
        scale: 1,
        duration: 0.35,
        clearProps: 'opacity,filter,transform',
      });
    }

    // 2. Incoming section emerges smoothly from the glowing blue energy wave
    tl.fromTo(
      incomingEl,
      {
        opacity: 0.38,
        filter: 'blur(6px) brightness(1.22) drop-shadow(0 0 40px rgba(0, 220, 255, 0.75))',
        scale: direction === 'down' ? 1.02 : 0.98,
      },
      {
        opacity: 1,
        filter: 'blur(0px) brightness(1) drop-shadow(0 0 0px rgba(0, 0, 0, 0))',
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'opacity,filter,transform',
      },
      outgoingEl.id !== 'hero' ? '-=0.4' : 0 // Smooth timing overlap
    );

    previousSectionRef.current = toId;
  };

  // Trigger when activeSection changes via scroll observation
  useEffect(() => {
    if (previousSectionRef.current !== activeSection) {
      executeTransition(previousSectionRef.current, activeSection);
    }
  }, [activeSection]);

  // Intercept navigation link clicks across the page for immediate transition sync
  useEffect(() => {
    const handleNavClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      const match = href.match(/#([a-zA-Z0-9_-]+)$/);
      if (!match) return;

      const targetId = match[1];
      const targetSection = document.getElementById(targetId);
      if (targetSection && targetSection.tagName.toLowerCase() === 'section') {
        if (targetId !== previousSectionRef.current) {
          executeTransition(previousSectionRef.current, targetId);
        }
      }
    };

    document.addEventListener('click', handleNavClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleNavClick, { capture: true });
      if (currentTimelineRef.current) {
        currentTimelineRef.current.kill();
      }
    };
  }, []);
}
