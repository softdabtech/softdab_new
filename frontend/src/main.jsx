// frontend/src/main.jsx - Performance & SEO Optimized
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import App from './App.jsx';
import './index.css';
import { initWebVitals, logNavigationTiming, monitorResourceLoading } from './utils/performance.js';

// PostHog Initialization
const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
if (posthogKey) {
  posthog.init(posthogKey, {
    api_host: 'https://us-assets.i.posthog.com',
    person_profiles: 'identified_only',
  });
}

// Initialize performance monitoring
if (typeof window !== 'undefined') {
  // Core Web Vitals monitoring
  initWebVitals();
  
  // Navigation timing logging
  window.addEventListener('load', () => {
    setTimeout(() => {
      logNavigationTiming();
      monitorResourceLoading();
    }, 100);
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <PostHogProvider client={posthog}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PostHogProvider>
    </HelmetProvider>
  </React.StrictMode>
);