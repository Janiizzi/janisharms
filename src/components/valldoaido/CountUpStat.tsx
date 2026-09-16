import { useEffect, useRef, useState } from 'react';
import { easeOut } from './useScrollProgress';

type CountUpStatProps = {
  value: string;
  label: string;
  duration?: number;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Splits a stat like "1.3 GB" into the leading number and its suffix. */
const parseValue = (raw: string) => {
  const match = raw.match(/^(-?\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, numberPart, suffix] = match;
  const decimals = numberPart.includes('.') ? numberPart.split('.')[1].length : 0;
  return { target: parseFloat(numberPart), decimals, suffix };
};

const formatValue = (current: number, decimals: number, suffix: string) =>
  `${current.toFixed(decimals)}${suffix}`;

/**
 * Counts a stat up from zero the first time it scrolls into view. Anything
 * that doesn't start with a number (and reduced motion) just renders as-is.
 */
const CountUpStat = ({ value, label, duration = 1400 }: CountUpStatProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState(() => {
    const parsed = parseValue(value);
    return !parsed || prefersReducedMotion() ? value : formatValue(0, parsed.decimals, parsed.suffix);
  });

  useEffect(() => {
    const element = ref.current;
    const parsed = parseValue(value);
    if (!element || !parsed || prefersReducedMotion()) return;

    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry], activeObserver) => {
        if (!entry.isIntersecting) return;
        activeObserver.unobserve(entry.target);

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          setDisplay(formatValue(parsed.target * easeOut(t), parsed.decimals, parsed.suffix));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <div ref={ref}>
      <div className="text-2xl font-bold text-primary-white md:text-3xl">{display}</div>
      <div className="mt-1 text-xs leading-snug text-primary-grey">{label}</div>
    </div>
  );
};

export default CountUpStat;
