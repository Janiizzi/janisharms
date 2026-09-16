import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import RevealOnView from '../components/RevealOnView';
import SeriesNav from '../components/valldoaido/SeriesNav';
import SpecSheet from '../components/valldoaido/SpecSheet';
import DataAssembly from '../components/valldoaido/DataAssembly';
import BeforeAfter from '../components/valldoaido/BeforeAfter';
import ShopTilt from '../components/valldoaido/ShopTilt';
import TiltOnScroll from '../components/valldoaido/TiltOnScroll';
import AwardCardDemo from '../components/valldoaido/AwardCardDemo';
import {
  intro,
  problem,
  assembly,
  specSection,
  awardSection,
  shopTour,
} from '../data/valldoaidoShopify';

/** The site's own accent (--primary), not the client's brand colour. */
const ACCENT = '#fa8220';

const ValldoaidoShopify = () => {
  return (
    <div className="flex flex-col">
      <Helmet>
        <title>Vall'doAido Shopify theme – Janis Harms</title>
        <meta
          name="description"
          content="Rebuilding a Shopify wine shop around typed metafields and metaobjects: a product data model, a generated spec sheet, filterable producers and regions, and the award animation on the product card."
        />
        <link rel="canonical" href="https://janisharms.ch/projects/valldoaido/shopify" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://janisharms.ch/projects/valldoaido/shopify" />
        <meta property="og:title" content="Vall'doAido – Shopify theme" />
        <meta
          property="og:description"
          content="A wine shop rebuilt around its own data model: metafields, metaobjects and a product page that renders itself."
        />
        <meta property="og:image" content="https://janisharms.ch/valldoaido/og-valldoaido.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Vall'doAido – flyer, catalogue page and campaign poster" />
      </Helmet>

      {/* ---------------------------------------------------------------- Hero */}
      <header className="relative overflow-hidden px-4 pt-6 pb-14 md:px-10 md:pt-10 md:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full blur-[120px] opacity-25"
          style={{ background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)` }}
        />

        <div className="relative mx-auto max-w-5xl">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-primary-grey transition hover:text-primary"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
            All projects
          </Link>

          <div className="mt-6">
            <SeriesNav current="shopify" accent={ACCENT} />
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

          <RevealOnView delayMs={220} className="mt-8">
            <a
              href={intro.shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-primary-background transition hover:brightness-110"
              style={{ backgroundColor: ACCENT }}
            >
              Visit the shop
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
            </a>
          </RevealOnView>
        </div>
      </header>

      {/* ------------------------------------------------------------ Problem */}
      <section className="px-4 py-14 md:px-10 md:py-16">
        <div className="mx-auto max-w-5xl">
          <RevealOnView>
            <h2 className="text-2xl font-bold text-primary-white md:text-3xl">{problem.title}</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-primary-grey">{problem.body}</p>
          </RevealOnView>

          <div className="mt-10">
            <DataAssembly accent={ACCENT} />
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-primary-grey/80">
              {assembly.caption}
            </p>
          </div>

          <div className="mt-16">
            <BeforeAfter accent={ACCENT} />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Spec sheet */}
      <section id="spec-sheet" className="px-4 py-14 md:px-10 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
            <RevealOnView className="min-w-0">
              <div className="text-xs uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
                The product page
              </div>
              <h2 className="mt-2 text-2xl font-bold text-primary-white md:text-3xl">{specSection.title}</h2>
              <p className="mt-3 leading-relaxed text-primary-grey">{specSection.body}</p>
              <p className="mt-4 text-xs text-primary-grey/70">{specSection.note}</p>
            </RevealOnView>

            <RevealOnView delayMs={100} className="min-w-0">
              <TiltOnScroll degrees={-16}>
                <SpecSheet accent={ACCENT} />
              </TiltOnScroll>
            </RevealOnView>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Award animation */}
      <section id="awards" className="px-4 py-14 md:px-10 md:py-16">
        <div className="mx-auto max-w-5xl">
          <RevealOnView>
            <div className="text-xs uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
              Interaction
            </div>
            <h2 className="mt-2 text-2xl font-bold text-primary-white md:text-3xl">{awardSection.title}</h2>
          </RevealOnView>

          <RevealOnView delayMs={100} className="mt-6">
            <AwardCardDemo accent={ACCENT}>
              <p className="max-w-xl leading-relaxed text-primary-grey">{awardSection.body}</p>
              <p className="max-w-xl text-sm leading-relaxed text-primary-grey/70">{awardSection.note}</p>
            </AwardCardDemo>
          </RevealOnView>
        </div>
      </section>

      {/* ------------------------------------------------------------ The shop */}
      <section className="overflow-hidden px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl">
          <RevealOnView>
            <h2 className="text-2xl font-bold text-primary-white md:text-3xl">{shopTour.title}</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-primary-grey">{shopTour.body}</p>
          </RevealOnView>

          <div className="mt-12">
            <ShopTilt accent={ACCENT} />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Outro */}
      <section className="px-4 pb-6 md:px-10">
        <div className="mx-auto max-w-5xl">
          <RevealOnView>
            <div className="flex flex-col items-start gap-5 rounded-2xl border border-primary-white/15 bg-secondary-background/70 p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <p className="max-w-xl leading-relaxed text-primary-grey">
                The same eight facts started life as a hand-set page in an InDesign catalogue. Two years later
                they are a schema — and the printed book now generates itself.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/projects/valldoaido"
                  className="rounded-lg px-4 py-2 font-semibold text-primary-background transition hover:brightness-110"
                  style={{ backgroundColor: ACCENT }}
                >
                  The branding
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

export default ValldoaidoShopify;
