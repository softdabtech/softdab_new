import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
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
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
}

export default App;