import { useScrollProgress, range, easeOut } from './useScrollProgress';

const PANELS = [
  { file: 'shop-home', label: 'Homepage', alt: "The Vall'doAido shop homepage" },
  { file: 'shop-product', label: 'Product page', alt: 'A wine product page with its generated spec sheet' },
  { file: 'shop-blog', label: 'Blog', alt: "The Vall'doAido blog index" },
];

type ShopTiltProps = { accent: string };

/**
 * Three pages of the live shop, stacked like a deck.
 *
 * The stack stands up out of a 3D tilt as it scrolls into view, then the front
 * panel drops away towards the viewer and the one waiting behind it comes
 * forward — so each page gets a moment on screen. Driven by scroll position, so
 * it runs backwards on the way up too.
 */
/**
 * Holds each page still for the first part of its step, then swaps quickly.
 * A linear cycle never lets a page stand still, so nothing is readable.
 */
const dwell = (value: number) => {
  const index = Math.floor(value);
  const within = value - index;
  const move = within < 0.55 ? 0 : (within - 0.55) / 0.45;
  return index + move * move * (3 - 2 * move);
};

const ShopTilt = ({ accent }: ShopTiltProps) => {
  // A long band: the deck needs room to deal three panels.
  const { ref, progress } = useScrollProgress<HTMLDivElement>({ start: 0.95, end: -0.4 });

  const entry = easeOut(range(progress, 0, 0.2));
  // Runs 0 → PANELS.length - 1: which panel currently sits at the front.
  const cycle = dwell(range(progress, 0.18, 0.95) * (PANELS.length - 1));
  const active = Math.min(PANELS.length - 1, Math.round(cycle));

  return (
    <div ref={ref}>
      <div className="relative" style={{ perspective: '1800px' }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/4 h-[280px] w-[65%] -translate-x-1/2 rounded-full blur-[120px]"
          style={{ background: accent, opacity: 0.16 * entry }}
        />

        {/* One browser frame that the pages slide through. Giving every panel
            its own chrome put two title bars on screen during a transition. */}
        <div
          className="relative mx-auto flex aspect-[1459/1042] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-primary-white/15 bg-secondary-background"
          style={{
            transform: `rotateX(${30 * (1 - entry)}deg) translateY(${40 * (1 - entry)}px)`,
            transformOrigin: '50% 100%',
            boxShadow: `0 ${20 + 30 * entry}px ${50 + 50 * entry}px rgba(0,0,0,0.45)`,
          }}
        >
          <div className="flex shrink-0 items-center gap-2 border-b border-primary-white/10 bg-primary-background/60 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-primary-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary-white/20" />
            <span className="ml-3 truncate rounded bg-primary-white/[0.06] px-2 py-0.5 font-mono text-[0.65rem] text-primary-grey">
              valldoaido.ch
            </span>
          </div>

          {/* Clipped, so the front page can leave at full opacity out of the
              bottom edge instead of cross-fading through the one behind it. */}
          <div className="relative min-h-0 flex-1 overflow-hidden">
            {PANELS.map((panel, index) => {
              const position = index - cycle;
              // Waiting behind: nudged up and scaled back so it reads as depth.
              // Leaving: slides straight out of the bottom, staying opaque.
              const depth = Math.max(0, Math.min(position, 2));
              const gone = Math.max(0, -position);

              return (
                <div
                  key={panel.file}
                  aria-hidden={index !== active}
                  className="absolute inset-0 overflow-hidden bg-secondary-background"
                  style={{
                    transform: `translateY(${gone * 105}%) translateY(${-depth * 12}px) scale(${1 - depth * 0.05})`,
                    transformOrigin: '50% 0%',
                    zIndex: Math.round(100 - position * 10),
                    willChange: 'transform',
                  }}
                >
                  <img
                    src={`/valldoaido/${panel.file}.webp`}
                    alt={panel.alt}
                    width={1459}
                    height={1042}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top"
                  />

                  {/* Fades the cut-off page out instead of ending it on an edge. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
                    style={{ background: 'linear-gradient(to top, var(--primary-background), transparent)' }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
        {PANELS.map((panel, index) => (
          <span
            key={panel.file}
            className={index === active ? 'font-semibold' : 'text-primary-grey/50'}
            style={index === active ? { color: accent } : undefined}
          >
            {panel.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ShopTilt;
