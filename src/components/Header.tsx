import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { gsap, prefersReducedMotion } from '../utils/gsap';

const productLinks = [
  {
    index: '01',
    title: 'Retractable Awnings',
    path: '/products/retractable-awnings',
    image: '/images/homeProductDesc2.webp',
    desktopImage: '/images/homeProductDesc2.webp',
    mobileImage: '/images/homeProductDesc2.webp',
  },
  {
    index: '02',
    title: 'Glazed & Fabric Canopies',
    path: '/products/glazed-canopies',
    image: '/images/homeProductDesc3.webp',
    desktopImage: '/images/homeProductDesc3.webp',
    mobileImage: '/images/homeProductDesc3.webp',
  },
  {
    index: '03',
    title: 'Tensile Membranes',
    path: '/products/tensile-membranes',
    image: '/images/homeProductDesc4.webp',
    desktopImage: '/images/homeProductDesc4.webp',
    mobileImage: '/images/homeProductDesc4.webp',
  },
  {
    index: '04',
    title: 'Gazebos & Umbrellas',
    path: '/products/gazebos-umbrellas',
    image: '/images/homeProductDesc1.webp',
    desktopImage: '/images/homeProductDesc1.webp',
    mobileImage: '/images/homeProductDesc1.webp',
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProductsOpen(false);
  }, [location.pathname]);

  // Animate mobile menu items with GSAP staggered entrance
  useLayoutEffect(() => {
    const menuEl = mobileMenuRef.current;
    if (!menuEl || !isMobileMenuOpen || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.mobile-nav-item',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power3.out',
        }
      );
    }, menuEl);

    return () => ctx.revert();
  }, [isMobileMenuOpen]);

  const isActive = (path: string) =>
    path === '/products'
      ? location.pathname.startsWith('/products')
      : location.pathname === path;

  const dockItemClass = (path: string) =>
    `relative px-5 py-2 rounded-full text-xs lg:text-sm font-medium tracking-wider whitespace-nowrap shrink-0 transition-all duration-300 ${
      isActive(path)
        ? 'bg-white text-brand-dark shadow-[0_4px_20px_rgba(255,255,255,0.25)]'
        : 'text-white/80 hover:text-white hover:bg-white/10'
    }`;

  return (
    <header
      className={`fixed left-0 w-full z-50 transition-all duration-500 pointer-events-none ${
        isScrolled ? 'top-3 md:top-4' : 'top-4 md:top-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Zone 1: Floating Architectural Brand Pod */}
        <Link
          to="/"
          className="pointer-events-auto group flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0b0d13]/85 backdrop-blur-2xl border border-white/15 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.45)] hover:border-brand-blue/50 transition-all duration-300 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
        >
          <img
            src="/images/asha-logo_Footer.webp"
            alt="Asha Smart Shades"
            className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Zone 2: Center Floating Glass Pill Dock with Visual Mega-Dropdown */}
        <nav
          aria-label="Main Navigation"
          className="pointer-events-auto hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-[#0b0d13]/85 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]"
        >
          <Link to="/" className={dockItemClass('/')}>
            Home
          </Link>
          <Link to="/about" className={dockItemClass('/about')}>
            About
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <button
              type="button"
              aria-expanded={isProductsOpen}
              aria-haspopup="true"
              onClick={() => setIsProductsOpen((v) => !v)}
              className={`${dockItemClass('/products')} flex items-center gap-1.5 cursor-pointer`}
            >
              <span>Products</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Architectural Visual Mega-Menu Dropdown */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[540px] transition-all duration-300 ${
                isProductsOpen
                  ? 'opacity-100 visible translate-y-0'
                  : 'opacity-0 invisible translate-y-3 pointer-events-none'
              }`}
            >
              <div className="bg-[#0b0d13]/95 backdrop-blur-3xl rounded-2xl p-4 grid grid-cols-2 gap-3 border border-white/15 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.75)]">
                {productLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="group/card relative flex items-center gap-3.5 p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/8 hover:border-brand-blue/50 transition-all duration-300 overflow-hidden"
                  >
                    <div className="w-20 aspect-[16/10] rounded-lg overflow-hidden shrink-0 bg-brand-charcoal">
                      <picture className="block w-full h-full">
                        <source
                          media="(max-width: 768px)"
                          srcSet={item.mobileImage || item.desktopImage || item.image}
                        />
                        <img
                          src={item.desktopImage || item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                        />
                      </picture>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[10px] font-sans tracking-[0.2em] text-brand-green uppercase tabular-nums mb-0.5">
                        {item.index}
                      </span>
                      <span className="block text-sm font-serif text-white group-hover/card:text-brand-blue transition-colors truncate">
                        {item.title}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover/card:text-brand-blue group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all shrink-0 mr-1" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link to="/faq" className={dockItemClass('/faq')}>
            FAQ
          </Link>
          <Link to="/blog" className={dockItemClass('/blog')}>
            Blog
          </Link>
        </nav>

        {/* Zone 3: Floating Magnetic Consultation Pod + Mobile Menu Button */}
        <div className="pointer-events-auto flex items-center gap-3 shrink-0">
          <Link
            to="/contact"
            className="hidden md:inline-flex group items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-brand-blue hover:bg-white text-white hover:text-brand-dark border border-white/20 shadow-[0_16px_40px_-8px_rgba(42,111,221,0.65)] transition-all duration-300 whitespace-nowrap shrink-0"
          >
            <span className="text-xs lg:text-sm font-medium tracking-wider">
              Book Consultation
            </span>
            <span className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-brand-blue group-hover:text-white flex items-center justify-center transition-colors duration-300">
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>

          <button
            type="button"
            className="md:hidden w-12 h-12 rounded-full bg-[#0b0d13]/90 backdrop-blur-2xl border border-white/15 text-white flex items-center justify-center shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Full-Screen Architectural Dark Glass Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="pointer-events-auto md:hidden mt-3 mx-4 rounded-3xl bg-[#0b0d13]/95 backdrop-blur-3xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-white/15 max-h-[84vh] overflow-y-auto"
        >
          <nav className="flex flex-col p-6 space-y-4">
            <div className="mobile-nav-item flex items-center justify-between border-b border-white/10 pb-3">
              <Link
                to="/"
                className="text-white text-2xl font-serif hover:text-brand-blue transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <span className="text-xs text-white/35 tabular-nums">00</span>
            </div>

            <div className="mobile-nav-item flex items-center justify-between border-b border-white/10 pb-3">
              <Link
                to="/about"
                className="text-white text-2xl font-serif hover:text-brand-blue transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <span className="text-xs text-white/35 tabular-nums">01</span>
            </div>

            <div className="mobile-nav-item py-2 border-b border-white/10">
              <div className="text-[11px] uppercase tracking-[0.25em] text-brand-green font-sans mb-3">
                Architectural Systems
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {productLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10"
                  >
                    <picture className="block w-16 aspect-[4/3] rounded-lg overflow-hidden shrink-0">
                      <source
                        media="(max-width: 768px)"
                        srcSet={item.mobileImage || item.desktopImage || item.image}
                      />
                      <img
                        src={item.desktopImage || item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </picture>
                    <span className="text-white/90 text-sm font-serif">{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mobile-nav-item flex items-center justify-between border-b border-white/10 pb-3">
              <Link
                to="/faq"
                className="text-white text-2xl font-serif hover:text-brand-blue transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <span className="text-xs text-white/35 tabular-nums">02</span>
            </div>

            <div className="mobile-nav-item flex items-center justify-between border-b border-white/10 pb-3">
              <Link
                to="/blog"
                className="text-white text-2xl font-serif hover:text-brand-blue transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <span className="text-xs text-white/35 tabular-nums">03</span>
            </div>

            <div className="mobile-nav-item pt-2">
              <Link
                to="/contact"
                className="flex items-center justify-between w-full bg-brand-blue text-white pl-6 pr-2.5 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-white hover:text-brand-dark active:scale-95 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Book Consultation</span>
                <span className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
