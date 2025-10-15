// frontend/src/App.jsx (ИСПРАВЛЕННАЯ ВЕРСИЯ)
import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes';
import ScrollToTop from './components/layout/ScrollToTop';
import CookieConsentBanner from './components/cookies/CookieConsentBanner';

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Header />
      <main className="min-h-screen">
        <AppRoutes />
      </main>
      <Footer />
            <CookieConsentBanner />
      <Toaster position="top-right" />
```
      <Toaster />
    </div>
  );
}

export default App;