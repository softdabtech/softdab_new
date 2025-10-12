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

  if (POSTHOG_KEY) {
    posthog.init(POSTHOG_KEY, { api_host: POSTHOG_HOST });
  }

  const app = (
    <React.StrictMode>
      <BrowserRouter>
        {POSTHOG_KEY ? (
          <PostHogProvider client={posthog}>
            <App />
          </PostHogProvider>
        ) : (
          <App />
        )}
      </BrowserRouter>
    </React.StrictMode>
  );

  root.render(app);