import React, { useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap, prefersReducedMotion, refreshAfterAssetsLoaded } from '../utils/gsap';
import AnimatedHeading from './ui/AnimatedHeading';
import MagneticButton from './ui/MagneticButton';

export const projectsPortalImage = {
  desktopImage: '/images/ClipBack.avif',
  mobileImage: '/images/ClipBack.avif',
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const portal = portalRef.current;
    const bgImg = bgImgRef.current;
    if (!section || !portal || !bgImg || prefersReducedMotion()) return;

    const cleanupAssets = refreshAfterAssetsLoaded(section);

    const ctx = gsap.context(() => {
      // Scroll-scrubbed expanding architectural portal
      gsap.fromTo(
        portal,
        { clipPath: 'inset(6% 6% 6% 6% round 40px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 15%',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        bgImg,
        { scale: 1.18, yPercent: -10 },
        {
          scale: 1.02,
          yPercent: 10,
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
        '.project-diagonal-card-1',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          duration: 0.9,
          scrollTrigger: {
            trigger: '.project-diagonal-card-1',
            start: 'top 88%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.project-diagonal-card-2',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          duration: 0.9,
          delay: 0.1,
          scrollTrigger: {
            trigger: '.project-diagonal-card-2',
            start: 'top 88%',
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
    <section ref={sectionRef} className="relative w-full bg-[#07090e] pt-6 pb-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Expanding Scroll-Scrubbed Portal Container with Dual Desktop/Mobile Picture Support */}
      <div className="relative w-full">
        <div
          ref={portalRef}
          className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:min-h-[85vh] md:aspect-auto flex flex-col justify-end overflow-hidden will-change-transform rounded-2xl sm:rounded-3xl md:rounded-none"
        >
          <picture className="block absolute inset-0 w-full h-full">
            <source media="(max-width: 768px)" srcSet={projectsPortalImage.mobileImage} />
            <img
              ref={bgImgRef}
              src={projectsPortalImage.desktopImage}
              alt="Advanced Tensile Membranes & Canopies"
              className="w-full h-full object-cover will-change-transform"
            />
          </picture>
          {/* Subtle cinematic gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25" />
        </div>

        {/* Editorial Cards Overlay:
            On mobile (< md): sits cleanly BELOW the portal image so the villa & tensile canopy are 100% visible!
            On desktop (md+): Card 1 floats at TOP-LEFT in the open sky (never obscuring the main lower awning),
            while Card 2 floats at BOTTOM-RIGHT over the lower terrace wall. */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-3 sm:mt-4 md:mt-0 md:absolute md:inset-0 md:pointer-events-none">
          {/* Card 01 · Structural Tension — Desktop Top-Left in the open sky / Mobile stacked */}
          <div className="project-diagonal-card-1 md:absolute md:top-8 lg:top-12 md:left-4 sm:md:left-6 lg:md:left-8 md:max-w-sm lg:max-w-md will-change-transform md:pointer-events-auto">
            <div className="rounded-xl sm:rounded-2xl bg-[#0b0d13]/90 md:bg-[#07090e]/75 backdrop-blur-xl border border-white/15 p-3.5 sm:p-5 md:p-6 text-white shadow-xl sm:shadow-[0_24px_60px_rgba(0,0,0,0.7)]">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <div className="w-5 h-[2px] bg-brand-green" />
                <span className="text-[9px] sm:text-xs font-sans font-semibold uppercase tracking-[0.22em] text-brand-green">
                  01 · Structural Tension
                </span>
              </div>
              <AnimatedHeading
                as="h2"
                className="text-sm sm:text-xl md:text-2xl font-serif mb-1 sm:mb-2 leading-snug text-white"
              >
                Advanced Tensile Membranes &amp; Canopies
              </AnimatedHeading>
              <p className="text-white/80 text-[11px] sm:text-[13px] leading-relaxed">
                Precision-engineered tensile membranes crafted in Vadodara, delivering high durability and architectural distinction for luxury spaces.
              </p>
            </div>
          </div>

          {/* Card 02 · Spatial Extension — Desktop Bottom-Right below the awning overhang / Mobile stacked */}
          <div className="project-diagonal-card-2 mt-2.5 sm:mt-3 md:mt-0 md:absolute md:bottom-8 lg:bottom-12 md:right-4 sm:md:right-6 lg:md:right-8 md:max-w-sm lg:max-w-md will-change-transform md:pointer-events-auto">
            <div className="rounded-xl sm:rounded-2xl bg-[#0b0d13]/90 md:bg-[#07090e]/75 backdrop-blur-xl border border-white/15 p-3.5 sm:p-5 md:p-6 text-white shadow-xl sm:shadow-[0_24px_60px_rgba(0,0,0,0.7)] lg:mb-2">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <div className="w-5 h-[2px] bg-brand-blue" />
                <span className="text-[9px] sm:text-xs font-sans font-semibold uppercase tracking-[0.22em] text-brand-blue">
                  02 · Spatial Extension
                </span>
              </div>
              <AnimatedHeading
                as="h2"
                className="text-sm sm:text-xl md:text-2xl font-serif mb-1 sm:mb-2 leading-snug text-white"
              >
                The Outdoors as a Living Space
              </AnimatedHeading>
              <p className="text-white/80 text-[11px] sm:text-[13px] leading-relaxed">
                Large-span bespoke shading systems tailored for luxury residences, commercial estates, and resorts across Gujarat and India.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlapping Floating Consultation Capsule Banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 mt-4 sm:mt-8 md:-mt-12">
        <div className="rounded-2xl sm:rounded-3xl bg-[#0e121a] text-white p-4 sm:p-8 md:p-10 border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-8">
          <AnimatedHeading
            as="h3"
            className="text-base sm:text-2xl md:text-3xl font-serif max-w-xl leading-[1.25] text-white"
          >
            Ready to design your bespoke architectural shading system?
          </AnimatedHeading>

          <div className="shrink-0 w-full sm:w-auto">
            <MagneticButton to="/contact" variant="primary" className="w-full sm:w-auto">
              <span className="text-[11px] sm:text-sm">Book Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
