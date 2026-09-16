import type { ReactNode } from 'react';
import { useScrollProgress } from './useScrollProgress';

type TiltOnScrollProps = {
  children: ReactNode;
  /**
   * Y-axis rotation to start from, unwinding to 0 as the element scrolls up.
   * Positive swings the left edge towards the viewer and the right edge away;
   * negative does the opposite.
   */
  degrees?: number;
  /**
   * Viewer distance in px. This is the real strength dial: at a long distance
   * even a large rotation stays flat, while a short one makes the same number
   * of degrees look dramatic. Roughly 600 is strong, 1200 moderate, 2500 subtle.
   */
  perspective?: number;
  /** How far the block starts pushed back, in px. Adds depth to the arrival. */
  depth?: number;
  className?: string;
};

/**
 * Turns a block out of the page and straightens it as it scrolls in.
 *
 * Same scroll driver as the other animations here, so it scrubs both ways and
 * sits flat for anyone who prefers reduced motion.
 */
const TiltOnScroll = ({
  children,
  degrees = 14,
  perspective = 1200,
  depth = 40,
  className = '',
}: TiltOnScrollProps) => {
  const { ref, progress } = useScrollProgress<HTMLDivElement>({ start: 0.95, end: 0.15 });

  const remaining = 1 - progress;

  return (
    <div ref={ref} className={className} style={{ perspective: `${perspective}px` }}>
      <div
        style={{
          transform: `rotateY(${degrees * remaining}deg) translateZ(${-depth * remaining}px)`,
          transformOrigin: '50% 50%',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default TiltOnScroll;
