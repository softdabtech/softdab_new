import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title,
  description, 
  keywords,
  canonicalUrl,
  ogImage = '/og-image.jpg',
  ogType = 'website',
  publishedTime,
  modifiedTime,
  author = 'SoftDAB',
  noindex = false,
  children 
}) => {
  const siteTitle = 'SoftDAB | Custom Software Development & Outsourcing Teams';
  const siteDescription = 'SoftDAB provides custom software development and outsourcing teams for US/EU companies. Start in 2 weeks with a risk‑free trial and transparent pricing.';
  const siteUrl = 'https://www.softdab.tech';
  
  const fullTitle = title ? `${title} | SoftDAB` : siteTitle;
  const fullDescription = description || siteDescription;
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SoftDAB",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "description": siteDescription,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "Customer Service",
      "email": "hello@softdab.tech"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "UA",
      "addressLocality": "Kyiv"
    },
    "sameAs": [
      "https://www.linkedin.com/company/softdab",
      "https://twitter.com/softdab",
      "https://github.com/softdabtech"
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Robots */}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content="SoftDAB" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@softdab" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      
      {/* Article specific */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      
      {/* Performance optimizations */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Custom head elements */}
      {children}
    </Helmet>
  );
};

export default SEOHead;