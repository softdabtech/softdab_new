import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Toaster } from './components/ui/sonner';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Глобальные
import CookieConsentBanner from './components/cookies/CookieConsentBanner';
import GAListener from './components/analytics/GAListener';
import ScrollToTop from './components/layout/ScrollToTop';

// Lazy pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const OutsourcingPage = React.lazy(() => import('./pages/services/OutsourcingPage'));
const DedicatedTeamsPage = React.lazy(() => import('./pages/services/DedicatedTeamsPage'));
const FintechPage = React.lazy(() => import('./pages/industries/FintechPage'));
const HealthcarePage = React.lazy(() => import('./pages/industries/HealthcarePage'));
const EcommercePage = React.lazy(() => import('./pages/industries/EcommercePage'));
const LogisticsPage = React.lazy(() => import('./pages/industries/LogisticsPage'));
const CaseStudiesPage = React.lazy(() => import('./pages/CaseStudiesPage'));
const CaseDetailPage = React.lazy(() => import('./pages/CaseDetailPage'));
const AboutPage = React.lazy(() => import('./pages/company/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/company/ContactPage'));
const PrivacyPage = React.lazy(() => import('./pages/legal/PrivacyPage'));
const TermsPage = React.lazy(() => import('./pages/legal/TermsPage'));
const DPAPage = React.lazy(() => import('./pages/legal/DPAPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const CookiesPolicy = React.lazy(() => import('./pages/legal/CookiesPolicy'));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <main className="min-h-screen">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services/outsourcing" element={<OutsourcingPage />} />
              <Route path="/services/dedicated-teams" element={<DedicatedTeamsPage />} />
              <Route path="/industries/fintech" element={<FintechPage />} />
              <Route path="/industries/healthcare" element={<HealthcarePage />} />
              <Route path="/industries/ecommerce" element={<EcommercePage />} />
              <Route path="/industries/logistics" element={<LogisticsPage />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/case-studies/:slug" element={<CaseDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/dpa" element={<DPAPage />} />
              <Route path="/legal/cookies" element={<CookiesPolicy />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <Toaster position="top-right" />

        {/* Глобальные компоненты */}
        <GAListener />
        <CookieConsentBanner />
      </BrowserRouter>
    </div>
  );
}

export default App;