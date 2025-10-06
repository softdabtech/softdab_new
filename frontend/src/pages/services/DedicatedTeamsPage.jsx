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
      metaDescription.content = 'Dedicated development teams that integrate seamlessly with your existing team. Flexible scaling with direct communication and long-term partnership.';
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
          "name": "Dedicated Teams"
        }
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
  
  const teamCompositions = [
    {
      title: 'Frontend Team',
      roles: ['Senior React/Vue Developer', 'UI/UX Designer', 'Frontend Architect'],
      ideal: 'User interface focused projects',
      duration: '3+ months'
    },
    {
      title: 'Backend Team',
      roles: ['Senior Backend Developer', 'Database Architect', 'DevOps Engineer'],
      ideal: 'API development and infrastructure',
      duration: '3+ months'
    },
    {
      title: 'Full-Stack Team',
      roles: ['Full-Stack Developers', 'Project Manager', 'QA Engineer'],
      ideal: 'End-to-end development',
      duration: '6+ months'
    },
    {
      title: 'Specialized Team',
      roles: ['Domain Experts', 'Senior Architects', 'Technical Leads'],
      ideal: 'Complex enterprise solutions',
      duration: '12+ months'
    }
  ];

  const workingModels = [
    {
      icon: Clock,
      title: 'Time Zone Alignment',
      description: 'Teams work in your time zone with 4-6 hour overlap for real-time collaboration.',
      benefit: 'Real-time communication'
    },
    {
      icon: MessageSquare,
      title: 'Direct Communication',
      description: 'Direct access to your dedicated team via Slack, Teams, or your preferred communication tools.',
      benefit: 'No middleman delays'
    },
    {
      icon: Users,
      title: 'Your Tools & Processes',
      description: 'Teams integrate with your existing workflow, tools, and development processes.',
      benefit: 'Seamless integration'
    },
    {
      icon: TrendingUp,
      title: 'Flexible Scaling',
      description: 'Scale team size up or down based on project phases and business requirements.',
      benefit: 'Cost optimization'
    }
  ];

  const faqItems = [
    {
      question: 'How quickly can you assemble a dedicated team?',
      answer: 'We can typically assemble and onboard a dedicated team within 1-2 weeks. This includes developer selection, technical interviews, and setting up communication channels and development environments.'
    },
    {
      question: 'What is the minimum engagement duration?',
      answer: 'We recommend a minimum engagement of 3 months to ensure proper team integration and project momentum. However, we can discuss shorter engagements for specific use cases.'
    },
    {
      question: 'Can I interview and approve team members?',
      answer: 'Absolutely! You have full control over team composition. We provide candidate profiles, conduct initial screening, and you can interview and approve each team member before they join your project.'
    },
    {
      question: 'How do you handle team management and performance?',
      answer: 'You maintain full control over day-to-day management and task assignment. We provide a dedicated team lead and account manager to handle administrative tasks and ensure smooth operations.'
    },
    {
      question: 'What happens if a team member needs to be replaced?',
      answer: 'We maintain backup developers with similar skills for quick replacement. If replacement is needed, we ensure proper knowledge transfer and minimal disruption to your project timeline.'
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

      {/* Hero Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-green-100 text-green-800 border-green-200">Extended Development Teams</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-balance leading-relaxed">
              {service.description} Scale your development capacity without the overhead of hiring, training, and managing full-time employees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary-dark">
                <Link to="/contact">
                  Build Your Team
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                View Team Profiles
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
                Why choose <span className="gradient-text">dedicated teams</span>?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Get the benefits of an extended team without the complexity of direct hiring.
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

      {/* Working Models Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How we <span className="gradient-text">collaborate</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Seamless integration with your existing team and processes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {workingModels.map((model, index) => {
                const IconComponent = model.icon;
                return (
                  <Card key={index} className="bg-white border border-gray-200 hover:shadow-lg transition-all hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {model.title}
                          </h3>
                          <p className="text-gray-600 mb-3 leading-relaxed">
                            {model.description}
                          </p>
                          <Badge variant="outline" className="text-xs text-green-700 border-green-200 bg-green-50">
                            {model.benefit}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team Compositions Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Team <span className="gradient-text">compositions</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Pre-configured teams optimized for different project types and requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {teamCompositions.map((team, index) => (
                <Card key={index} className="bg-white border-0 shadow-sm hover:shadow-md transition-all hover-lift">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">{team.title}</CardTitle>
                    <CardDescription className="text-gray-600">{team.ideal}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Team Roles:</h4>
                        <ul className="space-y-1">
                          {team.roles.map((role, roleIndex) => (
                            <li key={roleIndex} className="flex items-center text-sm text-gray-600">
                              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                              {role}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <Badge variant="outline">{team.duration}</Badge>
                        <Button variant="ghost" size="sm">
                          Learn More
                          <ArrowRight className="ml-1 h-3 w-3" />
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

      {/* Pricing Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Flexible <span className="gradient-text">pricing</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Choose the team size that fits your project scope and budget.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.teamSizes.map((size, index) => (
                <Card key={index} className={`bg-white border-0 shadow-lg hover:shadow-xl transition-all hover-lift ${index === 1 ? 'ring-2 ring-primary' : ''}`}>
                  {index === 1 && (
                    <div className="bg-primary text-white text-center py-2 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl font-bold">{size.size}</CardTitle>
                    <div className="text-2xl font-bold text-primary mt-2">{size.monthlyRate}</div>
                    <CardDescription className="text-gray-600">per month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-6">{size.bestFor}</p>
                    <Button 
                      asChild 
                      className={`w-full ${index === 1 ? 'bg-primary hover:bg-primary-dark' : 'bg-gray-800 hover:bg-gray-900'}`}
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
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently asked <span className="gradient-text">questions</span>
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to know about dedicated teams.
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
              Ready to scale your team?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your requirements and find the perfect team composition for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link to="/contact">
                  Build Your Team
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                View Developer Profiles
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DedicatedTeamsPage;