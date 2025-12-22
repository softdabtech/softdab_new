import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, Globe, Heart } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { mockData } from '../../data/mockData';

const AboutPage = () => {


  const values = [
    {
      icon: Heart,
      title: 'Client Success First',
      description: 'Your success is our success. We measure our achievements by the business results we deliver for our clients.'
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'We maintain the highest standards in code quality, project management, and client communication.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'We work as an extension of your team, integrating seamlessly with your processes and culture.'
    },
    {
      icon: Globe,
      title: 'Global Mindset',
      description: 'We understand diverse business cultures and requirements across US, EU, and global markets.'
    }
  ];

  const stats = [
    { number: '2017', label: 'Founded (8 years in IT)' },
    { number: '20+', label: 'Team Members' },
    { number: '20+', label: 'Projects Delivered' },
    { number: '10+', label: 'Countries Served' }
  ];

  const faqItems = [
    {
      q: 'How do you start a new project?',
      a: `We start with a Discovery phase that usually takes at least two weeks. During this time, we dive into your goals, domain, existing systems, and constraints. The outcome is a clear scope, prioritized roadmap, high-level architecture, and agreed success metrics. Only after Discovery do we move into active delivery.`
    },
    {
      q: 'What does your team look like and can we interview the engineers?',
      a: `We build teams around your needs, typically with Middle/Senior engineers (backend, frontend, mobile, QA, DevOps) and a dedicated Delivery/Project Manager. For dedicated teams and long-term engagements, we offer candidates for interviews on your side so you can assess both technical and cultural fit before they join your project.`
    },
    {
      q: 'How do you ensure quality and security of the software you build?',
      a: `We follow strict engineering practices: regular code reviews, CI/CD pipelines, automated testing, and security-by-design principles. For regulated industries such as fintech or healthcare, we align with relevant compliance and security requirements, and can support security audits and hardening activities as needed.`
    },
    {
      q: 'How do pricing and billing work?',
      a: `We provide transparent pricing based on the engagement model and scope. Depending on your needs, we work on a Time & Materials basis, fixed-scope projects, or monthly retainers for dedicated teams. All commercial terms are clearly documented upfront, so you always know what you are paying for.`
    },
    {
      q: 'What happens after the initial launch? Do you provide ongoing support?',
      a: `Yes. We offer ongoing support and continuous development after launch. This can include 24/7 monitoring (where needed), bug fixing under SLAs, performance optimization, and incremental feature development. Our goal is to be a long-term partner and keep your systems stable, secure, and evolving with your business.`
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 mt-20">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">About</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="gradient-text">SoftDAB</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-balance leading-relaxed">
              We’ve been building software for 8 years — helping US and EU businesses
              accelerate digital initiatives with custom development and dedicated teams.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our <span className="gradient-text">Story</span>
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    SoftDAB traces its roots back to 2017. What started as a small team of senior engineers
                    has grown into a trusted partner for companies across the US and EU. From day one, our focus
                    has been the same: solve real business problems with reliable software.
                  </p>
                  <p>
                    Over 8 years, we’ve refined our delivery model — combining technical excellence, modern tooling,
                    and clear communication — to de‑risk projects and ship value faster.
                  </p>
                  <p>
                    Today, we’ve delivered 100+ projects, from MVPs to enterprise platforms, and built long‑term
                    partnerships grounded in outcomes, not buzzwords.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To accelerate business growth by providing access to world‑class
                    development talent and proven processes that deliver measurable results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our <span className="gradient-text">Values</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do and shape our relationships with clients and team members.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="bg-white border border-gray-200 hover:shadow-lg transition-all hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{value.description}</p>
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

      {/* Team Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our <span className="gradient-text">Leadership</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Experienced leaders who understand both technology and business challenges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mockData.about?.team?.map((member, index) => (
                <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all hover-lift">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden">
                      <img 
                        src={member.image || '/images/team/placeholder.jpg'} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio || `${member.role} at SoftDAB`}</p>
                    {member.linkedin && (
                      <Button 
                        asChild 
                        variant="ghost" 
                        size="sm"
                        className="hover:scale-100"
                      >
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          LinkedIn
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )) || (
                <div className="col-span-full text-center text-gray-500">
                  Team information will be available soon.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Ukraine */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why <span className="gradient-text">Ukraine</span>?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Ukraine has become a global hub for software development, producing world‑class
              engineers and innovative tech companies. Our location gives us access to exceptional
              talent while maintaining cost‑effectiveness for our clients.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">#4</div>
                <div className="text-gray-600">Country for tech talent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">200k+</div>
                <div className="text-gray-600">IT professionals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">GMT+2/3</div>
                <div className="text-gray-600">European timezone</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to work with us?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join 50+ companies who trust SoftDAB with their software development needs.
              Let’s build something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Link to="/contact">
                  Start Your Project
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="bg-transparent border border-white text-white hover:bg-white/10 hover:text-white">
                <Link to="/case-studies">
                  View Our Work
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white text-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions (FAQ)</h2>
            <p className="text-lg text-gray-600 mb-8">Answers to common questions about how we start, structure, and deliver software projects.</p>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`}>
                  <AccordionTrigger className="text-left text-lg font-semibold">{item.q}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 leading-relaxed">{item.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        {/* FAQ Schema for SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </section>
    </div>
  );
};

export default AboutPage;