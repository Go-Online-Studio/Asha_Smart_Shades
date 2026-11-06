import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { blogPosts } from '../pages/Blog';
import { gsap, prefersReducedMotion, refreshAfterAssetsLoaded } from '../utils/gsap';
import AnimatedHeading from './ui/AnimatedHeading';
import MagneticButton from './ui/MagneticButton';

export default function BlogSection() {
  // Show only the 3 most recent posts on the homepage
  const recentPosts = blogPosts.slice(0, 3);
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const cleanupAssets = refreshAfterAssetsLoaded(section);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.blog-home-card',
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, section);

    return () => {
      cleanupAssets();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-brand-light relative overflow-hidden border-b border-brand-charcoal/8"
    >
      {/* Subtle Architectural Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,rgba(26,26,26,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(26,26,26,0.04)_1px,transparent_1px)] [background-size:5rem_5rem]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Clean Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-16">
          <div>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-blue/10 text-xs font-sans font-semibold uppercase tracking-[0.2em] text-brand-blue mb-4">
              <span>03</span>
              <span aria-hidden="true">·</span>
              <span>Editorial Journal</span>
            </div>
            <AnimatedHeading
              as="h2"
              className="text-3xl sm:text-5xl lg:text-6xl font-serif text-brand-charcoal mb-3 tracking-tight leading-tight"
            >
              Latest <span className="text-brand-blue italic">Insights</span>
            </AnimatedHeading>
            <p className="text-brand-charcoal/70 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed">
              News, case studies, and technical deep-dives into the world of architectural tension systems.
            </p>
          </div>

          <div className="hidden md:block shrink-0">
            <MagneticButton to="/blog" variant="dark">
              <span>View All Posts</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>

        {/* Clean, Balanced 3-Column Professional Editorial Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {recentPosts.map((post, idx) => (
            <Link
              to={`/blog/${post.id}`}
              key={post.id}
              className="blog-home-card group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-brand-charcoal/10 shadow-[0_16px_40px_-15px_rgba(11,3,1,0.07)] hover:shadow-[0_24px_60px_-12px_rgba(42,111,221,0.16)] hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Dual Desktop/Mobile Picture with Consistent 2 Aspect Ratios (4:3 mobile, 16:10 desktop) */}
              <div className="relative aspect-[4/3] md:aspect-[16/10] w-full overflow-hidden bg-brand-charcoal shrink-0">
                <picture className="block w-full h-full">
                  <source
                    media="(max-width: 768px)"
                    srcSet={post.mobileImage || post.desktopImage || post.image}
                  />
                  <img
                    src={post.desktopImage || post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </picture>
                <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#07090e]/75 backdrop-blur-md border border-white/20 text-[11px] font-sans font-semibold tracking-wider uppercase text-white tabular-nums">
                  0{idx + 1} · {post.category}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-brand-charcoal/50 font-medium mb-2.5">
                    {post.date}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif text-brand-charcoal mb-3 leading-snug group-hover:text-brand-blue transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-brand-charcoal/70 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-charcoal/8 flex items-center justify-between">
                  <span className="inline-flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-full bg-brand-light group-hover:bg-brand-blue text-brand-charcoal group-hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300">
                    <span>Read Article &rarr;</span>
                    <span className="w-7 h-7 rounded-full bg-brand-charcoal/10 group-hover:bg-white group-hover:text-brand-blue flex items-center justify-center transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-10 text-center md:hidden">
          <MagneticButton to="/blog" variant="dark">
            <span>View All Posts</span>
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
