// frontend/src/main.jsx (ИСПРАВЛЕННАЯ ВЕРСИЯ БЕЗ HELMET)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import App from './App.jsx';
import './index.css';

// PostHog Initialization
const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
if (posthogKey) {
  posthog.init(posthogKey, {
    api_host: 'https://us-assets.i.posthog.com',
    person_profiles: 'identified_only',
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PostHogProvider>
  </React.StrictMode>
);