import type { ReactNode } from 'react';
import { useScrollProgress } from './useScrollProgress';

type TiltOnScrollProps = {
  children: ReactNode;
  /**
   * Degrees of Y-axis rotation to start from, unwinding to 0 as the element
   * scrolls up. Positive swings the right edge away from the viewer, negative
   * the left edge — so a block on the right of a layout usually wants a
   * positive value and one on the left a negative one.
   */
  degrees?: number;
  className?: string;
};

/**
 * Turns a block slightly out of the page and straightens it as it scrolls in.
 *
 * Same scroll driver as the other animations here, so it scrubs both ways and
 * sits flat for anyone who prefers reduced motion.
 */
const TiltOnScroll = ({ children, degrees = 14, className = '' }: TiltOnScrollProps) => {
  const { ref, progress } = useScrollProgress<HTMLDivElement>({ start: 0.95, end: 0.15 });

  return (
    <div ref={ref} className={className} style={{ perspective: '1400px' }}>
      <div
        style={{
          transform: `rotateY(${degrees * (1 - progress)}deg) translateZ(${-40 * (1 - progress)}px)`,
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
