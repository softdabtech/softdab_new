import React from 'react';
import './App.css';
// УДАЛЕНО: import { BrowserRouter } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Toaster } from './components/ui/sonner';
import AppRoutes from './routes';
import CookieConsentBanner from './components/cookies/CookieConsentBanner';
import GAListener from './components/analytics/GAListener';
import ScrollToTop from './components/layout/ScrollToTop';

function App() {
  return (
    <div className="App">
      {/* Router уже есть в main.jsx */}
      <ScrollToTop />
      <Header />
      <main className="min-h-screen">
        <AppRoutes />
      </main>
      <Footer />

      {/* Global components */}
      <GAListener />
      <CookieConsentBanner />
      <Toaster />
    </div>
  );
}

export default App;