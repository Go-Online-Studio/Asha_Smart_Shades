import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, MoveHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  debounce,
  prefersReducedMotion,
  refreshAfterAssetsLoaded,
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
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const stRef = useRef<ScrollTrigger | null>(null);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    // Guarantee plugin is registered before creating animation
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (prefersReducedMotion()) {
      return;
    }

    const totalSlides = categories.length;

    // Use gsap.context scoped to section for clean React lifecycle and unmounting
    const ctx = gsap.context(() => {
      // Calculate exact horizontal scroll travel:
      // Track has 4 full-width slides, so travel distance is (totalSlides - 1) * viewport width
      const getScrollDistance = () => {
        const vw = section.clientWidth || window.innerWidth;
        const trackW = track.scrollWidth || totalSlides * vw;
        return Math.max(0, trackW - vw);
      };

      const horizontalTween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.5,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(self.progress);
            const currentIdx = Math.min(
              totalSlides - 1,
              Math.max(0, Math.round(self.progress * (totalSlides - 1)))
            );
            setActiveIndex(currentIdx);
          },
        },
      });

      stRef.current = horizontalTween.scrollTrigger || null;
    }, section);

    // Initial refresh after microtask layout
    const refreshId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    // Refresh again after fonts and images finish loading
    const cleanupAssets = refreshAfterAssetsLoaded(section);

    // Delayed refresh to handle mobile browser address bar / initial viewport settling
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    const handleResize = debounce(() => {
      ScrollTrigger.refresh();
    }, 200);

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      cancelAnimationFrame(refreshId);
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      handleResize.cancel();
      cleanupAssets();
      ctx.revert();
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
    <div className="w-full relative">
      <section
        ref={sectionRef}
        aria-label="Explore Our Products Gallery"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative w-full h-screen bg-[#07090e] overflow-hidden focus:outline-none"
      >
        {/* Fixed/Anchored Corner Title badge */}
        <div className="pointer-events-none absolute top-20 sm:top-24 left-4 sm:left-10 lg:left-14 z-30">
          <div className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#0b0d13]/85 backdrop-blur-2xl border border-white/15 shadow-2xl inline-flex items-center gap-3 sm:gap-4">
            <h2 className="text-[11px] sm:text-xs md:text-sm font-serif text-white uppercase tracking-[0.2em]">
              Explore Our Products
            </h2>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span className="text-[11px] sm:text-xs font-sans text-brand-green tabular-nums tracking-widest font-semibold">
              0{activeIndex + 1} / 0{categories.length}
            </span>
          </div>
        </div>

        {/* Top-Right Scroll Indicator */}
        <div className="pointer-events-none absolute top-20 sm:top-24 right-4 sm:right-10 lg:right-14 z-30 hidden md:flex items-center gap-3">
          <div className="px-4 py-2 rounded-full bg-[#0b0d13]/80 backdrop-blur-2xl border border-white/15 flex items-center gap-2.5 text-xs text-white/80 tracking-wider">
            <MoveHorizontal className="w-4 h-4 text-brand-green" />
            <span>Scroll to Explore</span>
          </div>
        </div>

        {/* Horizontal Slide Track */}
        <div
          ref={trackRef}
          className="flex flex-row flex-nowrap h-full will-change-transform motion-reduce:w-full motion-reduce:overflow-x-auto motion-reduce:snap-x motion-reduce:snap-mandatory"
          style={{ width: `${categories.length * 100}vw` }}
        >
          {categories.map((cat, idx) => (
            <div
              key={idx}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${categories.length}: ${cat.title}`}
              className="explore-slide relative w-screen h-full shrink-0 flex items-center justify-center px-4 sm:px-8 lg:px-14 motion-reduce:snap-start"
            >
              {/* Atmospheric Blurred Background Layer */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
                <img
                  src={cat.desktopImage || cat.image}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover scale-125 blur-[70px]"
                />
                <div className="absolute inset-0 bg-[#07090e]/60" />
              </div>

              {/* Large Full-Viewport Showcase Stage */}
              <div className="relative z-10 w-full max-w-7xl h-[68vh] sm:h-[74vh] flex items-end">
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
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </picture>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07090e]/85 via-transparent to-black/20" />
                </div>

                {/* Compact Glass Title & Nav CTA Badge at Bottom-Left */}
                <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 z-20 max-w-md w-[calc(100%-2rem)] sm:w-auto">
                  <div className="p-4 sm:p-6 rounded-2xl bg-[#0b0d13]/85 backdrop-blur-2xl border border-white/20 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-8">
                    <div>
                      <span className="block text-[10px] font-sans uppercase tracking-[0.22em] text-brand-green tabular-nums mb-1 font-semibold">
                        0{idx + 1} · Architectural System
                      </span>
                      <h3 className="text-lg sm:text-2xl md:text-3xl font-serif text-white leading-tight">
                        {cat.title}
                      </h3>
                    </div>

                    <Link
                      to={cat.link}
                      className="group inline-flex items-center justify-between gap-3 pl-4 sm:pl-5 pr-2 py-1.5 sm:py-2 rounded-full bg-brand-blue hover:bg-white text-white hover:text-brand-dark text-xs font-semibold uppercase tracking-wider transition-all duration-300 shrink-0 active:scale-95"
                    >
                      <span>Explore</span>
                      <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 group-hover:bg-brand-blue group-hover:text-white flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Progress Bar & Quick Pill Slide Navigation */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-10 lg:left-14 right-4 sm:right-10 lg:right-14 z-30 flex items-center justify-between gap-4 sm:gap-6 pointer-events-none">
          <div className="w-full max-w-xs sm:max-w-md h-[2px] bg-white/15 overflow-hidden rounded-full">
            <div
              className="h-full bg-brand-blue transition-transform duration-150 origin-left"
              style={{ transform: `scaleX(${Math.max(0.08, progress)})` }}
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
                    ? 'w-7 sm:w-10 bg-brand-blue'
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
