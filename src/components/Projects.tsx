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
            scrub: true,
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
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        '.project-diagonal-card-1',
        { y: 60, opacity: 0 },
        {
          y: -20,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'center center',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        '.project-diagonal-card-2',
        { y: 90, opacity: 0 },
        {
          y: 20,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 55%',
            end: 'bottom 65%',
            scrub: true,
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
    <section ref={sectionRef} className="relative w-full bg-brand-light pt-8 pb-16 sm:py-24 md:py-28 overflow-hidden">
      {/* Expanding Scroll-Scrubbed Portal Container with Dual Desktop/Mobile Picture Support */}
      <div
        ref={portalRef}
        className="relative w-full min-h-[75vh] sm:min-h-[85vh] flex flex-col justify-between py-14 sm:py-20 md:py-28 overflow-hidden will-change-transform"
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-brand-dark/90" />

        {/* Diagonal Overlapping Asymmetric Cards */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
            {/* Top-Left Card (Cols 1-6) */}
            <div className="lg:col-span-6 project-diagonal-card-1 rounded-2xl sm:rounded-tl-[3.5rem] sm:rounded-br-[3.5rem] sm:rounded-tr-xl sm:rounded-bl-xl bg-[#0b0d13]/80 backdrop-blur-2xl border border-white/15 p-6 sm:p-10 md:p-12 text-white shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
              <span className="inline-block text-xs font-sans uppercase tracking-[0.22em] text-brand-green mb-3">
                01 · Structural Tension
              </span>
              <AnimatedHeading
                as="h2"
                className="text-2xl sm:text-4xl md:text-5xl font-serif mb-4 sm:mb-6 leading-[1.08] text-white"
              >
                Advanced Tensile Membranes &amp; Canopies
              </AnimatedHeading>
              <p className="text-white/85 text-xs sm:text-sm md:text-base leading-relaxed">
                <strong>Innovation, precision engineering, crafted in Vadodara</strong> and a commitment to architectural excellence are the elements that distinguish our bespoke shading systems, engineered for luxury and highly durable performance.
              </p>
            </div>

            {/* Bottom-Right Offset Card (Cols 7-12, pushed down asymmetrically) */}
            <div className="lg:col-span-6 lg:mt-40 project-diagonal-card-2 rounded-2xl sm:rounded-tr-[3.5rem] sm:rounded-bl-[3.5rem] sm:rounded-tl-xl sm:rounded-br-xl bg-[#0b0d13]/70 sm:bg-white/10 backdrop-blur-2xl border border-white/20 p-6 sm:p-10 md:p-12 text-white shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
              <span className="inline-block text-xs font-sans uppercase tracking-[0.22em] text-brand-blue mb-3">
                02 · Spatial Extension
              </span>
              <AnimatedHeading
                as="h2"
                className="text-2xl sm:text-4xl md:text-5xl font-serif mb-4 sm:mb-6 leading-[1.08] text-white"
              >
                The outdoors as a living space
              </AnimatedHeading>
              <p className="text-white/85 text-xs sm:text-sm md:text-base leading-relaxed">
                Asha Smart Shades specializes in large-span shading solutions, tailored for commercial projects, luxury residences, and industrial estates across Gujarat and India, ensuring your outdoor spaces can be enjoyed all year round.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlapping Floating Consultation Capsule Banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-8 sm:-mt-12 md:-mt-16">
        <div className="rounded-2xl sm:rounded-3xl bg-[#0b0d13] text-white p-6 sm:p-10 md:p-14 border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.45)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
          <AnimatedHeading
            as="h3"
            className="text-xl sm:text-3xl md:text-4xl font-serif max-w-xl leading-[1.15] text-white"
          >
            Ready to design your bespoke architectural shading system?
          </AnimatedHeading>

          <div className="shrink-0 w-full sm:w-auto">
            <MagneticButton to="/contact" variant="primary" className="w-full sm:w-auto">
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
