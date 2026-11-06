import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import AnimatedHeading from '../components/ui/AnimatedHeading';
import { gsap, prefersReducedMotion, refreshAfterAssetsLoaded } from '../utils/gsap';

export interface BlogPostItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  desktopImage: string;
  mobileImage: string;
}

export const blogBanner = {
  desktopImage: '/images/BlogPost1.avif',
  mobileImage: '/images/BlogPost1.avif',
};

export const blogPosts: BlogPostItem[] = [
  {
    id: 'future-of-tensile-architecture',
    title: 'The Future of Tensile Architecture in Commercial Spaces',
    excerpt: 'Exploring how lightweight membrane structures are redefining modern architectural landscapes and offering sustainable shading solutions.',
    date: 'August 12, 2024',
    category: 'Architecture',
    image: '/images/BlogPost1.avif',
    desktopImage: '/images/BlogPost1.avif',
    mobileImage: '/images/BlogPost1.avif',
  },
  {
    id: 'choosing-right-awning-fabric',
    title: 'How to Choose the Right Fabric for Your Motorized Awning',
    excerpt: 'A comprehensive guide to selecting between acrylic, polyester, and PVC-coated fabrics for maximum durability and UV protection.',
    date: 'July 28, 2024',
    category: 'Materials',
    image: '/images/BlogPost2.avif',
    desktopImage: '/images/BlogPost2.avif',
    mobileImage: '/images/BlogPost2.avif',
  },
  {
    id: 'bioclimatic-pergolas-explained',
    title: 'Bioclimatic Pergolas: Intelligent Temperature Regulation',
    excerpt: 'Understanding the mechanics behind adjustable louvered roofs and how they create microclimates for year-round outdoor comfort.',
    date: 'July 15, 2024',
    category: 'Technology',
    image: '/images/BlogPost3.avif',
    desktopImage: '/images/BlogPost3.avif',
    mobileImage: '/images/BlogPost3.avif',
  },
  {
    id: 'wind-resistance-standards',
    title: 'Understanding Wind Load Resistance in Exterior Shading',
    excerpt: 'Why the Beaufort scale matters when engineering canopies and how Asha Industries ensures structural integrity during extreme weather.',
    date: 'June 30, 2024',
    category: 'Engineering',
    image: '/images/BlogPost4.avif',
    desktopImage: '/images/BlogPost4.avif',
    mobileImage: '/images/BlogPost4.avif',
  },
  {
    id: 'luxury-resort-shading-trends',
    title: '2024 Design Trends for Luxury Resort Shading',
    excerpt: 'From minimalist side-pole umbrellas to expansive stretch tents, discover what high-end hospitality venues are adopting this year.',
    date: 'June 10, 2024',
    category: 'Design Trends',
    image: '/images/BlogPost5.avif',
    desktopImage: '/images/BlogPost5.avif',
    mobileImage: '/images/BlogPost5.avif',
  },
];

