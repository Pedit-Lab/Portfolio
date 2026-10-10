import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

/** Decorative wave field. Draws at 30fps only while its section is visible. */
export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mode } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let frame = 0;
    let phase = 0;
    let previousTime = 0;
    let visible = false;
    const dark = mode === 'dark';

    const draw = () => {
      if (!visible) return;
      context.clearRect(0, 0, width, height);
      const columns = width < 600 ? 22 : 38;
      const rows = width < 600 ? 7 : 10;
      const point = (column: number, row: number) => {
        const u = column / columns;
        const depth = row / rows;
        return {
          x: u * (width + 160) - 80,
          y: height * 0.69 + depth * height * 0.32
            + Math.sin(u * 7 + phase + depth * 2.4) * (34 + depth * 30)
            + Math.cos(u * 4 - phase * 0.6) * 20,
        };
      };
      // A slowly travelling wire field behind the foreground content.
      for (let row = 0; row <= rows; row++) {
        context.beginPath();
        for (let column = 0; column <= columns; column++) {
          const p = point(column, row);
          if (column === 0) context.moveTo(p.x, p.y);
          else context.lineTo(p.x, p.y);
        }
        context.strokeStyle = dark ? 'rgba(66, 187, 242, .19)' : 'rgba(35, 104, 195, .14)';
        context.lineWidth = 0.7;
        context.stroke();
      }
      for (let column = 0; column <= columns; column++) {
        context.beginPath();
        for (let row = 0; row <= rows; row++) {
          const p = point(column, row);
          if (row === 0) context.moveTo(p.x, p.y);
          else context.lineTo(p.x, p.y);
          if ((column + row) % 5 === 0) {
            context.fillStyle = dark ? 'rgba(102, 229, 255, .55)' : 'rgba(21, 112, 187, .4)';
            context.fillRect(p.x - 1, p.y - 1, 2, 2);
          }
        }
        context.strokeStyle = dark ? 'rgba(74, 155, 236, .10)' : 'rgba(35, 104, 195, .08)';
        context.stroke();
      }
      // Sparse orbiting points, concentrated across the section.
      const count = width < 600 ? 14 : 28;
      for (let i = 0; i < count; i++) {
        const x = ((i * 137.5 + Math.sin(phase * 0.25 + i) * 23) % width + width) % width;
        const y = ((i * 83.7 - phase * (8 + i % 4)) % height + height) % height;
        const alpha = (dark ? .28 : .2) * (.6 + Math.sin(phase + i) * .4);
        context.fillStyle = dark ? `rgba(116, 225, 255, ${alpha})` : `rgba(26, 105, 182, ${alpha})`;
        context.beginPath();
        context.arc(x, y, i % 4 === 0 ? 1.8 : 1, 0, Math.PI * 2);
        context.fill();
        if (i % 4 === 0) {
          context.strokeStyle = dark ? `rgba(85, 195, 251, ${alpha * .3})` : `rgba(26, 105, 182, ${alpha * .3})`;
          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(x + 42, y - 28);
          context.lineTo(x + 95, y - 28);
          context.stroke();
        }
      }
    };
    const tick = (time: number) => {
      if (time - previousTime >= 1000 / 30) {
        phase += Math.min(time - previousTime, 80) * 0.00022;
        previousTime = time;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      previousTime = performance.now();
      canvas.parentElement?.classList.toggle('is-running', visible && !document.hidden && !motion.matches);
      if (visible && !document.hidden && !motion.matches) frame = requestAnimationFrame(tick);
      else draw();
    };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      // Bound memory for tall mobile sections; offscreen sections release their bitmap.
      if (!visible) {
        canvas.width = 1;
        canvas.height = 1;
        return;
      }
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(2_000_000 / (width * height)));
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    };
    const sizes = new ResizeObserver(resize);
    sizes.observe(canvas);
    const visibility = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      resize();
      sync();
    });
    visibility.observe(canvas);
    document.addEventListener('visibilitychange', sync);
    motion.addEventListener('change', sync);
    resize();
    sync();
    return () => {
      cancelAnimationFrame(frame);
      sizes.disconnect();
      visibility.disconnect();
      document.removeEventListener('visibilitychange', sync);
      motion.removeEventListener('change', sync);
    };
  }, [mode]);

  return <div className="hero-background animated-background" aria-hidden="true">
    <div className="hero-aurora hero-aurora-blue" />
    <div className="hero-aurora hero-aurora-cyan" />
    <div className="background-tech-grid" />
    <div className="background-signal-rings">
      <span />
      <span />
      <span />
    </div>
    <div className="background-circuit-path path-one"><i /><i /><i /></div>
    <div className="background-circuit-path path-two"><i /><i /></div>
    <canvas ref={canvasRef} />
  </div>;
}
