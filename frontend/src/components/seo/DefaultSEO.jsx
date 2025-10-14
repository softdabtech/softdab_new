import React from 'react';
import { Helmet } from 'react-helmet-async';

const DefaultSEO = () => {
  const SITE_URL = 'https://www.softdab.tech';
  const DEFAULT_TITLE = 'SoftDAB | Custom Software Development & Dedicated Teams';
  const DEFAULT_DESCRIPTION = 'Custom software development and dedicated teams from a partner with 8 years in IT. Serving US and EU businesses. Start in ~2 weeks with a risk-free trial.';
  const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={SITE_URL} />

      {/* Primary Meta Tags */}
      <title>{DEFAULT_TITLE}</title>
      <meta name="title" content={DEFAULT_TITLE} />
      <meta name="description" content={DEFAULT_DESCRIPTION} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content={DEFAULT_TITLE} />
      <meta property="og:description" content={DEFAULT_DESCRIPTION} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta property="og:site_name" content="SoftDAB" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={SITE_URL} />
      <meta name="twitter:title" content={DEFAULT_TITLE} />
      <meta name="twitter:description" content={DEFAULT_DESCRIPTION} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />
      <meta name="twitter:site" content="@softdab" />

      {/* Additional Meta */}
      <meta name="theme-color" content="#0066FF" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="SoftDAB" />
      <meta name="apple-mobile-web-app-title" content="SoftDAB" />
      <meta name="msapplication-TileColor" content="#0066FF" />
    </Helmet>
  );
};

export default DefaultSEO;