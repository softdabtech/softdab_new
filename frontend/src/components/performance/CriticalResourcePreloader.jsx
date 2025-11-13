// CriticalResourcePreloader.jsx - Критический компонент для LCP оптимизации
import { useEffect } from 'react';

const CriticalResourcePreloader = () => {
  useEffect(() => {
    // Критическая предзагрузка ресурсов для LCP < 2.5s
    const preloadResources = [
      // Критические шрифты
      { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', as: 'style' },
      // Критические изображения hero секции
      { href: '/images/hero-bg.webp', as: 'image', type: 'image/webp' },
      { href: '/images/team/hero-team.webp', as: 'image', type: 'image/webp' },
    ];

    // Критический prefetch для ключевых страниц
    const prefetchPages = [
      '/services',
      '/portfolio', 
      '/about',
      '/contact'
    ];

    // Создаем preload links для критических ресурсов
    preloadResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) link.type = resource.type;
      if (resource.as === 'style') {
        link.onload = function() { this.rel = 'stylesheet'; };
      }
      document.head.appendChild(link);
    });

    // DNS prefetch для внешних ресурсов
    const dnsPrefetch = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://api.softdab.tech'
    ];

    dnsPrefetch.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });

    // Prefetch ключевых страниц через Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          prefetchPages.forEach(page => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = page;
            document.head.appendChild(link);
          });
          observer.disconnect();
        }
      });
    });

    // Начинаем prefetch после загрузки первого экрана
    const heroSection = document.querySelector('[data-hero]');
    if (heroSection) {
      observer.observe(heroSection);
    }

    // Критическая оптимизация изображений
    const criticalImages = document.querySelectorAll('img[data-critical]');
    criticalImages.forEach(img => {
      if (img.loading !== 'eager') {
        img.loading = 'eager';
        img.fetchPriority = 'high';
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};

export default CriticalResourcePreloader;