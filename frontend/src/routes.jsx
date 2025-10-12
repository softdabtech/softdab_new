import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy-loaded components
const HomePage = React.lazy(() => import('./pages/HomePage'));
const CaseStudiesPage = React.lazy(() => import('./pages/CaseStudiesPage'));
const CaseDetailPage = React.lazy(() => import('./pages/CaseDetailPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

// Company pages
const AboutPage = React.lazy(() => import('./pages/company/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/company/ContactPage'));
const CareersPage = React.lazy(() => import('./pages/company/CareersPage'));

// Services pages
const ServicesPage = React.lazy(() => import('./pages/services/ServicesPage'));
const CustomDevelopmentPage = React.lazy(() => import('./pages/services/CustomDevelopmentPage'));
const DedicatedTeamPage = React.lazy(() => import('./pages/services/DedicatedTeamPage'));

// Industries pages
const IndustriesPage = React.lazy(() => import('./pages/industries/IndustriesPage'));

// Импорт компонента загрузки
import { LoadingSkeleton } from './components/ui/loading';

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Case Studies */}
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/case-studies/:slug" element={<CaseDetailPage />} />
        
        {/* Company */}
        <Route path="/company/about" element={<AboutPage />} />
        <Route path="/company/contact" element={<ContactPage />} />
        <Route path="/company/careers" element={<CareersPage />} />
        
        {/* Services */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/custom-development" element={<CustomDevelopmentPage />} />
        <Route path="/services/dedicated-team" element={<DedicatedTeamPage />} />
        
        {/* Industries */}
        <Route path="/industries" element={<IndustriesPage />} />
        
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;