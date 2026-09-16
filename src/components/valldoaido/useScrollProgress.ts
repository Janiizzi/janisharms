import { useEffect, useRef, useState } from 'react';

type Options = {
  /** Viewport fraction at which the element's top counts as progress 0. */
  start?: number;
  /** Viewport fraction at which the element's top counts as progress 1. */
  end?: number;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * How far an element has travelled up through the viewport, as 0 → 1.
 *
 * Deterministic: progress is a pure function of scroll position, so the
 * animation scrubs both ways instead of playing once. Returns 1 immediately
 * when the visitor prefers reduced motion, which leaves the finished state on
 * screen without any movement.
 */
export function useScrollProgress<T extends HTMLElement>({ start = 0.9, end = 0.35 }: Options = {}) {
  const ref = useRef<T | null>(null);
  // Resolved up front rather than in the effect, so reduced motion never needs
  // a second render — and so this stays safe during server rendering.
  const [progress, setProgress] = useState(() => (prefersReducedMotion() ? 1 : 0));

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const { top } = element.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const travelled = start * viewport - top;
      const distance = (start - end) * viewport || 1;
      const next = Math.min(1, Math.max(0, travelled / distance));
      setProgress(previous => (Math.abs(previous - next) < 0.001 ? previous : next));
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [start, end]);

  return { ref, progress };
}

/** Maps a sub-range of the overall progress onto a fresh 0 → 1. */
export const range = (progress: number, from: number, to: number) =>
  Math.min(1, Math.max(0, (progress - from) / (to - from)));

/** Smooth ease-out, so things arrive gently instead of snapping. */
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
