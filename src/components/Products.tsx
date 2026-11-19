import React, { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, prefersReducedMotion, refreshAfterAssetsLoaded } from '../utils/gsap';
import AnimatedHeading from './ui/AnimatedHeading';
import MagneticButton from './ui/MagneticButton';

export const productsSectionImage = {
  desktopImage: '/images/Cliped1.webp',
  mobileImage: '/images/Cliped1.webp',
};

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const archFrameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const glassCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const archFrame = archFrameRef.current;
    const img = imgRef.current;
    const glassCard = glassCardRef.current;
    if (!section || !archFrame || !img || !glassCard || prefersReducedMotion()) return;

    const cleanupAssets = refreshAfterAssetsLoaded(section);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        archFrame,
        { clipPath: 'inset(6% 4% 6% 4% round 32px)', opacity: 0.4 },
        {
          clipPath: 'inset(0% 0% 0% 0% round 32px)',
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: archFrame,
            start: 'top 85%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        img,
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

      gsap.fromTo(
        glassCard,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: archFrame,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }, section);

    return () => {
      cleanupAssets();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 sm:py-24 md:py-32 bg-[#0b110f] text-white overflow-hidden"
    >
      {/* Ambient Emerald & Cobalt Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 w-[28rem] h-[28rem] rounded-full bg-brand-green/12 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-10 w-[26rem] h-[26rem] rounded-full bg-brand-blue/12 blur-[130px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-12 lg:mb-14">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-sans uppercase tracking-[0.22em] text-brand-green mb-2.5 font-semibold">
            <span>02</span>
            <span aria-hidden="true">·</span>
            <span>Bespoke Engineering</span>
          </div>
          <AnimatedHeading
            as="h2"
            className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-serif text-white leading-[1.14] tracking-tight drop-shadow-2xl"
          >
            Intelligent Exterior Shading
          </AnimatedHeading>
        </div>

        {/* Large-Scale Immersive Architectural Showcase Frame */}
        <div className="relative w-full">
          <div
            ref={archFrameRef}
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[1.5/1] overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.7)] will-change-transform"
          >
            <picture className="block w-full h-full">
              <source media="(max-width: 768px)" srcSet={productsSectionImage.mobileImage} />
              <img
                ref={imgRef}
                src={productsSectionImage.desktopImage}
                alt="Intelligent Exterior Shading Cantilever System"
                className="w-full h-full object-cover will-change-transform"
              />
            </picture>

            {/* Subtle Vignette — desktop only so mobile photo remains 100% clean */}
            <div className="hidden sm:block pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent" />
          </div>

          {/* Editorial Content Card: Cleanly BELOW image on mobile, floating overlay on desktop */}
          <div
            ref={glassCardRef}
            className="mt-2.5 sm:mt-0 sm:absolute sm:bottom-8 sm:right-8 z-20 w-full sm:max-w-md p-3 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-[#0d1512]/90 sm:bg-[#0b110f]/85 backdrop-blur-xl border border-white/15 shadow-xl sm:shadow-2xl will-change-transform text-white"
          >
            <div className="w-6 sm:w-8 h-[2px] bg-brand-green mb-2 sm:mb-3" />
            <p className="text-[11px] sm:text-sm md:text-[15px] text-white/90 leading-relaxed font-sans mb-3 sm:mb-5">
              Engineered in Vadodara for luxury residences and commercial spaces. Custom CAD estimates and bespoke cantilever shading built to withstand the elements.
            </p>

            <MagneticButton to="/products/retractable-awnings" variant="primary">
              <span className="text-[11px] sm:text-xs">DISCOVER MORE</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
