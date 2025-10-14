// frontend/src/pages/HomePage.jsx 
import React, { Suspense } from 'react';
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
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SectionLoader />}>
          <HeroSection />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SectionLoader />}>
          <TrustSection />
        </Suspense>
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