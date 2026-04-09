import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop - automatically scrolls to top on route change
 * unless it's a POP action (back button)
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top unconditionally on pathname change when no hash is present
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
