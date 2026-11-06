import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import ProductPage from './pages/ProductPage';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import FABs from './components/FABs';
import { ScrollTrigger, debounce, refreshAfterAssetsLoaded } from './utils/gsap';

export default function App() {
  useEffect(() => {
    const cleanupAssets = refreshAfterAssetsLoaded(document);
    const handleResize = debounce(() => {
      ScrollTrigger.refresh();
    }, 200);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
      cleanupAssets();
    };
  }, []);

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Asha Smart Shades",
    "alternateName": "Asha Industries",
    "description": "Bespoke architectural shading systems, high-performance tensile membranes, motorized smart awnings, and sculpted glazing canopy structures.",
    "url": "https://www.ashasmartshades.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "48, GIDC Rd, Makarpura GIDC, Vadsar",
      "addressLocality": "Vadodara",
      "addressRegion": "Gujarat",
      "postalCode": "390010",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 22.2599,
      "longitude": 73.1951
    },
    "telephone": "+91 95747 20006",
    "priceRange": "$$$$"
  };

  return (
    <Router>
      <PageLoader />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products/:productId" element={<ProductPage />} />
          </Routes>
        </main>
        <Footer />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
        <FABs />
      </div>
    </Router>
  );
}
