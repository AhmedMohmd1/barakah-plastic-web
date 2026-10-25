import { useEffect, useRef, useState, type RefObject } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Arms a section for a one-shot entrance (adds data-armed), then sets data-play
 * once it is seen. Under reduced motion it never arms, so the base CSS (the final
 * state) is what renders.
 */
export function usePlayOnce<T extends HTMLElement>(threshold = 0.35): RefObject<T> {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    el.setAttribute('data-armed', '');
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.setAttribute('data-play', '');
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

/** True while the element intersects the viewport (with an optional rootMargin). */
export function useInView<T extends HTMLElement>(rootMargin = '0px', initial = false): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(initial);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, inView];
}
