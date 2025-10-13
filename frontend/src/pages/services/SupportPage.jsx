// frontend/src/pages/services/SupportPage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Shield, Zap, Settings, Clock, Users, FileText, AlertTriangle, Monitor, Bug, TrendingUp, Lock, Plus, BookOpen, Headphones, Wrench } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';

const SupportPage = () => {
  useEffect(() => {
    document.title = 'Software Support & Maintenance - 24/7 Professional Support | SoftDAB';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = '24/7 professional software support and maintenance services. System monitoring, bug fixing, performance optimization, and continuous improvements.';
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
          "name": "Support & Maintenance"
        }
      ]
    };

    // Service Schema
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Software Support & Maintenance Services",
      "description": "24/7 professional support and maintenance for business-critical software systems",
      "provider": {
        "@type": "Organization",
        "name": "SoftDAB"
      },
      "areaServed": ["United States", "European Union"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Support & Maintenance Services"
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
      icon: Monitor,
      title: '24/7 System Monitoring',
      description: 'Continuous monitoring of your applications with real-time alerts and proactive issue detection.',
      benefits: ['Real-time performance monitoring', 'Automated alert systems', 'Uptime tracking', 'Resource utilization analysis']
    },
    {
      icon: Bug,
      title: 'Bug Fixing & Troubleshooting',
      description: 'Rapid identification and resolution of software issues with comprehensive testing and verification.',
      benefits: ['Rapid issue resolution', 'Root cause analysis', 'Comprehensive testing', 'Regression prevention']
    },
    {
      icon: TrendingUp,
      title: 'Performance Optimization',
      description: 'Continuous performance improvements to ensure your applications run efficiently at scale.',
      benefits: ['Database optimization', 'Code performance tuning', 'Resource optimization', 'Scalability improvements']
    },
    {
      icon: Lock,
      title: 'Security Updates',
      description: 'Regular security patches and vulnerability assessments to protect your applications.',
      benefits: ['Security patch management', 'Vulnerability scanning', 'Compliance updates', 'Security audits']
    },
    {
      icon: Plus,
      title: 'Feature Enhancements',
      description: 'Continuous improvement and new feature development based on user feedback and business needs.',
      benefits: ['User experience improvements', 'New feature development', 'Integration enhancements', 'Mobile optimization']
    },
    {
      icon: BookOpen,
      title: 'Technical Documentation',
      description: 'Comprehensive documentation updates and maintenance for better system understanding.',
      benefits: ['API documentation', 'User guides', 'Technical specifications', 'Process documentation']
    },
    {
      icon: Headphones,
      title: 'User Support',
      description: 'Direct user support and training to maximize the value of your software investments.',
      benefits: ['Help desk support', 'User training', 'Knowledge base', 'Video tutorials']
    },
    {
      icon: Wrench,
      title: 'Regular Maintenance',
      description: 'Scheduled maintenance windows for updates, backups, and preventive system care.',
      benefits: ['Scheduled updates', 'Database maintenance', 'Backup management', 'Server optimization']
    }
  ];

  const supportLevels = [
    {
      name: 'Basic Support',
      price: '$2,000/month',
      responseTime: '4-8 hours',
      coverage: 'Business hours (9 AM - 6 PM EST)',
      features: [
        'Email support',
        'Bug fixes',
        'Security updates',
        'Monthly reports',
        'Basic monitoring'
      ],
      color: 'border-gray-300',
      bgColor: 'bg-white'
    },
    {
      name: 'Business Support',
      price: '$5,000/month',
      responseTime: '1-2 hours',
      coverage: 'Extended hours (8 AM - 10 PM EST)',
      features: [
        'Priority email & phone support',
        'Bug fixes & enhancements',
        'Security & performance updates',
        'Weekly reports',
        'Advanced monitoring',
        'Dedicated support manager'
      ],
      color: 'border-primary ring-2 ring-primary',
      bgColor: 'bg-primary/5',
      popular: true
    },
    {
      name: 'Enterprise Support',
      price: 'Custom pricing',
      responseTime: '15-30 minutes',
      coverage: '24/7 coverage',
      features: [
        '24/7 phone & email support',
        'Priority bug fixes & features',
        'All updates & optimizations',
        'Real-time reporting',
        'Comprehensive monitoring',
        'Dedicated team',
        'SLA guarantee'
      ],
      color: 'border-gray-300',
      bgColor: 'bg-white'
    }
  ];

  const benefits = [
    {
      stat: '99.9%',
      description: 'System uptime',
      detail: 'Reliable service availability with minimal downtime'
    },
    {
      stat: '15min',
      description: 'Average response time',
      detail: 'Quick response to critical issues and emergencies'
    },
    {
      stat: '90%',
      description: 'Issues resolved in first response',
      detail: 'Efficient problem-solving with experienced team'
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Issue Detection/Reporting',
      description: 'Automated monitoring systems detect issues or users report problems through our support channels.',
      tools: ['Monitoring alerts', 'User reports', 'System logs', 'Performance metrics']
    },
    {
      number: '02',
      title: 'Triage & Prioritization',
      description: 'Issues are classified by severity and impact, with appropriate priority levels assigned for resolution.',
      tools: ['Severity assessment', 'Impact analysis', 'Priority assignment', 'Resource allocation']
    },
    {
      number: '03',
      title: 'Resolution & Testing',
      description: 'Our technical team implements fixes and thoroughly tests solutions before deployment.',
      tools: ['Problem diagnosis', 'Solution development', 'Quality testing', 'Peer review']
    },
    {
      number: '04',
      title: 'Deployment & Verification',
      description: 'Approved fixes are deployed to production with careful monitoring and verification.',
      tools: ['Staged deployment', 'Production monitoring', 'Performance verification', 'User validation']
    },
    {
      number: '05',
      title: 'Documentation Update',
      description: 'All changes are documented for future reference and knowledge base improvement.',
      tools: ['Change documentation', 'Knowledge base updates', 'Process improvement', 'Lessons learned']
    }
  ];

  const tools = [
    {
      category: 'Monitoring Systems',
      tools: ['New Relic', 'DataDog', 'Grafana', 'Prometheus']
    },
    {
      category: 'Logging Solutions',
      tools: ['ELK Stack', 'Splunk', 'CloudWatch', 'Fluentd']
    },
    {
      category: 'Ticketing Systems',
      tools: ['Jira Service Desk', 'Zendesk', 'ServiceNow', 'Freshservice']
    },
    {
      category: 'Deployment Tools',
      tools: ['Jenkins', 'GitLab CI/CD', 'Docker', 'Kubernetes']
    },
    {
      category: 'Testing Frameworks',
      tools: ['Selenium', 'Jest', 'Cypress', 'JUnit']
    }
  ];

  const faqItems = [
    {
      question: 'What Service Level Agreements (SLAs) do you offer?',
      answer: 'Our SLAs vary by support tier: Basic (4-8 hour response), Business (1-2 hour response with 99.5% uptime guarantee), and Enterprise (15-30 minute response with 99.9% uptime guarantee). All SLAs include escalation procedures and performance penalties for non-compliance.'
    },
    {
      question: 'What is included in your support coverage?',
      answer: 'Support coverage includes bug fixes, security updates, performance monitoring, system maintenance, user support, and documentation updates. The specific services vary by tier, with Enterprise including 24/7 coverage and dedicated team assignment.'
    },
    {
      question: 'How do you prioritize support issues?',
      answer: 'Issues are prioritized based on severity and business impact: Critical (system down), High (major functionality affected), Medium (minor issues), Low (enhancement requests). Response times and resolution targets are defined for each priority level.'
    },
    {
      question: 'When are scheduled maintenance windows?',
      answer: 'Maintenance windows are typically scheduled during off-peak hours (weekends or late evenings) with advance notice. Emergency maintenance may occur outside scheduled windows for critical security updates or system failures.'
    },
    {
      question: 'Do you provide emergency support outside business hours?',
      answer: 'Yes, emergency support is available for Business and Enterprise tiers. Critical issues affecting system availability or security can be escalated through our emergency hotline for immediate attention, even outside regular support hours.'
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
            <Link to="/services" className="hover:text-primary">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Support & Maintenance</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-orange-100 text-orange-800 border-orange-200">Support & Maintenance</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Keep Your Software Running at Peak Performance
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-balance leading-relaxed">
              24/7 professional support and continuous improvements for business-critical systems. 
              Ensure reliability, security, and optimal performance.
            </p>
            
            {/* Key Benefits */}
            <div className="flex flex-wrap justify-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Proactive monitoring</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Quick response</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Continuous optimization</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary-dark">
                <Link to="/company/contact">
                  Get Support Coverage
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                View Support Plans
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
                Comprehensive <span className="gradient-text">support services</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                End-to-end support and maintenance services to keep your software running smoothly and securely.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="bg-white border-0 shadow-sm hover:shadow-lg transition-all hover-lift h-full">
                    <CardHeader className="pb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                        <IconComponent className="h-6 w-6 text-orange-600" />
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-900">{feature.title}</CardTitle>
                      <CardDescription className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-1">
                        {feature.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
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

      {/* Support Levels Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Choose your <span className="gradient-text">support level</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Flexible support tiers designed to match your business needs and requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {supportLevels.map((level, index) => (
                <Card key={index} className={`${level.bgColor} ${level.color} shadow-lg hover:shadow-xl transition-all hover-lift relative`}>
                  {level.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-white">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-900">{level.name}</CardTitle>
                    <div className="text-3xl font-bold text-primary mt-2">{level.price}</div>
                    <div className="space-y-2 mt-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{level.responseTime} response</span>
                      </div>
                      <div className="text-sm text-gray-600">{level.coverage}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {level.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      asChild 
                      className={`w-full ${level.popular ? 'bg-primary hover:bg-primary-dark' : 'bg-gray-800 hover:bg-gray-900'}`}
                    >
                      <Link to="/company/contact">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
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
              Proven <span className="gradient-text">reliability</span>
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Our support services deliver measurable results and peace of mind for your business operations.
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

      {/* Support Process Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our support <span className="gradient-text">process</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Systematic approach to issue resolution that ensures quick response and thorough solutions.
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
                              {step.tools.map((tool, toolIndex) => (
                                <Badge key={toolIndex} variant="outline" className="text-xs">
                                  {tool}
                                </Badge>
                              ))}
                            </div>
                          </div>
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

      {/* Tools & Technologies Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Tools & <span className="gradient-text">technologies</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Industry-leading tools and platforms that power our support and maintenance services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((toolCategory, index) => (
                <Card key={index} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-900">
                      {toolCategory.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-2">
                      {toolCategory.tools.map((tool, toolIndex) => (
                        <Badge key={toolIndex} variant="outline" className="text-xs justify-center">
                          {tool}
                        </Badge>
                      ))}
                    </div>
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
                Common questions about our support and maintenance services.
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
              Ensure Your Software's Reliability
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get professional support coverage starting today. Protect your investment 
              and ensure optimal performance with our expert team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link to="/company/contact">
                  Talk to Support Expert
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Download Support Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;