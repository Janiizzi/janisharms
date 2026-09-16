import { Link } from 'react-router-dom';
import { seriesParts, type SeriesPartId } from '../../data/valldoaidoSeries';

type SeriesNavProps = {
  /** The part the visitor is currently reading — rendered as the active chip. */
  current: SeriesPartId;
  accent: string;
};

/** Strip that lets a visitor move between the three Vall'doAido case studies. */
const SeriesNav = ({ current, accent }: SeriesNavProps) => (
  <nav aria-label="Vall'doAido series" className="flex flex-wrap items-center gap-2">
    <span className="mr-1 text-xs uppercase tracking-[0.18em] text-primary-grey">Vall'doAido</span>

    {seriesParts.map(part => {
      const isCurrent = part.id === current;
      const body = (
        <>
          <span className="font-mono text-[0.7rem] opacity-70">{part.number}</span>
          {part.label}
        </>
      );

      if (isCurrent) {
        return (
          <span
            key={part.id}
            aria-current="page"
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-primary-background"
            style={{ backgroundColor: accent }}
          >
            {body}
          </span>
        );
      }

      if (!part.to) {
        return (
          <span
            key={part.id}
            className="inline-flex items-center gap-2 rounded-full border border-dashed border-primary-white/20 px-3 py-1.5 text-xs text-primary-grey/60"
            title="Not published yet"
          >
            {body}
          </span>
        );
      }

      return (
        <Link
          key={part.id}
          to={part.to}
          className="inline-flex items-center gap-2 rounded-full border border-primary-white/20 px-3 py-1.5 text-xs text-primary-grey transition hover:border-primary-white/45 hover:text-primary-white"
        >
          {body}
        </Link>
      );
    })}
  </nav>
);

export default SeriesNav;
