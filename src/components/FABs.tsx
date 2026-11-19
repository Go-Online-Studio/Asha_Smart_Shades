import React, { useState, useEffect } from 'react';
import { Phone, ArrowUp } from 'lucide-react';
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
        className="w-10 h-10 sm:w-12 sm:h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_12px_30px_-6px_rgba(37,211,102,0.55)] hover:scale-105 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue overflow-hidden"
        aria-label="WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 176 176"
          className="w-full h-full"
        >
          <g>
            <g data-name="Layer 2">
              <g data-name="09.whatsapp">
                <circle cx="88" cy="88" r="88" fill="#29a71a" opacity="1" data-original="#29a71a" />
                <g fill="#fff">
                  <path
                    d="M126.8 49.2a54.57 54.57 0 0 0-87.42 63.13l-5.79 28.11a2.08 2.08 0 0 0 .33 1.63 2.11 2.11 0 0 0 2.24.87l27.55-6.53A54.56 54.56 0 0 0 126.8 49.2m-8.59 68.56a42.74 42.74 0 0 1-49.22 8l-3.84-1.9-16.89 4 .05-.21 3.5-17-1.88-3.71a42.72 42.72 0 0 1 7.86-49.59 42.73 42.73 0 0 1 60.42 0 2 2 0 0 0 .22.22 42.72 42.72 0 0 1-.22 60.19"
                    fill="#ffffff"
                    opacity="1"
                    data-original="#000000"
                  />
                  <path
                    d="M116.71 105.29c-2.07 3.26-5.34 7.25-9.45 8.24-7.2 1.74-18.25.06-32-12.76l-.17-.15C63 89.41 59.86 80.08 60.62 72.68c.42-4.2 3.92-8 6.87-10.48a3.93 3.93 0 0 1 6.15 1.41l4.45 10a3.91 3.91 0 0 1-.49 4l-2.25 2.92a3.87 3.87 0 0 0-.35 4.32c1.26 2.21 4.28 5.46 7.63 8.47 3.76 3.4 7.93 6.51 10.57 7.57a3.82 3.82 0 0 0 4.19-.88l2.61-2.63a4 4 0 0 1 3.9-1l10.57 3a4 4 0 0 1 2.24 5.91"
                    fill="#ffffff"
                    opacity="1"
                    data-original="#000000"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
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
        className={`w-10 h-10 sm:w-12 sm:h-12 glass-panel-dark text-white rounded-full flex items-center justify-center hover:bg-brand-charcoal transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${isVisible
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
