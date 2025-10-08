import React from 'react';
import { Search, Users, Rocket, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const HowWeWorkSection = () => {
  const steps = [
    {
      icon: Search,
      number: '01',
      title: 'Discovery',
      description: 'We align on goals, scope, and constraints to define a clear roadmap and success metrics.',
      timeline: '1–2 days'
    },
    {
      icon: Users,
      number: '02', 
      title: 'Team Setup',
      description: 'We assemble the right senior engineers and establish communication and delivery cadence.',
      timeline: '5–7 days'
    },
    {
      icon: Rocket,
      number: '03',
      title: 'Delivery',
      description: 'Agile execution with frequent demos, transparent progress, and actionable feedback loops.',
      timeline: 'Iteration-based'
    },
    {
      icon: TrendingUp,
      number: '04',
      title: 'Scale',
      description: 'Easily adjust scope and team size as priorities evolve, without disrupting delivery.',
      timeline: 'Ongoing'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How we <span className="gradient-text">work</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A proven, outcome-focused process — from discovery to delivery — with full transparency at every step.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-full w-full h-px bg-gradient-to-r from-primary to-transparent opacity-30 z-0"></div>
                  )}
                  
                  <Card className="relative z-10 text-center hover:shadow-lg transition-all duration-300 hover-lift bg-white border border-gray-200 h-full">
                    <CardContent className="pt-8 pb-6 h-full flex flex-col">
                      <div className="flex-1 flex flex-col">
                        {/* Step Number */}
                        <div className="text-primary text-sm font-bold mb-4 opacity-60">
                          {step.number}
                        </div>
                        
                        {/* Icon */}
                        <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center">
                          <IconComponent className="h-8 w-8 text-primary" />
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {step.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                          {step.description}
                        </p>
                      </div>
                      
                      {/* Timeline - Always at bottom */}
                      <div className="mt-auto">
                        <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                          {step.timeline}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center px-6 py-3 bg-green-50 border border-green-200 rounded-xl text-green-800">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              <span className="font-semibold">Outcome‑driven delivery • Transparent progress • Senior teams</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;