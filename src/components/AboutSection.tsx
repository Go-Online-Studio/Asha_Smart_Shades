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
  const lensFrameRef = useRef<HTMLDivElement>(null);
  const glassCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const mainFrame = mainFrameRef.current;
    const mainImg = mainImgRef.current;
    const lensFrame = lensFrameRef.current;
    const glassCard = glassCardRef.current;
    if (!section || !mainFrame || !mainImg || prefersReducedMotion()) return;

    const cleanupAssets = refreshAfterAssetsLoaded(section);

    const ctx = gsap.context(() => {
      // Main sculpted frame entrance
      gsap.fromTo(
        mainFrame,
        { clipPath: 'inset(12% 10% 12% 10% round 48px)', opacity: 0.2 },
        {
          clipPath: 'inset(0% 0% 0% 0% round 48px)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: mainFrame,
            start: 'top 84%',
            once: true,
          },
        }
      );

      // Inner image parallax
      gsap.fromTo(
        mainImg,
        { scale: 1.16, yPercent: -8 },
        {
          scale: 1.02,
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Secondary overlapping lens counter-parallax
      if (lensFrame) {
        gsap.fromTo(
          lensFrame,
          { y: 70, rotate: -3 },
          {
            y: -50,
            rotate: 2,
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

      // Overlapping bottom-left glass card parallax
      if (glassCard) {
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
              start: 'top 88%',
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
      className="py-16 sm:py-24 md:py-36 relative overflow-hidden bg-brand-light"
    >
      {/* Subtle Architectural Blueprint Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-60 [background-image:linear-gradient(to_right,rgba(26,26,26,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(26,26,26,0.04)_1px,transparent_1px)] [background-size:5rem_5rem]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Asymmetric Overlapping Editorial Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-end mb-8 lg:mb-0">
          <div className="lg:col-span-8 relative z-20">
            <div className="inline-flex items-center gap-2.5 text-xs font-sans uppercase tracking-[0.22em] text-brand-blue mb-3">
              <span>01</span>
              <span aria-hidden="true">·</span>
              <span>Architectural Identity</span>
            </div>
            <AnimatedHeading
              as="h2"
              className="text-3xl sm:text-5xl lg:text-7xl xl:text-[5rem] font-serif text-brand-charcoal tracking-tight leading-[1.06]"
            >
              Discover Bespoke{' '}
              <span className="text-brand-blue italic block sm:inline lg:pl-16">
                Architectural Shading
              </span>
            </AnimatedHeading>
          </div>
        </div>

        {/* Multi-Plane Overlapping Image & Glass Card Collage */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-0 items-center lg:-mt-8">
          {/* Left Overlapping Detail Lens + Glass Manifesto Card (Cols 1-6, Row 1) */}
          <div className="lg:col-start-1 lg:col-end-7 lg:row-start-1 relative z-30 flex flex-col gap-6 order-2 lg:order-1 lg:mt-20">
            {/* Secondary Zoomed Detail Lens Frame (Overlaps Main Image on Desktop) */}
            <div
              ref={lensFrameRef}
              className="hidden lg:block w-56 h-72 self-end lg:-mr-6 rounded-t-full rounded-b-3xl overflow-hidden border-4 border-brand-light shadow-2xl will-change-transform"
            >
              <img
                src={aboutSectionImage.desktopImage}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover object-right scale-150"
              />
            </div>

            {/* Overlapping Glassmorphic Editorial Statement */}
            <div
              ref={glassCardRef}
              className="glass-panel bg-white/90 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 border border-brand-charcoal/10 shadow-[0_24px_60px_-15px_rgba(11,3,1,0.14)]"
            >
              <div className="w-12 h-[2px] bg-brand-blue mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-brand-charcoal leading-snug">
                High-performance tension systems engineered for luxury and commercial spaces.
              </h3>
            </div>
          </div>

          {/* Right Sculpted Arch-Chamfer Main Image Frame (Cols 5-13, Row 1) — 4:3 mobile, 16:10 desktop */}
          <div className="lg:col-start-5 lg:col-end-13 lg:row-start-1 relative z-10 order-1 lg:order-2">
            <div
              ref={mainFrameRef}
              className="relative aspect-[4/3] md:aspect-[16/10] w-full overflow-hidden rounded-2xl sm:rounded-tl-[4.5rem] sm:rounded-br-[4.5rem] sm:rounded-tr-2xl sm:rounded-bl-2xl shadow-[0_30px_80px_-20px_rgba(11,3,1,0.22)] will-change-transform"
            >
              <picture className="block w-full h-full">
                <source media="(max-width: 768px)" srcSet={aboutSectionImage.mobileImage} />
                <img
                  ref={mainImgRef}
                  src={aboutSectionImage.desktopImage}
                  alt="Alba Butterfly Pergola"
                  className="w-full h-full object-cover will-change-transform"
                />
              </picture>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
