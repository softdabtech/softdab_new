// Consent-aware Google Analytics wrapper
// - Loads gtag.js only when analytics consent is granted
// - Queues events fired before gtag loads and replays them after load
// - Exposes helper API: loadGtag, revokeGtag, trackEvent, trackPageView, setUserId, setUserProperties
(function(){
  const DEFAULT_GA_ID = 'G-BPPL55293F';
  const GA_ID = (window.__GA_MANAGER && window.__GA_MANAGER.id) || DEFAULT_GA_ID;
  let loaded = false;
  let queuedEvents = [];

  function ensureDataLayer(){
    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function(){ window.dataLayer.push(arguments); };
    }
  }

  function replayQueue(){
    if (!window.gtag) return;
    for (const ev of queuedEvents) {
      if (ev.type === 'page_view') {
        window.gtag('event', 'page_view', ev.payload || {});
      } else if (ev.type === 'event') {
        window.gtag('event', ev.name, ev.payload || {});
      }
    }
    queuedEvents = [];
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
      // Use privacy-friendly defaults
      window.gtag('config', GA_ID, {
        'anonymize_ip': true,
        'send_page_view': false, // we manually send page_view events for accuracy
        'allow_ad_personalization_signals': false
      });
      // Set consent mode to granted for analytics
      window.gtag('consent', 'update', { 'analytics_storage': 'granted' });
      // replay any queued events
      replayQueue();
    };
    document.head.appendChild(s);
  }

  function revokeGtag(){
    ensureDataLayer();
    // Set analytics_storage to denied so GA stops collecting
    window.gtag('consent', 'update', { 'analytics_storage': 'denied' });
    // do not remove queued events — they should remain if user re-consents
  }

  function trackPageView(payload){
    const p = Object.assign({ page_location: window.location.href, page_path: window.location.pathname, page_title: document.title }, payload || {});
    if (loaded && window.gtag) {
      window.gtag('event', 'page_view', p);
    } else {
      queuedEvents.push({ type: 'page_view', payload: p });
    }
  }

  function trackEvent(name, payload){
    if (loaded && window.gtag) {
      window.gtag('event', name, payload || {});
    } else {
      queuedEvents.push({ type: 'event', name, payload });
    }
  }

  function setUserId(id){
    if (loaded && window.gtag) {
      window.gtag('set', { 'user_id': id });
    } else {
      queuedEvents.push({ type: 'event', name: 'set_user_id', payload: { user_id: id } });
    }
  }

  function setUserProperties(props){
    if (loaded && window.gtag) {
      window.gtag('set', props);
    } else {
      queuedEvents.push({ type: 'event', name: 'set_user_properties', payload: props });
    }
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

  // Auto-send page_view on navigation events for SPA
  window.addEventListener('softdab:analytics-consent-granted', loadGtag);
  window.addEventListener('softdab:analytics-consent-revoked', revokeGtag);
  window.addEventListener('softdab:track-pageview', (e) => trackPageView(e?.detail));

  // exported API for application code
  window.__softdab_analytics = { loadGtag, revokeGtag, trackEvent, trackPageView, setUserId, setUserProperties, _queuedEvents: queuedEvents };
})();
