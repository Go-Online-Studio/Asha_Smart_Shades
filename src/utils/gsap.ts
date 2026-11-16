import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { SplitText } from 'gsap/SplitText';

// Explicitly register all official GSAP plugins used across the application
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin, SplitText);

  // Configure ScrollTrigger: ignore mobile address bar vertical resize events.
  // This prevents ScrollTrigger from recalculating pin-spacers and unpinning mid-scroll
  // when the mobile address bar expands/contracts, eliminating unpin glitches.
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

/**
 * Debounce utility (default 200ms) for window resize handlers
 * that recalculate dynamic layout metrics and refresh ScrollTrigger.
 */
export function debounce<T extends (...args: any[]) => void>(fn: T, delay = 200) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  const debounced = (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };
  return debounced;
}

let refreshTimeoutId: ReturnType<typeof setTimeout> | null = null;

/**
 * Coalesced, scroll-safe refresh utility.
 * Prevents multiple synchronous ScrollTrigger.refresh() calls from firing
 * repeatedly during page load or asset streaming, and defers refreshes if
 * the user is actively scrolling on touch screens to eliminate hitching/glitches.
 */
export function safeScrollTriggerRefresh(delay = 150) {
  if (typeof window === 'undefined') return;
  if (refreshTimeoutId) {
    clearTimeout(refreshTimeoutId);
  }
  refreshTimeoutId = setTimeout(() => {
    // If the user is actively scrolling with their finger, don't jerk the DOM;
    // wait until the scroll comes to rest.
    if (ScrollTrigger.isScrolling()) {
      ScrollTrigger.addEventListener('scrollEnd', () => ScrollTrigger.refresh(), { once: true });
    } else {
      ScrollTrigger.refresh();
    }
    refreshTimeoutId = null;
  }, delay);
}

/**
 * Wait for document fonts and all images within a container (or document)
 * before triggering a coalesced ScrollTrigger.refresh() so pin spacers and scrub distances
 * are calculated with exact dimensions without multiple interrupting reflows.
 */
export function refreshAfterAssetsLoaded(scope: Document | HTMLElement = document): () => void {
  let cancelled = false;

  const triggerRefresh = () => {
    if (cancelled) return;
    safeScrollTriggerRefresh(120);
  };

  // 1. Wait for web fonts
  if (typeof document !== 'undefined' && 'fonts' in document) {
    document.fonts.ready.then(() => {
      if (!cancelled) triggerRefresh();
    }).catch(() => {});
  }

  // 2. Wait for images in scope
  const images = Array.from(scope.querySelectorAll('img'));
  const pendingImages = images.filter((img) => !img.complete);

  if (pendingImages.length === 0) {
    triggerRefresh();
    return () => {
      cancelled = true;
    };
  }

  let loadedCount = 0;
  const onImageSettled = () => {
    loadedCount += 1;
    if (loadedCount >= pendingImages.length && !cancelled) {
      triggerRefresh();
    }
  };

  pendingImages.forEach((img) => {
    img.addEventListener('load', onImageSettled, { once: true });
    img.addEventListener('error', onImageSettled, { once: true });
  });

  return () => {
    cancelled = true;
    pendingImages.forEach((img) => {
      img.removeEventListener('load', onImageSettled);
      img.removeEventListener('error', onImageSettled);
    });
  };
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export { gsap, ScrollTrigger, Draggable, InertiaPlugin, SplitText };
