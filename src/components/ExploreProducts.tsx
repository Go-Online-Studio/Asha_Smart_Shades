import React, { useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, MoveHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  gsap,
  ScrollTrigger,
  debounce,
  prefersReducedMotion,
  refreshAfterAssetsLoaded,
} from '../utils/gsap';

export const categories = [
  {
    title: 'Retractable Awnings',
    image: '/images/homeProductDesc2.webp',
    desktopImage: '/images/homeProductDesc2.webp',
    mobileImage: '/images/homeProductDesc2.webp',
    link: '/products/retractable-awnings',
  },
  {
    title: 'Glazed & Fabric Canopies',
    image: '/images/homeProductDesc3.webp',
    desktopImage: '/images/homeProductDesc3.webp',
    mobileImage: '/images/homeProductDesc3.webp',
    link: '/products/glazed-canopies',
  },
  {
    title: 'Gazebos & Umbrellas',
    image: '/images/homeProductDesc1.webp',
    desktopImage: '/images/homeProductDesc1.webp',
    mobileImage: '/images/homeProductDesc1.webp',
    link: '/products/gazebos-umbrellas',
  },
  {
    title: 'Tensile Membranes',
    image: '/images/homeProductDesc4.webp',
    desktopImage: '/images/homeProductDesc4.webp',
    mobileImage: '/images/homeProductDesc4.webp',
    link: '/products/tensile-membranes',
  },
];

