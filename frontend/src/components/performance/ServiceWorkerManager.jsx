// ServiceWorkerManager.jsx - Критический менеджер SW для LCP оптимизации
import { useEffect } from 'react';

const ServiceWorkerManager = () => {
  useEffect(() => {
    // Регистрация SW только если объект navigator.serviceWorker доступен (а не только ключ) и в production
    if (navigator.serviceWorker && import.meta.env.PROD) {
      registerServiceWorker();
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      console.log('🚀 Регистрация критического Service Worker для LCP...');
      
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('✅ Service Worker зарегистрирован:', registration.scope);

      // Обработка обновлений SW
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed') {
            if (navigator.serviceWorker && navigator.serviceWorker.controller) {
              console.log('🔄 Новая версия SW доступна');
              // Можно показать уведомление пользователю о необходимости обновления
              showUpdateNotification();
            } else {
              console.log('✅ SW установлен впервые - критический кэш готов');
              // Первая установка - критические ресурсы будут закэшированы
              checkCacheStatus();
            }
          }
        });
      });

      // Обработка сообщений от SW
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data.type === 'CACHE_STATUS') {
          console.log(`💾 Критический кэш: ${event.data.criticalResourcesCached} ресурсов`);
          console.log(`📦 Версия кэша: ${event.data.cacheVersion}`);
        }
      });

      // Автоматическое взятие контроля новым SW
      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }

    } catch (error) {
      console.error('❌ Ошибка регистрации Service Worker:', error);
    }
  };

  const checkCacheStatus = () => {
    if (!navigator.serviceWorker || !navigator.serviceWorker.controller) {
      return; // SW не готов или не поддерживается
    }
    if (navigator.serviceWorker.controller) {
      const messageChannel = new MessageChannel();
      
      messageChannel.port1.onmessage = (event) => {
        if (event.data.type === 'CACHE_STATUS') {
          console.log('🎯 Статус критического кэша для LCP:', event.data);
        }
      };

      navigator.serviceWorker.controller.postMessage(
        { type: 'GET_CACHE_STATUS' },
        [messageChannel.port2]
      );
    }
  };

  const showUpdateNotification = () => {
    // Простое уведомление (можно заменить на toast или modal)
    if (window.confirm('Доступна новая версия приложения. Обновить?')) {
      window.location.reload();
    }
  };

  // Проверяем готовность SW после загрузки
  useEffect(() => {
    const handleLoad = () => {
      if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        setTimeout(checkCacheStatus, 1000);
      }
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return null; // Компонент не рендерит UI
};

export default ServiceWorkerManager;