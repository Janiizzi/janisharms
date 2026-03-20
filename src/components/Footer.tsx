import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

const socialLinks = [
  {
    href: 'https://github.com/Janiizzi',
    icon: faGithub,
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/janis-harms-689446187/',
    icon: faLinkedin,
    label: 'LinkedIn',
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-primary-white/10 mt-16">
      <div className="mx-auto max-w-5xl px-6 md:px-10 py-10 flex flex-col gap-8">

        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Brand */}
          <a href="/" className="text-lg font-semibold text-primary-white tracking-wide">
            <img src="/favicon.svg" alt="Logo Janis Harms" className="h-8 w-8" />
          </a>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-sm text-primary-grey hover:text-primary transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex gap-4">
            {socialLinks.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-primary-grey hover:text-primary transition-colors duration-200 text-lg"
              >
                <FontAwesomeIcon icon={icon} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-white/10" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-primary-grey">
          <span>© {year} Janis Harms. All rights reserved.</span>
          <Link to="/privacy" className="hover:text-primary transition-colors duration-200">Privacy Policy</Link>
          <span>Built with Love &amp; study procrastination</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
