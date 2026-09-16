import { useState } from 'react';
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

type AwardCardDemoProps = { accent: string };

const AwardCardDemo = ({ accent }: AwardCardDemoProps) => {
  const [count, setCount] = useState(5);
  // Hover drives the animation on desktop; tap drives it where there is no hover.
  const [tappedOpen, setTappedOpen] = useState(false);

  const shown = AWARDS.slice(0, count);

  return (
    <div className="flex flex-col gap-5">
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

      <div
        className={`awd-card group relative w-full max-w-[220px] overflow-hidden rounded-2xl border border-primary-white/15 bg-secondary-background/70 ${
          tappedOpen ? 'is-open' : ''
        }`}
        onMouseLeave={() => setTappedOpen(false)}
      >
        {/* Stands in for a product card in the shop grid — deliberately stripped
            back to the bottle and the medals. */}
        <div className="relative flex aspect-[4/5] items-center justify-center bg-[#17130f] p-5">
          <img
            src="/valldoaido/awards/bottle-silhouette.webp"
            alt=""
            aria-hidden="true"
            width={210}
            height={720}
            loading="lazy"
            className="awd-bottle max-h-full w-auto object-contain"
          />

          <div className="absolute right-2 top-2 z-10">
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

        <div className="flex items-baseline justify-between gap-2 px-3 py-2.5">
          <span className="min-w-0 truncate text-xs font-semibold text-primary-white">Flutt Baga Rosé Bruto</span>
          <span className="shrink-0 text-xs text-primary-grey">CHF 13.00</span>
        </div>

        {/* Touch devices get no hover, so give them an explicit control. */}
        <button
          type="button"
          onClick={() => setTappedOpen(open => !open)}
          className="w-full border-t border-primary-white/10 px-3 py-2 text-[0.7rem] text-primary-grey transition hover:text-primary-white cursor-pointer md:hidden"
        >
          {tappedOpen ? 'Collapse medals' : 'Tap to fan out the medals'}
        </button>
      </div>

      <p className="max-w-[220px] text-xs leading-relaxed text-primary-grey/80">
        <span className="hidden md:inline">Hover the card. </span>
        {count === 1
          ? 'With a single award the stack stays still — there is nothing to fan out.'
          : `The lead medal shrinks and the other ${count - 1} expand beneath it.`}
      </p>
    </div>
  );
};

export default AwardCardDemo;
