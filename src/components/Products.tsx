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
  const floatingCropRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const archFrame = archFrameRef.current;
    const img = imgRef.current;
    const glassCard = glassCardRef.current;
    const floatingCrop = floatingCropRef.current;
    if (!section || !archFrame || !img || !glassCard || prefersReducedMotion()) return;

    const cleanupAssets = refreshAfterAssetsLoaded(section);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        archFrame,
        { clipPath: 'inset(10% 8% 10% 8% round 60px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 60px)',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 20%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        img,
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
        glassCard,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: glassCard,
            start: 'top 86%',
            once: true,
          },
        }
      );

      if (floatingCrop) {
        gsap.fromTo(
          floatingCrop,
          { y: -35 },
          {
            y: 45,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
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
      className="relative w-full py-16 sm:py-24 md:py-36 bg-[#0b110f] text-white overflow-hidden"
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
        {/* Top Overlapping Giant Display Heading */}
        <div className="relative z-30 mb-6 sm:mb-10 lg:-mb-12 lg:max-w-3xl pointer-events-none">
          <div className="inline-flex items-center gap-2.5 text-xs font-sans uppercase tracking-[0.22em] text-brand-green mb-3">
            <span>02</span>
            <span aria-hidden="true">·</span>
            <span>Bespoke Engineering</span>
          </div>
          <AnimatedHeading
            as="h2"
            className="text-3xl sm:text-5xl lg:text-7xl xl:text-[5rem] font-serif text-white leading-[1.06] tracking-tight drop-shadow-2xl"
          >
            Intelligent Exterior Shading
          </AnimatedHeading>
        </div>

        {/* True Single-Row Overlapping 12-Column Stage using lg:row-start-1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-0 items-center">
          {/* Left Sculpted Arch Viewport (Cols 1-8, Row 1) — 4:3 mobile, 16:10 desktop */}
          <div className="lg:col-start-1 lg:col-end-8 lg:row-start-1 relative z-10">
            <div
              ref={archFrameRef}
              className="relative aspect-[4/3] md:aspect-[16/10] w-full overflow-hidden rounded-2xl sm:rounded-t-[6rem] sm:rounded-bl-[4rem] sm:rounded-br-2xl border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.65)] will-change-transform"
            >
              <picture className="block w-full h-full">
                <source media="(max-width: 768px)" srcSet={productsSectionImage.mobileImage} />
                <img
                  ref={imgRef}
                  src={productsSectionImage.desktopImage}
                  alt="Intelligent Exterior Shading"
                  className="w-full h-full object-cover will-change-transform"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b110f]/75 via-transparent to-black/25" />
            </div>

            {/* Secondary Overlapping Detail Lens */}
            <div
              ref={floatingCropRef}
              className="hidden md:block absolute -bottom-10 -left-8 z-20 w-48 h-48 rounded-full overflow-hidden border-4 border-[#0b110f] shadow-2xl will-change-transform"
            >
              <img
                src={productsSectionImage.desktopImage}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover object-left-bottom scale-150"
              />
            </div>
          </div>

          {/* Right Overlapping Dark-Glass Editorial Slab (Cols 6-13, Row 1) */}
          <div className="lg:col-start-6 lg:col-end-13 lg:row-start-1 relative z-30 lg:mt-28">
            <div
              ref={glassCardRef}
              className="rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 bg-[#0d1512]/90 backdrop-blur-3xl border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.85)] will-change-transform"
            >
              <div className="w-12 h-[2px] bg-brand-green mb-5 sm:mb-8" />
              <p className="text-sm sm:text-base md:text-lg text-white/85 leading-relaxed font-sans mb-7 sm:mb-10">
                Based in Makarpura GIDC, Vadodara, Asha Smart Shades has been designing and producing personalized and unique <strong className="text-white font-semibold">outdoor solutions</strong> for luxury residential and commercial spaces. We provide custom CAD estimates, precise site measurements, and professional architectural design consultations to seamlessly extend your living and working environments.
              </p>

              <MagneticButton to="/products/retractable-awnings" variant="primary">
                <span>DISCOVER MORE</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
