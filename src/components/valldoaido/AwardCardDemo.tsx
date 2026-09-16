import { useState, type ReactNode } from 'react';
import TiltOnScroll from './TiltOnScroll';
import './AwardCardDemo.css';

/** The real medals from Flutt Baga Rosé Bruto, in the order the shop lists them. */
const AWARDS = [
  { file: 'cmb-2019-silver', name: 'Concours Mondial de Bruxelles 2019', rank: 'Médaille d’Argent' },
  { file: 'cmb-2020-silver', name: 'Concours Mondial de Bruxelles 2020', rank: 'Médaille d’Argent' },
  { file: 'iwc-2020-bronze', name: 'International Wine Challenge 2020', rank: 'Bronze' },
  { file: 'iwc-2019-commended', name: 'International Wine Challenge 2019', rank: 'Commended' },
  { file: 'pxv', name: 'Paixão pelo Vinho', rank: '16 / 20 · Muito Bom' },
];

const COUNTS = [1, 3, 5];

type AwardCardDemoProps = {
  accent: string;
  /** The section copy, which shares the right column with the controls. */
  children?: ReactNode;
};

const AwardCardDemo = ({ accent, children }: AwardCardDemoProps) => {
  const [count, setCount] = useState(5);
  // Hover drives the animation on desktop; tap drives it where there is no hover.
  const [tappedOpen, setTappedOpen] = useState(false);

  const shown = AWARDS.slice(0, count);

  return (
    <div className="grid items-center gap-8 md:grid-cols-[auto_1fr] md:gap-12">
      {/* A square card, the way it sits in the shop grid. Tilted out of the
          page and straightened on scroll, like the spec sheet. */}
      <TiltOnScroll degrees={-16}>
        <div
          className={`awd-card group relative flex aspect-square w-[286px] flex-col overflow-hidden rounded-2xl border border-primary-white/15 bg-secondary-background/70 ${
            tappedOpen ? 'is-open' : ''
          }`}
          onMouseLeave={() => setTappedOpen(false)}
        >
          <div className="relative flex min-h-0 flex-1 items-center justify-center bg-[#17130f] p-5">
            <img
              src="/valldoaido/awards/bottle-silhouette.webp"
              alt=""
              aria-hidden="true"
              width={210}
              height={720}
              loading="lazy"
              className="awd-bottle max-h-full w-auto object-contain"
            />

            <div className="absolute right-3 top-3 z-10">
              <div className="awd-stack" aria-label={`${count} Auszeichnungen`}>
                {shown.map(award => (
                  <span key={award.file} className="awd-logo">
                    <img
                      src={`/valldoaido/awards/${award.file}.webp`}
                      alt={award.name}
                      title={`${award.name} — ${award.rank}`}
                      width={240}
                      height={240}
                      loading="lazy"
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-baseline justify-between gap-2 px-4 py-2.5">
            <span className="min-w-0 truncate text-xs font-semibold text-primary-white">
              Flutt Baga Rosé Bruto
            </span>
            <span className="shrink-0 text-xs text-primary-grey">CHF 13.00</span>
          </div>

          {/* Touch devices get no hover, so give them an explicit control. */}
          <button
            type="button"
            onClick={() => setTappedOpen(open => !open)}
            className="shrink-0 border-t border-primary-white/10 px-4 py-1.5 text-[0.7rem] text-primary-grey transition hover:text-primary-white cursor-pointer md:hidden"
          >
            {tappedOpen ? 'Collapse medals' : 'Tap to fan out'}
          </button>
        </div>
      </TiltOnScroll>

      <div className="flex flex-col gap-5">
        {children}

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-[0.16em] text-primary-grey">This wine has</span>
          {COUNTS.map(option => {
            const isActive = option === count;
            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setCount(option);
                  setTappedOpen(false);
                }}
                aria-pressed={isActive}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? 'border-transparent text-primary-background'
                    : 'border-primary-white/20 text-primary-grey hover:border-primary-white/45 hover:text-primary-white'
                }`}
                style={isActive ? { backgroundColor: accent } : undefined}
              >
                {option} {option === 1 ? 'award' : 'awards'}
              </button>
            );
          })}
        </div>

        <p className="max-w-md text-xs leading-relaxed text-primary-grey/80">
          <span className="hidden md:inline">Hover the card. </span>
          {count === 1
            ? 'With a single award the stack stays still — there is nothing to fan out.'
            : `The lead medal shrinks and the other ${count - 1} expand beneath it.`}
        </p>
      </div>
    </div>
  );
};

export default AwardCardDemo;
