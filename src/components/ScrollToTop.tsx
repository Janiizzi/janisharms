import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router keeps the scroll position when the route changes, which lands
 * visitors in the middle of a long page. Hash links keep their own behaviour.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
