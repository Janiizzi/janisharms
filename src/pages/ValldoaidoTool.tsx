import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import RevealOnView from '../components/RevealOnView';
import SeriesNav from '../components/valldoaido/SeriesNav';
import BrowserTilt from '../components/valldoaido/BrowserTilt';
import CountUpStat from '../components/valldoaido/CountUpStat';
import ScrollGlow from '../components/valldoaido/ScrollGlow';
import SyncDiagram from '../components/valldoaido/SyncDiagram';
import TiltOnScroll from '../components/valldoaido/TiltOnScroll';
import { intro, problem, findings, record, book } from '../data/valldoaidoTool';

const ACCENT = '#fa8220';

const ValldoaidoTool = () => {
  return (
    <div className="flex flex-col">
      <Helmet>
        <title>Vall'doAido back-office tool – Janis Harms</title>
        <meta
          name="description"
          content="A desktop tool that holds one product record for a wine merchant and syncs it to Bexio and Shopify: data integrity checks, a generated PDF catalogue and an image pipeline."
        />
        <link rel="canonical" href="https://janisharms.ch/projects/valldoaido/backoffice" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://janisharms.ch/projects/valldoaido/backoffice" />
        <meta property="og:title" content="Vall'doAido – Back-office tool" />
        <meta
          property="og:description"
          content="One product record, synced to Bexio and Shopify — with a catalogue that generates itself."
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
              <SeriesNav current="backoffice" accent={ACCENT} />
            </div>

            <RevealOnView className="mt-8">
              <h1 className="text-4xl font-bold text-primary-white md:text-5xl">{intro.title}</h1>
              <p className="mt-2 text-lg md:text-xl" style={{ color: ACCENT }}>
                {intro.subtitle}
              </p>
            </RevealOnView>

            <RevealOnView delayMs={100} className="mt-6 max-w-3xl text-lg leading-relaxed text-primary-grey">
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
          </div>
        </header>

        {/* ------------------------------------------------------------ Problem */}
        <section className="relative px-4 py-14 md:px-10 md:py-16">
          <div className="mx-auto max-w-5xl">
            <RevealOnView>
              <h2 className="text-2xl font-bold text-primary-white md:text-3xl">{problem.title}</h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-primary-grey">{problem.body}</p>
            </RevealOnView>

            <RevealOnView delayMs={100} className="mt-8">
              <SyncDiagram accent={ACCENT} />
            </RevealOnView>
          </div>
        </section>
      </ScrollGlow>

      {/* ----------------------------------------------------------- Findings */}
      {/* From md: up, breaks out of the max-w-5xl column so the image can
          bleed to the viewport edge. The left gutter track is sized to
          land at the same x as the centred max-w-5xl content elsewhere on
          the page: calc(50% - 512px) is (100% - 1024px) / 2. */}
      <section className="overflow-hidden px-4 py-14 md:px-0 md:py-16">
        <div className="md:grid md:grid-cols-[minmax(2.5rem,calc(50%_-_512px))_minmax(0,1fr)]">
          <div aria-hidden="true" className="hidden md:block" />

          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-8 md:pr-0">
            <div>
              <RevealOnView>
                <div className="text-xs uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
                  Data integrity
                </div>
                <h2 className="mt-2 text-2xl font-bold text-primary-white md:text-3xl">{findings.title}</h2>
                <p className="mt-3 max-w-md leading-relaxed text-primary-grey">{findings.body}</p>
              </RevealOnView>

              <RevealOnView delayMs={100} className="mt-8 max-w-md">
                <dl className="grid grid-cols-2 gap-x-8 gap-y-6">
                  {findings.stats.map(stat => (
                    <CountUpStat key={stat.label} value={stat.value} label={stat.label} />
                  ))}
                </dl>
              </RevealOnView>
            </div>

            <RevealOnView delayMs={160} className="min-w-0">
              <TiltOnScroll degrees={-18} settleDegrees={-8} perspective={1500}>
                <div className="overflow-hidden rounded-xl border border-primary-white/15 md:w-[155%]">
                  <img
                    src="/valldoaido/tool/ui-dashboard.webp"
                    alt="The tool's dashboard, with catalogue counters and a queue of data problems"
                    width={1183}
                    height={733}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full"
                  />
                </div>
              </TiltOnScroll>
            </RevealOnView>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- Record */}
      {/* Mirrors the Findings breakout: bleeds to the viewport's left edge
          instead of the right, with the text pinned to the same right-hand
          gutter the rest of the page uses. DOM order keeps text first (so
          mobile still reads text-then-image); md:order swaps them visually
          for the two-column layout. */}
      <section className="overflow-hidden px-4 py-14 md:px-0 md:py-16">
        <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(2.5rem,calc(50%_-_512px))]">
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-8">
            <RevealOnView className="min-w-0 md:order-2 md:ml-auto md:max-w-md md:text-right">
              <div className="text-xs uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
                The product record
              </div>
              <h2 className="mt-2 text-2xl font-bold text-primary-white md:text-3xl">{record.title}</h2>
              <p className="mt-3 leading-relaxed text-primary-grey">{record.body}</p>

              <ul className="mt-5 flex flex-col gap-3">
                {record.points.map(point => (
                  <li
                    key={point}
                    className="flex gap-3 text-sm leading-snug text-primary-grey md:flex-row-reverse"
                  >
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="mt-1 w-3 shrink-0 text-xs"
                      style={{ color: ACCENT }}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </RevealOnView>

            <RevealOnView delayMs={100} className="min-w-0 md:order-1">
              <TiltOnScroll degrees={18} settleDegrees={8} perspective={1500}>
                <figure className="overflow-hidden rounded-xl border border-primary-white/15 md:-ml-[55%] md:w-[155%]">
                  <img
                    src="/valldoaido/tool/ui-product.webp"
                    alt="A product record showing Bexio and Shopify fields side by side"
                    width={1460}
                    height={871}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full"
                  />
                </figure>
              </TiltOnScroll>
            </RevealOnView>
          </div>

          <div aria-hidden="true" className="hidden md:block" />
        </div>

        <div className="mx-auto mt-10 max-w-5xl md:px-10">
          <RevealOnView delayMs={160}>
            <BrowserTilt label="Vall'doAido Backoffice — Produkte">
              <img
                src="/valldoaido/tool/ui-products.webp"
                alt="The product list, filterable by producer, type, Bexio and Shopify state"
                width={1460}
                height={871}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
              <div className="border-t border-primary-white/10 bg-secondary-background/70 px-4 py-2 text-xs text-primary-grey">
                249 products in one list, filterable by producer, type and sync state — and exportable as a
                catalogue from the same screen.
              </div>
            </BrowserTilt>
          </RevealOnView>
        </div>
      </section>

      {/* --------------------------------------------------------------- Book */}
      <section className="px-4 py-14 md:px-10 md:py-16">
        <div className="mx-auto max-w-5xl">
          <RevealOnView>
            <div className="text-xs uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
              PDF export
            </div>
            <h2 className="mt-2 text-2xl font-bold text-primary-white md:text-3xl">{book.title}</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-primary-grey">{book.body}</p>
          </RevealOnView>

          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {book.pages.map((page, index) => (
              <RevealOnView key={page.file} delayMs={100 + index * 90}>
                <TiltOnScroll degrees={(index - (book.pages.length - 1) / 2) * 11} perspective={1300}>
                  <figure className="flex flex-col gap-2">
                    <div className="overflow-hidden rounded-lg border border-primary-white/15 bg-[#17130f]">
                      <img
                        src={`/valldoaido/tool/${page.file}.webp`}
                        alt={`Generated catalogue — ${page.label}`}
                        width={1100}
                        height={1556}
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-full"
                      />
                    </div>
                    <figcaption className="text-xs uppercase tracking-[0.14em] text-primary-grey">
                      {page.label}
                    </figcaption>
                  </figure>
                </TiltOnScroll>
              </RevealOnView>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- Outro */}
      <section className="px-4 pb-6 md:px-10">
        <div className="mx-auto max-w-5xl">
          <RevealOnView>
            <div className="flex flex-col items-start gap-5 rounded-2xl border border-primary-white/15 bg-secondary-background/70 p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <p className="max-w-xl leading-relaxed text-primary-grey">
                Three years, one fact sheet: typed by hand in InDesign, then turned into a schema for the shop,
                and now generated from a database that keeps three systems honest.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/projects/valldoaido"
                  className="rounded-lg px-4 py-2 font-semibold text-primary-background transition hover:brightness-110"
                  style={{ backgroundColor: ACCENT }}
                >
                  Where it started
                </Link>
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
    </div>
  );
};

export default ValldoaidoTool;
