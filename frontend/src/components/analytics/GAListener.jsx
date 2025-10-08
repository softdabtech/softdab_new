import { useEffect } from 'react';


const GA_MEASUREMENT_ID = 'G-BPPL55293F'; 

function loadGAScript() {
  
  if (document.getElementById('ga-script')) {
    console.log('[GA] Already loaded');
    return;
  }

  console.log('[GA] Loading Google Analytics...');

  
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

  console.log('[GA] Loaded successfully');
}

function removeGAScript() {
  console.log('[GA] Removing Google Analytics...');
  
  const ids = ['ga-script', 'ga-config'];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });

  // Очищаем dataLayer
  if (window.dataLayer) {
    window.dataLayer = [];
  }

  // Удаляем GA cookies
  const gaCookies = document.cookie.split(';').filter(c => c.trim().startsWith('_ga'));
  gaCookies.forEach(cookie => {
    const cookieName = cookie.split('=')[0].trim();
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });

  console.log('[GA] Removed successfully');
}

const GAListener = () => {
  useEffect(() => {
    // Проверяем, есть ли уже согласие при монтировании
    const saved = localStorage.getItem('softdab_cookie_consent_v1');
    if (saved) {
      try {
        const consent = JSON.parse(saved);
        if (consent.analytics) {
          loadGAScript();
        }
      } catch (e) {
        console.error('[GA] Error parsing consent:', e);
      }
    }

    // Слушаем события согласия
    const onGranted = () => {
      console.log('[GA] Analytics consent granted');
      loadGAScript();
    };

    const onRevoked = () => {
      console.log('[GA] Analytics consent revoked');
      removeGAScript();
    };

    window.addEventListener('softdab:analytics-consent-granted', onGranted);
    window.addEventListener('softdab:analytics-consent-revoked', onRevoked);

    return () => {
      window.removeEventListener('softdab:analytics-consent-granted', onGranted);
      window.removeEventListener('softdab:analytics-consent-revoked', onRevoked);
    };
  }, []);

  return null; // Этот компонент ничего не рендерит
};

export default GAListener;