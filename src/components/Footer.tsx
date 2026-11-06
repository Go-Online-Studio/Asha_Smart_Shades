import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useWhatsAppLink } from '../hooks/useWhatsAppLink';

export default function Footer() {
  const { getWhatsAppUrl } = useWhatsAppLink('919574720006');

  return (
    <footer className="bg-brand-dark text-white pt-16 sm:pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
      {/* Subtle architectural grid lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:6rem_6rem]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 pb-12 sm:pb-16 border-b border-white/10 text-center md:text-left">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center md:items-start">
            <Link to="/" className="mb-5 inline-block">
              <img
                src="/images/asha-logo_Footer.webp"
                alt="Asha Smart Shades Logo"
                className="h-10 md:h-12 w-auto object-contain mx-auto md:mx-0"
              />
            </Link>
            <p className="text-white/65 text-sm leading-relaxed max-w-sm">
              Architectural Tension Systems &amp; Intelligent Exterior Shading. Engineered for precision, crafted for elegance.
            </p>
          </div>

          {/* Solutions (3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-center md:items-start">
            <h5 className="uppercase tracking-[0.2em] text-xs font-semibold mb-4 sm:mb-6 text-white/90">
              Solutions
            </h5>
            <ul className="space-y-3 text-white/65 text-sm flex flex-col items-center md:items-start">
              <li>
                <Link to="/products/retractable-awnings" className="hover:text-brand-blue transition-colors inline-flex items-center gap-1 group">
                  <span>Retractable Awnings</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline" />
                </Link>
              </li>
              <li>
                <Link to="/products/glazed-canopies" className="hover:text-brand-blue transition-colors inline-flex items-center gap-1 group">
                  <span>Glazed Canopies</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline" />
                </Link>
              </li>
              <li>
                <Link to="/products/tensile-membranes" className="hover:text-brand-blue transition-colors inline-flex items-center gap-1 group">
                  <span>Tensile Membranes</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline" />
                </Link>
              </li>
              <li>
                <Link to="/products/gazebos-umbrellas" className="hover:text-brand-blue transition-colors inline-flex items-center gap-1 group">
                  <span>Gazebos &amp; Umbrellas</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company (2 cols) */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start">
            <h5 className="uppercase tracking-[0.2em] text-xs font-semibold mb-4 sm:mb-6 text-white/90">
              Company
            </h5>
            <ul className="space-y-3 text-white/65 text-sm flex flex-col items-center md:items-start">
              <li>
                <Link to="/about" className="hover:text-brand-blue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-brand-blue transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-brand-blue transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-blue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & NAP (3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-center md:items-start">
            <h5 className="uppercase tracking-[0.2em] text-xs font-semibold mb-4 sm:mb-6 text-white/90">
              Visit Workshop
            </h5>
            <address className="not-italic text-white/65 text-sm leading-relaxed max-w-xs">
              <p>48, GIDC Rd, Makarpura GIDC, Vadsar, Vadodara, Gujarat 390010</p>
            </address>
            <div className="mt-5 space-y-2.5 flex flex-col items-center md:items-start">
              <a
                href="mailto:Contact@Ashasmartshades.Com"
                className="text-sm text-white/80 hover:text-brand-blue block transition-colors break-all"
              >
                Contact@Ashasmartshades.Com
              </a>
              <a
                href="tel:+919574720006"
                className="text-sm text-white/80 hover:text-brand-blue block transition-colors tabular-nums"
              >
                +91 95747 20006
              </a>
              <a
                href={getWhatsAppUrl('Hello! I would like to make an inquiry.')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand-green hover:text-white inline-flex items-center gap-1.5 transition-colors pt-1"
              >
                <span>WhatsApp Us</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-center md:justify-between items-center text-xs md:text-sm text-white/45 text-center gap-4">
          <p className="max-w-md md:max-w-none">
            &copy; {new Date().getFullYear()} All rights reserved by Asha Smart Shades. Designed and Developed by{' '}
            <a
              href="https://shriiitrackingsolution.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-brand-blue transition-colors"
            >
              <b>Shriii&nbsp;Tracking&nbsp;Solution</b>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
