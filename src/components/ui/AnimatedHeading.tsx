import React, { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../../utils/gsap';

interface AnimatedHeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  triggerStart?: string;
  immediate?: boolean;
}

/**
 * React-safe animated heading reveal using masked line/element transitions
 * inside useLayoutEffect so React Router route unmounts never conflict with
 * direct third-party DOM node replacements.
 */
export default function AnimatedHeading({
  as: Tag = 'h2',
  children,
  className = '',
  delay = 0,
  stagger = 0.06,
  triggerStart = 'top 88%',
  immediate = false,
}: AnimatedHeadingProps) {
  const elRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = elRef.current;
    const inner = innerRef.current;
    if (!el || !inner || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.set(inner, {
        yPercent: 100,
        opacity: 0,
        rotateZ: 1.2,
      });

      const animConfig: gsap.TweenVars = {
        yPercent: 0,
        opacity: 1,
        rotateZ: 0,
        duration: 0.95,
        delay,
        ease: 'power3.out',
      };

      if (!immediate) {
        animConfig.scrollTrigger = {
          trigger: el,
          start: triggerStart,
          toggleActions: 'play none none none',
          once: true,
        };
      }

      gsap.to(inner, animConfig);
    }, el);

    return () => {
      ctx.revert();
    };
  }, [delay, stagger, triggerStart, immediate]);

  return (
    <Tag ref={elRef as any} className={`overflow-hidden ${className}`}>
      <span ref={innerRef} className="block will-change-transform">
        {children}
      </span>
    </Tag>
  );
}
