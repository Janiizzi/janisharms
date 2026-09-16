import { useScrollProgress, range } from './useScrollProgress';

const PANELS = [
  { file: 'shop-home', label: 'Homepage', alt: "The Vall'doAido shop homepage" },
  { file: 'shop-product', label: 'Product page', alt: 'A wine product page with its generated spec sheet' },
  { file: 'shop-blog', label: 'Blog', alt: "The Vall'doAido blog index" },
];

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

type ShopTiltProps = { accent: string };

/**
 * Three pages of the live shop, stacked as whole browser windows.
 *
 * The deck stands up out of a 3D tilt as it scrolls into view, then the front
 * window slides out of the bottom and the one waiting behind it comes forward.
 *
 * Each window carries its own frame, so when it scales back into the stack the
 * chrome scales with it — scaling only the screenshot inside a fixed frame read
 * as the page zooming rather than the window receding.
 *
 * The clipping wrapper holds the perspective itself: `overflow: hidden` flattens
 * a 3D context, so a perspective further up the tree would not reach the cards.
 * Its top padding is what lets the waiting windows peek above the front one,
 * while the bottom edge sits flush so a leaving window is cut off cleanly
 * instead of fading through the one behind it.
 */
const ShopTilt = ({ accent }: ShopTiltProps) => {
  // A long band: the deck needs room to stand up and then deal three windows.
  const { ref, progress } = useScrollProgress<HTMLDivElement>({ start: 1.0, end: -0.7 });

  // Linear, not eased — easing flattened the tilt out while the deck was still
  // entering the screen, so it barely read as a tilt at all.
  const entry = range(progress, 0, 0.3);
  // Runs 0 → PANELS.length - 1: which window currently sits at the front.
  // Starts once the deck is upright, so the two motions do not overlap, and
  // finishes well before the end of the band so the last page stays up.
  const cycle = dwell(range(progress, 0.32, 0.78) * (PANELS.length - 1));
  const active = Math.min(PANELS.length - 1, Math.round(cycle));

  return (
    <div ref={ref}>
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/4 h-[280px] w-[65%] -translate-x-1/2 rounded-full blur-[120px]"
          style={{ background: accent, opacity: 0.16 * entry }}
        />

        <div className="relative overflow-hidden pt-14" style={{ perspective: '1800px' }}>
          {/* The whole deck tilts as one, standing on its bottom edge. */}
          <div
            className="relative mx-auto aspect-[1459/1042] w-full max-w-4xl"
            style={{
              transform: `rotateX(${32 * (1 - entry)}deg) translateY(${40 * (1 - entry)}px)`,
              transformOrigin: '50% 100%',
            }}
          >
            {PANELS.map((panel, index) => {
              const position = index - cycle;
              // Waiting behind: lifted and scaled back, frame and all.
              // Leaving: slides straight out of the bottom, staying opaque.
              const depth = Math.max(0, Math.min(position, 2));
              const gone = Math.max(0, -position);

              return (
                <div
                  key={panel.file}
                  aria-hidden={index !== active}
                  className="absolute inset-0 flex flex-col overflow-hidden rounded-xl border border-primary-white/15 bg-secondary-background"
                  style={{
                    transform: `translateY(${gone * 165}%) translateY(${-depth * 26}px) scale(${1 - depth * 0.055})`,
                    transformOrigin: '50% 0%',
                    zIndex: Math.round(100 - position * 10),
                    boxShadow: `0 ${16 + 24 * entry}px ${40 + 40 * entry}px rgba(0,0,0,0.45)`,
                    willChange: 'transform',
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

                  <div className="relative min-h-0 flex-1">
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
