import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from './Blog';
import AnimatedHeading from '../components/ui/AnimatedHeading';
import MagneticButton from '../components/ui/MagneticButton';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <article className="bg-brand-light min-h-screen">
      {/* Full-Width Big Banner Image with Dual Desktop/Mobile Picture Support */}
      <section className="relative w-full h-[70vh] sm:h-[78vh] lg:h-[85vh] min-h-[480px] overflow-hidden bg-[#07090e] text-white">
        <picture className="block absolute inset-0 w-full h-full">
          <source
            media="(max-width: 768px)"
            srcSet={post.mobileImage || post.desktopImage || post.image}
          />
          <img
            src={post.desktopImage || post.image}
            alt={post.title}
            fetchPriority="high"
            className="w-full h-full object-cover object-center"
          />
        </picture>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/70" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 lg:pb-10 flex flex-col justify-end">
          <div className="max-w-lg sm:max-w-xl p-5 sm:p-6 rounded-2xl bg-[#07090e]/75 backdrop-blur-xl border border-white/15 shadow-2xl">
            <div className="inline-flex items-center gap-2.5 uppercase tracking-[0.2em] text-[10px] sm:text-xs text-brand-green font-semibold mb-2">
              <span>{post.category}</span>
              <span aria-hidden="true" className="text-white/30">&bull;</span>
              <span className="text-white/75">{post.date}</span>
            </div>
            <AnimatedHeading
              as="h1"
              immediate
              className="text-xl sm:text-2xl md:text-3xl font-serif text-white leading-snug tracking-tight"
            >
              {post.title}
            </AnimatedHeading>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="prose prose-lg text-brand-charcoal/80 max-w-none">
          <p className="lead text-xl sm:text-2xl md:text-3xl text-brand-charcoal font-serif leading-snug mb-10">
            {post.excerpt}
          </p>
          <p className="mb-6 leading-relaxed">
            In the evolving landscape of architectural design, the integration of exterior shading systems has shifted from an afterthought to a core component of building performance. Modern structures demand solutions that not only protect against the elements but also contribute to the overall aesthetic and energy efficiency of the space.
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-charcoal mt-14 mb-6">
            Engineering and Material Innovation
          </h2>
          <p className="mb-6 leading-relaxed">
            The use of high-performance materials, such as PVC-coated polyesters and ETFE films, has revolutionized what is possible. These materials offer unprecedented strength-to-weight ratios, allowing for sweeping, unsupported spans that were previously impossible with traditional construction methods.
          </p>
          <p className="mb-6 leading-relaxed">
            Furthermore, the integration of motorized systems and smart sensors means these structures can dynamically respond to environmental conditions—retracting during high winds or extending during peak sunlight hours to optimize interior temperatures.
          </p>
          <blockquote className="glass-panel rounded-3xl p-8 md:p-10 italic text-xl sm:text-2xl md:text-3xl my-12 font-serif text-brand-charcoal leading-snug">
            &ldquo;The synergy between structural integrity and aesthetic lightness is the hallmark of modern tension architecture.&rdquo;
          </blockquote>
          <p className="leading-relaxed">
            As we look to the future, the focus will increasingly be on sustainability and intelligent integration, ensuring that every shading solution adds measurable value to the built environment.
          </p>
        </div>

        <div className="mt-16 pt-10 border-t border-brand-charcoal/10 flex justify-start">
          <MagneticButton to="/blog" variant="outline">
            <span>&larr; Back to all articles</span>
            <ArrowLeft className="w-4 h-4" />
          </MagneticButton>
        </div>
      </div>
    </article>
  );
}
