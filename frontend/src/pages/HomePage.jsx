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
    document.title = 'SoftDAB | Outsourcing & Outstaffing Software Development';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Custom software development and dedicated teams for US and EU businesses. Start in ~2 weeks with a risk-free trial.';
    }

    // JSON-LD Schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "SoftDAB",
      "url": "https://www.softdab.tech",
      "logo": "https://www.softdab.tech/logo.png",
      "description": "Custom software development and dedicated teams for US and EU businesses",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "UA",
        "addressLocality": "Kyiv"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "hello@softdab.tech",
        "contactType": "Customer Service"
      },
      "sameAs": [
        "https://linkedin.com/company/softdab",
        "https://twitter.com/softdab"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
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