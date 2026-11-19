import React, { useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, MoveHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  debounce,
  prefersReducedMotion,
  refreshAfterAssetsLoaded,
  safeScrollTriggerRefresh,
} from '../utils/gsap';

// Explicitly register plugin at module load
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const categories = [
  {
    title: 'Retractable Awnings',
    image: '/images/homeProductDesc2.webp',
    desktopImage: '/images/homeProductDesc2.webp',
    mobileImage: '/images/homeProductDescMob2.avif',
    link: '/products/retractable-awnings',
  },
  {
    title: 'Glazed & Fabric Canopies',
    image: '/images/homeProductDesc3.webp',
    desktopImage: '/images/homeProductDesc3.webp',
    mobileImage: '/images/homeProductDescMob3.avif',
    link: '/products/glazed-canopies',
  },
  {
    title: 'Gazebos & Umbrellas',
    image: '/images/homeProductDesc1.webp',
    desktopImage: '/images/homeProductDesc1.webp',
    mobileImage: '/images/homeProductDescMob1.avif',
    link: '/products/gazebos-umbrellas',
  },
  {
    title: 'Tensile Membranes',
    image: '/images/homeProductDesc4.webp',
    desktopImage: '/images/homeProductDesc4.webp',
    mobileImage: '/images/homeProductDescMob4.avif',
    link: '/products/tensile-membranes',
  },
];

