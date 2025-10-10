import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Users, Clock, MessageSquare, TrendingUp } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { mockData } from '../../data/mockData';

const DedicatedTeamsPage = () => {
  useEffect(() => {
    document.title = 'Dedicated Teams - Extended Development Teams | SoftDAB';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content =
        'Dedicated development teams with seamless integration, predictable delivery, and flexible scaling. Senior engineers aligned to your processes.';
    }

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.softdab.tech' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.softdab.tech/services' },
        { '@type': 'ListItem', position: 3, name: 'Dedicated Teams' }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const service = mockData.services.dedicatedTeams;

  const whyChoose = [
    {
      title: 'Faster team rampup',
      text:
        'Assemble a senior squad in 1–2 weeks with proven delivery playbooks and immediate productivity.'
    },
    {
      title: 'Seamless integration',
      text:
        'We adopt your tools, ceremonies, and engineering standards to work as one team from day one.'
    },
    {
      title: 'Predictable velocity',
      text:
        'Stable team composition, measured throughput, and transparent planning keep delivery on track.'
    },
    {
      title: 'Direct communication',
      text:
        'Talk to engineers and leads directly in Slack/Teams. No middleman delays or bottlenecks.'
    },
    {
      title: 'Security & IP safety',
      text:
        'NDA, IP assignment, secure SDLC, and access model aligned with your compliance requirements.'
    },
    {
      title: 'Flexible scaling',
      text:
        'Scale up or down by phase. Start small with a pilot and expand to a full team as value is proven.'
    }
  ];

  const workingModels = [
    {
      icon: Clock,
      title: 'Time Zone Alignment',
      description: '4–6 hour overlap for real‑time collaboration across US/EU time zones.',
      benefit: 'Real‑time communication'
    },
    {
      icon: MessageSquare,
      title: 'Direct Communication',
      description: 'Direct access to engineers via Slack/Teams, plus weekly demos and reports.',
      benefit: 'No middleman delays'
    },
    {
      icon: Users,
      title: 'Your Tools & Processes',
      description: 'Jira/Azure, GitHub/GitLab, CI/CD, code review policy — we align to your stack.',
      benefit: 'Seamless integration'
    },
    {
      icon: TrendingUp,
      title: 'Flexible Scaling',
      description: 'Adjust capacity by roadmap phase without hiring overhead or long lock‑ins.',
      benefit: 'Cost optimization'
    }
  ];

  const teamCompositions = [
    {
      title: 'Frontend Team',
      roles: ['Senior React/Vue Developer', 'UI/UX Designer', 'Frontend Architect'],
      ideal: 'User‑facing apps, design systems, performance‑sensitive UIs',
      duration: '3+ months'
    },
    {
      title: 'Backend Team',
      roles: ['Senior Backend Developer', 'Database Architect', 'DevOps Engineer'],
      ideal: 'APIs, microservices, data pipelines, cloud infrastructure',
      duration: '3+ months'
    },
    {
      title: 'Full‑Stack Team',
      roles: ['Full‑Stack Developers', 'Project Manager', 'QA Engineer'],
      ideal: 'End‑to‑end product delivery (web/mobile + platform)',
      duration: '6+ months'
    },
    {
      title: 'Specialized Team',
      roles: ['Domain Experts', 'Senior Architects', 'Technical Leads'],
      ideal: 'Complex enterprise solutions and modernization programs',
      duration: '12+ months'
    }
  ];

  const faqItems = [
    {
      question: 'How do we start and onboard a dedicated team?',
      answer:
        'We run a short discovery to define goals, success metrics, and required skills. You interview and approve engineers. We set up access, tools, and ceremonies, and commit to a start date and cadence.'
    },
    {
      question: 'Who manages the team day to day?',
      answer:
        'You own product direction and backlog. Our Team Lead/EM ensures delivery, quality, and reporting. Daily sync in Slack/Teams, weekly status, and bi‑weekly demos keep alignment.'
    },
    {
      question: 'How do you ensure quality and knowledge retention?',
      answer:
        'Definition of Done, code reviews, CI/CD, automated tests, and documentation. We maintain runbooks and onboarding guides to avoid single‑point‑of‑failure risks.'
    },
    {
      question: 'What if I need to change team size or replace a member?',
      answer:
        'We can scale capacity up/down with prior notice. Replacements follow a structured handover and overlap to protect velocity and knowledge.'
    },
    {
      question: 'Who owns IP and repositories?',
      answer:
        'You do. NDA and IP assignment are signed up front. Repos and cloud can be under your org with our accounts added with least privilege.'
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
            <span className="text-gray-900">Dedicated Teams</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Badge className="bg-green-100 text-green-800 border-green-200">Extended Development Teams</Badge>
              <Badge variant="outline" className="border-gray-200 text-gray-700">8+ years in IT</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {service.description} We assemble senior engineers who integrate with your culture and deliver consistently — without the overhead of hiring and managing full‑time employees.
            </p>

            {/* Primary CTA — narrower, text stays white on hover; second button removed */}
            <div className="flex justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white hover:underline hover:text-white w-full sm:w-[22rem] max-w-[22rem] rounded-xl"
              >
                <Link to="/contact" aria-label="Build your team">
                  Build Your Team
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose dedicated teams */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why choose <span className="gradient-text">dedicated teams</span>?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Extend your engineering capacity with a stable senior team focused on outcomes.
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

      {/* How we collaborate */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How we <span className="gradient-text">collaborate</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Transparent cadence, clear ownership, and full visibility.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {workingModels.map((model, index) => {
                const Icon = model.icon;
                return (
                  <Card key={index} className="h-full bg-white border border-gray-200 hover:shadow-lg transition-all">
                    <CardContent className="p-6 flex gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{model.title}</h3>
                        <p className="text-gray-600 mb-3 leading-relaxed">{model.description}</p>
                        <Badge variant="outline" className="text-xs text-green-700 border-green-200 bg-green-50">
                          {model.benefit}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team compositions */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Team <span className="gradient-text">compositions</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Pre‑configured teams optimized for common scenarios. Tailored mixes on request.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {teamCompositions.map((team, index) => (
                <Card key={index} className="bg-white border-0 shadow-sm hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">{team.title}</CardTitle>
                    <CardDescription className="text-gray-600">{team.ideal}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Team Roles</h4>
                        <ul className="space-y-1">
                          {team.roles.map((role, i) => (
                            <li key={i} className="flex items-center text-sm text-gray-600">
                              <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                              {role}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <Badge variant="outline">{team.duration}</Badge>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to="/contact">
                            Learn More <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Flexible <span className="gradient-text">pricing</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Choose the team size that fits your roadmap and budget.
              </p>
            </div>

            {/* equal height cards + aligned CTA buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {service.teamSizes.map((size, index) => (
                <Card
                  key={index}
                  className={`bg-white border-0 shadow-lg hover:shadow-xl transition-all flex flex-col ${
                    index === 1 ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  {index === 1 && (
                    <div className="bg-primary text-white text-center py-2 text-sm font-medium">Most Popular</div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl font-bold">{size.size}</CardTitle>
                    <div className="text-2xl font-bold text-primary mt-2">{size.monthlyRate}</div>
                    <CardDescription className="text-gray-600">per month</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1">
                    <p className="text-sm text-gray-600 mb-6">{size.bestFor}</p>
                    <div className="mt-auto">
                      <Button
                        asChild
                        className={`w-full ${
                          index === 1 ? 'bg-primary hover:bg-primary/90' : 'bg-gray-800 hover:bg-gray-900'
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

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently asked <span className="gradient-text">questions</span>
              </h2>
              <p className="text-lg text-gray-600">How we collaborate, manage, and deliver.</p>
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

      {/* Bottom CTA */}
<section className="section-padding bg-primary text-white">
  <div className="container mx-auto px-6">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to scale your team?</h2>

      {/* Улучшенный description с хорошей контрастностью */}
      <p className="text-lg md:text-xl text-blue-100/95 mb-8 max-w-2xl mx-auto">
        Tell us your goals — we’ll propose a team composition, ramp‑up plan, and collaboration model
        aligned with your roadmap and budget.
      </p>

      {/* Ровные кнопки: фиксированная высота, одинаковое выравнивание, корректные цвета */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {/* Primary: белая на синем фоне; на hover текст остаётся синим + подчеркивание */}
        <Button
          asChild
          size="lg"
          className="
            bg-white text-primary hover:bg-white/90 hover:underline hover:text-primary
            w-full sm:w-[22rem] max-w-[22rem] h-14 rounded-2xl
          "
        >
          <Link to="/contact" aria-label="Build your team">
            Build Your Team
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

        {/* Secondary: прозрачная, белая рамка; на hover лёгкий overlay, текст остаётся белым */}
        <Button
          asChild
          variant="outline"
          size="lg"
          className="
            border-white text-white hover:bg-white/10 hover:text-white
            w-full sm:w-[16rem] max-w-[16rem] h-14 rounded-2xl
          "
        >
          <Link to="/developers" aria-label="View profiles">
            View Profiles
          </Link>
        </Button>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default DedicatedTeamsPage;