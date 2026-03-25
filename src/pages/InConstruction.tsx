import { Link } from 'react-router-dom';

type InConstructionProps = {
  title?: string;
  message?: string;
  backTo?: string;
  backLabel?: string;
};

const InConstruction = ({
  title = 'Under Construction',
  message = 'This section is being built right now. Check back soon for the finished experience.',
  backTo = '/',
  backLabel = 'Back to Home',
}: InConstructionProps) => {
  return (
    <section className="min-h-[72vh] px-6 py-16 md:px-10">
      <div className="mx-auto grid max-w-5xl items-center gap-10 rounded-3xl bg-primary-background p-8 md:grid-cols-2 md:p-12">
        <div>

          <h1 className="mt-5 text-4xl font-black uppercase tracking-[0.08em] text-primary-white md:text-5xl">
            {title}
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-primary-grey md:text-lg">
            {message}
          </p>

          <p className="mt-4 text-sm text-primary-light">
            The construction dino is supervising and occasionally roaring at the build pipeline.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to={backTo}
            className="rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-primary-white transition hover:scale-[1.03] hover:bg-primary-text"
          >
            {backLabel}
          </Link>
          <Link
            to="/contact"
            className="rounded-full border border-primary-white/25 px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-primary-white transition hover:border-primary hover:text-primary-light"
          >
            Contact
          </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[360px]">
          <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
          <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-secondary/20 blur-2xl" />

          <svg
            viewBox="0 0 380 320"
            className="relative w-full drop-shadow-[0_0_24px_rgba(250,130,32,0.25)]"
            role="img"
            aria-label="Funny construction dinosaur"
          >
            <rect x="42" y="286" width="296" height="12" rx="6" fill="#1f1f1f" />
            <ellipse cx="195" cy="292" rx="130" ry="12" fill="#0f0f0f" />

            <g>
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 0 -3; 0 0"
                dur="2.8s"
                repeatCount="indefinite"
              />

              <path d="M85 175 C80 120, 130 90, 190 98 C254 105, 302 145, 286 203 C272 253, 220 271, 160 260 C110 251, 90 218, 85 175 Z" fill="#2d2d2d" />
              <path d="M98 168 C96 132, 132 112, 178 118 C228 124, 264 151, 254 194 C246 227, 210 243, 166 236 C126 230, 103 206, 98 168 Z" fill="#3a3a3a" />

              <path d="M220 120 C255 98, 302 109, 318 141 C332 170, 315 201, 282 210 C249 219, 217 200, 208 171 C201 151, 205 130, 220 120 Z" fill="#3a3a3a" />
              <circle cx="286" cy="157" r="5" fill="#ffffff" />
              <circle cx="287" cy="157" r="2" fill="#090808">
                <animate attributeName="r" values="2;1.6;2" dur="2.2s" repeatCount="indefinite" />
              </circle>

              <rect x="220" y="106" width="88" height="16" rx="8" fill="#fa8220" />
              <rect x="247" y="85" width="34" height="26" rx="6" fill="#f6c143" />
              <rect x="252" y="90" width="24" height="7" rx="3" fill="#d19f2d" />

              <path d="M126 252 L149 252 L145 288 L122 288 Z" fill="#2b2b2b" />
              <path d="M179 257 L202 257 L199 288 L176 288 Z" fill="#2b2b2b" />
              <rect x="117" y="286" width="34" height="9" rx="4" fill="#fa8220" />
              <rect x="171" y="286" width="34" height="9" rx="4" fill="#fa8220" />

              <path d="M92 150 C64 144, 45 128, 40 108 C35 89, 44 73, 58 67" stroke="#3a3a3a" strokeWidth="16" strokeLinecap="round" fill="none" />

              <g>
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="-12 78 176; -6 78 176; -12 78 176"
                  dur="1.7s"
                  repeatCount="indefinite"
                />
                <rect x="70" y="82" width="12" height="98" rx="6" transform="rotate(-12 70 82)" fill="#8a8a8a" />
                <rect x="56" y="163" width="70" height="18" rx="9" transform="rotate(-12 56 163)" fill="#fa8220" />
              </g>
            </g>

            <text x="190" y="38" textAnchor="middle" fill="#fefcc6" fontSize="18" fontWeight="700" letterSpacing="1.2">
              RAWR... building in progress
            </text>
          </svg>

          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-primary-white/10">
            <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-primary via-secondary to-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InConstruction;