import React, { useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import AboutSection from '../components/AboutSection';
import Partners from '../components/Partners';
import AnimatedHeading from '../components/ui/AnimatedHeading';
import MagneticButton from '../components/ui/MagneticButton';
import { gsap, prefersReducedMotion, refreshAfterAssetsLoaded } from '../utils/gsap';

export const aboutImages = {
  banner: {
    desktopImage: '/images/Banner4.avif',
    mobileImage: '/images/BannerMob4.avif',
  },
  bentoLeft: {
    desktopImage: '/images/Product3.avif',
    mobileImage: '/images/Product3.avif',
  },
  bentoRight: {
    desktopImage: '/images/Product4.avif',
    mobileImage: '/images/Product4.avif',
  },
  cta: {
    desktopImage: '/images/homeProductDesc4.webp',
    mobileImage: '/images/homeProductDesc4.webp',
  },
};

export default function About() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroWrapRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    const heroWrap = heroWrapRef.current;
    const heroImg = heroImgRef.current;
    if (!page || prefersReducedMotion()) return;

    const cleanupAssets = refreshAfterAssetsLoaded(page);

    const ctx = gsap.context(() => {
      if (heroWrap && heroImg) {
        gsap.fromTo(
          heroImg,
          { scale: 1.15, yPercent: -8 },
          {
            scale: 1,
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: heroWrap,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      gsap.fromTo(
        '.about-reveal-block',
        { y: 56, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-bento-grid',
            start: 'top 82%',
            once: true,
          },
        }
      );
    }, page);

    return () => {
      cleanupAssets();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={pageRef} className="bg-brand-light">
      {/* Full-Width Big Banner Image with Dual Desktop/Mobile Picture Support */}
      <section
        ref={heroWrapRef}
        className="relative w-full h-[70vh] sm:h-[78vh] lg:h-[85vh] min-h-[480px] overflow-hidden bg-[#07090e] text-white"
      >
        <picture className="block absolute inset-0 w-full h-full">
          <source media="(max-width: 768px)" srcSet={aboutImages.banner.mobileImage} />
          <img
            ref={heroImgRef}
            src={aboutImages.banner.desktopImage}
            alt="Architectural Shading"
            fetchPriority="high"
            className="w-full h-full object-cover object-center will-change-transform"
          />
        </picture>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/65" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 lg:pb-10 flex flex-col justify-end">
          <div className="max-w-md sm:max-w-lg p-5 sm:p-6 rounded-2xl bg-[#07090e]/75 backdrop-blur-xl border border-white/15 shadow-2xl">
            <span className="inline-block text-[10px] sm:text-xs font-sans font-semibold tracking-[0.22em] uppercase text-brand-green mb-1.5">
              Since 1998
            </span>
            <AnimatedHeading
              as="h1"
              immediate
              className="text-xl sm:text-2xl md:text-3xl font-serif text-white tracking-tight leading-snug mb-2"
            >
              Our <span className="text-brand-blue italic">Heritage</span>
            </AnimatedHeading>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              Decades of <span className="text-brand-green font-medium">engineering excellence</span> in architectural shading systems, serving visionary architects and luxury homeowners across India.
            </p>
          </div>
        </div>
      </section>

      <AboutSection />

      {/* Asymmetric Overlapping Bento Showcase — Strictly 2 aspect ratios (4:3 mobile, 16:10 desktop) matching GridImages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-24 md:py-32">
        <div className="about-bento-grid grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          <div className="about-reveal-block lg:col-start-1 lg:col-end-8 lg:row-start-1 aspect-[4/3] md:aspect-[16/10] overflow-hidden relative group rounded-2xl sm:rounded-tl-[4.5rem] sm:rounded-br-[4.5rem] sm:rounded-tr-2xl sm:rounded-bl-2xl shadow-2xl z-10">
            <picture className="block w-full h-full">
              <source media="(max-width: 768px)" srcSet={aboutImages.bentoLeft.mobileImage} />
              <img
                src={aboutImages.bentoLeft.desktopImage}
                alt="Engineering detail"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent flex flex-col justify-end p-6 sm:p-8 md:p-12">
              <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-serif">Precision Engineered</h3>
            </div>
          </div>

          <div className="about-reveal-block lg:col-start-7 lg:col-end-13 lg:row-start-1 lg:mt-28 aspect-[4/3] md:aspect-[16/10] overflow-hidden relative group rounded-2xl sm:rounded-t-[4.5rem] sm:rounded-b-3xl shadow-2xl z-20 sm:border-4 border-brand-light">
            <picture className="block w-full h-full">
              <source media="(max-width: 768px)" srcSet={aboutImages.bentoRight.mobileImage} />
              <img
                src={aboutImages.bentoRight.desktopImage}
                alt="Manufacturing"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </picture>
            <div className="absolute inset-0 bg-[#0b0d13]/75 backdrop-blur-[3px] flex items-center justify-center p-5 sm:p-8 text-center">
              <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.08] backdrop-blur-2xl border border-white/15 w-full">
                <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-serif mb-4 sm:mb-6">
                  Let&apos;s Discuss Your Vision
                </h3>
                <MagneticButton to="/contact" variant="primary">
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Narrative Block */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-12 md:p-16">
          <div className="lg:col-span-5">
            <AnimatedHeading
              as="h2"
              className="text-2xl sm:text-4xl md:text-5xl font-serif text-brand-charcoal leading-tight"
            >
              Crafting the Outdoors
            </AnimatedHeading>
            <div className="w-16 h-[2px] bg-brand-blue mt-4 sm:mt-6" />
          </div>
          <div className="lg:col-span-7">
            <p className="text-brand-charcoal/80 text-sm sm:text-base md:text-lg leading-relaxed">
              At Asha Smart Shades, we believe that outdoor spaces hold the potential to become the most cherished parts of any property. From initial CAD estimates in our Makarpura workshop to final installations, our approach marries architectural elegance with robust Indian engineering. We use state-of-the-art tensile fabrics, precision-cut aluminum, and motorized systems to ensure every structure is not just beautiful, but built to withstand the elements.
            </p>
          </div>
        </div>
      </div>

      {/* Sculpted Full-Width Showcase CTA — Uses 4:3 mobile and 16:10 desktop with dual-image support */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="w-full aspect-[4/3] md:aspect-[16/10] max-h-[520px] rounded-2xl sm:rounded-tl-[4.5rem] sm:rounded-br-[4.5rem] sm:rounded-tr-2xl sm:rounded-bl-2xl overflow-hidden relative shadow-2xl">
          <picture className="block w-full h-full">
            <source media="(max-width: 768px)" srcSet={aboutImages.cta.mobileImage} />
            <img
              src={aboutImages.cta.desktopImage}
              alt="Outdoor lifestyle"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-[#07090e]/85 via-[#07090e]/55 to-transparent flex flex-col items-start justify-center text-left p-6 sm:p-14 md:p-20">
            <AnimatedHeading
              as="h2"
              className="text-white text-2xl sm:text-5xl md:text-6xl font-serif mb-6 sm:mb-8 max-w-xl"
            >
              Experience Open Air Luxury
            </AnimatedHeading>
            <MagneticButton to="/products/retractable-awnings" variant="primary">
              <span>Explore Our Products</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>
      </div>

      <Partners />
    </div>
  );
}
