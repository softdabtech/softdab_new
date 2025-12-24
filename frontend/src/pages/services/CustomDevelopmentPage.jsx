import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Clock, Users, Shield, Award } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { mockData } from '../../data/mockData';
import SEOHead from '../../components/seo/SEOHead';

const CustomDevelopmentPage = () => {
  useEffect(() => {
    // SEO title & description set via <SEOHead />

    // Breadcrumb Schema
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
          "name": "Custom Development"
        }
      ]
    };

    // Service Schema
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Custom Software Development",
      "description": "End-to-end custom software development with full project ownership and guaranteed delivery",
      "provider": {
        "@type": "Organization",
        "name": "SoftDAB"
      },
      "areaServed": ["United States", "European Union"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Software Development Services"
      }
    };

    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'application/ld+json';
    script2.text = JSON.stringify(serviceSchema);
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  const service = mockData.customDevelopment;
  
  const processSteps = [
    {
      number: '01',
      title: 'Discovery & Planning',
      description: 'Deep dive into your business needs, technical requirements, and project goals.',
      duration: '1-2 weeks'
    },
    {
      number: '02', 
      title: 'Design & Architecture',
      description: 'Create technical architecture, UI/UX design, and project roadmap.',
      duration: '2-3 weeks'
    },
    {
      number: '03',
      title: 'Development',
      description: 'Agile development with regular demos and continuous client feedback.',
      duration: '8-24 weeks'
    },
    {
      number: '04',
      title: 'Testing & QA',
      description: 'Comprehensive testing including automated tests, performance, and security audits.',
      duration: '1-2 weeks'
    },
    {
      number: '05',
      title: 'Deployment',
      description: 'Production deployment with monitoring setup and documentation handover.',
      duration: '1 week'
    },
    {
      number: '06',
      title: 'Support',
      description: 'Ongoing maintenance, updates, and technical support as needed.',
      duration: 'Ongoing'
    }
  ];

  const faqItems = [
    {
      question: 'What types of software do you develop?',
      answer: 'We develop a wide range of custom software solutions including web applications, mobile apps, enterprise software, APIs and integrations, SaaS products, and cloud-based systems. Our expertise spans various technologies and business domains.'
    },
    {
      question: 'How do you ensure project quality and timely delivery?',
      answer: 'We follow agile methodology with 2-week sprints, automated testing, code reviews, and continuous client feedback. Our project managers provide regular updates and demos to ensure alignment with your expectations.'
    },
    {
      question: 'What is your development process?',
      answer: 'We follow a proven 6-step process: Discovery & Planning, Design & Architecture, Development, Testing & QA, Deployment, and ongoing Support. Each phase includes clear deliverables and regular checkpoints.'
    },
    {
      question: 'Do you provide post-launch support?',
      answer: 'Yes, we offer comprehensive post-launch support including bug fixes, performance monitoring, security updates, and feature enhancements. Support packages are tailored to your needs.'
    },
    {
      question: 'How do you handle intellectual property rights?',
      answer: 'We sign comprehensive NDAs and IP agreements. All code, designs, and project materials are 100% owned by you. We follow strict security protocols to protect your intellectual property.'
    }
  ];

  return (
    <div className="min-h-screen">
      <SEOHead title={"Custom Software Development (USA & LATAM) — SoftDAB"} description={"End-to-end custom software development services for US, Canadian, and Latin American companies. Nearshore teams and flexible engagement models."} keywords={"custom software development, software development company, software development company USA, software development company Canada, custom software, web applications, mobile apps, API development, nearshore, nearshore development, USA, Canada, Latin America"} url={"https://www.softdab.tech/services/custom-development"} />
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 mt-20">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Services</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Custom Development</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200">End-to-End Software Development</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {service?.title || 'Custom Software Development'}
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-balance leading-relaxed">
              {service?.description || 'Transform your business ideas into powerful software solutions with our end-to-end development services.'} We build reliable, scalable solutions that drive your business forward. We work with clients across the US, Canada and Latin America and provide nearshore teams when needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary-dark">
                <Link to="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Get Solution Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why choose <span className="gradient-text">custom development</span>?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Get a tailored solution that perfectly matches your business needs and scales with your growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(service?.benefits || [
                'Tailored solutions that perfectly match your business needs',
                'Full project ownership from requirements to deployment',
                'Senior developers with deep technical expertise',
                'Agile development with regular deliveries',
                'Comprehensive testing and quality assurance',
                'Long-term technical partnership'
              ]).map((benefit, index) => (
                <Card key={index} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <CheckCircle className="h-8 w-8 text-green-500 mb-4" />
                    <p className="text-gray-700 leading-relaxed">{benefit}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our development <span className="gradient-text">process</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A proven methodology that ensures quality, transparency, and timely delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-primary/30 to-transparent"></div>
                  )}
                  <Card className="relative bg-white border border-gray-200 hover:shadow-lg transition-all hover-lift">
                    <CardContent className="p-6">
                      <div className="text-primary text-sm font-bold mb-2 opacity-60">
                        {step.number}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {step.description}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {step.duration}
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently asked <span className="gradient-text">questions</span>
              </h2>
              <p className="text-lg text-gray-600">
                Got questions? We've got answers.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to start your project?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your requirements and create a custom solution that perfectly matches your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Link to="/contact" className="group">
                  Book Free Consultation
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-white text-white"
              >
                <Link to="/case-studies">
                  View Case Studies
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomDevelopmentPage;
