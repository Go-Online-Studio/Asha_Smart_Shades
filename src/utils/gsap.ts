import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { SplitText } from 'gsap/SplitText';

// Explicitly register all official GSAP plugins used across the application
gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin, SplitText);

// Configure ScrollTrigger defaults for smooth architectural feel
ScrollTrigger.config({
  ignoreMobileResize: true,
});

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

/**
 * Wait for document fonts and all images within a container (or document)
 * before triggering ScrollTrigger.refresh() so pin spacers and scrub distances
 * are calculated with exact dimensions.
 */
export function refreshAfterAssetsLoaded(scope: Document | HTMLElement = document): () => void {
  let cancelled = false;

  const triggerRefresh = () => {
    if (cancelled) return;
    ScrollTrigger.refresh();
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
    const id = requestAnimationFrame(triggerRefresh);
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
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
