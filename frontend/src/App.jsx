// frontend/src/App.jsx (ИСПРАВЛЕННАЯ ВЕРСИЯ)
import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Toaster } from './components/ui/sonner';
import AppRoutes from './routes';
import ScrollToTop from './components/layout/ScrollToTop';
import CookieConsentBanner from './components/cookies/CookieConsentBanner';
import DefaultSEO from './components/seo/DefaultSEO';

function App() {
  return (
    <div className="App">
      <DefaultSEO />
      <ScrollToTop />
      <Header />
      <main className="min-h-screen">
        <AppRoutes />
      </main>
      <Footer />
      <CookieConsentBanner />
      <Toaster />
    </div>
  );
}

export default App;