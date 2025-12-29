import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutPage from '../../src/pages/company/AboutPage';
import ContactPage from '../../src/pages/ContactPage';
import CaseStudiesPage from '../../src/pages/CaseStudiesPage';

describe('SEO presence on key pages', () => {
  test('AboutPage renders canonical and breadcrumb JSON-LD', () => {
    render(<AboutPage />);
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).toBeTruthy();
    expect(canonical.getAttribute('href')).toBe('https://www.softdab.tech/company/about');
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const hasBreadcrumb = scripts.some((s) => s.textContent && s.textContent.includes('BreadcrumbList'));
    expect(hasBreadcrumb).toBe(true);
  });

  test('ContactPage renders canonical and breadcrumb JSON-LD', () => {
    render(<ContactPage />);
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).toBeTruthy();
    expect(canonical.getAttribute('href')).toBe('https://www.softdab.tech/company/contact');
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const hasBreadcrumb = scripts.some((s) => s.textContent && s.textContent.includes('BreadcrumbList'));
    expect(hasBreadcrumb).toBe(true);
  });

  test('CaseStudiesPage renders canonical and breadcrumb JSON-LD', () => {
    render(<CaseStudiesPage />);
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).toBeTruthy();
    expect(canonical.getAttribute('href')).toBe('https://www.softdab.tech/case-studies');
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const hasBreadcrumb = scripts.some((s) => s.textContent && s.textContent.includes('BreadcrumbList'));
    expect(hasBreadcrumb).toBe(true);
  });
});
