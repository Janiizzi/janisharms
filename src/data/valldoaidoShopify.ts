/**
 * Content model for the Vall'doAido Shopify case study (/projects/valldoaido/shopify).
 *
 * As with the branding page, everything the page says lives here so the copy
 * can be rewritten without touching layout.
 *
 * The schema below mirrors the real metafield and metaobject definitions in the
 * store. Leaf values are the public ones from
 * valldoaido.ch/products/souvall-parcela-seara-grande-reserva-branco-2023-beira-interior-doc
 * so the tree shows a real product rather than an invented one.
 */

export const intro = {
  title: 'Shopify theme',
  subtitle: 'A wine shop rebuilt around its own data model',
  shopUrl: 'https://valldoaido.ch',
  lede:
    'The shop already existed. What it did not have was a way to describe a wine. Every technical fact — grape, ' +
    'alcohol, acidity, soil, producer — was typed by hand into an HTML block on each product, and the printed ' +
    'fact sheet was bolted on as a PDF download. Adding one wine cost hours. I rebuilt the theme around typed ' +
    'metafields and metaobjects, so a wine is now data the template renders, not markup someone writes.',
  facts: [
    { label: 'Role', value: 'Theme development & data modelling' },
    { label: 'Period', value: '2025 – today' },
    { label: 'Stack', value: 'Liquid, metafields, metaobjects, JS, CSS' },
    { label: 'Scope', value: 'Product page, filtering, i18n, Admin API' },
  ],
};

/* -------------------------------------------------------------- the problem */

export const problem = {
  title: 'What a wine used to cost',
  body:
    'The previous setup treated every product as a one-off. The fact sheet the producer supplies — the ficha ' +
    'técnica — was attached as a PDF download, and anything that needed to be visible on the page was pasted ' +
    'into a rich-text block by hand, per wine, in every language. Nothing was queryable: you could not filter ' +
    'by region, because "Beira Interior" was a run of characters inside a paragraph, not a value.',
  before: {
    label: 'Before',
    points: [
      'One hand-written HTML block per product',
      'The ficha técnica as a PDF download',
      'Re-typed for every language',
      'No filtering — the data was prose',
      'A producer description copy-pasted onto each of their wines',
    ],
  },
  after: {
    label: 'After',
    points: [
      '19 typed metafield definitions rendered by one template',
      'The fact sheet is the page, not an attachment',
      'Translated once per metaobject, not per product',
      'Filter by producer, region, grape and wine type',
      'A producer is one record, referenced by all their wines',
    ],
  },
};

/* ------------------------------------------------------------- the schema */

export type FieldType =
  | 'single_line_text'
  | 'multi_line_text'
  | 'rich_text'
  | 'integer'
  | 'decimal'
  | 'url'
  | 'file'
  | 'file_list'
  | 'reference'
  | 'reference_list';

export interface SchemaField {
  key: string;
  /** The label the storefront renders, when it differs from the key. */
  label?: string;
  type: FieldType;
  /** For reference types: the metaobject definition this points at. */
  refType?: string;
  /** The value on the example product, for leaves the page shows. */
  value?: string;
  /** How many products in the store use this definition. */
  usedIn?: number;
}

export interface MetaobjectDef {
  /** Shopify metaobject type handle. */
  type: string;
  name: string;
  description?: string;
  /** Number of entries of this definition in the store. */
  entries: number;
  fields: SchemaField[];
  /** The entry the example product resolves to. */
  example: string;
}

