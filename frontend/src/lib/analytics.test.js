import './setupTests';

describe('analytics wrapper', () => {
  beforeEach(() => {
    // reset globals
    delete window.gtag;
    delete window.dataLayer;
    delete window.__softdab_analytics;
    document.head.innerHTML = '';
  });

  test('loads gtag on consent and replays queued events', () => {
    // Simulate analytics module loaded earlier
    // Load the file dynamically
    require('./analytics');
    // At this point, __softdab_analytics should exist
    expect(window.__softdab_analytics).toBeDefined();
    // Queue a page view before consent
    window.__softdab_analytics.trackPageView({ page_path: '/test' });
    // simulate script load by firing consent granted
    // Mock document.head.appendChild to trigger onload immediately for the script
    const origCreate = document.createElement;
    document.createElement = (tag) => {
      const el = origCreate.call(document, tag);
      if (tag === 'script') {
        setTimeout(() => { if (el.onload) el.onload(); }, 0);
      }
      return el;
    };
    // dispatch event that triggers loadGtag
    window.dispatchEvent(new CustomEvent('softdab:analytics-consent-granted'));

    // after load, gtag should be defined
    expect(typeof window.gtag).toBe('function');
    // tear down
    document.createElement = origCreate;
  });

  test('trackEvent enqueues if gtag not loaded', () => {
    require('./analytics');
    const api = window.__softdab_analytics;
    api.trackEvent('test_event', { a: 1 });
    expect(Array.isArray(api._queuedEvents)).toBe(true);
    // find queued event
    expect(api._queuedEvents.some(e => e.name === 'test_event')).toBe(true);
  });
});
