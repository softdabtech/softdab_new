
import { useEffect, useCallback } from 'react';

const GA_MEASUREMENT_ID = 'G-BPPL55293F';

/**
 * Добавляет скрипты Google Analytics в <head>
 */
const loadGAScript = () => {
  if (typeof window === 'undefined' || document.getElementById('ga-script')) return;
  const s1 = document.createElement('script');
  s1.id = 'ga-script';
  s1.async = true;
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s1);

  const s2 = document.createElement('script');
  s2.id = 'ga-config';
  s2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', { 
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });
  `;
  document.head.appendChild(s2);
};

/**
 * Очищает скрипты и cookies Google Analytics
 */
const removeGAScript = () => {
  if (typeof window === 'undefined') return;
  ['ga-script', 'ga-config'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });
  if (window.dataLayer) window.dataLayer = [];
  document.cookie.split(';').forEach(cookie => {
    if (cookie.trim().startsWith('_ga')) {
      const cookieName = cookie.split('=')[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  });
};

const GAListener = () => {
  const handleGranted = useCallback(() => {
    loadGAScript();
  }, []);

  const handleRevoked = useCallback(() => {
    removeGAScript();
  }, []);

  useEffect(() => {
    // Проверяем согласие при монтировании
    const saved = localStorage.getItem('softdab_cookie_consent_v1');
    if (saved) {
      try {
        const consent = JSON.parse(saved);
        if (consent.analytics) loadGAScript();
      } catch {}
    }
    window.addEventListener('softdab:analytics-consent-granted', handleGranted);
    window.addEventListener('softdab:analytics-consent-revoked', handleRevoked);
    return () => {
      window.removeEventListener('softdab:analytics-consent-granted', handleGranted);
      window.removeEventListener('softdab:analytics-consent-revoked', handleRevoked);
    };
  }, [handleGranted, handleRevoked]);
  return null;
};


export default GAListener;