// frontend/src/pages/HomePage.jsx (ТЕСТИРУЕМ HeroSection)
import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import HeroSection from '../components/sections/HeroSection';
// import TrustSection from '../components/sections/TrustSection';
// import ServicesSection from '../components/sections/ServicesSection';
// import HowWeWorkSection from '../components/sections/HowWeWorkSection';
// import CaseStudiesSection from '../components/sections/CaseStudiesSection';
// import IndustriesSection from '../components/sections/IndustriesSection';
// import CTASection from '../components/sections/CTASection';
// import { mockData } from '../data/mockData';

// SEO и Schema остаются без изменений
const PAGE_TITLE = 'SoftDAB | Custom Software Development & Dedicated Teams';
const PAGE_DESCRIPTION = '...'; // (содержимое не меняем)
const organizationSchema = { /* ... */ }; // (содержимое не меняем)
const websiteSchema = { /* ... */ }; // (содержимое не меняем)

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="text-center py-12">
    <h2>Something went wrong</h2>
    <p>{error.message}</p>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

const SectionLoader = () => <div className="h-64 bg-gray-200 animate-pulse"></div>;

const HomePage = () => {
  return (
    <main className="min-h-screen">
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      </Helmet>

      {/* Включаем ТОЛЬКО Hero Section */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SectionLoader />}>
          <HeroSection />
        </Suspense>
      </ErrorBoundary>

      {/* Все остальные секции ВРЕМЕННО ВЫКЛЮЧЕНЫ */}
      {/* 
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SectionLoader />}>
          <TrustSection />
        </Suspense>
      </ErrorBoundary>
      
      ... и так далее для всех остальных ...
      */}
    </main>
  );
};

export default HomePage;