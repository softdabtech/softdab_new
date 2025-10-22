import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

// Performance monitoring for Core Web Vitals
export const initWebVitals = () => {
  // Largest Contentful Paint
  onLCP((metric) => {
    console.log('LCP:', metric);
    // Send to analytics
    if (window.gtag) {
      window.gtag('event', 'web_vitals', {
        event_category: 'Performance', 
        event_action: 'LCP',
        value: Math.round(metric.value),
        custom_parameter_1: metric.rating,
      });
    }
  });

  // Interaction to Next Paint (replaces FID)
  onINP((metric) => {
    console.log('INP:', metric);
    if (window.gtag) {
      window.gtag('event', 'web_vitals', {
        event_category: 'Performance',
        event_action: 'INP', 
        value: Math.round(metric.value),
        custom_parameter_1: metric.rating,
      });
    }
  });

  // Cumulative Layout Shift
  onCLS((metric) => {
    console.log('CLS:', metric);
    if (window.gtag) {
      window.gtag('event', 'web_vitals', {
        event_category: 'Performance',
        event_action: 'CLS',
        value: Math.round(metric.value * 1000),
        custom_parameter_1: metric.rating,
      });
    }
  });

  // First Contentful Paint
  onFCP((metric) => {
    console.log('FCP:', metric);
    if (window.gtag) {
      window.gtag('event', 'web_vitals', {
        event_category: 'Performance',
        event_action: 'FCP',
        value: Math.round(metric.value),
        custom_parameter_1: metric.rating,
      });
    }
  });

  // Time to First Byte
  onTTFB((metric) => {
    console.log('TTFB:', metric);
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