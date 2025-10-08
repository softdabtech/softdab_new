import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Settings, Shield, Users, Clock } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { Separator } from '../../components/ui/separator';
import { mockData } from '../../data/mockData';

const OutsourcingPage = () => {
  useEffect(() => {
    document.title = 'Outsourcing - Custom Software Development | SoftDAB';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content =
        'Custom software development outsourcing with end-to-end ownership. Discovery, delivery, and support with predictable timelines and quality.';
    }

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.softdab.tech' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.softdab.tech/services' },
        { '@type': 'ListItem', position: 3, name: 'Outsourcing' }
      ]
    };

    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Custom Software Development Outsourcing',
      description: 'End-to-end custom software development with full project ownership and guaranteed delivery',
      provider: { '@type': 'Organization', name: 'SoftDAB' },
      areaServed: ['United States', 'European Union'],
      hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Software Development Services' }
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
      title: 'Discovery & Alignment',
      description:
        'Stakeholder interviews, business goals, constraints, and success criteria. Define scope, roles, and communication cadence.',
      duration: '1–2 weeks'
    },
    {
      number: '02',
      title: 'Architecture & Planning',
      description:
        'Solution architecture, backlog creation, estimation, and delivery plan. Risk assessment and MVP definition.',
      duration: '1–3 weeks'
    },
    {
      number: '03',
      title: 'Agile Delivery',
      description:
        'Iterative development with CI/CD. Bi‑weekly demos, transparent progress tracking, and early value delivery.',
      duration: '8–24+ weeks'
    },
    {
      number: '04',
      title: 'Quality Assurance',
      description:
        'Automated and manual testing, performance checks, security review, and regression suite before each release.',
      duration: 'Parallel to delivery'
    },
    {
      number: '05',
      title: 'Release & Handover',
      description:
        'Production deployment, runbooks, monitoring/alerting setup, and knowledge transfer to your team.',
      duration: '~1 week'
    },
    {
      number: '06',
      title: 'Support & Growth',
      description:
        'SLA‑based maintenance, bug fixing, upgrades, and a continuous roadmap for new features and optimization.',
      duration: 'Ongoing'
    }
  ];

  // Expanded benefits text (6 blocks)
  const whyChoose = [
    {
      title: 'Faster time‑to‑market',
      text:
        'Spin up a senior team in weeks, not months. We bring proven delivery playbooks so you ship value sooner.'
    },
    {
      title: 'Predictable delivery',
      text:
        'Clear milestones, bi‑weekly demos, and risk management keep scope, budget, and timeline under control.'
    },
    {
      title: 'Senior engineering',
      text:
        'Hands‑on lead engineers, solution architects, and QA who have shipped complex products at scale.'
    },
    {
      title: 'Focus on outcomes',
      text:
        'We take full ownership from discovery to support, so your team can focus on strategy and customers.'
    },
    {
      title: 'Security & compliance',
      text:
        'NDA, IP assignment, secure SDLC, and adherence to your compliance needs (e.g., GDPR).'
    },
    {
      title: 'Flexible engagement',
      text:
        'Start with a scoped pilot, scale up/down as needed, and switch to your in‑house team when ready.'
    }
  ];

  const faqItems = [
    {
      question: 'How do we kick off an outsourcing project?',
      answer:
        'We start with a discovery workshop to clarify goals, constraints, and success criteria. Then we define scope, a high‑level plan, and form a senior delivery team. You get a clear start date, budget, and cadence.'
    },
    {
      question: 'How do you manage delivery and communication?',
      answer:
        'Agile sprints with bi‑weekly demos, a shared backlog, and a single point of contact (PM/EM). Daily Slack/Teams updates and a weekly status report with risks, decisions, and next steps.'
    },
    {
      question: 'What is your QA approach?',
      answer:
        'Test strategy per project: unit/integration tests, end‑to‑end tests, performance checks, and security review. CI/CD ensures every change is validated before release.'
    },
    {
      question: 'How do you handle scope changes?',
      answer:
        'Through a lightweight change request: impact analysis (budget/timeline), alignment with stakeholders, and updated plan. We keep transparency and avoid scope creep.'
    },
    {
      question: 'Who owns IP and code?',
      answer:
        'You do. We sign NDA and IP assignment. Repos, cloud, and artifacts can be set up under your organization from day one.'
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
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {service.description} With 8+ years in IT delivery, we take full ownership from discovery to deployment and support — so you can focus on outcomes.
            </p>

            {/* CTA: make narrower, keep white text on hover, remove second button */}
            <div className="flex justify-center">
              <Button
                asChild
                size="lg"
                className="
                  bg-primary hover:bg-primary/90 text-white
                  hover:underline hover:text-white
                  w-full sm:w-[22rem] max-w-[22rem]
                  rounded-xl
                "
              >
                <Link to="/contact" aria-label="Start your project">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose outsourcing */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why choose <span className="gradient-text">outsourcing</span>?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Outsource delivery to a senior team while you stay focused on strategy and customers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChoose.map((item, idx) => (
                <Card key={idx} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-700 leading-relaxed text-sm">{item.text}</p>
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
                Lean, transparent, and quality‑driven delivery from discovery to support.
              </p>
            </div>

            {/* equal height cards and aligned grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, index) => (
                <Card key={index} className="h-full bg-white border border-gray-200 hover:shadow-lg transition-all">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="text-primary text-sm font-bold mb-2 opacity-70">{step.number}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">{step.description}</p>
                    <div className="mt-auto">
                      <Badge variant="outline" className="text-xs">{step.duration}</Badge>
                    </div>
                  </CardContent>
                </Card>
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

            {/* aligned buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {Object.entries(service.pricing).map(([key, plan]) => (
                <Card
                  key={key}
                  className={`bg-white border-0 shadow-lg hover:shadow-xl transition-all flex flex-col ${
                    key === 'professional' ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  {key === 'professional' && (
                    <div className="bg-primary text-white text-center py-2 text-sm font-medium">Most Popular</div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                    <div className="text-2xl font-bold text-primary mt-2">{plan.price}</div>
                    <CardDescription className="text-gray-600">{plan.duration}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto">
                      <Button
                        asChild
                        className={`w-full ${
                          key === 'professional' ? 'bg-primary hover:bg-primary/90' : 'bg-gray-800 hover:bg-gray-900'
                        }`}
                      >
                        <Link to="/contact">Get Started</Link>
                      </Button>
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
                How we work, communicate, and deliver.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
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

      {/* Description (улучшен, читабельный) */}
      <p className="text-lg md:text-xl text-blue-100/95 mb-8 max-w-2xl mx-auto">
        Tell us about your goals and constraints — we’ll propose a delivery plan, team composition,
        timeline, and budget options tailored to your needs.
      </p>

      {/* Кнопки: одинаковая высота, ровное выравнивание, корректные цвета и hover */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {/* Primary: белая на синем фоне; текст остаётся синим, без смены цвета */}
        <Button
          asChild
          size="lg"
          className="
            bg-white text-primary hover:bg-white/90 hover:underline
            w-full sm:w-[22rem] max-w-[22rem] h-14 rounded-2xl
          "
        >
          <Link to="/contact" aria-label="Book a free consultation">
            Book Free Consultation
            <svg
              className="ml-2 h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </Button>

        {/* Secondary: прозрачная с белой рамкой и белым текстом; на hover — лёгкая подложка, текст остаётся белым */}
        <Button
          asChild
          variant="outline"
          size="lg"
          className="
            border-white text-white hover:bg-white/10 hover:text-white
            w-full sm:w-[16rem] max-w-[16rem] h-14 rounded-2xl
          "
        >
          <Link to="/case-studies" aria-label="View case studies">
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

export default OutsourcingPage;