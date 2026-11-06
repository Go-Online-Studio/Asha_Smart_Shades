import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import FAQComponent from '../components/FAQ';
import { useWhatsAppLink } from '../hooks/useWhatsAppLink';
import { MessageCircle, ArrowRight, Maximize2 } from 'lucide-react';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import AnimatedHeading from '../components/ui/AnimatedHeading';
import MagneticButton from '../components/ui/MagneticButton';
import { gsap, prefersReducedMotion, refreshAfterAssetsLoaded } from '../utils/gsap';

type MediaItem = string | { desktopImage: string; mobileImage?: string };

const resolveMedia = (item: MediaItem) => {
  if (typeof item === 'string') {
    return { desktopImage: item, mobileImage: item };
  }
  return {
    desktopImage: item.desktopImage,
    mobileImage: item.mobileImage || item.desktopImage,
  };
};

export const productCtaBanner = {
  desktopImage: '/images/CTA_Image.webp',
  mobileImage: '/images/CTA_Image.webp',
};

const productData: Record<string, any> = {
  'retractable-awnings': {
    title: 'Retractable Awnings',
    tagline: 'Precision folding-arm motorized tension frames.',
    description:
      'Our retractable awnings provide dynamic sun protection, seamlessly extending your indoor living spaces into the outdoors. Engineered with marine-grade aluminum and UV-resistant acrylic fabrics, they offer both aesthetic elegance and robust durability.',
    features: [
      'Motorized Operation',
      'Sun & Wind Sensors',
      'Custom Fabric Choices',
      'Integrated LED Lighting',
    ],
    desktopImage: '/images/RetractableAwningsBanner.avif',
    mobileImage: '/images/RetractableAwningsBannerMob.avif',
    image: '/images/RetractableAwningsBanner.avif',
    gallery: [
      { desktopImage: '/images/ProductIntro1.webp', mobileImage: '/images/ProductIntro1.webp' },
      { desktopImage: '/images/Gallery/RetractableAwningsGallery1.webp', mobileImage: '/images/Gallery/RetractableAwningsGallery1.webp' },
      { desktopImage: '/images/Gallery/RetractableAwningsGallery2.avif', mobileImage: '/images/Gallery/RetractableAwningsGallery2.avif' },
      { desktopImage: '/images/Gallery/RetractableAwningsGallery3.webp', mobileImage: '/images/Gallery/RetractableAwningsGallery3.webp' },
      { desktopImage: '/images/Gallery/RetractableAwningsGallery4.webp', mobileImage: '/images/Gallery/RetractableAwningsGallery4.webp' },
      { desktopImage: '/images/Gallery/RetractableAwningsGallery5.avif', mobileImage: '/images/Gallery/RetractableAwningsGallery5.avif' },
      { desktopImage: '/images/Gallery/RetractableAwningsGallery6.avif', mobileImage: '/images/Gallery/RetractableAwningsGallery6.avif' },
      { desktopImage: '/images/Gallery/RetractableAwningsGallery7.avif', mobileImage: '/images/Gallery/RetractableAwningsGallery7.avif' },
      { desktopImage: '/images/Gallery/RetractableAwningsGallery8.webp', mobileImage: '/images/Gallery/RetractableAwningsGallery8.webp' },
    ],
  },
  'glazed-canopies': {
    title: 'Glazed & Fabric Canopies',
    tagline: 'Sculpted cantilever entrance protective shields.',
    description:
      'Designed to make a lasting impression, our glazed and fabric canopies offer superior weather protection while enhancing architectural aesthetics. Perfect for commercial entrances, hotel lobbies, and luxury residences.',
    features: [
      'Tempered Glass Options',
      'High-Tension PVC Fabrics',
      'Custom Steel Frameworks',
      'Weatherproof Seals',
    ],
    desktopImage: '/images/GlazedAndFabricCanopiesBanner.avif',
    mobileImage: '/images/GlazedAndFabricCanopiesBannerMob.avif',
    image: '/images/GlazedAndFabricCanopiesBanner.avif',
    gallery: [
      { desktopImage: '/images/ProductIntro2.webp', mobileImage: '/images/ProductIntro2.webp' },
      { desktopImage: '/images/Gallery/GlazedAndFabricCanopiesGallery1.avif', mobileImage: '/images/Gallery/GlazedAndFabricCanopiesGallery1.avif' },
      { desktopImage: '/images/Gallery/GlazedAndFabricCanopiesGallery2.avif', mobileImage: '/images/Gallery/GlazedAndFabricCanopiesGallery2.avif' },
      { desktopImage: '/images/Gallery/GlazedAndFabricCanopiesGallery3.avif', mobileImage: '/images/Gallery/GlazedAndFabricCanopiesGallery3.avif' },
      { desktopImage: '/images/Gallery/GlazedAndFabricCanopiesGallery4.avif', mobileImage: '/images/Gallery/GlazedAndFabricCanopiesGallery4.avif' },
      { desktopImage: '/images/Gallery/GlazedAndFabricCanopiesGallery5.avif', mobileImage: '/images/Gallery/GlazedAndFabricCanopiesGallery5.avif' },
      { desktopImage: '/images/Gallery/GlazedAndFabricCanopiesGallery6.avif', mobileImage: '/images/Gallery/GlazedAndFabricCanopiesGallery6.avif' },
      { desktopImage: '/images/Gallery/GlazedAndFabricCanopiesGallery7.avif', mobileImage: '/images/Gallery/GlazedAndFabricCanopiesGallery7.avif' },
      { desktopImage: '/images/Gallery/GlazedAndFabricCanopiesGallery8.webp', mobileImage: '/images/Gallery/GlazedAndFabricCanopiesGallery8.webp' },
    ],
  },
  'tensile-membranes': {
    title: 'Tensile Membranes',
    tagline: 'Advanced hyperbolic engineered sailing shapes.',
    description:
      'For expansive coverage and striking visual impact, our tensile membrane structures are unparalleled. Using advanced form-finding software and structural analysis, we create soaring hyperbolic paraboloids and cone structures.',
    features: [
      'PTFE & ETFE Materials',
      'Wide-Span Coverage',
      'Architectural Impact',
      'High Wind Resistance',
    ],
    desktopImage: '/images/TensileMembranesBanner.avif',
    mobileImage: '/images/TensileMembranesBannerMob.avif',
    image: '/images/TensileMembranesBanner.avif',
    gallery: [
      { desktopImage: '/images/ProductIntro3.webp', mobileImage: '/images/ProductIntro3.webp' },
      { desktopImage: '/images/Gallery/TensileMembranesGallery1.webp', mobileImage: '/images/Gallery/TensileMembranesGallery1.webp' },
      { desktopImage: '/images/Gallery/TensileMembranesGallery2.webp', mobileImage: '/images/Gallery/TensileMembranesGallery2.webp' },
      { desktopImage: '/images/Gallery/TensileMembranesGallery3.webp', mobileImage: '/images/Gallery/TensileMembranesGallery3.webp' },
      { desktopImage: '/images/Gallery/TensileMembranesGallery4.webp', mobileImage: '/images/Gallery/TensileMembranesGallery4.webp' },
      { desktopImage: '/images/Gallery/TensileMembranesGallery5.webp', mobileImage: '/images/Gallery/TensileMembranesGallery5.webp' },
      { desktopImage: '/images/Gallery/TensileMembranesGallery6.webp', mobileImage: '/images/Gallery/TensileMembranesGallery6.webp' },
      { desktopImage: '/images/Gallery/TensileMembranesGallery7.webp', mobileImage: '/images/Gallery/TensileMembranesGallery7.webp' },
      { desktopImage: '/images/Gallery/TensileMembranesGallery8.webp', mobileImage: '/images/Gallery/TensileMembranesGallery8.webp' },
    ],
  },
  'gazebos-umbrellas': {
    title: 'Gazebos & Umbrellas',
    tagline: 'Luxury garden frameworks & resort sails.',
    description:
      'Elevate premium estates and resort landscapes with our heavy-duty side-pole umbrellas and custom gazebos. Designed for commercial durability but styled for luxury residential comfort.',
    features: [
      '360-Degree Rotation',
      'Marine-Grade Masts',
      'Water-Repellent Canvas',
      'Minimalist Design',
    ],
    desktopImage: '/images/GazebosAndUmbrellasBanner.avif',
    mobileImage: '/images/GazebosAndUmbrellasBannerMob.avif',
    image: '/images/GazebosAndUmbrellasBanner.avif',
    gallery: [
      { desktopImage: '/images/ProductIntro4.webp', mobileImage: '/images/ProductIntro4.webp' },
      { desktopImage: '/images/Gallery/GazebosAndUmbrellasGallery1.webp', mobileImage: '/images/Gallery/GazebosAndUmbrellasGallery1.webp' },
      { desktopImage: '/images/Gallery/GazebosAndUmbrellasGallery2.webp', mobileImage: '/images/Gallery/GazebosAndUmbrellasGallery2.webp' },
      { desktopImage: '/images/Gallery/GazebosAndUmbrellasGallery3.webp', mobileImage: '/images/Gallery/GazebosAndUmbrellasGallery3.webp' },
      { desktopImage: '/images/Gallery/GazebosAndUmbrellasGallery4.webp', mobileImage: '/images/Gallery/GazebosAndUmbrellasGallery4.webp' },
      { desktopImage: '/images/Gallery/GazebosAndUmbrellasGallery5.webp', mobileImage: '/images/Gallery/GazebosAndUmbrellasGallery5.webp' },
      { desktopImage: '/images/Gallery/GazebosAndUmbrellasGallery6.webp', mobileImage: '/images/Gallery/GazebosAndUmbrellasGallery6.webp' },
    ],
  },
};

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? productData[productId] : null;
  const { getWhatsAppUrl } = useWhatsAppLink('919574720006');
  const pageRef = useRef<HTMLDivElement>(null);

  const otherProducts = Object.entries(productData).filter(([key]) => key !== productId);

  useEffect(() => {
    Fancybox.bind('[data-fancybox="product-gallery"]', {});

    return () => {
      Fancybox.unbind('[data-fancybox="product-gallery"]');
      Fancybox.close();
    };
  }, [productId]);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page || !product || prefersReducedMotion()) return;

    const cleanupAssets = refreshAfterAssetsLoaded(page);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.product-hero-img',
        { scale: 1.12 },
        {
          scale: 1,
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: '.product-hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        '.product-gallery-card',
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.product-gallery-grid',
            start: 'top 84%',
            once: true,
          },
        }
      );
    }, page);

    return () => {
      cleanupAssets();
      ctx.revert();
    };
  }, [productId, product]);

  if (!product) {
    return <Navigate to="/" replace />;
  }

  const leadMedia = product.gallery?.[0] ? resolveMedia(product.gallery[0]) : null;

  return (
    <div ref={pageRef} key={productId} className="bg-brand-light">
      {/* Full-Width Big Banner Image with Dual Desktop/Mobile Picture Support */}
      <section className="product-hero-section relative w-full h-[75vh] sm:h-[82vh] lg:h-[88vh] min-h-[500px] overflow-hidden bg-[#07090e] text-white">
        <picture className="block absolute inset-0 w-full h-full">
          <source
            media="(max-width: 768px)"
            srcSet={product.mobileImage || product.desktopImage || product.image}
          />
          <img
            src={product.desktopImage || product.image}
            alt={product.title}
            fetchPriority="high"
            loading="eager"
            className="product-hero-img w-full h-full object-cover object-center will-change-transform"
          />
        </picture>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/65" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 lg:pb-10 flex flex-col justify-end">
          <div className="max-w-md sm:max-w-lg p-5 sm:p-6 rounded-2xl bg-[#07090e]/75 backdrop-blur-xl border border-white/15 shadow-2xl">
            <span className="uppercase tracking-[0.22em] text-[10px] sm:text-xs text-brand-green font-semibold mb-1.5 block">
              Bespoke Solution
            </span>
            <AnimatedHeading
              as="h1"
              immediate
              className="text-xl sm:text-2xl md:text-3xl font-serif mb-1.5 font-normal tracking-tight leading-snug text-white"
            >
              {product.title}
            </AnimatedHeading>
            <p className="text-xs sm:text-sm text-white/85 font-light leading-relaxed">
              {product.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Engineering Details & Overlapping Lead Visual (Strictly 2 aspect ratios: 4:3 mobile, 16:10 desktop) */}
      <div className="py-16 sm:py-24 md:py-36 bg-brand-light border-b border-brand-charcoal/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Specification Column (5 cols) */}
            <div className="lg:col-span-5 order-2 lg:order-1 min-w-0">
              <AnimatedHeading
                as="h2"
                className="text-2xl sm:text-4xl md:text-5xl font-serif text-brand-charcoal mb-4 sm:mb-6 leading-tight"
              >
                Engineering Details
              </AnimatedHeading>
              <p className="text-brand-charcoal/75 text-sm sm:text-base md:text-lg leading-relaxed mb-7 sm:mb-10">
                {product.description}
              </p>

              <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-brand-charcoal mb-4 sm:mb-5">
                Key Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 sm:mb-10">
                {product.features.map((feature: string, idx: number) => (
                  <div
                    key={idx}
                    className="glass-panel-interactive p-4 sm:p-5 rounded-2xl flex items-baseline gap-3"
                  >
                    <span className="text-xs font-bold tracking-widest text-brand-blue tabular-nums">
                      0{idx + 1}
                    </span>
                    <span className="text-brand-charcoal/90 font-medium text-xs sm:text-sm md:text-base">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <MagneticButton
                href={getWhatsAppUrl(
                  `Hello, I am interested in ${product.title}. Can we discuss a custom estimate?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                className="w-full sm:w-auto py-3"
              >
                <span>Quick WhatsApp Inquiry</span>
                <MessageCircle size={18} />
              </MagneticButton>
            </div>

            {/* Large-Format Sculpted Showcase (7 cols) — Uses exact same 4:3 mobile / 16:10 desktop ratio as Project Gallery */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              {leadMedia && (
                <a
                  data-fancybox="product-gallery"
                  href={leadMedia.desktopImage}
                  className="block aspect-[4/3] md:aspect-[16/10] w-full overflow-hidden relative group rounded-2xl sm:rounded-tl-[4.5rem] sm:rounded-br-[4.5rem] sm:rounded-tr-2xl sm:rounded-bl-2xl shadow-2xl cursor-zoom-in"
                >
                  <picture className="block w-full h-full">
                    <source media="(max-width: 768px)" srcSet={leadMedia.mobileImage} />
                    <img
                      src={leadMedia.desktopImage}
                      alt={`${product.title} Detail`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-6 right-6 glass-panel-dark w-12 h-12 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Project Gallery Section — All items use the exact same 2 aspect ratios (4:3 mobile, 16:10 desktop) */}
      {product.gallery && product.gallery.length > 0 && (
        <div className="py-16 sm:py-24 md:py-32 bg-[#0b0d13] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-16 gap-3">
              <AnimatedHeading
                as="h2"
                className="text-2xl sm:text-5xl md:text-6xl font-serif text-white"
              >
                Project Gallery
              </AnimatedHeading>
              <span className="text-xs uppercase tracking-[0.2em] text-brand-green tabular-nums">
                {product.gallery.length} High-Resolution Views · Click to Expand
              </span>
            </div>

            <div className="product-gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
              {product.gallery.map((entry: MediaItem, idx: number) => {
                const media = resolveMedia(entry);
                const spanClass =
                  idx % 5 === 0
                    ? 'lg:col-span-7 aspect-[4/3] md:aspect-[16/10] rounded-2xl sm:rounded-tl-[4rem] sm:rounded-br-[4rem] sm:rounded-tr-2xl sm:rounded-bl-2xl'
                    : idx % 5 === 1
                    ? 'lg:col-span-5 lg:mt-12 aspect-[4/3] md:aspect-[16/10] rounded-2xl sm:rounded-t-[3.5rem] sm:rounded-b-2xl'
                    : 'lg:col-span-4 aspect-[4/3] md:aspect-[16/10] rounded-2xl';

                return (
                  <a
                    key={idx}
                    data-fancybox="product-gallery"
                    href={media.desktopImage}
                    className={`product-gallery-card group relative block overflow-hidden border border-white/15 shadow-2xl cursor-zoom-in bg-brand-charcoal ${spanClass}`}
                  >
                    <picture className="block w-full h-full">
                      <source media="(max-width: 768px)" srcSet={media.mobileImage} />
                      <img
                        src={media.desktopImage}
                        alt={`${product.title} Gallery ${idx + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <span className="text-xs text-white/90 font-sans tracking-widest tabular-nums">
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>
                      <span className="glass-panel-dark w-10 h-10 rounded-full flex items-center justify-center text-white">
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* More Inspiration Section — Connected to Product Banners (uses desktopImage + mobileImage & 2 aspect ratios) */}
      <div className="py-16 sm:py-24 md:py-32 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10 sm:mb-14">
            <AnimatedHeading
              as="h2"
              className="text-2xl sm:text-4xl md:text-5xl font-serif text-brand-charcoal"
            >
              More Inspiration
            </AnimatedHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start">
            {otherProducts.map(([key, item], idx) => (
              <Link
                key={key}
                to={`/products/${key}`}
                className={`group relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden block rounded-2xl sm:rounded-3xl shadow-xl ${
                  idx === 1 ? 'md:mt-8' : ''
                }`}
              >
                <picture className="block w-full h-full">
                  <source
                    media="(max-width: 768px)"
                    srcSet={item.mobileImage || item.desktopImage || item.image}
                  />
                  <img
                    src={item.desktopImage || item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-charcoal/25 to-transparent" />
                <div className="absolute top-5 left-5 text-xs text-white/75 tracking-widest tabular-nums">
                  0{idx + 1}
                </div>
                <div className="absolute bottom-5 left-5 right-5 flex flex-col text-white z-10">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-serif mb-1.5 group-hover:text-brand-blue transition-colors duration-300">
                    {item.title}
                  </h3>
                  <div className="flex items-center text-brand-green font-medium tracking-widest text-xs uppercase">
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <FAQComponent />

      {/* Final Full-width visual with Dual Desktop/Mobile Picture Support */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="w-full aspect-[4/3] md:aspect-[16/9] max-h-[520px] rounded-2xl sm:rounded-tl-[4.5rem] sm:rounded-br-[4.5rem] sm:rounded-tr-2xl sm:rounded-bl-2xl overflow-hidden relative shadow-2xl">
          <picture className="block w-full h-full">
            <source media="(max-width: 768px)" srcSet={productCtaBanner.mobileImage} />
            <img
              src={productCtaBanner.desktopImage}
              alt={product.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 object-bottom"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-[#07090e]/90 via-brand-charcoal/55 to-transparent flex flex-col items-start justify-center p-6 sm:p-14 md:p-20">
            <AnimatedHeading
              as="h2"
              className="text-white text-2xl sm:text-5xl md:text-6xl font-serif mb-6 sm:mb-8 max-w-xl"
            >
              Ready to transform your space?
            </AnimatedHeading>
            <MagneticButton to="/contact" variant="primary">
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
