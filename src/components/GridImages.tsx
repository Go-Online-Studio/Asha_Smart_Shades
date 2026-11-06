import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Fancybox } from '@fancyapps/ui';
import { Maximize2 } from 'lucide-react';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { gsap, prefersReducedMotion, refreshAfterAssetsLoaded } from '../utils/gsap';

export default function GridImages() {
  const sectionRef = useRef<HTMLElement>(null);

  const images = [
    {
      thumb: '/images/Product1.webp',
      desktopImage: '/images/Product1.webp',
      mobileImage: '/images/Product1.webp',
      main: '/images/ProductMain1.jpg',
    },
    {
      thumb: '/images/Product2.webp',
      desktopImage: '/images/Product2.webp',
      mobileImage: '/images/Product2.webp',
      main: '/images/ProductMain2.jpg',
    },
    {
      thumb: '/images/Product3.avif',
      desktopImage: '/images/Product3.avif',
      mobileImage: '/images/Product3.avif',
      main: '/images/ProductMain3.jpg',
    },
    {
      thumb: '/images/Product4.avif',
      desktopImage: '/images/Product4.avif',
      mobileImage: '/images/Product4.avif',
      main: '/images/ProductMain4.jpg',
    },
  ];

  useEffect(() => {
    Fancybox.bind('[data-fancybox="gallery"]', {});

    return () => {
      Fancybox.unbind('[data-fancybox="gallery"]');
      Fancybox.close();
    };
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const cleanupAssets = refreshAfterAssetsLoaded(section);

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.lookbook-frame', section);

      items.forEach((item, idx) => {
        const img = item.querySelector('img');
        const yTravel = idx % 2 === 0 ? -32 : 32;

        gsap.fromTo(
          item,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: idx * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              once: true,
            },
          }
        );

        gsap.to(item, {
          y: yTravel,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.15, yPercent: -7 },
            {
              scale: 1.03,
              yPercent: 7,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      });
    }, section);

    return () => {
      cleanupAssets();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Architectural Shading Gallery"
      className="bg-[#0b0d13] text-white py-16 sm:py-24 md:py-36 relative overflow-hidden"
    >
      {/* Ambient Radial Accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-40 w-[30rem] h-[30rem] rounded-full bg-brand-blue/10 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 -right-40 w-[30rem] h-[30rem] rounded-full bg-brand-green/10 blur-[140px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Multi-Plane Overlapping Lookbook Collage — Strictly 2 aspect ratios (4:3 mobile, 16:10 desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-y-12 items-start">
          {/* Frame 01: Sculpted Arch-Corner Feature Frame (Cols 1-8, Row 1) */}
          <div className="lookbook-frame lg:col-start-1 lg:col-end-8 lg:row-start-1 relative z-10 aspect-[4/3] md:aspect-[16/10] rounded-2xl sm:rounded-tl-[5rem] sm:rounded-br-[5rem] sm:rounded-tr-2xl sm:rounded-bl-2xl overflow-hidden border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.75)] will-change-transform">
            <a
              data-fancybox="gallery"
              href={images[0].main}
              aria-label="Open Lifestyle 1 in lightbox"
              className="group relative block w-full h-full overflow-hidden cursor-zoom-in"
            >
              <picture className="block w-full h-full">
                <source media="(max-width: 768px)" srcSet={images[0].mobileImage || images[0].desktopImage} />
                <img
                  src={images[0].desktopImage || images[0].thumb}
                  alt="Lifestyle 1"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between gap-2">
                <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs uppercase tracking-[0.16em] text-white/90 tabular-nums truncate">
                  01 / 04 · Architectural Lookbook
                </span>
                <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white group-hover:bg-brand-blue transition-colors shrink-0">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>
            </a>
          </div>

          {/* Frame 02: Overlapping Frame (Cols 7-13, Row 1) */}
          <div className="lookbook-frame lg:col-start-7 lg:col-end-13 lg:row-start-1 lg:mt-28 relative z-20 aspect-[4/3] md:aspect-[16/10] rounded-2xl sm:rounded-t-[4.5rem] sm:rounded-b-3xl overflow-hidden border sm:border-4 border-white/15 sm:border-[#0b0d13] shadow-[0_35px_90px_rgba(0,0,0,0.85)] will-change-transform">
            <a
              data-fancybox="gallery"
              href={images[1].main}
              aria-label="Open Lifestyle 2 in lightbox"
              className="group relative block w-full h-full overflow-hidden cursor-zoom-in"
            >
              <picture className="block w-full h-full">
                <source media="(max-width: 768px)" srcSet={images[1].mobileImage || images[1].desktopImage} />
                <img
                  src={images[1].desktopImage || images[1].thumb}
                  alt="Lifestyle 2"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between gap-2">
                <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs uppercase tracking-[0.16em] text-white/90 tabular-nums truncate">
                  02 / 04 · Precision Canopy
                </span>
                <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white group-hover:bg-brand-blue transition-colors shrink-0">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>
            </a>
          </div>

          {/* Frame 03: Offset Chamfered Frame (Cols 1-6, Row 2, pulled up to overlap Row 1 on lg+) */}
          <div className="lookbook-frame lg:col-start-1 lg:col-end-6 lg:row-start-2 lg:-mt-20 relative z-30 aspect-[4/3] md:aspect-[16/10] rounded-2xl sm:rounded-tr-[4.5rem] sm:rounded-bl-[4.5rem] sm:rounded-tl-2xl sm:rounded-br-2xl overflow-hidden border sm:border-4 border-white/15 sm:border-[#0b0d13] shadow-[0_35px_90px_rgba(0,0,0,0.85)] will-change-transform">
            <a
              data-fancybox="gallery"
              href={images[2].main}
              aria-label="Open Lifestyle 3 in lightbox"
              className="group relative block w-full h-full overflow-hidden cursor-zoom-in"
            >
              <picture className="block w-full h-full">
                <source media="(max-width: 768px)" srcSet={images[2].mobileImage || images[2].desktopImage} />
                <img
                  src={images[2].desktopImage || images[2].thumb}
                  alt="Lifestyle 3"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between gap-2">
                <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs uppercase tracking-[0.16em] text-white/90 tabular-nums truncate">
                  03 / 04 · Exterior Living
                </span>
                <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white group-hover:bg-brand-blue transition-colors shrink-0">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>
            </a>
          </div>

          {/* Frame 04: Wide Cinema Frame Overlapping Frame 03 (Cols 5-13, Row 2) */}
          <div className="lookbook-frame lg:col-start-5 lg:col-end-13 lg:row-start-2 lg:mt-8 relative z-20 aspect-[4/3] md:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-[0_35px_90px_rgba(0,0,0,0.85)] will-change-transform">
            <a
              data-fancybox="gallery"
              href={images[3].main}
              aria-label="Open Lifestyle 4 in lightbox"
              className="group relative block w-full h-full overflow-hidden cursor-zoom-in"
            >
              <picture className="block w-full h-full">
                <source media="(max-width: 768px)" srcSet={images[3].mobileImage || images[3].desktopImage} />
                <img
                  src={images[3].desktopImage || images[3].thumb}
                  alt="Lifestyle 4"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between gap-2">
                <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs uppercase tracking-[0.16em] text-white/90 tabular-nums truncate">
                  04 / 04 · Tension Architecture
                </span>
                <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white group-hover:bg-brand-blue transition-colors shrink-0">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Overlapping Architectural Glass Manifesto Card */}
        <div className="relative z-30 max-w-3xl mt-8 lg:-mt-16 lg:ml-8 p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl bg-[#111520]/90 backdrop-blur-3xl border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.85)]">
          <div className="w-12 h-[2px] bg-brand-green mb-4 sm:mb-5" />
          <p className="text-white/85 text-xs sm:text-base md:text-lg leading-relaxed">
            Based in Makarpura GIDC, Vadodara, Asha Smart Shades provides custom CAD-estimated and precision-engineered architectural shading solutions. We create high-durability tensile membranes, canopies, and retractable awnings to enhance luxury residential, commercial, hospitality, and industrial environments across Gujarat and India.
          </p>
        </div>
      </div>
    </section>
  );
}
