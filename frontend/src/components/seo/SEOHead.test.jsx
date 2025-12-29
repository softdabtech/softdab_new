import React from 'react';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import SEOHead from './SEOHead';

describe('SEOHead', () => {
  test('renders hreflang links and sets GA stub and canonical', () => {
    render(
      <HelmetProvider>
        <SEOHead />
      </HelmetProvider>
    );
    // Expected hreflangs
    expect(document.querySelector('link[hreflang="de-DE"]')).toBeTruthy();
    expect(document.querySelector('link[hreflang="fr-FR"]')).toBeTruthy();
    expect(document.querySelector('link[hreflang="en-GB"]')).toBeTruthy();

    // GA stub should be present as window.__GA_MANAGER
    expect(window.__GA_MANAGER).toBeDefined();
    expect(window.__GA_MANAGER.id).toBe('G-BPPL55293F');

    // canonical link should exist (client-side fallback sets it)
    expect(document.querySelector('link[rel="canonical"]')).toBeTruthy();
  });
});
