import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../utils/gsap';

type Variant = 'primary' | 'dark' | 'light' | 'outline' | 'outline-light' | 'whatsapp';

interface MagneticButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: Variant;
  className?: string;
  strength?: number;
  ariaLabel?: string;
}

const variantClasses: Record<
  Variant,
  {
    base: string;
    fill: string;
    hoverText: string;
    orb: string;
    orbHover: string;
  }
> = {
  primary: {
    base: 'bg-brand-blue text-white border border-white/20 shadow-[0_10px_30px_-8px_rgba(42,111,221,0.65)] hover:shadow-[0_14px_38px_-6px_rgba(23,190,116,0.55)]',
    fill: 'bg-gradient-to-r from-[#0b0d13] via-[#101826] to-brand-blue',
    hoverText: 'group-hover:text-white',
    orb: 'bg-white/20 text-white',
    orbHover: 'group-hover:bg-brand-green group-hover:text-[#07090e]',
  },
  dark: {
    base: 'bg-[#0b0d13] text-white border border-white/15 shadow-[0_10px_28px_-8px_rgba(0,0,0,0.5)] hover:shadow-[0_14px_36px_-6px_rgba(42,111,221,0.45)]',
    fill: 'bg-brand-blue',
    hoverText: 'group-hover:text-white',
    orb: 'bg-white/15 text-white',
    orbHover: 'group-hover:bg-white group-hover:text-[#07090e]',
  },
  light: {
    base: 'bg-white text-brand-charcoal border border-brand-charcoal/10 shadow-md hover:shadow-xl',
    fill: 'bg-brand-blue',
    hoverText: 'group-hover:text-white',
    orb: 'bg-brand-charcoal/10 text-brand-charcoal',
    orbHover: 'group-hover:bg-white group-hover:text-brand-blue',
  },
  outline: {
    base: 'bg-white/75 backdrop-blur-xl text-brand-charcoal border border-brand-charcoal/20 shadow-sm',
    fill: 'bg-[#0b0d13]',
    hoverText: 'group-hover:text-white',
    orb: 'bg-brand-charcoal/10 text-brand-charcoal',
    orbHover: 'group-hover:bg-brand-blue group-hover:text-white',
  },
  'outline-light': {
    base: 'bg-white/10 backdrop-blur-xl text-white border border-white/25',
    fill: 'bg-white',
    hoverText: 'group-hover:text-brand-charcoal',
    orb: 'bg-white/20 text-white',
    orbHover: 'group-hover:bg-brand-blue group-hover:text-white',
  },
  whatsapp: {
    base: 'bg-[#0b0d13] text-white border border-white/15 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)] hover:shadow-[0_14px_38px_-6px_rgba(23,190,116,0.55)]',
    fill: 'bg-[#17be74]',
    hoverText: 'group-hover:text-white',
    orb: 'bg-[#25D366]/20 text-[#25D366]',
    orbHover: 'group-hover:bg-white group-hover:text-[#07090e]',
  },
};

export default function MagneticButton({
  children,
  to,
  href,
  target,
  rel,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  strength = 0.24,
  ariaLabel,
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    const inner = contentRef.current;
    if (!el || !inner || prefersReducedMotion()) return;

    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    const innerXTo = gsap.quickTo(inner, 'x', { duration: 0.4, ease: 'power3.out' });
    const innerYTo = gsap.quickTo(inner, 'y', { duration: 0.4, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
      innerXTo(relX * (strength * 0.4));
      innerYTo(relY * (strength * 0.4));
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      innerXTo(0);
      innerYTo(0);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  const v = variantClasses[variant];

  const childArray = React.Children.toArray(children);
  const iconChild = childArray.find(
    (c) => React.isValidElement(c) && typeof c.type !== 'string'
  );
  const textChildren = childArray.filter((c) => c !== iconChild);

  const isFullWidth = className.includes('w-full');
  const sharedClasses = `group relative inline-flex items-center justify-between overflow-hidden rounded-full pl-4 sm:pl-6 pr-2 py-2 max-w-full text-xs md:text-sm font-medium tracking-wider transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 cursor-pointer ${v.base} ${className}`;

  const innerMarkup = (
    <>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 scale-x-0 origin-left rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 ${v.fill}`}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-70 group-hover:opacity-100 transition-opacity"
      />
      <span
        ref={contentRef}
        className={`relative z-10 inline-flex items-center justify-between gap-2.5 sm:gap-3.5 w-full min-w-0 transition-colors duration-300 ${v.hoverText}`}
      >
        <span className="inline-flex items-center gap-2 font-sans font-semibold tracking-[0.08em] sm:tracking-[0.14em] uppercase text-[11px] sm:text-xs truncate">
          {textChildren.length > 0 ? textChildren : children}
        </span>
        <span
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:translate-x-0.5 group-active:scale-90 ${v.orb} ${v.orbHover}`}
        >
          {iconChild ? iconChild : <ArrowUpRight className="w-4 h-4" />}
        </span>
      </span>
    </>
  );

  return (
    <div
      ref={wrapperRef}
      className={`${isFullWidth ? 'block w-full' : 'inline-block'} max-w-full will-change-transform`}
    >
      {to ? (
        <Link to={to} onClick={onClick as any} className={sharedClasses} aria-label={ariaLabel}>
          {innerMarkup}
        </Link>
      ) : href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          onClick={onClick as any}
          className={sharedClasses}
          aria-label={ariaLabel}
        >
          {innerMarkup}
        </a>
      ) : (
        <button type={type} onClick={onClick as any} className={sharedClasses} aria-label={ariaLabel}>
          {innerMarkup}
        </button>
      )}
    </div>
  );
}
