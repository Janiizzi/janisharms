import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import RevealOnView from '../components/RevealOnView';
import SeriesNav from '../components/valldoaido/SeriesNav';
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
      <section className="px-4 py-14 md:px-10 md:py-16">
        <div className="mx-auto max-w-5xl">
          <RevealOnView>
            <div className="text-xs uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
              Data integrity
            </div>
            <h2 className="mt-2 text-2xl font-bold text-primary-white md:text-3xl">{findings.title}</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-primary-grey">{findings.body}</p>
          </RevealOnView>

          <RevealOnView delayMs={100} className="mt-8">
            <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {findings.stats.map(stat => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <div className="text-2xl font-bold text-primary-white md:text-3xl">{stat.value}</div>
                    <div className="mt-1 text-xs leading-snug text-primary-grey">{stat.label}</div>
                  </dd>
                </div>
              ))}
            </dl>
          </RevealOnView>

          <RevealOnView delayMs={140} className="mt-10">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {findings.queue.map(item => (
                <div
                  key={item.label}
                  className="flex items-baseline gap-3 rounded-xl border-l-2 bg-secondary-background/50 px-4 py-3"
                  style={{ borderColor: ACCENT }}
                >
                  <span className="text-lg font-bold" style={{ color: ACCENT }}>
                    {item.value}
                  </span>
                  <span className="text-sm leading-snug text-primary-grey">{item.label}</span>
                </div>
              ))}
            </div>
          </RevealOnView>

          <RevealOnView delayMs={220} className="mt-10">
            <TiltOnScroll degrees={-12} perspective={1500}>
              <figure className="overflow-hidden rounded-xl border border-primary-white/15">
                <img
                  src="/valldoaido/tool/ui-dashboard.webp"
                  alt="The tool's dashboard, with catalogue counters and a queue of data problems"
                  width={1460}
                  height={860}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
              </figure>
            </TiltOnScroll>
          </RevealOnView>
        </div>
      </section>

      {/* ------------------------------------------------------------- Record */}
      <section className="px-4 py-14 md:px-10 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
            <RevealOnView className="min-w-0">
              <div className="text-xs uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
                The product record
              </div>
              <h2 className="mt-2 text-2xl font-bold text-primary-white md:text-3xl">{record.title}</h2>
              <p className="mt-3 leading-relaxed text-primary-grey">{record.body}</p>

              <ul className="mt-5 flex flex-col gap-3">
                {record.points.map(point => (
                  <li key={point} className="flex gap-3 text-sm leading-snug text-primary-grey">
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

            <RevealOnView delayMs={100} className="min-w-0">
              <TiltOnScroll degrees={12} perspective={1400}>
                <figure className="overflow-hidden rounded-xl border border-primary-white/15">
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

          <RevealOnView delayMs={160} className="mt-10">
            <TiltOnScroll degrees={-10} perspective={1600}>
              <figure className="overflow-hidden rounded-xl border border-primary-white/15">
                <img
                  src="/valldoaido/tool/ui-products.webp"
                  alt="The product list, filterable by producer, type, Bexio and Shopify state"
                  width={1460}
                  height={871}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
                <figcaption className="border-t border-primary-white/10 bg-secondary-background/70 px-4 py-2 text-xs text-primary-grey">
                  249 products in one list, filterable by producer, type and sync state — and exportable as a
                  catalogue from the same screen.
                </figcaption>
              </figure>
            </TiltOnScroll>
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

          <RevealOnView delayMs={100} className="mt-8">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {book.pages.map(page => (
                <figure key={page.file} className="flex flex-col gap-2">
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
              ))}
            </div>
          </RevealOnView>
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
