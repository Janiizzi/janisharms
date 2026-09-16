/**
 * Content model for the Vall'doAido case study page (/projects/valldoaido).
 *
 * Everything the page renders lives here, so the copy can be extended or
 * rewritten without touching the layout. Images are served from
 * /public/valldoaido — every `slug` needs a `thumb/<slug>.webp` and a
 * `full/<slug>.webp`.
 */

export interface Work {
  /** Matches the file name in /valldoaido/thumb and /valldoaido/full */
  slug: string;
  title: string;
  /** Short line shown under the title in the lightbox. Optional. */
  caption?: string;
  year: string;
  /** Medium / format, e.g. "Print – A4" */
  medium: string;
  /** Aspect ratio of the source file, used to reserve layout space. */
  ratio: number;
  /**
   * Gives the piece two grid columns instead of one. Set it on anything in
   * landscape format (roughly ratio >= 1.3) — banners, folded cards, the
   * billboard — which would otherwise be shrunk into a portrait-shaped card.
   */
  wide?: boolean;
}

export interface Chapter {
  id: string;
  eyebrow: string;
  title: string;
  /** Intro paragraph. Extend freely — the layout wraps at any length. */
  body: string;
  works: Work[];
}

export const intro = {
  client: "Vall'doAido GmbH",
  clientUrl: 'https://valldoaido.ch',
  title: "Vall'doAido",
  subtitle: 'Branding for a local business',
  lede:
    "Vall'doAido imports Portuguese wine, port, craft beer and chestnuts to a small town in Solothurn, Switzerland. " +
    'Since the store opened in 2023 I have designed nearly everything the customer sees — from the poster that ' +
    'announced the opening to the seasonal tasting campaigns that now repeat twice a year.',
  facts: [
    { label: 'Role', value: 'Graphic & brand design' },
    { label: 'Period', value: '2023 – today' },
    { label: 'Scope', value: 'Print, packaging, signage, social, e-mail' },
    { label: 'Tools', value: 'Illustrator, InDesign, Photoshop' },
  ],
};

/**
 * The core logo and identity manual were made by Sanzza Creative Agency
 * before the store opened. Everything below is the applied system built on
 * top of it.
 */
export const foundations = {
  title: 'Working inside an existing identity',
  body:
    'The logo, the copper tone and the typefaces came out of a brand manual that existed before the first shop ' +
    'day — the wordmark is set in G2 Ciao, and the manual names Tenor Sans for display work. My job was the ' +
    'other ninety percent: turning a few pages of rules into a system that survives a price tag, an A4 poster, ' +
    'a beer coaster and a Shopify banner — and still reads as one brand three years later.',
  palette: [
    { name: 'Copper', hex: '#BF864F', note: 'Pantone 4026 C · the one brand colour' },
    { name: 'Terracotta', hex: '#B5763F', note: 'Print-warm variant used on large areas' },
    { name: 'Linen', hex: '#EBE5D7', note: 'The background of almost every layout' },
    { name: 'Cream', hex: '#F6EFE2', note: 'Lighter ground for recipe cards' },
    { name: 'Ink', hex: '#1A1A1A', note: 'Body copy and the mono logo lock-up' },
  ],
  /**
   * `fontFamily` is what the specimen on the page is actually set in, so the
   * card shows the face it names. G2 Ciao (the wordmark) is a licensed font
   * that isn't served here — the logo image is its only appearance.
   */
  typography: [
    {
      name: 'Tenor Sans',
      role: 'Display & headlines',
      sample: 'WEINDEGUSTATION',
      note: 'Set wide and airy on posters, banners and the recipe cards.',
      fontFamily: "'Tenor Sans', Georgia, serif",
    },
    {
      name: 'Roboto',
      role: 'Body copy, data sheets, price lists',
      sample: 'Rubinrote Farbe, komplex und elegant.',
      note: 'Light, Regular and Bold — the workhorse behind almost every layout.',
      fontFamily: "'Roboto', 'Helvetica Neue', Arial, sans-serif",
    },
  ],
};

