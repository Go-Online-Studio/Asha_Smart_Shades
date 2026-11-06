import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import Products from '../components/Products';
import Projects from '../components/Projects';
import GridImages from '../components/GridImages';
import ExploreProducts from '../components/ExploreProducts';
import FAQ from '../components/FAQ';
import Partners from '../components/Partners';
import BlogSection from '../components/BlogSection';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <Products />
      <Projects />
      <ExploreProducts />
      <GridImages />
      <BlogSection />
      <FAQ />
      <Partners />
    </>
  );
}
