import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import RevealOnView from '../components/RevealOnView';
import SeriesNav from '../components/valldoaido/SeriesNav';
import ScrollGlow from '../components/valldoaido/ScrollGlow';
import Lightbox, { type LightboxItem } from '../components/Lightbox';
import { intro, foundations, iconSystem, chapters, allWorks } from '../data/valldoaido';

/** The site's own accent (--primary). */
const ACCENT = '#fa8220';
/** The client's actual brand colour — only for showing the brand itself. */
const BRAND_COPPER = '#bf864f';

const lightboxItems: LightboxItem[] = allWorks.map(work => ({
  src: `/valldoaido/full/${work.slug}.webp`,
  title: work.title,
  caption: work.caption,
  meta: `${work.year} · ${work.medium}`,
}));

const indexOfSlug = (slug: string) => allWorks.findIndex(work => work.slug === slug);

const Valldoaido = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      <Helmet>
        <title>Vall'doAido – Branding case study – Janis Harms</title>
        <meta
          name="description"
          content="Three years of brand and print design for Vall'doAido, a Portuguese wine merchant in Switzerland: posters, a wine catalogue, seasonal tasting campaigns, packaging and signage."
        />
        <link rel="canonical" href="https://janisharms.ch/projects/valldoaido" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://janisharms.ch/projects/valldoaido" />
        <meta property="og:title" content="Vall'doAido – Branding for a local business" />
        <meta
          property="og:description"
          content="Three years of brand and print design for a Portuguese wine merchant in Switzerland."
        />
        <meta property="og:image" content="https://janisharms.ch/valldoaido/og-valldoaido.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Vall'doAido – flyer, catalogue page and campaign poster" />
      </Helmet>

      {/* ---------------------------------------------------------------- Hero */}
      <ScrollGlow accent={ACCENT}>
        <header className="relative px-4 pt-6 pb-14 md:px-10 md:pt-10 md:pb-20">
        <div className="relative mx-auto max-w-5xl">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-primary-grey transition hover:text-primary"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
            All projects
          </Link>

          <div className="mt-6">
            <SeriesNav current="branding" accent={ACCENT} />
          </div>

          <RevealOnView className="mt-8 flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div
              className="flex w-full max-w-[280px] items-center justify-center rounded-2xl px-8 py-7 shrink-0"
              style={{ backgroundColor: BRAND_COPPER }}
            >
              <img
                src="/valldoaido/logo-white.png"
                alt="Vall'doAido logo"
                width={900}
                height={261}
                className="w-full"
              />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-primary-white md:text-5xl">{intro.title}</h1>
              <p className="mt-2 text-lg md:text-xl" style={{ color: ACCENT }}>
                {intro.subtitle}
              </p>
            </div>
          </RevealOnView>

          <RevealOnView delayMs={100} className="mt-8 max-w-3xl text-lg leading-relaxed text-primary-grey">
            {intro.lede}
          </RevealOnView>

          <RevealOnView delayMs={160} className="mt-10">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-primary-white/10 pt-8 md:grid-cols-4">
              {intro.facts.map(fact => (
                <div key={fact.label}>
                  <dt className="text-xs uppercase tracking-[0.16em] text-primary-grey">{fact.label}</dt>
                  <dd className="mt-1 text-sm font-medium text-primary-white md:text-base">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </RevealOnView>

          <RevealOnView delayMs={220} className="mt-8">
            <a
              href={intro.clientUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-primary-background transition hover:brightness-110"
              style={{ backgroundColor: ACCENT }}
            >
              Visit valldoaido.ch
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
            </a>
          </RevealOnView>
        </div>
      </header>

      {/* -------------------------------------------------------- Foundations */}
      <section className="relative px-4 py-14 md:px-10 md:py-16">
        <div className="mx-auto max-w-5xl">
          <RevealOnView>
            <h2 className="text-2xl font-bold text-primary-white md:text-3xl">{foundations.title}</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-primary-grey">{foundations.body}</p>
          </RevealOnView>

          <RevealOnView delayMs={100} className="mt-8">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {foundations.palette.map(swatch => (
                <div
                  key={swatch.hex}
                  className="rounded-xl border border-primary-white/15 bg-secondary-background/70 p-3"
                >
                  <div
                    className="h-16 w-full rounded-lg border border-primary-white/10"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <div className="mt-3 text-sm font-semibold text-primary-white">{swatch.name}</div>
                  <div className="font-mono text-xs text-primary-grey">{swatch.hex}</div>
                  <div className="mt-1 text-xs leading-snug text-primary-grey/80">{swatch.note}</div>
                </div>
              ))}
            </div>
          </RevealOnView>

          <RevealOnView delayMs={160} className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {foundations.typography.map(font => (
                <div
                  key={font.name}
                  className="flex flex-col rounded-xl border border-primary-white/15 bg-secondary-background/70 p-5"
                >
                  <div className="text-xs uppercase tracking-[0.16em] text-primary-grey">{font.role}</div>
                  <div className="mt-2 text-xl font-semibold text-primary-white">{font.name}</div>
                  {/* Set in the face it names, so the card is its own specimen. */}
                  <div
                    className="mt-4 text-2xl leading-snug md:text-3xl"
                    style={{ color: ACCENT, fontFamily: font.fontFamily }}
                  >
                    {font.sample}
                  </div>
                  <div className="mt-auto pt-4 text-xs leading-snug text-primary-grey/80">{font.note}</div>
                </div>
              ))}
            </div>
          </RevealOnView>
        </div>
      </section>
      </ScrollGlow>

      {/* --------------------------------------------------------- Icon system */}
      <section className="px-4 py-14 md:px-10 md:py-16">
        <div className="mx-auto max-w-5xl">
          <RevealOnView>
            <h2 className="text-2xl font-bold text-primary-white md:text-3xl">{iconSystem.title}</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-primary-grey">{iconSystem.body}</p>
          </RevealOnView>

          <RevealOnView delayMs={100} className="mt-8">
            <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {iconSystem.icons.map(icon => (
                <li
                  key={icon.file}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-primary-white/15 bg-secondary-background/70 px-2 py-4 transition hover:border-primary-white/30"
                >
                  <img
                    src={`/valldoaido/icons/${icon.file}.svg`}
                    alt=""
                    aria-hidden="true"
                    width={44}
                    height={44}
                    loading="lazy"
                    className="h-11 w-11 transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="text-center text-xs leading-tight text-primary-grey">{icon.label}</span>
                </li>
              ))}
            </ul>
          </RevealOnView>
        </div>
      </section>

      {/* ------------------------------------------------------------ Chapters */}
      {chapters.map(chapter => (
        <section key={chapter.id} id={chapter.id} className="px-4 py-14 md:px-10 md:py-16">
          <div className="mx-auto max-w-5xl">
            <RevealOnView>
              <div className="text-xs uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
                {chapter.eyebrow}
              </div>
              <h2 className="mt-2 text-2xl font-bold text-primary-white md:text-3xl">{chapter.title}</h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-primary-grey">{chapter.body}</p>
            </RevealOnView>

            {/* grid-flow-dense lets a following portrait piece fill the hole a
                two-column landscape piece would otherwise leave behind. */}
            <div className="mt-8 grid grid-flow-row-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {chapter.works.map(work => (
                <button
                  key={work.slug}
                  type="button"
                  onClick={() => setOpenIndex(indexOfSlug(work.slug))}
                  aria-label={`Open ${work.title}`}
                  className={`group flex flex-col overflow-hidden rounded-xl border border-primary-white/15 bg-secondary-background/70 text-left transition hover:border-primary-white/35 cursor-pointer ${
                    work.wide ? 'sm:col-span-2' : ''
                  }`}
                >
                  {/* Contained on a plinth so posters, banners and labels
                      can share one grid without anything being cropped. A wide
                      piece keeps roughly the same card height over two columns. */}
                  <div
                    className={`relative flex items-center justify-center overflow-hidden bg-[#17130f] p-4 ${
                      work.wide ? 'aspect-[41/25]' : 'aspect-[4/5]'
                    }`}
                  >
                    <img
                      src={`/valldoaido/thumb/${work.slug}.webp`}
                      alt={work.title}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain shadow-lg shadow-black/40 transition-transform duration-500 group-hover:scale-[1.04]"
                      style={{ aspectRatio: work.ratio }}
                    />
                  </div>
                  <div className="px-4 py-3">
                    <div className="text-sm font-semibold text-primary-white">{work.title}</div>
                    <div className="mt-0.5 text-xs uppercase tracking-[0.14em] text-primary-grey">
                      {work.year} · {work.medium}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ---------------------------------------------------------------- Outro */}
      <section className="px-4 pb-6 md:px-10">
        <div className="mx-auto max-w-5xl">
          <RevealOnView>
            <div className="flex flex-col items-start gap-5 rounded-2xl border border-primary-white/15 bg-secondary-background/70 p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <p className="max-w-xl leading-relaxed text-primary-grey">
                The work continues — every season brings another campaign. The shop itself is the best place to see
                the system in use.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={intro.clientUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg px-4 py-2 font-semibold text-primary-background transition hover:brightness-110"
                  style={{ backgroundColor: ACCENT }}
                >
                  valldoaido.ch
                </a>
                <Link
                  to="/projects"
                  className="rounded-lg border border-primary-white/25 px-4 py-2 font-semibold text-primary-white transition hover:border-primary hover:text-primary"
                >
                  More projects
                </Link>
              </div>
            </div>
          </RevealOnView>
        </div>
      </section>

      <Lightbox
        items={lightboxItems}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </div>
  );
};

export default Valldoaido;
