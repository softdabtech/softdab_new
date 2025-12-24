// frontend/src/pages/services/DiscoveryPage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Lightbulb, Search, Zap, Shield, BarChart, FileText, Clock, Users, Target, Cog } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import SEOHead from '../../components/seo/SEOHead';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';

const DiscoveryPage = () => {
  useEffect(() => {
    // SEO title & description set via <SEOHead />

    const desc = 'Validate your ideas with Discovery & Proof of Concept services. Technical feasibility analysis, rapid prototyping, and clear implementation roadmap.';
    const metas = document.querySelectorAll('meta[name="description"]');
    if (metas && metas.length) metas[metas.length-1].setAttribute('content', desc);
    else { const m = document.createElement('meta'); m.name='description'; m.content=desc; document.head.appendChild(m); }

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
          "name": "Discovery & PoC"
        }
      ]
    };

    // Service Schema
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Discovery & Proof of Concept Services",
      "description": "Technical validation and feasibility analysis services for software projects",
      "provider": {
        "@type": "Organization",
        "name": "SoftDAB"
      },
      "areaServed": ["United States", "European Union"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Discovery & PoC Services"
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

  const features = [
    {
      icon: Search,
      title: 'Technical Feasibility Analysis',
      description: 'Comprehensive evaluation of your concept\'s technical viability, including technology stack assessment and scalability analysis.',
      benefits: ['Technology stack evaluation', 'Scalability assessment', 'Performance analysis', 'Integration possibilities']
    },
    {
      icon: Zap,
      title: 'Rapid Prototyping',
      description: 'Quick development of functional prototypes to validate core features and user experience assumptions.',
      benefits: ['Interactive mockups', 'Core feature validation', 'User experience testing', 'Stakeholder demonstrations']
    },
    {
      icon: Cog,
      title: 'Architecture Design',
      description: 'High-level system architecture and technical specifications tailored to your business requirements.',
      benefits: ['System architecture', 'Database design', 'API specifications', 'Security considerations']
    },
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'Identification and mitigation strategies for potential technical, business, and implementation risks.',
      benefits: ['Technical risk analysis', 'Mitigation strategies', 'Dependency evaluation', 'Timeline risk factors']
    },
    {
      icon: BarChart,
      title: 'Cost Estimation',
      description: 'Detailed project cost analysis including development, infrastructure, and ongoing maintenance estimates.',
      benefits: ['Development cost breakdown', 'Infrastructure estimates', 'Maintenance projections', 'ROI analysis']
    },
    {
      icon: FileText,
      title: 'Implementation Roadmap',
      description: 'Step-by-step implementation plan with milestones, timelines, and resource allocation recommendations.',
      benefits: ['Milestone planning', 'Resource allocation', 'Timeline estimates', 'Delivery phases']
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Requirements Workshop',
      description: 'Deep dive into your business goals, user needs, and technical requirements through structured workshops.',
      duration: '2-3 days',
      deliverables: ['Requirements document', 'User stories', 'Business objectives']
    },
    {
      number: '02',
      title: 'Technical Research',
      description: 'Comprehensive analysis of technology options, market solutions, and technical constraints.',
      duration: '3-5 days',
      deliverables: ['Technology assessment', 'Competitive analysis', 'Technical constraints']
    },
    {
      number: '03',
      title: 'Prototype Development',
      description: 'Creation of functional prototypes to validate key concepts and demonstrate core functionality.',
      duration: '1-2 weeks',
      deliverables: ['Working prototype', 'Demo scenarios', 'Feature validation']
    },
    {
      number: '04',
      title: 'Testing & Validation',
      description: 'Rigorous testing of prototypes with stakeholders and potential users to validate assumptions.',
      duration: '3-5 days',
      deliverables: ['Test results', 'User feedback', 'Validation report']
    },
    {
      number: '05',
      title: 'Documentation & Roadmap',
      description: 'Comprehensive documentation and detailed implementation roadmap for moving forward.',
      duration: '2-3 days',
      deliverables: ['Technical documentation', 'Implementation roadmap', 'Cost estimates']
    }
  ];

  const benefits = [
    {
      stat: '60%',
      description: 'Faster time to market',
      detail: 'Clear technical direction accelerates development'
    },
    {
      stat: '80%',
      description: 'Reduced technical risks',
      detail: 'Early identification and mitigation of potential issues'
    },
    {
      stat: '100%',
      description: 'Clear technical direction',
      detail: 'Detailed roadmap eliminates uncertainty'
    }
  ];

  const useCases = [
    {
      icon: Lightbulb,
      title: 'New Product Validation',
      description: 'Validate innovative product ideas before committing to full development.',
      scenarios: ['Startup MVP validation', 'New feature exploration', 'Market opportunity assessment']
    },
    {
      icon: Cog,
      title: 'Legacy System Modernization',
      description: 'Plan and validate modernization approaches for existing systems.',
      scenarios: ['Technology migration', 'System redesign', 'Performance optimization']
    },
    {
      icon: Target,
      title: 'Technology Selection',
      description: 'Make informed decisions about technology stacks and architectural choices.',
      scenarios: ['Framework evaluation', 'Cloud platform selection', 'Integration planning']
    },
    {
      icon: BarChart,
      title: 'Architecture Optimization',
      description: 'Optimize existing architectures for better performance and scalability.',
      scenarios: ['Scalability planning', 'Performance improvement', 'Cost optimization']
    }
  ];

  const faqItems = [
    {
      question: 'How long does a typical Discovery & PoC phase take?',
      answer: 'Most Discovery & PoC projects take 2-4 weeks, depending on complexity. Simple concepts can be validated in 2 weeks, while complex enterprise solutions may require up to 4 weeks for thorough analysis.'
    },
    {
      question: 'What deliverables do we receive at the end?',
      answer: 'You receive a comprehensive package including: technical documentation, working prototype, implementation roadmap, cost estimates, risk assessment, and architecture specifications. All deliverables are designed to guide your next development phase.'
    },
    {
      question: 'Who is involved in the Discovery team?',
      answer: 'Our Discovery team typically includes a Technical Architect, Senior Developer, Business Analyst, and Project Manager. The exact composition depends on your project requirements and complexity.'
    },
    {
      question: 'What happens after the Discovery phase?',
      answer: 'After Discovery, you have a clear roadmap for implementation. You can proceed with SoftDAB for full development, use our findings with your internal team, or share the documentation with other development partners.'
    },
    {
      question: 'Can you help validate technical feasibility for complex integrations?',
      answer: 'Absolutely. We specialize in validating complex integration scenarios, including legacy system connections, third-party APIs, and enterprise software integrations. Our team has extensive experience across various platforms and technologies.'
    }
  ];

  return (
    <div className="min-h-screen">
      <SEOHead title={"Discovery & PoC — SoftDAB"} description={"Validate your ideas with Discovery & Proof of Concept services. Technical feasibility analysis, rapid prototyping, and clear implementation roadmap."} keywords={"discovery, proof of concept, technical validation, rapid prototyping, feasibility analysis, product discovery, PoC"} url={"https://www.softdab.tech/services/discovery"} />
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 mt-20">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/services" className="hover:text-primary">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Discovery & PoC</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-purple-100 text-purple-800 border-purple-200">Discovery & Proof of Concept</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Validate Your Ideas Fast with Discovery & PoC
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-balance leading-relaxed">
              Turn your concept into a validated technical solution in weeks, not months. 
              Get clarity, reduce risks, and build confidence before full development.
            </p>
            
            {/* Key Benefits */}
            <div className="flex flex-wrap justify-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Risk mitigation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Technical validation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Clear roadmap</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary-dark">
                <Link to="/company/contact">
                  Start Discovery Phase
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                View Sample Deliverables
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What's included in <span className="gradient-text">Discovery & PoC</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Comprehensive validation process that gives you confidence to move forward with your project.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="bg-white border-0 shadow-sm hover:shadow-lg transition-all hover-lift">
                    <CardHeader>
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                        <IconComponent className="h-6 w-6 text-purple-600" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
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
                Our Discovery <span className="gradient-text">process</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Structured approach that delivers actionable insights and clear next steps.
              </p>
            </div>

            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Connection Line */}
                  {index < processSteps.length - 1 && (
                    <div className="absolute left-8 top-20 w-px h-16 bg-gradient-to-b from-primary to-transparent opacity-30"></div>
                  )}
                  
                  <Card className="relative bg-white border border-gray-200 hover:shadow-lg transition-all hover-lift">
                    <CardContent className="p-8">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
                        <div className="flex items-start space-x-6 flex-1">
                          {/* Step Number */}
                          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <span className="text-primary text-lg font-bold">{step.number}</span>
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                              {step.title}
                            </h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                              {step.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {step.deliverables.map((deliverable, delIndex) => (
                                <Badge key={delIndex} variant="outline" className="text-xs">
                                  {deliverable}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 lg:mt-0 lg:text-right">
                          <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                            {step.duration}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Proven <span className="gradient-text">results</span>
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Our Discovery & PoC process delivers measurable value and reduces project risks.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-white border-0 shadow-sm text-center">
                  <CardContent className="p-8">
                    <div className="text-5xl font-bold text-primary mb-4">
                      {benefit.stat}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {benefit.description}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {benefit.detail}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Perfect for these <span className="gradient-text">scenarios</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discovery & PoC services are ideal for various situations where you need clarity before committing resources.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {useCases.map((useCase, index) => {
                const IconComponent = useCase.icon;
                return (
                  <Card key={index} className="bg-white border border-gray-200 hover:shadow-lg transition-all hover-lift">
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                            {useCase.title}
                          </CardTitle>
                          <CardDescription className="text-gray-600 leading-relaxed">
                            {useCase.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {useCase.scenarios.map((scenario, scenarioIndex) => (
                          <div key={scenarioIndex} className="flex items-center text-sm text-gray-600">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                            {scenario}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
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
                Common questions about our Discovery & PoC services.
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

      {/* Final CTA Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to validate your idea?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get a clear technical roadmap in 2-4 weeks. Start with confidence, 
              reduce risks, and accelerate your development timeline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link to="/company/contact">
                  Schedule Discovery Workshop
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Download Discovery Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiscoveryPage;