import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, Users, Star, Zap, Shield, Globe } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import HeroSection from '../components/sections/HeroSection';
import TrustSection from '../components/sections/TrustSection';
import ServicesSection from '../components/sections/ServicesSection';
import HowWeWorkSection from '../components/sections/HowWeWorkSection';
import CaseStudiesSection from '../components/sections/CaseStudiesSection';
import IndustriesSection from '../components/sections/IndustriesSection';
import CTASection from '../components/sections/CTASection';
import { mockData } from '../data/mockData';

// SEO Component
const SEOHead = () => {
  useEffect(() => {
    // Set page title
    document.title = 'SoftDAB | Custom Software Development & Dedicated Teams';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Custom software development and dedicated teams from a partner with 8 years in IT. Serving US and EU businesses. Start in ~2 weeks with a risk-free trial.';
    }

    // JSON-LD Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "SoftDAB",
      "url": "https://www.softdab.tech",
      "logo": "https://www.softdab.tech/logo.png",
      "foundingDate": "2017",
      "description": "Custom software development and dedicated teams for US and EU businesses. 8+ years delivering scalable solutions.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "UA",
        "addressLocality": "Kyiv"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "hello@softdab.tech",
        "contactType": "Customer Service",
        "availableLanguage": ["English", "Ukrainian"]
      },
      "sameAs": [
        "https://linkedin.com/company/softdab",
        "https://twitter.com/softdab"
      ],
      "areaServed": [
        {
          "@type": "Place",
          "name": "United States"
        },
        {
          "@type": "Place",
          "name": "European Union"
        }
      ],
      "knowsAbout": [
        "Custom Software Development",
        "Dedicated Development Teams",
        "Outsourcing",
        "Outstaffing",
        "Web Development",
        "Mobile Development"
      ]
    };

    // JSON-LD WebSite Schema with SearchAction
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "SoftDAB",
      "url": "https://www.softdab.tech",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.softdab.tech/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.text = JSON.stringify(organizationSchema);
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'application/ld+json';
    script2.text = JSON.stringify(websiteSchema);
    document.head.appendChild(script2);

    return () => {
      if (document.head.contains(script1)) document.head.removeChild(script1);
      if (document.head.contains(script2)) document.head.removeChild(script2);
    };
  }, []);

  return null;
};

const HomePage = () => {
  return (
    <>
      <SEOHead />
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Trust/Proof Section */}
        <TrustSection />
        
        {/* Services Summary Section */}
        <ServicesSection />
        
        {/* How We Work Section */}
        <HowWeWorkSection />
        
        {/* Case Studies Section */}
        <CaseStudiesSection />
        
        {/* Industries Overview Section */}
        <IndustriesSection />
        
        {/* Final CTA Section */}
        <CTASection />
      </div>
    </>
  );
};

export default HomePage;