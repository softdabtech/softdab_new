import '../../lib/analytics';

describe('analytics wrapper (integration)', () => {
  beforeEach(() => {
    delete window.gtag;
    delete window.dataLayer;
    delete window.__softdab_analytics;
    document.head.innerHTML = '';
  });

  test('loads gtag on consent and replays queued events', async () => {
    require('../../lib/analytics');
    expect(window.__softdab_analytics).toBeDefined();
    // queue a page view
    window.__softdab_analytics.trackPageView({ page_path: '/test' });

    // mock script insertion to trigger onload
    const origCreate = document.createElement;
    document.createElement = (tag) => {
      const el = origCreate.call(document, tag);
      if (tag === 'script') {
        setTimeout(() => { if (el.onload) el.onload(); }, 0);
      }
      return el;
    };
    window.dispatchEvent(new CustomEvent('softdab:analytics-consent-granted'));

    // wait for next tick
    await new Promise(r => setTimeout(r, 10));
    expect(typeof window.gtag).toBe('function');
    document.createElement = origCreate;
  });
});
