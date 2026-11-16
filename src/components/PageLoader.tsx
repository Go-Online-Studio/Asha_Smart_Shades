import React, { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { safeScrollTriggerRefresh } from '../utils/gsap';

export default function PageLoader() {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    safeScrollTriggerRefresh(50);
  }, [location.pathname]);

  return null;
}
