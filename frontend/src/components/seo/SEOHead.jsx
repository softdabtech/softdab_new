// SEOHead.jsx - Полная SEO оптимизация с Schema.org разметкой
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({
  title = "SoftDAB — Software Development — Custom Software & Teams",
  description = "SoftDAB builds custom web & mobile applications and provides dedicated engineering teams for US & EU companies. Scalable software with transparent pricing.",
  keywords = "SoftDAB, software development, outsourcing, outstaffing, dedicated teams, web development, mobile development, React, Node.js, Python, C#, C++, JavaScript, IoT, US, EU",
  image = "https://www.softdab.tech/og-image.jpg",
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  author = "SoftDAB Team",
  section = "Technology",
  breadcrumbs = []
}) => {
  // Resolve canonical to the provided url or current location when available
  // Do not default to homepage during server-side rendering to avoid wrong canonical for SPA routes
  const canonicalUrl = url || (typeof window !== 'undefined' ? window.location.href : undefined);
  // Структурированные данные Schema.org для Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SoftDAB",
    "alternateName": "SoftDAB Software Development",
    "url": "https://www.softdab.tech",
    "logo": "https://www.softdab.tech/images/softdab-logo-square.svg",
    "description": "Custom software development and outsourcing teams for US/EU companies",
    "foundingDate": "2020",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-XXX-XXX-XXXX",
      "contactType": "customer service",
      "availableLanguage": ["English", "Ukrainian"],
      "areaServed": ["US", "EU", "Worldwide"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kyiv",
      "addressCountry": "UA"
    },
    "sameAs": [
      "https://www.linkedin.com/company/softdab",
      "https://github.com/softdab",
      "https://twitter.com/softdab"
    ],
    "service": {
      "@type": "Service",
      "name": "Software Development Services",
      "description": "Custom software development, dedicated teams, and outsourcing services",
      "provider": {
        "@type": "Organization",
        "name": "SoftDAB"
      },
      "serviceType": [
        "Web Development",
        "Mobile Development", 
        "Custom Software Development",
        "Dedicated Development Teams",
        "IT Outsourcing",
        "Software Consulting"
      ],
      "areaServed": {
        "@type": "Place",
        "name": "Worldwide"
      }
    }
  };

  // Структурированные данные для WebSite
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SoftDAB",
    "url": "https://www.softdab.tech",
    "description": description,
    "publisher": {
      "@type": "Organization",
      "name": "SoftDAB"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.softdab.tech/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Хлебные крошки Schema.org
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.softdab.tech"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "Services",
        "item": "https://www.softdab.tech/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "About",
        "item": "https://www.softdab.tech/about"
      }
    ]
  };

  // FAQ Schema для главной страницы
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What software development services does SoftDAB provide?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SoftDAB provides custom software development, dedicated development teams, web and mobile development, IT outsourcing, and software consulting services for US and EU companies."
        }
      },
      {
        "@type": "Question", 
        "name": "How quickly can we start working with SoftDAB?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We can start your project in as little as 2 weeks with our dedicated teams and transparent onboarding process."
        }
      },
      {
        "@type": "Question",
        "name": "What technologies does SoftDAB specialize in?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our team specializes in React, Node.js, Python, C#, C++, JavaScript, mobile development, IoT solutions, and modern web technologies."
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* Основные SEO теги */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} /> }

      {/* Open Graph теги */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="SoftDAB" />
      <meta property="og:locale" content="en_US" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}

      {/* Twitter Card теги */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@softdab" />
      <meta name="twitter:creator" content="@softdab" />

      {/* Дополнительные SEO теги */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#667eea" />
      <meta name="format-detection" content="telephone=no" />

      {/* Языковые альтернативы */}
      <link rel="alternate" hreflang="en" href="https://www.softdab.tech" />
      <link rel="alternate" hreflang="x-default" href="https://www.softdab.tech" />

      {/* DNS prefetch для производительности */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//api.softdab.tech" />

      {/* Структурированные данные Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      {/* Дополнительные мета теги для индексации */}
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="revisit-after" content="7 days" />
      <meta name="coverage" content="worldwide" />
      <meta name="target" content="all" />
      <meta name="audience" content="all" />
      <meta name="category" content="technology, software development, outsourcing" />
      {/* Google Global Site Tag (gtag.js) - added per request */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-BPPL55293F"></script>
      <script>
        {`window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-BPPL55293F');`}
      </script>
    </Helmet>
  );
};

export default SEOHead;