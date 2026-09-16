import { useScrollProgress } from './useScrollProgress';

type ShopTiltProps = { accent: string };

/**
 * The live shop, lying back in 3D and standing up as it scrolls into view.
 *
 * The rotation is driven by scroll position rather than a one-shot transition,
 * so it tilts back again on the way up.
 */
const ShopTilt = ({ accent }: ShopTiltProps) => {
  // Band chosen so the panel is still visibly tilted while it sits in the
  // middle of the viewport, and only stands up once it has scrolled near the
  // top. Linear rather than eased, so it does not flatten out too early.
  const { ref, progress: t } = useScrollProgress<HTMLDivElement>({ start: 0.8, end: 0.05 });

  const rotateX = 32 * (1 - t);
  const scale = 0.88 + 0.12 * t;
  const lift = 40 * (1 - t);

  return (
    <div ref={ref} className="relative" style={{ perspective: '1600px' }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[300px] w-[70%] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: accent, opacity: 0.18 * t }}
      />

      <div
        className="relative mx-auto max-w-4xl overflow-hidden rounded-xl border border-primary-white/15 bg-secondary-background"
        style={{
          transform: `rotateX(${rotateX}deg) scale(${scale}) translateY(${lift}px)`,
          transformOrigin: '50% 100%',
          boxShadow: `0 ${30 + 40 * t}px ${60 + 60 * t}px rgba(0,0,0,${0.35 + 0.25 * t})`,
          willChange: 'transform',
        }}
      >
        {/* Browser chrome, so the screenshot reads as a live site. */}
        <div className="flex items-center gap-2 border-b border-primary-white/10 bg-primary-background/60 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary-white/20" />
          <span className="ml-3 truncate rounded bg-primary-white/[0.06] px-2 py-0.5 font-mono text-[0.65rem] text-primary-grey">
            valldoaido.ch
          </span>
        </div>

        <img
          src="/valldoaido/shop-home.webp"
          alt="The Vall'doAido shop homepage"
          width={1459}
          height={1042}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />

        {/* Fades the long page out at the bottom instead of cutting it. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
          style={{ background: 'linear-gradient(to top, var(--primary-background), transparent)' }}
        />
      </div>
    </div>
  );
};

export default ShopTilt;