export const iconSystem = {
  title: 'An icon set for the data sheets',
  body:
    'Every wine in the catalogue is described with the same eight facts — origin, grapes, tasting notes, ' +
    'vinification, food pairing, technical data, serving temperature, producer. I drew one line-icon per fact so ' +
    'a customer can scan a sheet without reading it, and reused the same set on the website and the shelf labels.',
  /** File names in /valldoaido/icons — label is what visitors read. */
  icons: [
    { file: 'denominacao', label: 'Origin' },
    { file: 'castas', label: 'Grape varieties' },
    { file: 'notas-de-prova', label: 'Tasting notes' },
    { file: 'vinificacao', label: 'Vinification' },
    { file: 'gastronomia', label: 'Food pairing' },
    { file: 'alcool', label: 'Alcohol' },
    { file: 'conservacao-e-servico', label: 'Serving' },
    { file: 'produtor', label: 'Producer' },
    { file: 'enologo', label: 'Oenologist' },
    { file: 'solos', label: 'Soil' },
    { file: 'producao', label: 'Production' },
    { file: 'castanhas', label: 'Chestnuts' },
    { file: 'cerveja-artesanal', label: 'Craft beer' },
    { file: 'cabazes', label: 'Gift baskets' },
    { file: 'entregas', label: 'Delivery' },
    { file: 'devolucoes', label: 'Returns' },
    { file: 'pagamento-seguro', label: 'Secure payment' },
    { file: 'lancamento', label: 'New release' },
  ],
};

