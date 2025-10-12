// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { PostHogProvider } from 'posthog-js/react';
import posthog from 'posthog-js';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

// Инициализируем PostHog, только если ключ действительно есть
if (POSTHOG_KEY) {
  posthog.init(POSTHOG_KEY, { api_host: POSTHOG_HOST });
}

const app = (
  <React.StrictMode>
    <BrowserRouter>
      {/* 
        Мы всегда рендерим Provider, но передаем в него клиент,
        только если он был успешно инициализирован.
        Это предотвратит падение приложения.
      */}
      <PostHogProvider client={POSTHOG_KEY ? posthog : undefined}>
        <App />
      </PostHogProvider>
    </BrowserRouter>
  </React.StrictMode>
);

root.render(app);