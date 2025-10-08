import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Users, Lightbulb, Headphones } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const ServicesSection = () => {
  const services = [
    {
      icon: Code,
      title: 'Outsourcing',
      subtitle: 'Custom Software Development',
      description: 'End‑to‑end delivery of reliable, scalable applications — from discovery to launch and support.',
      features: ['Outcome‑driven roadmap', 'Agile delivery', 'QA & security', 'On‑time milestones'],
      href: '/services/outsourcing',
      color: 'bg-blue-500'
    },
    {
      icon: Users,
      title: 'Dedicated Teams',
      subtitle: 'Extended Development Teams',
      description: 'Senior engineers embedded in your workflow for sustained velocity and predictable outcomes.',
      features: ['Seamless integration', 'Flexible scaling', 'Direct communication', 'Long‑term reliability'],
      href: '/services/dedicated-teams',
      color: 'bg-green-500'
    },
    {
      icon: Lightbulb,
      title: 'Discovery & PoC',
      subtitle: 'Proof of Concept Development',
      description: 'Validate feasibility fast with focused discovery, rapid prototyping, and clear next steps.',
      features: ['Rapid prototyping', 'Technical validation', 'Risk assessment', 'Actionable plan'],
      href: '/services/discovery',
      color: 'bg-purple-500'
    },
    {
      icon: Headphones,
      title: 'Support & Maintenance',
      subtitle: 'Ongoing Development Support',
      description: 'Keep your systems healthy and evolving with proactive care and continuous improvements.',
      features: ['24/7 monitoring', 'Bug fixes & SLAs', 'Performance tuning', 'Feature updates'],
      href: '/services/support',
      color: 'bg-orange-500'
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How we help you <span className="gradient-text">scale</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Engagement models tailored to your goals — full project ownership or embedded teams that extend your capacity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover-lift border-0 bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${service.color} text-white`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-gray-900 mb-1">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 font-medium">
                        {service.subtitle}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                  >
                    <Link to={service.href}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;