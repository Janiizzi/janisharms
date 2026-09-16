import type { ReactNode } from 'react';
import { useScrollProgress } from './useScrollProgress';

type ScrollGlowProps = {
  accent: string;
  children: ReactNode;
  className?: string;
};

/**
 * Wraps the hero and the section beneath it in one clipping box, so the glow
 * can bleed across both instead of getting cut off at the header's edge, and
 * drifts gently as the visitor scrolls through rather than sitting static.
 */
const ScrollGlow = ({ accent, children, className = '' }: ScrollGlowProps) => {
  const { ref, progress } = useScrollProgress<HTMLDivElement>({ start: 1, end: 0 });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`.trim()}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 right-[-160px] h-[560px] w-[560px] rounded-full blur-[110px]"
        style={{
          background: `radial-gradient(circle, ${accent} 0%, transparent 70%)`,
          opacity: 0.45 - progress * 0.2,
          transform: `translate3d(${progress * -70}px, ${progress * 140}px, 0) scale(${1 + progress * 0.25})`,
          willChange: 'transform, opacity',
        }}
      />
      {children}
    </div>
  );
};

export default ScrollGlow;
