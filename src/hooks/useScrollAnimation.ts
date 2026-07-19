
import { useEffect, useRef } from 'react';

export const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll<HTMLElement>('.scroll-animate');

    const revealAll = () => children.forEach((child) => child.classList.add('is-visible'));

    // Progressive enhancement: if the browser can't observe intersections, or the
    // user prefers reduced motion, reveal everything immediately so content is
    // never hidden behind an animation that won't fire.
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // reveal-once
          }
        });
      },
      // threshold 0 so tall elements on short viewports still trigger as soon as
      // any part enters; a small negative bottom margin keeps the reveal timed.
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );

    children.forEach((child) => observer.observe(child));

    // Safety net: anything already within (or larger than) the viewport at mount
    // is revealed on the next frame even if no intersection callback fires.
    const raf = requestAnimationFrame(() => {
      children.forEach((child) => {
        const rect = child.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          child.classList.add('is-visible');
          observer.unobserve(child);
        }
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return ref;
};
