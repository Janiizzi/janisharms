import { useState } from 'react';
import { specRows, exampleProduct } from '../../data/valldoaidoShopify';

type SpecSheetProps = { accent: string };

/**
 * The storefront's "Steckbrief" block, rebuilt for a dark page.
 *
 * Same structure as the live theme — icon, label, value, with the lab numbers
 * grouped under one icon and wide rows spanning both columns. The toggle
 * overlays the metafield key each row reads from, which is the whole point of
 * the rebuild: none of this is written per product.
 */
const SpecSheet = ({ accent }: SpecSheetProps) => {
  const [showKeys, setShowKeys] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-primary-white/15 bg-secondary-background/70">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary-white/10 px-4 py-3 md:px-6">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-primary-white">{exampleProduct.title}</div>
          <div className="truncate text-xs text-primary-grey">{exampleProduct.subtitle}</div>
        </div>
        <button
          type="button"
          onClick={() => setShowKeys(open => !open)}
          aria-pressed={showKeys}
          className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
            showKeys
              ? 'border-transparent text-primary-background'
              : 'border-primary-white/20 text-primary-grey hover:border-primary-white/45 hover:text-primary-white'
          }`}
          style={showKeys ? { backgroundColor: accent } : undefined}
        >
          {showKeys ? 'Hide metafield keys' : 'Show metafield keys'}
        </button>
      </div>

      <dl className="grid grid-cols-1 gap-x-8 gap-y-5 px-4 py-6 sm:grid-cols-2 md:px-6">
        {specRows.map(row => (
          <div
            key={`${row.icon}-${row.label}`}
            className={`flex gap-3 ${row.wide ? 'sm:col-span-2' : ''}`}
          >
            <img
              src={`/valldoaido/icons/${row.icon}.svg`}
              alt=""
              aria-hidden="true"
              width={24}
              height={24}
              loading="lazy"
              className="mt-0.5 h-6 w-6 shrink-0"
            />

            <div className="min-w-0 flex-1">
              {row.stats ? (
                <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-3">
                  {row.stats.map(stat => (
                    <div key={stat.label} className="min-w-0">
                      <dt className="text-[0.68rem] uppercase tracking-[0.14em] text-primary-grey">
                        {stat.label}
                      </dt>
                      <dd className="mt-0.5 text-sm text-primary-white">{stat.value}</dd>
                      {showKeys && (
                        <div className="mt-1 font-mono text-[0.65rem]" style={{ color: accent }}>
                          {stat.field}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <dt className="text-[0.68rem] uppercase tracking-[0.14em] text-primary-grey">
                    {row.label}
                  </dt>
                  <dd className="mt-0.5 text-sm leading-snug text-primary-white">{row.value}</dd>
                </>
              )}

              {showKeys && (
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {(row.stats ? [] : row.fields).map(field => (
                    <span
                      key={field}
                      className="rounded border border-primary-white/15 px-1.5 py-0.5 font-mono text-[0.65rem]"
                      style={{ color: accent }}
                    >
                      {field}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default SpecSheet;
