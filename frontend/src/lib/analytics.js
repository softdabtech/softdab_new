// Consent-aware minimal Google Analytics loader
// Loads gtag.js only when analytics consent is granted. Listens to cookie events from CookieConsentBanner.
(function(){
  const GA_ID = (window.__GA_MANAGER && window.__GA_MANAGER.id) || 'G-BPPL55293F';
  let loaded = false;
  function ensureDataLayer(){
    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function(){ window.dataLayer.push(arguments); };
    }
  }

  function loadGtag(){
    if (loaded) return;
    loaded = true;
    ensureDataLayer();
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    s.onload = function(){
      window.gtag('js', new Date());
      // Enable anonymize_ip for privacy-friendly setup
      window.gtag('config', GA_ID, { 'anonymize_ip': true });
      // Set consent mode to granted (analytics)
      window.gtag('consent', 'update', { 'analytics_storage': 'granted' });
    };
    document.head.appendChild(s);
  }

  function revokeGtag(){
    ensureDataLayer();
    // set analytics_storage to denied so GA stops collecting
    window.gtag('consent', 'update', { 'analytics_storage': 'denied' });
  }

  // Initialize based on saved consent (if any)
  try {
    const raw = localStorage.getItem('softdab_cookie_consent_v1');
    if (raw) {
      const prefs = JSON.parse(raw);
      if (prefs.analytics) loadGtag(); else revokeGtag();
    }
  } catch (e) {
    // ignore
  }

  window.addEventListener('softdab:analytics-consent-granted', loadGtag);
  window.addEventListener('softdab:analytics-consent-revoked', revokeGtag);

  // exported for debugging
  window.__softdab_analytics = { loadGtag, revokeGtag };
})();
