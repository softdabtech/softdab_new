// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { PostHogProvider, posthog } from 'posthog-js/react';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;       // добавьте в .env если нужен
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

const app = (
  <React.StrictMode>
    <BrowserRouter>
      {POSTHOG_KEY ? (
        <PostHogProvider apiKey={POSTHOG_KEY} options={{ api_host: POSTHOG_HOST }}>
          <App />
        </PostHogProvider>
      ) : (
        <App />
      )}
    </BrowserRouter>
  </React.StrictMode>
);

root.render(app);