export const metaobjects: Record<string, MetaobjectDef> = {
  wine_type: {
    type: 'wine_type',
    name: 'Wine Type',
    description: 'Type of wine (Fortificado, Tinto, Branco, Rosé, …)',
    entries: 11,
    example: 'Weisswein',
    fields: [{ key: 'name', type: 'single_line_text', value: 'Weisswein' }],
  },
  region: {
    type: 'region',
    name: 'Region',
    description: 'Describes a region object',
    entries: 11,
    example: 'Beira Interior',
    fields: [
      { key: 'name', type: 'single_line_text', value: 'Beira Interior' },
      { key: 'country', type: 'single_line_text', value: 'Portugal' },
      { key: 'description', type: 'single_line_text', value: 'Granite plateau, 500–700 m…' },
      { key: 'map_image', type: 'single_line_text', value: 'beira-interior.svg' },
    ],
  },
  producer: {
    type: 'producer',
    name: 'Producer',
    description: 'This describes a single producer/brand',
    entries: 11,
    example: 'LA Ferraz',
    fields: [
      { key: 'name', type: 'single_line_text', value: 'LA Ferraz' },
      { key: 'region', type: 'reference', refType: 'region' },
      { key: 'description', type: 'rich_text', value: 'Wine, Love and Family…' },
      { key: 'logo', type: 'file_list' },
      { key: 'website', type: 'url', value: 'laferraz.pt' },
      { key: 'picture', type: 'file' },
      { key: 'link_to_description', type: 'url' },
    ],
  },
  winemaker: {
    type: 'winemaker',
    name: 'Winemaker',
    description: 'Describes the person that produced the wine',
    entries: 17,
    example: 'José Ribeiro Brandão',
    fields: [
      { key: 'name', type: 'single_line_text', value: 'José Ribeiro Brandão' },
      { key: 'bio', type: 'rich_text' },
      { key: 'photo', type: 'file' },
      { key: 'producer', type: 'reference', refType: 'producer' },
    ],
  },
  award: {
    type: 'award',
    name: 'Award',
    entries: 120,
    example: 'Portugal Wine Trophy 2026',
    fields: [
      { key: 'name', type: 'single_line_text', value: 'Portugal Wine Trophy' },
      { key: 'rang/platz', type: 'single_line_text', value: 'GOLD' },
      { key: 'logo', type: 'file' },
      { key: 'link', type: 'url' },
      { key: 'jahr', type: 'integer', value: '2026' },
    ],
  },
};

/**
 * The product-level metafield definitions, in the order the Steckbrief renders
 * them. `usedIn` is the real product count from the Shopify admin.
 */
export const productFields: SchemaField[] = [
  { key: 'Weintyp', type: 'reference', refType: 'wine_type', usedIn: 125 },
  { key: 'Region', type: 'reference', refType: 'region', usedIn: 141 },
  { key: 'Rebsorten', type: 'reference_list', refType: 'grape', usedIn: 114, value: 'Síria, Gouveio, Arinto, Rabigato, Fernão Pires' },
  { key: 'Produzent', type: 'reference', refType: 'producer', usedIn: 170 },
  { key: 'Winzer', type: 'reference', refType: 'winemaker', usedIn: 87 },
  { key: 'Awards', type: 'reference_list', refType: 'award', usedIn: 20 },
  { key: 'Abfülljahr', type: 'integer', value: '2024', usedIn: 28 },
  { key: 'Erntejahr', type: 'integer', value: '2023', usedIn: 99 },
  { key: 'Produktionsmenge', type: 'integer', value: '4000', usedIn: 27 },
  { key: 'Alkohol', type: 'decimal', value: '13.8', usedIn: 116 },
  { key: 'Gesamtsäure', type: 'decimal', value: '6.53', usedIn: 112 },
  { key: 'pH-Wert', type: 'decimal', value: '3.12', usedIn: 111 },
  { key: 'Restzucker', type: 'decimal', usedIn: 72 },
  { key: 'Bodenbeschaffenheit', type: 'multi_line_text', value: 'Granitische Bodenmatrix…', usedIn: 54 },
  { key: 'Vinifikation', type: 'multi_line_text', value: 'Handlese in perforierten 20-kg-Kisten…', usedIn: 115 },
  { key: 'Serviertemperatur und Lagerung', type: 'multi_line_text', value: '12–14 °C', usedIn: 71 },
  { key: 'Speiseempfehlung', type: 'multi_line_text', value: 'Vielfältige Käseplatte…', usedIn: 99 },
  { key: 'award_points', type: 'decimal', usedIn: 20 },
  { key: 'award_description', type: 'single_line_text', usedIn: 20 },
];

export const exampleProduct = {
  title: 'Souvall Parcela Seara Grande Reserva Branco 2023',
  handle: 'souvall-parcela-seara-grande-reserva-branco-2023-beira-interior-doc',
  subtitle: 'DOC Beira Interior, Portugal',
};

export const schemaSection = {
  title: 'A wine as a graph, not a paragraph',
  body:
    'Nineteen metafield definitions describe a product. Six of them are not values but references: they point at ' +
    'metaobjects — Producer, Winemaker, Region, Wine Type, Grape, Award — that exist once and are reused by every ' +
    'wine that needs them. Correct the spelling of a region and it is correct on all 141 products at once.',
  footnote:
    'The part I did not expect: the graph is not flat. A wine points at its winemaker, the winemaker points at ' +
    'their producer, and the producer points at a region — so the region reaches the product by two different ' +
    'paths and still resolves to one record.',
};

