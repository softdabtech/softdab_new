import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

// КРИТИЧЕСКИЙ мониторинг Core Web Vitals для LCP < 2.5s
export const initWebVitals = () => {
  // Критический мониторинг LCP - цель < 2.5s
  onLCP((metric) => {
    console.log('🎯 LCP:', `${metric.value.toFixed(0)}ms`, `Rating: ${metric.rating}`);
    
    // Критическое предупреждение если LCP > 2.5s
    if (metric.value > 2500) {
      console.warn('🚨 КРИТИЧНО: LCP превышает 2.5s!', {
        value: metric.value,
        element: metric.entries[metric.entries.length - 1]?.element,
        url: metric.entries[metric.entries.length - 1]?.url
      });
    }

    // Отправка в аналитику с критической меткой
    if (window.gtag) {
      window.gtag('event', 'web_vitals', {
        event_category: 'Critical_Performance', 
        event_action: 'LCP',
        value: Math.round(metric.value),
        custom_parameter_1: metric.rating,
        custom_parameter_2: metric.value > 2500 ? 'CRITICAL' : 'OK',
      });
    }
  });

  // Критический мониторинг FCP - цель < 1.8s
  onFCP((metric) => {
    console.log('⚡ FCP:', `${metric.value.toFixed(0)}ms`, `Rating: ${metric.rating}`);
    
    // Критическое предупреждение если FCP > 1.8s
    if (metric.value > 1800) {
      console.warn('🚨 ВАЖНО: FCP превышает 1.8s!', {
        value: metric.value,
        rating: metric.rating
      });
    }

    if (window.gtag) {
      window.gtag('event', 'web_vitals', {
        event_category: 'Critical_Performance',
        event_action: 'FCP',
        value: Math.round(metric.value),
        custom_parameter_1: metric.rating,
        custom_parameter_2: metric.value > 1800 ? 'NEEDS_IMPROVEMENT' : 'OK',
      });
    }
  });

  // Interaction to Next Paint (replaces FID)
  onINP((metric) => {
    console.log('👆 INP:', `${metric.value.toFixed(0)}ms`, `Rating: ${metric.rating}`);
    if (window.gtag) {
      window.gtag('event', 'web_vitals', {
        event_category: 'Performance',
        event_action: 'INP', 
        value: Math.round(metric.value),
        custom_parameter_1: metric.rating,
      });
    }
  });

  // Cumulative Layout Shift - идеально 0
  onCLS((metric) => {
    console.log('📐 CLS:', metric.value.toFixed(3), `Rating: ${metric.rating}`);
    if (window.gtag) {
      window.gtag('event', 'web_vitals', {
        event_category: 'Performance',
        event_action: 'CLS',
        value: Math.round(metric.value * 1000),
        custom_parameter_1: metric.rating,
      });
    }
  });

  // Time to First Byte - цель < 800ms
  onTTFB((metric) => {
    console.log('🌐 TTFB:', `${metric.value.toFixed(0)}ms`, `Rating: ${metric.rating}`);
    if (window.gtag) {
      window.gtag('event', 'web_vitals', {
        event_category: 'Performance',
        event_action: 'TTFB',
        value: Math.round(metric.value),
        custom_parameter_1: metric.rating,
      });
    }
  });
};

// Performance observer for navigation timing
export const logNavigationTiming = () => {
  if ('performance' in window && 'getEntriesByType' in window.performance) {
    const navigationEntries = performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0) {
      const entry = navigationEntries[0];
      console.log('Navigation Timing:', {
        DNS: entry.domainLookupEnd - entry.domainLookupStart,
        TCP: entry.connectEnd - entry.connectStart,
        Request: entry.responseStart - entry.requestStart,
        Response: entry.responseEnd - entry.responseStart,
        Processing: entry.domContentLoadedEventStart - entry.responseEnd,
        Load: entry.loadEventStart - entry.domContentLoadedEventStart,
        Total: entry.loadEventEnd - entry.navigationStart
      });
    }
  }
};

// Report performance issues
export const reportPerformanceIssue = (issue, details) => {
  console.warn('Performance Issue:', issue, details);
  
  // Send to error tracking service
  if (window.gtag) {
    window.gtag('event', 'exception', {
      description: `Performance: ${issue}`,
      fatal: false,
      custom_parameter_1: details
    });
  }
};

// Monitor resource loading
export const monitorResourceLoading = () => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Check for slow resources (>2s)
        if (entry.duration > 2000) {
          reportPerformanceIssue('Slow Resource', {
            name: entry.name,
            duration: entry.duration,
            type: entry.initiatorType
          });
        }
      }
    });
    
    observer.observe({ entryTypes: ['resource'] });
  }
};