export const chapters: Chapter[] = [
  {
    id: 'opening',
    eyebrow: '2023',
    title: 'Opening a store',
    body:
      'The first job was the loudest one: tell a village of 3,000 people that a Portuguese wine merchant had ' +
      'moved in. One poster, one flyer, and the physical pieces that had to be right on day one — ' +
      'the sign above the door, the banner at the entrance, the price tags on the shelf.',
    works: [
      {
        slug: 'store-opening-poster',
        title: 'Store opening poster',
        caption: 'A4, printed and posted around Oberbuchsiten. The copper brush stroke became the recurring device for the first year.',
        year: '2023',
        medium: 'Print · A4',
        ratio: 1273 / 1800,
      },
      {
        slug: 'store-opening-flyer',
        title: 'Opening flyer',
        caption: 'Photographed in the half-built store, with the four founding producers along the bottom edge.',
        year: '2023',
        medium: 'Print · A5 flyer',
        ratio: 596 / 842,
      },
      {
        slug: 'store-sign',
        title: 'Shop sign',
        caption: 'Panel above the entrance, pointing first-time visitors to the showroom on the upper floor.',
        year: '2023',
        medium: 'Signage',
        ratio: 1800 / 755,
        wide: false,
      },
      {
        slug: 'entrance-banner',
        title: 'Entrance banner',
        caption: 'Roll-up at the door with opening hours and the QR code to the shop.',
        year: '2023',
        medium: 'Print · roll-up',
        ratio: 575 / 1800,
      },
      {
        slug: 'price-tag',
        title: 'Shelf price tags',
        caption: 'A small set of tags for promotions, built so the staff can fill them in without a designer.',
        year: '2023',
        medium: 'Print · shelf',
        ratio: 1800 / 1273,
        wide: true,
      },
    ],
  },
  {
    id: 'catalogue',
    eyebrow: '2024',
    title: 'The catalogue',
    body:
      'Restaurants kept asking for something they could keep. The answer was a printed catalogue: one page per ' +
      'wine, always the same grid, the bottle on the left and eight facts on the right. Producing it meant ' +
      'standardising the data first — the layout only works because every wine was described the same way.',
    works: [
      {
        slug: 'catalogue-datasheet',
        title: 'Catalogue — wine page',
        caption: 'The page that repeats 40 times. Icons carry the structure so the eye can jump straight to serving temperature.',
        year: '2024',
        medium: 'Print · A4, perfect bound',
        ratio: 1273 / 1800,
      },
      {
        slug: 'catalogue-welcome',
        title: 'Catalogue — welcome page',
        caption: 'Paulo\'s letter opens the book in Portuguese and German, before a single wine is shown.',
        year: '2024',
        medium: 'Print · A4',
        ratio: 1273 / 1800,
      },
      {
        slug: 'tasting-sheet',
        title: 'Tasting plan',
        caption: 'Handed out at the door of every tasting: what is being poured, in which order, and where to find it afterwards.',
        year: '2024',
        medium: 'Print · A5',
        ratio: 1268 / 1800,
      },
    ],
  },
  {
    id: 'tastings',
    eyebrow: '2024 – 2026',
    title: 'The same campaign, five times',
    body:
      'Twice a year the store runs a tasting weekend, and every time it needs a flyer, a website banner, a mailed ' +
      'invitation and something to put on the table. Rather than redesigning it each season I built one campaign ' +
      'skeleton and change only the seasonal layer — grapes in summer, watercolour flowers in spring, colour ' +
      'fields in 2026. Three years of it side by side is the part of this project I am most attached to.',
    works: [
      {
        slug: 'tasting-post-2024',
        title: 'Summer tasting — announcement',
        caption: 'Grapes shot flat on the linen background, cropped to a hard edge.',
        year: '2024',
        medium: 'Social · 4:5',
        ratio: 1440 / 1800,
      },
      {
        slug: 'tasting-story-2024',
        title: 'Summer tasting — story',
        caption: 'Vertical cut of the same campaign, built to be read in two seconds.',
        year: '2024',
        medium: 'Social · 9:16',
        ratio: 1013 / 1800,
      },
      {
        slug: 'tasting-banner-2024',
        title: 'Summer tasting — shop banner',
        caption: 'Website header. The copper circles hold the headline steady while the seasonal imagery changes around it.',
        year: '2024',
        medium: 'Web · Shopify header',
        ratio: 1800 / 722,
        wide: true,
      },
      {
        slug: 'invitation-outside-2024',
        title: 'Personal invitation — outside',
        caption: 'Folded card mailed to regulars, with the QR code sitting inside the copper field.',
        year: '2024',
        medium: 'Print · folded card',
        ratio: 1800 / 651,
        wide: true,
      },
      {
        slug: 'invitation-inside-2024',
        title: 'Personal invitation — inside',
        caption: 'Producer logos, the details, and a photo of Paulo behind the counter.',
        year: '2024',
        medium: 'Print · folded card',
        ratio: 1800 / 651,
        wide: true,
      },
      {
        slug: 'coaster-2024',
        title: 'Invitation coaster',
        caption: 'The invitation printed on a beer mat and left on the tables of two local restaurants.',
        year: '2024',
        medium: 'Print · Ø 107 mm',
        ratio: 1799 / 1800,
      },
      {
        slug: 'tasting-flyer-2025',
        title: 'Spring tasting — flyer',
        caption: 'Same grid as the summer edition, with watercolour flowers taking the place of the grapes.',
        year: '2025',
        medium: 'Print · A5',
        ratio: 1284 / 1800,
      },
      {
        slug: 'tasting-banner-2025',
        title: 'Spring tasting — shop banner',
        caption: 'The banner one season later. Structure identical, mood completely different.',
        year: '2025',
        medium: 'Web · Shopify header',
        ratio: 1800 / 722,
        wide: true,
      },
      {
        slug: 'invitation-2025',
        title: 'Spring invitation',
        caption: 'The mailed card for the 2025 edition.',
        year: '2025',
        medium: 'Print · folded card',
        ratio: 1800 / 651,
        wide: true,
      },
      {
        slug: 'coaster-2025',
        title: 'Winter tasting coaster',
        caption: 'Winter edition — logo, sparkles, and a competition QR on the reverse.',
        year: '2025',
        medium: 'Print · Ø 107 mm',
        ratio: 1335 / 1336,
      },
      {
        slug: 'tasting-flyer-2026',
        title: 'Spring tasting 2026 — flyer',
        caption: 'The 2026 redesign drops photography for flat colour fields. Less seasonal decoration, more brand.',
        year: '2026',
        medium: 'Print · A5',
        ratio: 1284 / 1800,
      },
      {
        slug: 'tasting-invite-2026',
        title: 'Spring tasting 2026 — invitation',
        caption: 'Matching invitation. The copper, green and sand fields carry the season on their own.',
        year: '2026',
        medium: 'Print · A5',
        ratio: 1283 / 1800,
      },
    ],
  },
  {
    id: 'seasons',
    eyebrow: '2023 – 2025',
    title: 'Shelf, season and everything else',
    body:
      'The rest is the everyday work that keeps a small shop visible: roasted chestnuts in November, a sangria ' +
      'recipe in July, a thank-you card in every parcel, a billboard at the village shooting festival. Small ' +
      'pieces, short deadlines — and the place where a design system actually earns its keep.',
    works: [
      {
        slug: 'chestnut-window',
        title: 'Chestnut window film',
        caption: 'Shop window in autumn. Chestnuts are the second business, and for six weeks a year they are the first.',
        year: '2023',
        medium: 'Print · window film',
        ratio: 1800 / 1350,
        wide: true,
      },
      {
        slug: 'chestnut-recipe',
        title: 'How to roast chestnuts',
        caption: 'Slipped into every chestnut order, because most Swiss customers have never roasted them at home.',
        year: '2023',
        medium: 'Print · A5',
        ratio: 1240 / 874,
        wide: true,
      },
      {
        slug: 'chestnut-flyer',
        title: 'Chestnut order flyer',
        caption: 'Distributed in the neighbouring town with a QR straight to the order form.',
        year: '2023',
        medium: 'Print · A5',
        ratio: 1268 / 1800,
      },
      {
        slug: 'olive-oil-label',
        title: 'Olive oil label',
        caption: 'Label for the own-import olive oil — the one piece that leaves the copper palette on purpose.',
        year: '2023',
        medium: 'Packaging · label',
        ratio: 1241 / 1749,
      },
      {
        slug: 'sangria-recipe',
        title: 'Sangria recipe card',
        caption: 'A summer recipe that sells two products at once. Printed as a card and posted as a square.',
        year: '2024',
        medium: 'Print & social · 1:1',
        ratio: 1,
      },
      {
        slug: 'porto-tonico',
        title: 'Porto Tónico card',
        caption: 'White port and tonic — the drink that convinces people port is not only for Christmas.',
        year: '2025',
        medium: 'Print · A5',
        ratio: 1268 / 1800,
      },
      {
        slug: 'thank-you-card',
        title: 'Thank-you card',
        caption: 'Goes into every shipped order, with a QR code asking for a review.',
        year: '2024',
        medium: 'Print · A6',
        ratio: 1800 / 1283,
        wide: true,
      },
      {
        slug: 'product-grid',
        title: 'Product grid post',
        caption: 'A repeatable template for introducing a producer — four bottles, one caption each.',
        year: '2024',
        medium: 'Social · 4:5',
        ratio: 1440 / 1800,
      },
      {
        slug: 'festival-billboard',
        title: 'Festival billboard',
        caption: 'Advertising panel at the regional shooting festival, read at fifteen metres.',
        year: '2024',
        medium: 'Print · billboard',
        ratio: 1524 / 497,
        wide: true,
      },
      {
        slug: 'black-friday',
        title: 'Black Friday newsletter',
        caption: 'The discount repeated as a pattern instead of a badge, so the bottles stay the subject.',
        year: '2025',
        medium: 'E-mail · 1:1',
        ratio: 1,
      },
      {
        slug: 'autumn-post',
        title: 'Autumn campaign post',
        caption: 'Port and chestnuts — the two things the shop is known for, in one image.',
        year: '2025',
        medium: 'Social · 9:16',
        ratio: 1013 / 1800,
      },
    ],
  },
];

export const allWorks: Work[] = chapters.flatMap(chapter => chapter.works);