export default function ExploreProducts() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const indexBadgeRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const stRef = useRef<ScrollTrigger | null>(null);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!wrapper || !section || !track) return;

    if (prefersReducedMotion()) {
      return;
    }

    const totalSlides = categories.length;

    // Use gsap.matchMedia scoped to wrapperRef for responsive adaptations and 100% clean teardown
    const mm = gsap.matchMedia(wrapper);

    // Responsive rule covering both desktop and mobile viewports
    mm.add(
      {
        isDesktop: '(min-width: 768px)',
        isMobile: '(max-width: 767px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { reduceMotion } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
          reduceMotion: boolean;
        };

        if (reduceMotion) return;

        // Dynamic function-based scroll distance calculation
        const getScrollDistance = () => {
          return Math.max(0, track.scrollWidth - section.offsetWidth);
        };

        // Touch devices have native physical momentum. Adding an artificial
        // 0.5s scrub lag on mobile causes the animation to lag behind the finger,
        // which creates an unpinning collision and visual glitch when scrolling past the pin.
        // On touch screens, scrub: true keeps it 1:1 with native scroll momentum.
        const isTouchDevice =
          ScrollTrigger.isTouch === 1 ||
          (typeof window !== 'undefined' &&
            ('ontouchstart' in window || navigator.maxTouchPoints > 0));

        const horizontalTween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          force3D: true, // Forces persistent GPU compositing layer on WebKit
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: isTouchDevice ? true : 0.5,
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
            invalidateOnRefresh: true, // Recalculates on iPhone rotation and window resize
            anticipatePin: 0, // Prevents premature locking glitch when scrolling into view
            onUpdate: (self) => {
              // Direct GPU transform update for progress bar (zero React re-render latency)
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${Math.max(0.08, self.progress)})`;
              }

              const currentIdx = Math.min(
                totalSlides - 1,
                Math.max(0, Math.round(self.progress * (totalSlides - 1)))
              );

              if (currentIdx !== activeIndexRef.current) {
                activeIndexRef.current = currentIdx;
                if (indexBadgeRef.current) {
                  indexBadgeRef.current.textContent = `0${currentIdx + 1} / 0${totalSlides}`;
                }
                setActiveIndex(currentIdx);
              }
            },
          },
        });

        stRef.current = horizontalTween.scrollTrigger || null;
      }
    );

    // Initial safe refresh after microtask layout
    safeScrollTriggerRefresh(60);

    // Refresh after fonts and images finish loading via coalesced handler
    const cleanupAssets = refreshAfterAssetsLoaded(section);

    const handleResize = debounce(() => {
      safeScrollTriggerRefresh(150);
    }, 200);

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      handleResize.cancel();
      cleanupAssets();
      mm.revert(); // Automatically reverts all ScrollTriggers and tweens cleanly
    };
  }, []);

  const jumpToSlide = (idx: number) => {
    const st = stRef.current;
    if (st && !prefersReducedMotion()) {
      const targetProgress = idx / Math.max(1, categories.length - 1);
      const targetScroll = st.start + (st.end - st.start) * targetProgress;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    } else if (trackRef.current) {
      const slideEls = trackRef.current.querySelectorAll('.explore-slide');
      slideEls[idx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      setActiveIndex(idx);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      jumpToSlide(Math.min(categories.length - 1, activeIndex + 1));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      jumpToSlide(Math.max(0, activeIndex - 1));
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="w-full relative"
      style={{
        overscrollBehavior: 'none', // Prevents WebKit rubber-band tearing during pin
      }}
    >
      <section
        ref={sectionRef}
        aria-label="Explore Our Products Gallery"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative w-full bg-[#07090e] focus:outline-none overflow-hidden"
        style={{
          height: '100svh', // Small viewport height: content is never occluded by iOS Safari bottom navigation bar
          minHeight: '-webkit-fill-available',
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Ambient Lighting Accents (Hardware accelerated, zero blur-filter GPU lag) */}
          <div
            aria-hidden="true"
            className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-brand-blue/15 blur-3xl pointer-events-none transform-gpu"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-brand-green/10 blur-3xl pointer-events-none transform-gpu"
          />
        </div>

        {/* Fixed/Anchored Corner Title badge */}
        <div className="pointer-events-none absolute top-16 sm:top-20 md:top-24 left-4 sm:left-10 lg:left-14 z-30">
          <div className="px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-[#0b0d13]/85 backdrop-blur-2xl border border-white/15 shadow-2xl inline-flex items-center gap-2.5 sm:gap-4">
            <h2 className="text-[10px] sm:text-xs md:text-sm font-serif text-white uppercase tracking-[0.2em]">
              Explore Our Products
            </h2>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span
              ref={indexBadgeRef}
              className="text-[10px] sm:text-xs font-sans text-brand-green tabular-nums tracking-widest font-semibold"
            >
              0{activeIndex + 1} / 0{categories.length}
            </span>
          </div>
        </div>

        {/* Top-Right Scroll Indicator */}
        <div className="pointer-events-none absolute top-16 sm:top-20 md:top-24 right-4 sm:right-10 lg:right-14 z-30 hidden md:flex items-center gap-3">
          <div className="px-4 py-2 rounded-full bg-[#0b0d13]/80 backdrop-blur-2xl border border-white/15 flex items-center gap-2.5 text-xs text-white/80 tracking-wider">
            <MoveHorizontal className="w-4 h-4 text-brand-green" />
            <span>Scroll to Explore</span>
          </div>
        </div>

        {/* Horizontal Slide Track with persistent 3D GPU layer */}
        <div
          ref={trackRef}
          className="flex flex-row flex-nowrap h-full will-change-transform transform-gpu motion-reduce:w-full motion-reduce:overflow-x-auto motion-reduce:snap-x motion-reduce:snap-mandatory"
          style={{ width: `${categories.length * 100}vw` }}
        >
          {categories.map((cat, idx) => (
            <div
              key={idx}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${categories.length}: ${cat.title}`}
              className="explore-slide relative w-screen h-full shrink-0 flex items-center justify-center px-4 sm:px-8 lg:px-14 will-change-transform transform-gpu motion-reduce:snap-start"
            >
              {/* Clean Atmospheric Blurred Layer with hardware-accelerated transform */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-25">
                <img
                  src={cat.desktopImage || cat.image}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover scale-110 blur-2xl transform-gpu will-change-transform"
                />
                <div className="absolute inset-0 bg-[#07090e]/70" />
              </div>

              {/* Large Responsive Showcase Stage (Uses % height so it fits seamlessly in dynamic viewports) */}
              <div className="relative z-10 w-full max-w-7xl h-[66%] sm:h-[72%] max-h-[720px] flex items-end">
                {/* Showcase Image Frame */}
                <div className="relative w-full h-full rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-white/15 shadow-[0_35px_100px_rgba(0,0,0,0.85)]">
                  <picture className="block w-full h-full">
                    <source
                      media="(max-width: 768px)"
                      srcSet={cat.mobileImage || cat.desktopImage || cat.image}
                    />
                    <img
                      src={cat.desktopImage || cat.image}
                      alt={cat.title}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </picture>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07090e]/85 via-transparent to-black/20" />
                </div>

                {/* Compact Glass Title & Nav CTA Badge at Bottom-Left */}
                <div className="absolute bottom-2.5 sm:bottom-6 md:bottom-8 left-2.5 sm:left-6 md:left-8 z-20 max-w-md w-[calc(100%-1.25rem)] sm:w-auto">
                  <div className="p-3 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-[#0b0d13]/90 backdrop-blur-2xl border border-white/20 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-6 md:gap-8">
                    <div>
                      <span className="block text-[8px] sm:text-[10px] font-sans uppercase tracking-[0.22em] text-brand-green tabular-nums mb-0.5 font-semibold">
                        0{idx + 1} · Architectural System
                      </span>
                      <h3 className="text-sm sm:text-xl md:text-3xl font-serif text-white leading-tight">
                        {cat.title}
                      </h3>
                    </div>

                    <Link
                      to={cat.link}
                      className="group inline-flex items-center justify-between gap-2 sm:gap-3 pl-3 sm:pl-5 pr-1.5 sm:pr-2 py-1 sm:py-2 rounded-full bg-brand-blue hover:bg-white text-white hover:text-brand-dark text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-300 shrink-0 active:scale-95 self-start sm:self-auto"
                    >
                      <span>Explore</span>
                      <span className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white/20 group-hover:bg-brand-blue group-hover:text-white flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Progress Bar & Quick Pill Slide Navigation */}
        <div className="absolute bottom-3 sm:bottom-5 md:bottom-6 left-4 sm:left-10 lg:left-14 right-4 sm:right-10 lg:right-14 z-30 flex items-center justify-between gap-3 sm:gap-6 pointer-events-none">
          <div className="w-full max-w-xs sm:max-w-md h-[2px] bg-white/15 overflow-hidden rounded-full">
            <div
              ref={progressRef}
              className="h-full bg-brand-blue origin-left will-change-transform transform-gpu"
              style={{ transform: 'scaleX(0.08)' }}
            />
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => jumpToSlide(idx)}
                aria-label={`Go to ${cat.title}`}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? 'w-6 sm:w-10 bg-brand-blue'
                    : 'w-2 sm:w-2.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
