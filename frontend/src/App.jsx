// frontend/src/App.jsx - КРИТИЧЕСКИ ОПТИМИЗИРОВАННАЯ ВЕРСИЯ для LCP < 2.5s
import React, { Suspense, lazy, useState } from 'react';
import './App.css';
import Preloader from './components/Preloader';
import Header from './components/layout/Header';
import AppRoutes from './routes';
import ScrollToTop from './components/layout/ScrollToTop';
import CriticalResourcePreloader from './components/performance/CriticalResourcePreloader';
import CriticalCSS from './components/performance/CriticalCSS';
import EarlyResourceDiscovery from './components/performance/EarlyResourceDiscovery';
import ServiceWorkerManager from './components/performance/ServiceWorkerManager';
import SEOHead from './components/seo/SEOHead';

// Критический lazy loading для некритических компонентов
const Footer = lazy(() => import('./components/layout/Footer'));
const CookieConsentBanner = lazy(() => import('./components/cookies/CookieConsentBanner'));
const Toaster = lazy(() => import('react-hot-toast').then(module => ({ default: module.Toaster })));
// Критический loading компонент
const LoadingFallback = () => (
  <div className="loading" aria-label="Загрузка..."></div>
);
function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  return (
    <div className="App">
      {/* Preloader - shows for 2 seconds on initial load */}
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}
      
      {/* Критическая SEO оптимизация с Schema.org */}
      <SEOHead />
      {/* Критический inline CSS для FCP оптимизации */}
      <CriticalCSS />
      {/* Критическая предзагрузка ресурсов для LCP оптимизации */}
      <CriticalResourcePreloader />
      {/* Критическое раннее обнаружение ресурсов */}
      <EarlyResourceDiscovery />
      {/* Критический Service Worker для кэширования */}
      <ServiceWorkerManager />
      {/* Критические компоненты загружаются сразу */}
      <ScrollToTop />
      <Header />
      <main className="min-h-screen">
        <AppRoutes />
      </main>
      {/* Некритические компоненты с lazy loading */}
      <Suspense fallback={<LoadingFallback />}>
        <Footer />
        <CookieConsentBanner />
        <Toaster position="top-right" />
      </Suspense>
    </div>
  );
}
export default App;
