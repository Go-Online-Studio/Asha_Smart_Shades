import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { useWhatsAppLink } from '../hooks/useWhatsAppLink';

export default function FABs() {
  const [isVisible, setIsVisible] = useState(false);
  const { getWhatsAppUrl } = useWhatsAppLink('919574720006');

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-4 right-3.5 sm:bottom-5 sm:right-5 z-50 flex flex-col gap-2.5 sm:gap-3">
      <a
        href={getWhatsAppUrl('Hello! I would like to know more about your products.')}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 sm:w-12 sm:h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_12px_30px_-6px_rgba(37,211,102,0.55)] hover:scale-105 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
      </a>
      <a
        href="tel:+919574720006"
        className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-blue text-white rounded-full flex items-center justify-center shadow-[0_12px_30px_-6px_rgba(42,111,221,0.55)] hover:scale-105 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
        aria-label="Phone"
      >
        <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
      </a>
      <button
        type="button"
        onClick={scrollToTop}
        className={`w-10 h-10 sm:w-12 sm:h-12 glass-panel-dark text-white rounded-full flex items-center justify-center hover:bg-brand-charcoal transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
}
