// src/App.jsx (ВОССТАНОВЛЕННАЯ ВЕРСИЯ)
import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Toaster } from './components/ui/sonner';
import AppRoutes from './routes'; // <-- РАСКОММЕНТИРОВАНО
import CookieConsentBanner from './components/cookies/CookieConsentBanner';
// import GAListener from './components/analytics/GAListener'; // <-- ОСТАВЛЯЕМ ВЫКЛЮЧЕННЫМ
import ScrollToTop from './components/layout/ScrollToTop';

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Header />
      <main className="min-h-screen">
        <AppRoutes /> {/* <-- РАСКОММЕНТИРОВАНО */}
      </main>
      <Footer />

      {/* Global components */}
      {/* <GAListener /> */} {/* <-- ОСТАВЛЯЕМ ВЫКЛЮЧЕННЫМ */}
      <CookieConsentBanner />
      <Toaster />
    </div>
  );
}

export default App;