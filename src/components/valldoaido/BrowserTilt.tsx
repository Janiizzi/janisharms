import type { ReactNode } from 'react';
import { useScrollProgress } from './useScrollProgress';

type BrowserTiltProps = {
  /** Text shown in the window's address pill. */
  label: string;
  children: ReactNode;
  className?: string;
};

/**
 * Frames content as a browser window and stands it up out of a 3D tilt as it
 * scrolls into view — the single-panel version of the deck in ShopTilt.
 */
const BrowserTilt = ({ label, children, className = '' }: BrowserTiltProps) => {
  const { ref, progress } = useScrollProgress<HTMLDivElement>({ start: 0.95, end: 0.3 });

  const upright = progress;

  return (
    <div ref={ref} className={className}>
      <div className="overflow-hidden pt-10" style={{ perspective: '1800px' }}>
        <div
          className="flex flex-col overflow-hidden rounded-xl border border-primary-white/15 bg-secondary-background"
          style={{
            transform: `rotateX(${32 * (1 - upright)}deg) translateY(${40 * (1 - upright)}px)`,
            transformOrigin: '50% 100%',
            boxShadow: `0 ${16 + 24 * upright}px ${40 + 40 * upright}px rgba(0,0,0,0.45)`,
          }}
        >
          <div className="flex shrink-0 items-center gap-2 border-b border-primary-white/10 bg-primary-background/60 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-primary-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary-white/20" />
            <span className="ml-3 truncate rounded bg-primary-white/[0.06] px-2 py-0.5 font-mono text-[0.65rem] text-primary-grey">
              {label}
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default BrowserTilt;
