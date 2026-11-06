import React, { useLayoutEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { gsap, prefersReducedMotion } from '../utils/gsap';

const slides = [
  {
    category: 'Product',
    title: 'Retractable Awnings: Precision folding-arm motorized tension frames',
    desktopImage: '/images/Banner1.avif',
    mobileImage: '/images/BannerMob1.avif',
  },
  {
    category: 'Product',
    title: 'Glazed & Fabric Canopies: Sculpted cantilever entrance protective shields',
    desktopImage: '/images/Banner2.avif',
    mobileImage: '/images/BannerMob2.avif',
  },
  {
    category: 'Project',
    title: 'Tensile Membranes: Advanced hyperbolic engineered sailing shapes',
    desktopImage: '/images/Banner3.avif',
    mobileImage: '/images/BannerMob3.avif',
  },
  {
    category: 'Solution',
    title: 'Gazebos & Umbrellas: Luxury garden frameworks & side-pole resort sails',
    desktopImage: '/images/Banner4.avif',
    mobileImage: '/images/BannerMob4.avif',
  },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const titleTextRef = useRef<HTMLHeadingElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const titleEl = titleTextRef.current;
    if (!titleEl || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleEl,
        { y: 12, opacity: 0.35 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power3.out',
          overwrite: 'auto',
        }
      );
    }, titleEl);

    return () => ctx.revert();
  }, [activeIndex]);

  const currentSlide = slides[activeIndex] || slides[0];

  return (
    <section
      ref={sectionRef}
      aria-label="Featured Architectural Shading Highlights"
      className="relative w-full h-[85vh] sm:h-[90vh] lg:h-screen min-h-[520px] overflow-hidden bg-[#07090e] text-white"
    >
      {/* Full-Viewport Big Banner Image Slider */}
      <div className="absolute inset-0 w-full h-full">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          speed={1100}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          className="w-full h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full overflow-hidden">
                <picture className="block w-full h-full">
                  <source
                    media="(max-width: 768px)"
                    srcSet={slide.mobileImage}
                  />
                  <img
                    src={slide.desktopImage}
                    alt={slide.title}
                    fetchPriority={index === 0 ? 'high' : 'low'}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover object-center"
                  />
                </picture>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/70" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Bottom Compact Banner Caption & Pill Slide Switcher */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-5 sm:pb-8 lg:pb-10 flex flex-col justify-end pointer-events-none">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 sm:gap-4 pr-12 sm:pr-0">
          {/* Compact Glass Banner Text Card */}
          <div className="pointer-events-auto w-full max-w-md sm:max-w-lg p-4 sm:p-5 rounded-2xl bg-[#07090e]/78 backdrop-blur-xl border border-white/15 shadow-2xl">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-sans font-semibold tracking-[0.2em] uppercase mb-1.5">
              <span className="text-brand-blue tabular-nums">
                0{activeIndex + 1} / 0{slides.length}
              </span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span className="text-brand-green">{currentSlide.category}</span>
            </div>

            <h1
              ref={titleTextRef}
              className="text-sm sm:text-lg md:text-xl lg:text-2xl leading-snug font-serif font-normal text-white will-change-transform"
            >
              {currentSlide.title}
            </h1>
          </div>

          {/* Nav-Type Pill Switcher Bar — Fits 100% on Mobile Without Wrapping or Clipping */}
          <div className="pointer-events-auto grid grid-cols-4 sm:inline-flex items-center gap-1 p-1 sm:p-1.5 rounded-full bg-[#07090e]/80 backdrop-blur-xl border border-white/15 w-full max-w-[280px] sm:max-w-none sm:w-auto">
            {slides.map((slide, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => swiperRef.current?.slideToLoop(idx)}
                  aria-label={`Slide ${idx + 1}: ${slide.category}`}
                  className={`px-2.5 sm:px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-sans font-semibold tracking-wider uppercase whitespace-nowrap text-center transition-all duration-300 cursor-pointer active:scale-95 ${
                    isCurrent
                      ? 'bg-white text-brand-dark shadow-md'
                      : 'text-white/75 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>0{idx + 1}</span>
                  <span className="hidden sm:inline"> · {slide.category}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