export default function ExploreProducts() {
  // Outer wrapperRef stays a direct child of <main> so ScrollTrigger's pin-spacer
  // on sectionRef never causes React Router unmount removeChild errors.
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const stRef = useRef<ScrollTrigger | null>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!wrapper || !section || !track) return;

    const cleanupAssets = refreshAfterAssetsLoaded(wrapper);
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const slides = gsap.utils.toArray<HTMLElement>('.explore-slide', track);
        const getMaxScroll = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const horizontalTween = gsap.to(track, {
          x: () => -getMaxScroll(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 0.65,
            start: 'top top',
            end: () => `+=${getMaxScroll()}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setProgress(self.progress);
              const idx = Math.min(
                categories.length - 1,
                Math.round(self.progress * (categories.length - 1))
              );
              setActiveIndex(idx);
            },
          },
        });

        stRef.current = horizontalTween.scrollTrigger || null;

        // Slide entrance parallax & parent-clipped exit zoom
        slides.forEach((slide, i) => {
          const zoomChild = slide.querySelector('.explore-slide-zoom') as HTMLElement | null;
          const parallaxMedia = slide.querySelector('.explore-slide-parallax') as HTMLElement | null;
          const captionBox = slide.querySelector('.explore-slide-caption') as HTMLElement | null;

          // 1. Entrance Parallax: inner image translates at a different rate than slide container
          if (parallaxMedia && i > 0) {
            gsap.fromTo(
              parallaxMedia,
              { xPercent: -15, scale: 1.08 },
              {
                xPercent: 0,
                scale: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: slide,
                  containerAnimation: horizontalTween,
                  start: 'left right',
                  end: 'left left',
                  scrub: true,
                },
              }
            );
          }

          if (captionBox && i > 0) {
            gsap.fromTo(
              captionBox,
              { x: 80, opacity: 0.25 },
              {
                x: 0,
                opacity: 1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: slide,
                  containerAnimation: horizontalTween,
                  start: 'left 85%',
                  end: 'left 25%',
                  scrub: true,
                },
              }
            );
          }

          // 2. Exit Zoom: only the child (.explore-slide-zoom) scales up as the slide exits left;
          // the parent (.explore-slide) has overflow: hidden and translates horizontally without distortion.
          if (zoomChild && i < slides.length - 1) {
            gsap.fromTo(
              zoomChild,
              { scale: 1, xPercent: 0 },
              {
                scale: 1.22,
                xPercent: 6,
                ease: 'none',
                scrollTrigger: {
                  trigger: slide,
                  containerAnimation: horizontalTween,
                  start: 'left left',
                  end: 'right left',
                  scrub: true,
                },
              }
            );
          }
        });
      });
    }, wrapper);

    const handleResize = debounce(() => {
      ScrollTrigger.refresh();
    }, 200);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
      cleanupAssets();
      mm.revert();
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
    <div ref={wrapperRef} className="w-full relative">
      <section
        ref={sectionRef}
        aria-label="Explore Our Products Carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative w-full h-screen min-h-[640px] bg-[#07090e] overflow-hidden focus:outline-none"
      >
        {/* Fixed/Anchored Corner Title visible throughout pinned scroll */}
        <div className="pointer-events-none absolute top-24 left-6 sm:left-10 lg:left-14 z-30">
          <div className="px-5 py-2.5 rounded-full bg-[#0b0d13]/85 backdrop-blur-2xl border border-white/15 shadow-2xl inline-flex items-center gap-4">
            <h2 className="text-xs sm:text-sm font-serif text-white uppercase tracking-[0.22em]">
              Explore Our Products
            </h2>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span className="text-xs font-sans text-brand-green tabular-nums tracking-widest">
              0{activeIndex + 1} / 0{categories.length}
            </span>
          </div>
        </div>

        {/* Top-Right Scroll Indicator */}
        <div className="pointer-events-none absolute top-24 right-6 sm:right-10 lg:right-14 z-30 hidden md:flex items-center gap-3">
          <div className="px-4 py-2 rounded-full bg-[#0b0d13]/80 backdrop-blur-2xl border border-white/15 flex items-center gap-2.5 text-xs text-white/80 tracking-wider">
            <MoveHorizontal className="w-4 h-4 text-brand-green" />
            <span>Scroll to Explore</span>
          </div>
        </div>

        {/* Horizontal Slide Track (Scroll-Scrubbed Only — No Conflicting Drag) */}
        <div
          ref={trackRef}
          className="flex h-full w-max will-change-transform motion-reduce:w-full motion-reduce:overflow-x-auto motion-reduce:snap-x motion-reduce:snap-mandatory"
        >
          {categories.map((cat, idx) => (
            <div
              key={idx}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${categories.length}: ${cat.title}`}
              className="explore-slide relative w-screen h-screen min-h-[640px] shrink-0 overflow-hidden flex items-center justify-center px-4 sm:px-8 lg:px-14 motion-reduce:snap-start"
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
              <div className="relative z-10 w-full max-w-7xl h-[72vh] sm:h-[76vh] flex items-end">
                {/* Parent Container with overflow-hidden that clips the zooming child */}
                <div className="relative w-full h-full rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-white/15 shadow-[0_35px_100px_rgba(0,0,0,0.85)]">
                  {/* Animated Child (.explore-slide-zoom) that scales on exit */}
                  <div className="explore-slide-zoom relative w-full h-full overflow-hidden will-change-transform">
                    {/* Inner Parallax Image (.explore-slide-parallax) with Dual Desktop/Mobile Picture Support */}
                    <div className="explore-slide-parallax relative w-[114%] max-w-none -left-[7%] h-full will-change-transform">
                      <picture className="block w-full h-full">
                        <source
                          media="(max-width: 768px)"
                          srcSet={cat.mobileImage || cat.desktopImage || cat.image}
                        />
                        <img
                          src={cat.desktopImage || cat.image}
                          alt={cat.title}
                          className="w-full h-full object-cover object-center"
                        />
                      </picture>
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07090e]/85 via-transparent to-black/20" />
                  </div>
                </div>

                {/* Compact Glass Title & Nav-Type Pill CTA at Bottom-Left */}
                <div className="explore-slide-caption absolute bottom-5 sm:bottom-8 left-5 sm:left-8 z-20 max-w-md w-[calc(100%-2.5rem)] sm:w-auto">
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#0b0d13]/85 backdrop-blur-2xl border border-white/20 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-8">
                    <div>
                      <span className="block text-[10px] font-sans uppercase tracking-[0.22em] text-brand-green tabular-nums mb-1">
                        0{idx + 1} · Architectural System
                      </span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-white leading-tight">
                        {cat.title}
                      </h3>
                    </div>

                    <Link
                      to={cat.link}
                      className="group inline-flex items-center justify-between gap-3 pl-5 pr-2 py-2 rounded-full bg-brand-blue hover:bg-white text-white hover:text-brand-dark text-xs font-semibold uppercase tracking-wider transition-all duration-300 shrink-0 active:scale-95"
                    >
                      <span>Explore</span>
                      <span className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-brand-blue group-hover:text-white flex items-center justify-center transition-colors">
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
        <div className="absolute bottom-5 left-6 sm:left-10 lg:left-14 right-6 sm:right-10 lg:right-14 z-30 flex items-center justify-between gap-6 pointer-events-none">
          <div className="w-full max-w-md h-[2px] bg-white/15 overflow-hidden rounded-full">
            <div
              className="h-full bg-brand-blue transition-transform duration-150 origin-left"
              style={{ transform: `scaleX(${Math.max(0.08, progress)})` }}
            />
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => jumpToSlide(idx)}
                aria-label={`Go to ${cat.title}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? 'w-10 bg-brand-blue'
                    : 'w-2.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
