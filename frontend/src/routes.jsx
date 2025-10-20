import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy-loaded components
const HomePage = React.lazy(() => import('./pages/HomePage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

// Company pages
const AboutPage = React.lazy(() => import('./pages/company/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage')); // Updated path
const CareersPage = React.lazy(() => import('./pages/company/CareersPage'));

// Services pages
const ServicesPage = React.lazy(() => import('./pages/services/ServicesPage'));
const CustomDevelopmentPage = React.lazy(() => import('./pages/services/CustomDevelopmentPage'));
const DedicatedTeamsPage = React.lazy(() => import('./pages/services/DedicatedTeamsPage'));
const OutsourcingPage = React.lazy(() => import('./pages/services/OutsourcingPage'));
const DiscoveryPage = React.lazy(() => import('./pages/services/DiscoveryPage'));
const SupportPage = React.lazy(() => import('./pages/services/SupportPage'));

// Industries pages
const IndustriesPage = React.lazy(() => import('./pages/industries/IndustriesPage'));
const FintechPage = React.lazy(() => import('./pages/industries/FintechPage'));
const HealthcarePage = React.lazy(() => import('./pages/industries/HealthcarePage'));
const EcommercePage = React.lazy(() => import('./pages/industries/EcommercePage'));
const LogisticsPage = React.lazy(() => import('./pages/industries/LogisticsPage'));

// Case Studies
const CaseStudiesPage = React.lazy(() => import('./pages/CaseStudiesPage'));
const CaseStudyDetailPage = React.lazy(() => import('./pages/case-studies/CaseStudyDetailPage'));

// Legal pages
const PrivacyPage = React.lazy(() => import('./pages/legal/PrivacyPage'));
const CookiesPolicyPage = React.lazy(() => import('./pages/legal/CookiesPolicy'));
const DPAPage = React.lazy(() => import('./pages/legal/DPAPage'));
const AdminPage = React.lazy(() => import('./pages/AdminPage'));

// Импорт компонента загрузки
import { LoadingSkeleton } from './components/ui/loading';

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Case Studies */}
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
        
        {/* Company */}
        <Route path="/company/about" element={<AboutPage />} />
        <Route path="/company/contact" element={<ContactPage />} />
        <Route path="/contact" element={<ContactPage />} /> {/* Дополнительный прямой путь */}
        <Route path="/company/careers" element={<CareersPage />} />
        
        {/* Services */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/custom-development" element={<CustomDevelopmentPage />} />
        <Route path="/services/dedicated-teams" element={<DedicatedTeamsPage />} />
        <Route path="/services/outsourcing" element={<OutsourcingPage />} />
        <Route path="/services/discovery" element={<DiscoveryPage />} />
  {/* Admin */}
  <Route path="/admin" element={<AdminPage />} />
        <Route path="/services/support" element={<SupportPage />} />
        
        {/* Industries */}
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/industries/fintech" element={<FintechPage />} />
        <Route path="/industries/healthcare" element={<HealthcarePage />} />
        <Route path="/industries/ecommerce" element={<EcommercePage />} />
        <Route path="/industries/logistics" element={<LogisticsPage />} />
        
        {/* Legal */}
        <Route path="/legal/privacy" element={<PrivacyPage />} />
        <Route path="/legal/cookies" element={<CookiesPolicyPage />} />
        <Route path="/legal/dpa" element={<DPAPage />} />
        
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;