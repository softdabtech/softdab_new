import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Clock, Users, Shield, Award } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { mockData } from '../../data/mockData';

const OutsourcingPage = () => {
  useEffect(() => {
    document.title = 'Outsourcing - Custom Software Development | SoftDAB';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
  metaDescription.content = 'Custom software development outsourcing from a partner with 8+ years in IT. End-to-end ownership with guaranteed delivery and quality assurance.';
}

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
          "name": "Outsourcing"
        }
      ]
    };

    // Service Schema
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Custom Software Development Outsourcing",
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

  const service = mockData.services.outsourcing;
  
  const processSteps = [
    {
      number: '01',
      title: 'Requirements Analysis',
      description: 'Deep dive into your business needs, technical requirements, and project goals.',
      duration: '1-2 weeks'
    },
    {
      number: '02', 
      title: 'Design & Architecture',
      description: 'Create technical architecture, UI/UX design, and project roadmap.',
      duration: '1-3 weeks'
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
      question: 'What types of projects do you handle with outsourcing?',
      answer: 'We handle a wide range of projects including web applications, mobile apps, enterprise software, e-commerce platforms, SaaS products, and API integrations. From MVPs to complex enterprise solutions.'
    },
    {
      question: 'How do you ensure project quality and timely delivery?',
      answer: 'We use agile methodology with regular sprints, automated testing, code reviews, and continuous client feedback. Our project managers provide daily updates and weekly demos to ensure alignment with your expectations.'
    },
    {
      question: 'What happens if the project scope changes during development?',
      answer: 'We handle scope changes through a formal change request process. We assess the impact on timeline and budget, get your approval, and adjust the project plan accordingly while maintaining quality standards.'
    },
    {
      question: 'Do you provide post-launch support and maintenance?',
      answer: 'Yes, we offer comprehensive post-launch support including bug fixes, performance monitoring, security updates, and feature enhancements. Support packages are available on monthly or yearly basis.'
    },
    {
      question: 'How do you handle intellectual property and confidentiality?',
      answer: 'We sign comprehensive NDAs and IP assignment agreements before starting any project. All code, designs, and project materials are 100% owned by you. We also follow strict security protocols to protect your data.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 mt-20">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Services</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Outsourcing</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-white">
  <div className="container mx-auto px-6">
    <div className="max-w-4xl mx-auto text-center">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Badge className="bg-blue-100 text-blue-800 border-blue-200">Custom Software Development</Badge>
        <Badge variant="outline" className="border-gray-200 text-gray-700">8+ years in IT</Badge>
      </div>
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
        {service.title}
      </h1>
      <p className="text-xl text-gray-600 mb-8 text-balance leading-relaxed">
        {service.description} With 8+ years in IT delivery, we take full ownership from discovery to deployment and support — so you can focus on outcomes.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" className="bg-primary hover:bg-primary-dark">
          <Link to="/contact">
            Start Your Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button variant="outline" size="lg">
          Get Pricing PDF
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
                Why choose <span className="gradient-text">outsourcing</span>?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Focus on your core business while we handle the complete software development lifecycle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.benefits.map((benefit, index) => (
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
        {index === 0 && (
          <Badge variant="outline" className="mb-3 text-xs text-gray-700 border-gray-200">Proven since 2017</Badge>
        )}
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

      {/* Pricing Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Transparent <span className="gradient-text">pricing</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Choose the package that fits your project scope and budget.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(service.pricing).map(([key, plan]) => (
                <Card key={key} className={`bg-white border-0 shadow-lg hover:shadow-xl transition-all hover-lift ${key === 'professional' ? 'ring-2 ring-primary' : ''}`}>
                  {key === 'professional' && (
                    <div className="bg-primary text-white text-center py-2 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                    <div className="text-2xl font-bold text-primary mt-2">{plan.price}</div>
                    <CardDescription className="text-gray-600">{plan.duration}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      asChild 
                      className={`w-full mt-6 ${key === 'professional' ? 'bg-primary hover:bg-primary-dark' : 'bg-gray-800 hover:bg-gray-900'}`}
                    >
                      <Link to="/contact">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
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
              Let's discuss your requirements and create a custom development plan that fits your needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link to="/contact">
                  Book Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                View Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OutsourcingPage;