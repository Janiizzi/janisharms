/**
 * The Vall'doAido work spans three projects that tell one story: a fact sheet
 * that started as a hand-set InDesign page and ended as a generated artifact
 * from a synced database.
 */
const PARTS = [
  { id: 'branding', number: '01', label: 'Branding', to: '/projects/valldoaido' },
  { id: 'shopify', number: '02', label: 'Shopify theme', to: '/projects/valldoaido/shopify' },
  { id: 'backoffice', number: '03', label: 'Back-office tool', to: '/projects/valldoaido/backoffice' },
] as const;

export type SeriesPartId = (typeof PARTS)[number]['id'];

export interface SeriesPart {
  id: SeriesPartId;
  number: string;
  label: string;
  /** null for a part that isn't published yet — SeriesNav greys it out. */
  to: string | null;
}

export const seriesParts: readonly SeriesPart[] = PARTS;
