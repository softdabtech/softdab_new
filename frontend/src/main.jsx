// frontend/src/main.jsx (ФИНАЛЬНОЕ ИСПРАВЛЕНИЕ)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // <-- ШАГ 1: ИМПОРТИРУЕМ ПРОВАЙДЕР
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
    <HelmetProvider> {/* <-- ШАГ 2: ОБОРАЧИВАЕМ ПРИЛОЖЕНИЕ */}
      <PostHogProvider client={posthog}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PostHogProvider>
    </HelmetProvider> {/* <-- ШАГ 2: ЗАКРЫВАЕМ ОБОРОТКУ */}
  </React.StrictMode>
);