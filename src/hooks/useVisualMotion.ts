import { useEffect } from 'react';

/** Progressive enhancement: content remains visible without motion support. */
export function useVisualMotion() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;
    const animations = new Set<Animation>();
    const reset = () => {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
    };
    const start = () => {
      reset();
      if (media.matches) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          if (entry.target.classList.contains('flow-heading')) {
            entry.target.querySelectorAll<HTMLElement>('.flow-heading-line').forEach((line, index) => {
              const lineAnimation = line.animate([
                { opacity: 0, transform: 'translateY(42px)', filter: 'blur(7px)' },
                { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
              ], {
                duration: 900,
                delay: index * 230,
                easing: 'cubic-bezier(.22,1,.36,1)',
                fill: 'both',
              });
              animations.add(lineAnimation);
              lineAnimation.onfinish = () => animations.delete(lineAnimation);
            });
            return;
          }
          const animation = entry.target.animate([
            { opacity: 0.2, transform: 'translateY(24px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ], {
            duration: 720,
            delay: entry.target.matches('.section-intro>p, .about-copy>p, .cta-section .flow-heading~p') ? 420 : 0,
            easing: 'cubic-bezier(.22,1,.36,1)',
            fill: 'both',
          });
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        });
      }, {
        // Use the middle of the viewport as the activation zone. In particular,
        // this prevents About from animating while the user is still on Home.
        rootMargin: '-12% 0px -35% 0px',
        threshold: 0.08,
      });
      document.querySelectorAll([
        '.section-intro>div',
        '.section-intro>.flow-heading',
        '.section-intro>p',
        '.about-copy>div:first-child',
        '.about-copy>.flow-heading',
        '.about-copy>div:nth-of-type(2)>p',
        '.cta-section .flow-heading',
        '.cta-section .flow-heading~p',
        '.service-card',
        '.concept-project',
        '.advantage-card',
        '.metric-value',
        '.contact-grid',
      ].join(',')).forEach(element => observer?.observe(element));
    };
    start();
    media.addEventListener('change', start);
    return () => { reset(); media.removeEventListener('change', start); };
  }, []);
}
