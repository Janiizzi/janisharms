import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import RevealOnView from '../components/RevealOnView';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center mt-16 md:mt-24 mx-4 mb-16'>
      <Helmet>
        <title>404 – Janis Harms</title>
      </Helmet>

      <RevealOnView className='text-8xl md:text-9xl font-bold text-primary-white/10 select-none'>
        404
      </RevealOnView>

      <RevealOnView className='text-3xl md:text-4xl font-bold text-primary-white -mt-6 md:-mt-8' delayMs={60}>
        Page not found
      </RevealOnView>

      <RevealOnView className='text-primary-grey text-lg font-normal mt-3 max-w-md' delayMs={120}>
        The page you're looking for doesn't exist or has been moved.
      </RevealOnView>

      <RevealOnView delayMs={180}>
        <Link
          to='/'
          className='mt-8 inline-flex items-center justify-center rounded-lg border border-primary-white/20 bg-secondary-background/70 px-6 py-3 font-semibold text-primary-white transition hover:border-primary-white/40 hover:bg-secondary-background'
        >
          ← Back to Home
        </Link>
      </RevealOnView>
    </div>
  );
};

export default NotFound;
