// frontend/src/pages/HomePage.jsx 
import React, { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import HeroSection from '../components/sections/HeroSection';
import TrustSection from '../components/sections/TrustSection';
import ServicesSection from '../components/sections/ServicesSection';
import HowWeWorkSection from '../components/sections/HowWeWorkSection';
import CaseStudiesSection from '../components/sections/CaseStudiesSection';
import IndustriesSection from '../components/sections/IndustriesSection';
import CTASection from '../components/sections/CTASection';

// Error Fallback Component
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
    <p className="text-gray-600 mb-4">{error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
    >
      Try again
    </button>
  </div>
);

// Loading component
const SectionLoader = () => (
  <div className="animate-pulse">
    <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
    <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
  </div>
);

const HomePage = () => {
  useEffect(() => {
    // Update page title and meta for homepage
    document.title = 'SoftDAB | Custom Software Development & Outsourcing Teams';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'SoftDAB provides custom software development and outsourcing teams for US/EU companies. Start in 2 weeks with a risk‑free trial and transparent pricing.';
    }

    // Ensure proper indexing
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = 'index, follow, max-image-preview:large';

    // Schema.org for HomePage
    const homepageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "SoftDAB - Custom Software Development",
      "description": "Custom software development and outsourcing teams for US/EU companies with transparent pricing and flexible engagement models.",
      "url": "https://www.softdab.tech/",
      "mainEntity": {
        "@type": "Organization",
        "name": "SoftDAB",
        "url": "https://www.softdab.tech"
      }
    };

    let schemaScript = document.querySelector('script[data-schema="homepage"]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.setAttribute('data-schema', 'homepage');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(homepageSchema);

    return () => {
      if (schemaScript && schemaScript.parentNode) {
        schemaScript.remove();
      }
    };
  }, []);

  return (
    <>
      {/* КРИТИЧЕСКИЙ HERO - БЕЗ SUSPENSE для мгновенного LCP */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HeroSection />
      </ErrorBoundary>

      {/* Критический выше-сгиба контент - без lazy loading */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <TrustSection />
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SectionLoader />}>
          <ServicesSection />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SectionLoader />}>
          <HowWeWorkSection />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SectionLoader />}>
          <CaseStudiesSection />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SectionLoader />}>
          <IndustriesSection />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SectionLoader />}>
          <CTASection />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default HomePage;