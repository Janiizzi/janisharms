/**
 * The Vall'doAido work spans three projects that tell one story: a fact sheet
 * that started as a hand-set InDesign page and ended as a generated artifact
 * from a synced database.
 *
 * Set `to: null` for a part that isn't published yet — SeriesNav renders it as
 * a greyed-out placeholder instead of a dead link.
 */
export const seriesParts = [
  { id: 'branding', number: '01', label: 'Branding', to: '/projects/valldoaido' },
  { id: 'shopify', number: '02', label: 'Shopify theme', to: '/projects/valldoaido/shopify' },
  { id: 'backoffice', number: '03', label: 'Back-office tool', to: null },
] as const;

export type SeriesPartId = (typeof seriesParts)[number]['id'];
