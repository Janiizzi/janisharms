import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { problem } from '../../data/valldoaidoShopify';
import { useScrollProgress, range, easeOut } from './useScrollProgress';

type BeforeAfterProps = { accent: string };

/**
 * The two lists, without a card around them.
 *
 * Both columns rise into place one row at a time as the block scrolls past.
 * The "before" rows then get struck through — the line grows from left to
 * right — while the "after" rows have their check mark drawn in. The whole
 * thing is driven by scroll position, so it reverses on the way back up.
 */
const BeforeAfter = ({ accent }: BeforeAfterProps) => {
  const { ref, progress } = useScrollProgress<HTMLDivElement>({ start: 0.95, end: 0.25 });

  const columns = [
    { ...problem.before, isAfter: false },
    { ...problem.after, isAfter: true },
  ];

  return (
    <div ref={ref} className="grid gap-10 md:grid-cols-2 md:gap-14">
      {columns.map((column, columnIndex) => {
        // The "after" column follows a beat behind the "before" column.
        const columnOffset = columnIndex * 0.12;
        const ruleIn = easeOut(range(progress, columnOffset, columnOffset + 0.25));

        return (
          <div key={column.label}>
            <div className="flex items-center gap-3">
              <span
                className="text-xs uppercase tracking-[0.18em]"
                style={{ color: column.isAfter ? accent : '#8a8a8a' }}
              >
                {column.label}
              </span>
              <span
                className="h-px flex-1 origin-left"
                style={{
                  background: column.isAfter ? accent : '#ffffff26',
                  transform: `scaleX(${ruleIn})`,
                }}
              />
            </div>

            <ul className="mt-5 flex flex-col gap-4">
              {column.points.map((point, pointIndex) => {
                const from = columnOffset + 0.1 + pointIndex * 0.07;
                const rise = easeOut(range(progress, from, from + 0.28));
                // Strike / check only start once the row itself has arrived.
                const mark = easeOut(range(progress, from + 0.2, from + 0.5));

                return (
                  <li
                    key={point}
                    className="flex gap-3 text-sm leading-snug"
                    style={{
                      opacity: rise,
                      transform: `translateY(${(1 - rise) * 14}px)`,
                    }}
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
                      {column.isAfter ? (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-[0.7rem]"
                          style={{ color: accent, opacity: mark, transform: `scale(${0.6 + 0.4 * mark})` }}
                        />
                      ) : (
                        <span
                          className="block h-1.5 w-1.5 rounded-full bg-primary-grey/50"
                          style={{ opacity: 1 - mark * 0.5 }}
                        />
                      )}
                    </span>

                    <span className={`relative ${column.isAfter ? 'text-primary-white' : 'text-primary-grey'}`}>
                      {point}
                      {!column.isAfter && (
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-1/2 h-px w-full origin-left bg-primary-grey/60"
                          style={{ transform: `scaleX(${mark})` }}
                        />
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default BeforeAfter;
