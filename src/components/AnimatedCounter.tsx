import { useEffect, useRef, useState } from 'react';

/** Animate the presentation once; the accessible value stays unchanged. */
export function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const element = ref.current;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!element || media.matches) return;
    const target = Number(value.replace(/[^\d]/g, ''));
    const suffix = value.replace(/[\d,]/g, '');
    let frame = 0;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 950, 1);
        const count = Math.round(target * (1 - (1 - progress) ** 3));
        setDisplay(progress === 1 ? value : `${value.includes(',') ? count.toLocaleString('en-US') : count}${suffix}`);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    observer.observe(element);
    const stop = () => {
      if (!media.matches) return;
      observer.disconnect();
      cancelAnimationFrame(frame);
      setDisplay(value);
    };
    media.addEventListener('change', stop);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      media.removeEventListener('change', stop);
    };
  }, [value]);

  return <span ref={ref} aria-label={value}><span aria-hidden="true">{display}</span></span>;
}
