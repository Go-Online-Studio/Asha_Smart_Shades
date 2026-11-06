import React from 'react';
import { ArrowRight } from 'lucide-react';
import FAQComponent from '../components/FAQ';
import AnimatedHeading from '../components/ui/AnimatedHeading';
import MagneticButton from '../components/ui/MagneticButton';

export const faqImages = {
  banner: {
    desktopImage: '/images/BannerFAQ.webp',
    mobileImage: '/images/BannerFAQ.webp',
  },
  cta: {
    desktopImage: 'https://images.unsplash.com/photo-1522071901873-411886a10004?auto=format&fit=crop&q=80',
    mobileImage: 'https://images.unsplash.com/photo-1522071901873-411886a10004?auto=format&fit=crop&q=80',
  },
};

export default function FAQ() {
  return (
    <div className="bg-brand-light">
      {/* Full-Width Big Banner Image with Dual Desktop/Mobile Picture Support */}
      <section className="relative w-full h-[70vh] sm:h-[78vh] lg:h-[85vh] min-h-[480px] overflow-hidden bg-[#07090e] text-white">
        <picture className="block absolute inset-0 w-full h-full">
          <source media="(max-width: 768px)" srcSet={faqImages.banner.mobileImage} />
          <img
            src={faqImages.banner.desktopImage}
            alt="Outdoor lounge support"
            fetchPriority="high"
            className="w-full h-full object-cover object-center"
          />
        </picture>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/65" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 lg:pb-10 flex flex-col justify-end">
          <div className="max-w-md sm:max-w-lg p-5 sm:p-6 rounded-2xl bg-[#07090e]/75 backdrop-blur-xl border border-white/15 shadow-2xl">
            <span className="inline-block text-[10px] sm:text-xs font-sans font-semibold tracking-[0.22em] uppercase text-brand-green mb-1.5">
              Knowledge Base
            </span>
            <AnimatedHeading
              as="h1"
              immediate
              className="text-white text-xl sm:text-2xl md:text-3xl font-serif mb-2 leading-snug"
            >
              Help &amp; <span className="text-brand-blue italic">Support</span>
            </AnimatedHeading>
            <p className="text-white/85 text-xs sm:text-sm leading-relaxed">
              Everything you need to know about our bespoke tension systems and{' '}
              <span className="text-brand-green font-medium">architectural shading products</span>.
            </p>
          </div>
        </div>
      </section>

      <FAQComponent hideTitle />

      {/* Bottom CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="w-full aspect-[4/3] md:aspect-[16/9] max-h-[440px] rounded-3xl overflow-hidden relative bg-brand-charcoal shadow-2xl">
          <picture className="block w-full h-full">
            <source media="(max-width: 768px)" srcSet={faqImages.cta.mobileImage} />
            <img
              src={faqImages.cta.desktopImage}
              alt="Customer service"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-65"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-[#07090e]/90 via-brand-charcoal/60 to-transparent flex flex-col items-start justify-center p-8 sm:p-12 md:p-16">
            <AnimatedHeading
              as="h3"
              className="text-white text-2xl sm:text-3xl md:text-4xl font-serif mb-6"
            >
              Still have questions?
            </AnimatedHeading>
            <MagneticButton to="/contact" variant="primary">
              <span>Reach Out To Us</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
