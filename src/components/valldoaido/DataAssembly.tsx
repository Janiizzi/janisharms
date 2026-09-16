import { useMemo } from 'react';
import { productFields, type FieldType } from '../../data/valldoaidoShopify';
import { useScrollProgress, range, easeOut } from './useScrollProgress';

/**
 * The old product description: one run-on block of prose that a human typed
 * per wine. Sits behind the fields and blurs away as they find their places.
 */
const PROSE =
  'Souvall Parcela Seara Grande Reserva Branco 2023, DOC Beira Interior, Portugal. Rebsorten: Síria, Gouveio, ' +
  'Arinto, Rabigato, Fernão Pires. Abfülljahr 2024, Jahrgang 2023. Alkohol 13,8% Vol., Gesamtsäure 6,53 g/L, ' +
  'pH-Wert 3,12. Produktionsmenge 4000 Flaschen. Granitische Bodenmatrix mit sandig-lehmiger Textur. Handlese in ' +
  'perforierten 20-kg-Kisten, Sortierband, vollständiges Entrappen, Quetschen, Kaltmazeration in kontrollierter ' +
  'Atmosphäre. Servieren bei 12–14 °C. Passt zu einer vielfältigen Käseplatte. Produzent LA Ferraz, Önologe ' +
  'José Ribeiro Brandão.';

const GROUPS = [
  { id: 'reference', label: 'References', hint: 'shared records' },
  { id: 'number', label: 'Numbers', hint: 'filterable, comparable' },
  { id: 'text', label: 'Text', hint: 'per product' },
] as const;

const groupOf = (type: FieldType) => {
  if (type === 'reference' || type === 'reference_list') return 'reference';
  if (type === 'integer' || type === 'decimal') return 'number';
  return 'text';
};

/** Stable pseudo-random in 0 → 1, so the scatter is identical on every render. */
const noise = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

type DataAssemblyProps = { accent: string };

const DataAssembly = ({ accent }: DataAssemblyProps) => {
  const { ref, progress } = useScrollProgress<HTMLDivElement>({ start: 1.05, end: 0.12 });

  const columns = useMemo(
    () =>
      GROUPS.map(group => ({
        ...group,
        fields: productFields.filter(field => groupOf(field.type) === group.id),
      })),
    []
  );

  // The prose gives way first, then the fields settle, then the frame appears.
  const proseOut = range(progress, 0.05, 0.55);
  const frameIn = easeOut(range(progress, 0.6, 1));

  let chipIndex = 0;

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl px-4 py-14 md:px-10 md:py-20">
      {/* Where the data used to live. */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none px-6 py-10 text-justify text-sm leading-relaxed text-primary-grey md:px-12 md:text-base"
        style={{
          opacity: 0.45 * (1 - proseOut),
          filter: `blur(${proseOut * 5}px)`,
        }}
      >
        {PROSE}
      </p>

      {/* The frame the fields end up inside. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 rounded-2xl border"
        style={{ borderColor: `${accent}33`, opacity: frameIn }}
      />

      <div className="relative grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
        {columns.map(group => (
          <div key={group.id} className="flex flex-col gap-2">
            <div
              className="mb-1 flex items-baseline gap-2 border-b pb-2"
              style={{ borderColor: `${accent}33`, opacity: frameIn }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: accent }}>
                {group.label}
              </span>
              <span className="text-[0.65rem] text-primary-grey/70">{group.hint}</span>
            </div>

            {group.fields.map(field => {
              const seed = chipIndex++;
              // Each chip starts somewhere else and arrives slightly after the last.
              const settle = easeOut(range(progress, Math.min(0.55, seed * 0.03), 0.97));
              const away = 1 - settle;
              const dx = (noise(seed + 1) - 0.5) * 460;
              const dy = (noise(seed + 7) - 0.5) * 260;
              const rotate = (noise(seed + 13) - 0.5) * 48;

              return (
                <div
                  key={field.key}
                  className="flex items-center justify-between gap-2 rounded-lg border border-primary-white/15 bg-secondary-background/80 px-2.5 py-1.5 backdrop-blur-sm"
                  style={{
                    transform: `translate3d(${dx * away}px, ${dy * away}px, 0) rotate(${rotate * away}deg)`,
                    opacity: 0.35 + 0.65 * settle,
                    willChange: 'transform',
                  }}
                >
                  <span className="min-w-0 truncate text-xs font-medium text-primary-white">{field.key}</span>
                  <span
                    className="shrink-0 font-mono text-[0.6rem] text-primary-grey/70"
                    style={{ opacity: settle }}
                  >
                    {field.type === 'reference' || field.type === 'reference_list'
                      ? '→'
                      : field.type === 'integer' || field.type === 'decimal'
                        ? '#'
                        : 'T'}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataAssembly;
