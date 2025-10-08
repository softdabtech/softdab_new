// src/components/analytics/GAListener.jsx
import { useEffect } from 'react';

const GA_MEASUREMENT_ID = 'G-XXXXXXX'; // замените на ваш ID

function loadGAScript() {
  if (document.getElementById('ga-script')) return;
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
    gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
  `;
  document.head.appendChild(s2);
}

function removeGAScript() {
  const ids = ['ga-script', 'ga-config'];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });
}

const GAListener = () => {
  useEffect(() => {
    const onGranted = () => loadGAScript();
    const onRevoked = () => removeGAScript();

    window.addEventListener('softdab:analytics-consent-granted', onGranted);
    window.addEventListener('softdab:analytics-consent-revoked', onRevoked);

    return () => {
      window.removeEventListener('softdab:analytics-consent-granted', onGranted);
      window.removeEventListener('softdab:analytics-consent-revoked', onRevoked);
    };
  }, []);

  return null;
};

export default GAListener;