// frontend/src/main.jsx - КРИТИЧЕСКИ ОПТИМИЗИРОВАННАЯ ВЕРСИЯ для LCP < 2.5s
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import App from './App.jsx';
import './index.css';

// Критический импорт Web Vitals мониторинга
import { initWebVitals, logNavigationTiming, monitorResourceLoading } from './utils/performance';

// PostHog Initialization
const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
if (posthogKey) {
  posthog.init(posthogKey, {
    api_host: 'https://us-assets.i.posthog.com',
    person_profiles: 'identified_only',
  });
}

// Критическая инициализация мониторинга производительности
console.log('🚀 Инициализация критического мониторинга производительности...');

// Запуск Web Vitals мониторинга
initWebVitals();

// Мониторинг навигации и ресурсов
window.addEventListener('load', () => {
  // Логирование критических метрик после полной загрузки
  setTimeout(() => {
    logNavigationTiming();
    monitorResourceLoading();
    console.log('✅ Критический мониторинг производительности активен');
  }, 100);
});

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