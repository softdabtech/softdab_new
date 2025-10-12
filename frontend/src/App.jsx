// src/App.jsx (ВЕРСИЯ ДЛЯ ДИАГНОСТИКИ РОУТЕРА)
import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Toaster } from './components/ui/sonner';
// import AppRoutes from './routes'; // <-- ЗАКОММЕНТИРОВАНО
import CookieConsentBanner from './components/cookies/CookieConsentBanner';
// import GAListener from './components/analytics/GAListener';
import ScrollToTop from './components/layout/ScrollToTop';

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Header />
      <main className="min-h-screen">
        {/* <AppRoutes /> */} {/* <-- ЗАКОММЕНТИРОВАНО */}
        <h1 style={{ color: 'black', fontSize: '48px', textAlign: 'center', paddingTop: '100px' }}>
          It works!
        </h1>
      </main>
      <Footer />

      {/* Global components */}
      {/* <GAListener /> */}
      <CookieConsentBanner />
      <Toaster />
    </div>
  );
}

export default App;