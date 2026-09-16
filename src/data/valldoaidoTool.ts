/**
 * Content model for the Vall'doAido back-office case study
 * (/projects/valldoaido/backoffice).
 *
 * Figures come from the tool's own dashboard, so they are the real state of the
 * catalogue rather than invented ones.
 */

export const intro = {
  title: 'Back-office tool',
  subtitle: 'One place for data that lived in four',
  lede:
    'Bexio for the books, an Excel sheet for the price tiers, a folder per product on someone\'s desktop, and ' +
    'Shopify for the shop. The same wine existed in all four, and keeping them in step was a manual job nobody ' +
    'owned. I built a desktop tool that holds the product data once, syncs it to Bexio and Shopify, and says ' +
    'out loud when the three disagree.',
  facts: [
    { label: 'Role', value: 'Design & development' },
    { label: 'Period', value: '2026 – today' },
    { label: 'Stack', value: 'Python, SQLite, Shopify Admin API, Bexio API' },
    { label: 'Built with', value: 'Claude Code, almost end to end' },
  ],
};

/* ------------------------------------------------------------- the problem */

export const problem = {
  title: 'Four systems, one wine',
  body:
    'Nothing here was broken on its own. The problem was the seams: a price corrected in Excel did not reach ' +
    'Shopify, a wine renamed in Shopify no longer matched its Bexio entry, and the PDF fact sheet from the ' +
    'producer sat in a folder that only one person knew the path to. Every new wine meant doing the same work ' +
    'four times and hoping the four results agreed.',
  before: {
    label: 'Before',
    caption: 'Four islands, synced by hand',
    nodes: [
      { id: 'bexio', label: 'Bexio', note: 'Bookkeeping, article numbers' },
      { id: 'excel', label: 'Excel', note: 'Price tiers per SKU' },
      { id: 'folders', label: 'Desktop folders', note: 'Fact sheets, images' },
      { id: 'shopify', label: 'Shopify', note: 'The shop' },
    ],
  },
  after: {
    label: 'After',
    caption: 'One record, synced both ways',
    hub: { label: 'Back-office tool', note: 'The product record lives here' },
    nodes: [
      { id: 'bexio', label: 'Bexio', note: 'Import & export' },
      { id: 'shopify', label: 'Shopify', note: 'Admin API, both directions' },
      { id: 'media', label: 'Media store', note: '960 files, one convention' },
      { id: 'pdf', label: 'PDF export', note: 'Generated on demand' },
    ],
  },
};

/* ------------------------------------------------------------ what it found */

export const findings = {
  title: 'What it found on day one',
  body:
    'The first job of the tool was not syncing anything — it was looking. Pointing one consistent view at data ' +
    'that had been maintained in four places turned up a backlog nobody had been able to see before. The ' +
    'dashboard still leads with it, because the list is how the work gets prioritised.',
  /** The live counters from the tool's own dashboard. */
  stats: [
    { value: '249', label: 'Products' },
    { value: '244', label: 'in the Bexio catalogue' },
    { value: '199', label: 'in Shopify' },
    { value: '11', label: 'Producers' },
    { value: '960', label: 'Media files' },
    { value: '1.3 GB', label: 'Total size' },
  ],
};

/* ------------------------------------------------------------- the record */

export const record = {
  title: 'One record, two systems',
  body:
    'Every product screen shows both sides at once: the Bexio name next to the Shopify name, and a padlock on ' +
    'each field that is owned by Shopify. The sidebar keeps the link state, which direction the last sync ran, ' +
    'a version count and how many fields currently differ — so "these two disagree" is a thing you can see ' +
    'rather than something you find out weeks later.',
  points: [
    'Bexio and Shopify names side by side, with per-field ownership',
    'Metafields the shop reads — producer, region, wine type, vintage, lab values — edited in one form',
    'Price tiers on one card: retail, restaurant, wholesale',
    'Last sync, direction, version count, and a field-level diff against the live shop',
    'New products push straight to Shopify over the Admin API',
  ],
};

/* ---------------------------------------------------------------- the book */

export const book = {
  title: 'The book that finishes itself',
  body:
    'In 2023 I started a printed catalogue in InDesign: one page per wine, laid out by hand. It was never ' +
    'finished — new wines arrived faster than pages did. The same layout is now a PDF export. Pick a selection ' +
    'or take everything, choose which price tier to print, and the book builds in minutes: cover, contents, a ' +
    'divider per producer, then a fact sheet per product using the same icons the print catalogue used.',
  pages: [
    { file: 'book-cover', label: 'Cover' },
    { file: 'book-contents', label: 'Contents' },
    { file: 'book-producer', label: 'Producer divider' },
    { file: 'book-sheet', label: 'Fact sheet' },
  ],
};