export const specSection = {
  title: 'The Steckbrief',
  body:
    'The block that replaced the hand-written HTML. Every row is a metafield, rendered by one template for every ' +
    'wine in the store. The icons are the same SVGs I drew for the printed catalogue in 2024 — the print schema ' +
    'and the Shopify schema turned out to be the same schema.',
  note: 'Rebuilt here in dark; the shop renders it on linen. Values are the live ones from the product page.',
};

export const awardSection = {
  title: 'Five medals, one corner',
  body:
    'Roughly one in six wines has won something, and the ones that have often have won several times. A row of ' +
    'five medals on a product card would drown the bottle, and showing only the best one throws away the rest. ' +
    'So the stack rests as a single medal and fans out on hover — the card stays calm in a grid, and a visitor ' +
    'who is interested gets the full list without leaving the page.',
  note:
    'Rebuilt from the live CSS, with the real medals from Flutt Baga Rosé Bruto. Hover the card — or use the ' +
    'buttons to change how many awards the wine has.',
  detail:
    'The whole thing is CSS: the stack is a flex column where every medal after the first is collapsed to ' +
    'max-height 0 and opacity 0. On hover the lead medal shrinks 6rem → 4rem and the rest expand into place with ' +
    'a negative margin so they overlap like a real pile. No JavaScript, and it degrades to a single medal on ' +
    'touch devices, where there is no hover to give the affordance.',
};

/** Sections the page shows but which are still waiting for real material. */
export const upcoming = [
  {
    title: 'Mobile first, actually',
    body:
      'Most of the shop\'s traffic is on a phone, so the product page was rebuilt for the small screen first — ' +
      'the spec grid collapses to one column, the gallery and the buy button stay reachable, and the producer ' +
      'story folds away behind a "Mehr lesen".',
  },
  {
    title: 'Four languages, one source',
    body:
      'The store sells in German to a Swiss market, with Portuguese product material underneath. Because the ' +
      'facts live in metaobjects, a region or a producer is translated once and every product that references ' +
      'it follows — instead of the same paragraph being re-translated on each wine.',
  },
  {
    title: 'Theme architecture',
    body:
      'Custom sections and snippets layered onto the base theme rather than forked into it, so the theme can ' +
      'still take updates. The spec block, the award components, the producer block and the filtering are all ' +
      'additions that read from the metafield schema.',
  },
];

/* --------------------------------------------------------- the spec block */

export interface SpecRow {
  /** Icon file in /valldoaido/icons — the same set drawn for the print catalogue. */
  icon: string;
  label: string;
  /** The metafield definition(s) this row renders. */
  fields: string[];
  value?: string;
  /** Several values under one icon, the way the shop groups the lab numbers. */
  stats?: { label: string; value: string; field: string }[];
  wide?: boolean;
}

export const specRows: SpecRow[] = [
  { icon: 'producao', label: 'Typ', fields: ['Weintyp'], value: 'Weisswein' },
  { icon: 'denominacao', label: 'Bezeichnung/Region', fields: ['Region'], value: 'DOC Beira Interior, Portugal' },
  { icon: 'lancamento', label: 'Abfülljahr / Jahrgang', fields: ['Abfülljahr', 'Erntejahr'], value: '2024 / 2023' },
  {
    icon: 'castas',
    label: 'Rebsorten',
    fields: ['Rebsorten'],
    value: 'Síria, Gouveio, Arinto, Rabigato, Fernão Pires',
    wide: true,
  },
  { icon: 'conservacao-e-servico', label: 'Produktionsmenge', fields: ['Produktionsmenge'], value: '4000 Flaschen' },
  {
    icon: 'alcool',
    label: 'Laborwerte',
    fields: ['Alkohol', 'Gesamtsäure', 'pH-Wert'],
    wide: true,
    stats: [
      { label: 'Alkohol', value: '13,8% Vol.', field: 'Alkohol' },
      { label: 'Gesamtsäure', value: '6,53 g/L', field: 'Gesamtsäure' },
      { label: 'pH-Wert', value: '3,12', field: 'pH-Wert' },
    ],
  },
  {
    icon: 'conservacao-e-servico',
    label: 'Lagerung und Service',
    fields: ['Serviertemperatur und Lagerung'],
    value: '12–14 °C',
    wide: true,
  },
];
