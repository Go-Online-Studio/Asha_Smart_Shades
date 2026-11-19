import React, { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion, refreshAfterAssetsLoaded } from '../utils/gsap';
import AnimatedHeading from './ui/AnimatedHeading';

export const aboutSectionImage = {
  desktopImage: '/images/ShortInfo1.webp',
  mobileImage: '/images/ShortInfo1.webp',
};

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainFrameRef = useRef<HTMLDivElement>(null);
  const mainImgRef = useRef<HTMLImageElement>(null);
  const glassCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const mainFrame = mainFrameRef.current;
    const mainImg = mainImgRef.current;
    const glassCard = glassCardRef.current;
    if (!section || !mainFrame || !mainImg || prefersReducedMotion()) return;

    const cleanupAssets = refreshAfterAssetsLoaded(section);

    const ctx = gsap.context(() => {
      // Main sculpted frame smooth reveal
      gsap.fromTo(
        mainFrame,
        { clipPath: 'inset(6% 4% 6% 4% round 32px)', opacity: 0.4 },
        {
          clipPath: 'inset(0% 0% 0% 0% round 32px)',
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: mainFrame,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Inner image subtle parallax
      gsap.fromTo(
        mainImg,
        { scale: 1.08, yPercent: -4 },
        {
          scale: 1.01,
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      );

      // Compact architectural overlay badge entrance
      if (glassCard) {
        gsap.fromTo(
          glassCard,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: mainFrame,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }
    }, section);

    return () => {
      cleanupAssets();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-[#07090e] via-[#090d14] to-[#0b110f] text-white"
    >
      {/* Seamless Hero Connector Ambient Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 w-[36rem] h-[36rem] rounded-full bg-brand-blue/10 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-10 w-[28rem] h-[28rem] rounded-full bg-brand-green/8 blur-[140px]"
      />

      {/* Subtle Dark Architectural Blueprint Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:5rem_5rem]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Asymmetric Overlapping Editorial Heading */}
        <div className="max-w-3xl mb-6 sm:mb-12 lg:mb-14">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-sans uppercase tracking-[0.22em] text-brand-blue mb-2.5 font-semibold">
            <span>01</span>
            <span aria-hidden="true">·</span>
            <span>Architectural Identity</span>
          </div>
          <AnimatedHeading
            as="h2"
            className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-serif text-white tracking-tight leading-[1.15]"
          >
            Discover Bespoke{' '}
            <span className="text-brand-blue italic block sm:inline lg:pl-6">
              Architectural Shading
            </span>
          </AnimatedHeading>
        </div>

        {/* Large-Scale Image-Led Architectural Showcase Frame */}
        <div className="relative w-full">
          <div
            ref={mainFrameRef}
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[21/9] overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.65)] will-change-transform"
          >
            <picture className="block w-full h-full">
              <source media="(max-width: 768px)" srcSet={aboutSectionImage.mobileImage} />
              <img
                ref={mainImgRef}
                src={aboutSectionImage.desktopImage}
                alt="Bespoke Architectural Shading Installation"
                className="w-full h-full object-cover will-change-transform"
              />
            </picture>

            {/* Subtle localized contrast gradient — desktop only so mobile photo remains 100% clean */}
            <div className="hidden sm:block pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent" />
          </div>

          {/* Architectural Caption Badge: Cleanly BELOW image on mobile, floating overlay on desktop */}
          <div
            ref={glassCardRef}
            className="mt-2.5 sm:mt-0 sm:absolute sm:bottom-8 sm:left-8 z-20 w-full sm:max-w-md p-3 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-[#090d14]/90 sm:bg-[#07090e]/80 backdrop-blur-xl border border-white/15 shadow-xl sm:shadow-2xl text-white will-change-transform"
          >
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <div className="w-4 sm:w-5 h-[2px] bg-brand-blue" />
              <span className="text-[9px] sm:text-xs font-sans uppercase tracking-[0.2em] text-brand-blue font-semibold">
                Commercial Engineering
              </span>
            </div>
            <h3 className="text-[11px] sm:text-sm md:text-base font-serif text-white/90 leading-snug">
              High-performance tension systems engineered for luxury and commercial spaces.
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
