// EarlyResourceDiscovery.jsx - Критический компонент для ускорения LCP
import { useEffect } from 'react';

const EarlyResourceDiscovery = () => {
  useEffect(() => {
    // Критические ресурсы для мгновенного LCP
    const criticalResources = [
      // Критические изображения hero секции
      { 
        href: '/images/hero-main.webp', 
        as: 'image', 
        type: 'image/webp',
        media: '(min-width: 768px)',
        priority: 'high'
      },
      { 
        href: '/images/hero-mobile.webp', 
        as: 'image', 
        type: 'image/webp',
        media: '(max-width: 767px)',
        priority: 'high'
      },
      // Критические JavaScript модули
      { 
        href: '/assets/vendor.js', 
        as: 'script',
        priority: 'high'
      },
      { 
        href: '/assets/index.js', 
        as: 'script',
        priority: 'high'
      },
    ];

    // DNS prefetch для критических доменов
    const criticalDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com', 
      'https://api.posthog.com',
      'https://us-assets.i.posthog.com'
    ];

    // Создаем критические preload links
    criticalResources.forEach(resource => {
      // Проверяем, не существует ли уже такой link
      const existingLink = document.querySelector(`link[href="${resource.href}"]`);
      if (!existingLink) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        if (resource.type) link.type = resource.type;
        if (resource.media) link.media = resource.media;
        if (resource.priority) link.fetchPriority = resource.priority;
        
        // Критический приоритет для LCP элементов
        if (resource.as === 'image') {
          link.setAttribute('data-lcp-critical', 'true');
        }
        
        document.head.appendChild(link);
      }
    });

    // DNS prefetch для внешних ресурсов
    criticalDomains.forEach(domain => {
      const existingPrefetch = document.querySelector(`link[href="${domain}"][rel="dns-prefetch"]`);
      if (!existingPrefetch) {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        document.head.appendChild(link);
      }
    });

    // Критическая оптимизация изображений для LCP
    const optimizeImagesForLCP = () => {
      // Находим все изображения в viewport
      const images = document.querySelectorAll('img');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Критические атрибуты для LCP изображений
            if (entry.intersectionRatio > 0.1) {
              img.loading = 'eager';
              img.fetchPriority = 'high';
              img.setAttribute('data-lcp-candidate', 'true');
            }
            
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px',
        threshold: [0.1]
      });

      images.forEach(img => observer.observe(img));
    };

    // Запускаем оптимизацию после загрузки DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizeImagesForLCP);
    } else {
      optimizeImagesForLCP();
    }

    // Критический мониторинг LCP
    const monitorLCP = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              console.log('🎯 LCP элемент:', entry.element, 'Время:', entry.startTime.toFixed(0) + 'ms');
              
              // Критическое предупреждение
              if (entry.startTime > 2500) {
                console.warn('🚨 КРИТИЧНО: LCP превышает 2.5s!', {
                  element: entry.element,
                  startTime: entry.startTime
                });
              }
            }
          }
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      }
    };

    monitorLCP();

  }, []);

  return null;
};

export default EarlyResourceDiscovery;