export default function Blog() {
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page || prefersReducedMotion()) return;

    const cleanupAssets = refreshAfterAssetsLoaded(page);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.blog-grid-card',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.blog-grid-container',
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, page);

    return () => {
      cleanupAssets();
      ctx.revert();
    };
  }, []);

  const [featuredPost, ...restPosts] = blogPosts;

  return (
    <div ref={pageRef} className="bg-brand-light min-h-screen">
      {/* Full-Width Big Banner Image with Dual Desktop/Mobile Picture Support */}
      <section className="relative w-full h-[70vh] sm:h-[78vh] lg:h-[85vh] min-h-[480px] overflow-hidden bg-[#07090e] text-white">
        <picture className="block absolute inset-0 w-full h-full">
          <source media="(max-width: 768px)" srcSet={blogBanner.mobileImage || blogBanner.desktopImage} />
          <img
            src={blogBanner.desktopImage}
            alt="Insights & Engineering"
            fetchPriority="high"
            className="w-full h-full object-cover object-center"
          />
        </picture>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/65" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 lg:pb-10 flex flex-col justify-end">
          <div className="max-w-md sm:max-w-lg p-5 sm:p-6 rounded-2xl bg-[#07090e]/75 backdrop-blur-xl border border-white/15 shadow-2xl">
            <span className="inline-block text-[10px] sm:text-xs font-sans font-semibold tracking-[0.22em] uppercase text-brand-green mb-1.5">
              Editorial Journal
            </span>
            <AnimatedHeading
              as="h1"
              immediate
              className="text-xl sm:text-2xl md:text-3xl font-serif text-white tracking-tight leading-snug mb-2"
            >
              Insights &amp; Engineering
            </AnimatedHeading>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              News, case studies, and technical deep-dives into the world of architectural tension systems.
            </p>
          </div>
        </div>
      </section>

      {/* Clean, Professional Editorial Blog Showcase */}
      <div className="blog-grid-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 space-y-12">
        {/* Featured Lead Article — Uses the exact same 2 aspect ratios (aspect-[4/3] mobile, aspect-[16/10] desktop) */}
        {featuredPost && (
          <Link
            to={`/blog/${featuredPost.id}`}
            className="blog-grid-card group grid grid-cols-1 lg:grid-cols-12 items-center bg-white rounded-3xl overflow-hidden border border-brand-charcoal/10 shadow-[0_20px_50px_-15px_rgba(11,3,1,0.08)] hover:shadow-[0_28px_65px_-12px_rgba(42,111,221,0.16)] transition-all duration-300"
          >
            <div className="lg:col-span-7 aspect-[4/3] md:aspect-[16/10] w-full overflow-hidden relative bg-brand-charcoal">
              <picture className="block w-full h-full">
                <source
                  media="(max-width: 768px)"
                  srcSet={featuredPost.mobileImage || featuredPost.desktopImage || featuredPost.image}
                />
                <img
                  src={featuredPost.desktopImage || featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </picture>
              <span className="absolute top-5 left-5 px-4 py-1.5 rounded-full bg-[#07090e]/75 backdrop-blur-md border border-white/20 text-white text-xs font-sans font-semibold uppercase tracking-widest">
                Featured Article
              </span>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2.5 text-xs uppercase tracking-widest text-brand-green font-semibold mb-4">
                  <span className="px-3 py-1 rounded-full bg-brand-green/10 text-brand-green">
                    {featuredPost.category}
                  </span>
                  <span aria-hidden="true" className="text-brand-charcoal/30">·</span>
                  <span className="text-brand-charcoal/55">{featuredPost.date}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-brand-charcoal mb-4 leading-snug group-hover:text-brand-blue transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-brand-charcoal/70 text-sm sm:text-base leading-relaxed mb-8">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-5 border-t border-brand-charcoal/10 flex items-center justify-between">
                <span className="inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-brand-light group-hover:bg-brand-blue text-brand-charcoal group-hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300">
                  <span>Read Article &rarr;</span>
                  <span className="w-7 h-7 rounded-full bg-brand-charcoal/10 group-hover:bg-white group-hover:text-brand-blue flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Uniform, Properly Proportioned 2-Column Article Grid (aspect-[4/3] mobile, aspect-[16/10] desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {restPosts.map((post, idx) => (
            <Link
              to={`/blog/${post.id}`}
              key={post.id}
              className="blog-grid-card group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-brand-charcoal/10 shadow-[0_16px_40px_-15px_rgba(11,3,1,0.07)] hover:shadow-[0_24px_60px_-12px_rgba(42,111,221,0.15)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-[4/3] md:aspect-[16/10] w-full overflow-hidden bg-brand-charcoal relative shrink-0">
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
                <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#07090e]/75 backdrop-blur-md border border-white/15 text-white text-[11px] font-sans font-semibold uppercase tracking-wider">
                  0{idx + 2} · {post.category}
                </span>
              </div>

              <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-brand-charcoal/50 font-medium mb-3">
                    {post.date}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif text-brand-charcoal mb-3 leading-snug group-hover:text-brand-blue transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-brand-charcoal/70 text-sm sm:text-base leading-relaxed mb-6">
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
      </div>
    </div>
  );
}
