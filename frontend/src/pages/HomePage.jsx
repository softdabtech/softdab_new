// frontend/src/pages/HomePage.jsx 
import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import HeroSection from '../components/sections/HeroSection';
import TrustSection from '../components/sections/TrustSection';
import ServicesSection from '../components/sections/ServicesSection';
import HowWeWorkSection from '../components/sections/HowWeWorkSection';
import CaseStudiesSection from '../components/sections/CaseStudiesSection';
import IndustriesSection from '../components/sections/IndustriesSection';
import CTASection from '../components/sections/CTASection';
// import { mockData } from '../data/mockData'; 

// Constants for SEO
const PAGE_TITLE = 'SoftDAB | Custom Software Development & Dedicated Teams';
const PAGE_DESCRIPTION = 'Custom software development and dedicated teams from a partner with 8 years in IT. Serving US and EU businesses. Start in ~2 weeks with a risk-free trial.';

// Schema data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SoftDAB",
  "url": "https://www.softdab.tech",
  "logo": "https://www.softdab.tech/logo.png",
  "foundingDate": "2017",
  "description": "Custom software development and dedicated teams for US and EU businesses. 8+ years delivering scalable solutions.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "UA",
    "addressLocality": "Kyiv"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@softdab.tech",
    "contactType": "Customer Service",
    "availableLanguage": ["English", "Ukrainian"]
  },
  "sameAs": [
    "https://linkedin.com/company/softdab",
    "https://twitter.com/softdab"
  ],
  "areaServed": [
    {
      "@type": "Place",
      "name": "United States"
    },
    {
      "@type": "Place",
      "name": "European Union"
    }
  ],
  "knowsAbout": [
    "Custom Software Development",
    "Dedicated Development Teams",
    "Outsourcing",
    "Outstaffing",
    "Web Development",
    "Mobile Development"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "SoftDAB",
  "url": "https://www.softdab.tech",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.softdab.tech/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

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
  return (
    // 👇 ИСПРАВЛЕН ОТКРЫВАЮЩИЙ ТЕГ
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content="https://www.softdab.tech/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content="https://www.softdab.tech/og-image.jpg" />
        
        {/* Schema.org data */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SectionLoader />}>
          <HeroSection />
        </Suspense>
      </ErrorBoundary>

      {/* Trust/Proof Section */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SectionLoader />}>
          <TrustSection />
        </Suspense>
      </ErrorBoundary>

      {/* Services Summary Section */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SectionLoader />}>
          <section aria-label="Our Services">
            <ServicesSection />
          </section>
        </Suspense>
      </ErrorBoundary>

      {/* How We Work Section */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SectionLoader />}>
          <section aria-label="How We Work">
            <HowWeWorkSection />
          </section>
        </Suspense>
      </ErrorBoundary>

      {/* Case Studies Section */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SectionLoader />}>
          <section aria-label="Case Studies">
            <CaseStudiesSection />
          </section>
        </Suspense>
      </ErrorBoundary>

      {/* Industries Overview Section */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SectionLoader />}>
          <section aria-label="Industries We Serve">
            <IndustriesSection />
          </section>
        </Suspense>
      </ErrorBoundary>

      {/* Final CTA Section */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SectionLoader />}>
          <section aria-label="Get Started">
            <CTASection />
          </section>
        </Suspense>
      </ErrorBoundary>
    </> 
  );
};

export default HomePage;