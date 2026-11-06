import React, { useState, useRef, useLayoutEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../utils/gsap';
import AnimatedHeading from './ui/AnimatedHeading';

const faqs = [
  {
    question: "How do I request a custom CAD estimate?",
    answer: "You can request a custom CAD estimate by booking a consultation through our website or contacting us directly via WhatsApp. Our engineering team will assess your site dimensions and architectural requirements before providing a detailed preliminary model."
  },
  {
    question: "What materials do you use for tensile membranes?",
    answer: "We use high-performance architectural fabrics, including PVC-coated polyester, PTFE-coated fiberglass, and ETFE films. These materials are engineered to withstand extreme weather conditions while maintaining their aesthetic appeal and structural tension."
  },
  {
    question: "Do you handle installations outside of Vadodara?",
    answer: "Yes. While our primary workshop facility is located in Makarpura GIDC, Vadodara, our installation teams operate across Gujarat and undertake significant commercial projects nationwide."
  },
  {
    question: "What is the typical lifespan of a motorized awning?",
    answer: "Our motorized retractable awnings are built with marine-grade aluminum and UV-resistant acrylic fabrics. With standard maintenance, the structural frames last 15-20 years, while the fabric typically offers a 10-year performance guarantee."
  },
  {
    question: "Can these structures withstand heavy monsoon rains?",
    answer: "Absolutely. All our solutions, particularly the motorized awnings and tensile membranes, are engineered for high-performance weather resistance. They feature integrated water drainage systems to ensure no water pooling occurs during heavy monsoons."
  },
  {
    question: "Do you offer smart home integration for motorized products?",
    answer: "Yes, our motorized bioclimatic pergolas and retractable awnings can be integrated with modern home automation systems. You can control them via smartphone apps, remote controls, or wind/sun sensors that automatically adjust the shades based on weather."
  },
  {
    question: "How much maintenance do tensile membranes require?",
    answer: "Very little. Most architectural fabrics we use are treated with self-cleaning topcoats (like PVDF or TiO2) which repel dirt. Usually, a biannual wash with mild soapy water and a soft brush is sufficient to keep them looking pristine."
  },
  {
    question: "Are your products suitable for commercial and hospitality spaces?",
    answer: "Yes, a significant portion of our portfolio consists of B2B projects for hotels, restaurants, corporate parks, and educational institutions. We specialize in large-span shading solutions tailored for commercial usability and aesthetics."
  }
];

interface AccordionItemProps {
  key?: React.Key;
  faq: { question: string; answer: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ faq, index, isOpen, onToggle }: AccordionItemProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    const body = bodyRef.current;
    const text = textRef.current;
    if (!body || !text) return;

    if (prefersReducedMotion()) {
      body.style.height = isOpen ? 'auto' : '0px';
      body.style.opacity = isOpen ? '1' : '0';
      return;
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      gsap.set(body, {
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0,
      });
      gsap.set(text, {
        y: isOpen ? 0 : 10,
        opacity: isOpen ? 1 : 0,
      });
      return;
    }

    if (isOpen) {
      gsap.killTweensOf([body, text]);
      gsap.to(body, {
        height: 'auto',
        opacity: 1,
        duration: 0.45,
        ease: 'power3.out',
      });
      gsap.fromTo(
        text,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          delay: 0.05,
          ease: 'power3.out',
        }
      );
    } else {
      gsap.killTweensOf([body, text]);
      gsap.to(text, {
        y: 6,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      });
      gsap.to(body, {
        height: 0,
        opacity: 0,
        duration: 0.38,
        ease: 'power3.inOut',
      });
    }
  }, [isOpen]);

  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-btn-${index}`;

  return (
    <div
      className={`faq-glass-item rounded-2xl overflow-hidden transition-all duration-300 border ${
        isOpen
          ? 'bg-white border-brand-blue/45 shadow-[0_18px_45px_-12px_rgba(42,111,221,0.16)]'
          : 'bg-white/80 backdrop-blur-xl border-brand-charcoal/10 hover:border-brand-blue/30 hover:bg-white shadow-sm'
      }`}
    >
      <button
        id={buttonId}
        type="button"
        className="w-full min-h-[76px] lg:min-h-[88px] px-5 sm:px-7 py-4 sm:py-5 text-left flex justify-between items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue cursor-pointer"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <div className="flex items-center gap-3.5 sm:gap-4 pr-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-sans font-bold tracking-widest tabular-nums transition-colors duration-300 shrink-0 ${
              isOpen
                ? 'bg-brand-blue text-white'
                : 'bg-brand-charcoal/6 text-brand-charcoal/60'
            }`}
          >
            {(index + 1).toString().padStart(2, '0')}
          </span>
          <span
            className={`font-serif text-base sm:text-lg md:text-xl leading-snug transition-colors duration-300 ${
              isOpen ? 'text-brand-blue' : 'text-brand-charcoal'
            }`}
          >
            {faq.question}
          </span>
        </div>

        <div
          className={`w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center border transition-all duration-300 ${
            isOpen
              ? 'border-brand-blue bg-brand-blue text-white rotate-180'
              : 'border-brand-charcoal/15 bg-brand-light text-brand-charcoal'
          }`}
        >
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        ref={bodyRef}
        className="overflow-hidden h-0 opacity-0"
      >
        <div className="px-5 sm:px-7 pb-6 pt-3 border-t border-brand-charcoal/8">
          <p
            ref={textRef}
            className="text-brand-charcoal/75 text-sm sm:text-base leading-relaxed"
          >
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ({ hideTitle }: { hideTitle?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : true
  );
  const sectionRef = useRef<HTMLElement>(null);

  React.useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-glass-item',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 84%',
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const leftColumnFaqs = faqs
    .map((faq, index) => ({ faq, index }))
    .filter(({ index }) => index % 2 === 0);

  const rightColumnFaqs = faqs
    .map((faq, index) => ({ faq, index }))
    .filter(({ index }) => index % 2 === 1);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-brand-light relative overflow-hidden"
    >
      {/* Subtle ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-brand-blue/8 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-brand-green/8 blur-[110px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {!hideTitle && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <div>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-blue/10 text-xs font-sans font-semibold uppercase tracking-[0.2em] text-brand-blue mb-4">
                <span>04</span>
                <span aria-hidden="true">·</span>
                <span>Technical Brief</span>
              </div>
              <AnimatedHeading
                as="h2"
                className="text-3xl sm:text-4xl lg:text-5xl font-serif text-brand-charcoal tracking-tight leading-tight"
              >
                Frequently Asked Questions
              </AnimatedHeading>
            </div>

            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-brand-charcoal/10 shadow-sm self-start md:self-auto">
              <span className="text-xs uppercase tracking-[0.18em] text-brand-charcoal/60">
                Active Topic
              </span>
              <span className="text-sm font-sans font-bold text-brand-blue tabular-nums">
                {openIndex !== null ? `0${openIndex + 1}` : '—'} / 0{faqs.length}
              </span>
            </div>
          </div>
        )}

        {/* Independent 2-Column Stack on Desktop (no cross-column row stretching gaps), Sequential on Mobile */}
        {isDesktop ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 items-start">
            <div className="flex flex-col gap-4 sm:gap-5">
              {leftColumnFaqs.map(({ faq, index }) => (
                <AccordionItem
                  key={index}
                  faq={faq}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
            </div>
            <div className="flex flex-col gap-4 sm:gap-5">
              {rightColumnFaqs.map(({ faq, index }) => (
                <AccordionItem
                  key={index}
                  faq={faq}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 sm:gap-5">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
