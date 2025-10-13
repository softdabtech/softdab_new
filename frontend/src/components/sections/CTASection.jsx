
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, Shield } from 'lucide-react';
import { Button } from '../ui/button';

const BENEFITS = [
  {
    icon: Clock,
    title: 'Fast Kickoff',
    description: 'Align quickly and start delivering within days'
  },
  {
    icon: Shield,
    title: 'Reliable Delivery',
    description: 'Quality, security, and predictable execution'
  },
  {
    icon: CheckCircle,
    title: 'Proven Process',
    description: '98% client satisfaction across 100+ projects'
  }
];

/**
 * CTASection — main call-to-action block for landing page
 */
const CTASection = () => {
  const benefits = useMemo(() => BENEFITS, []);
  return (
    <section className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden" aria-label="Call to action">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance text-gray-100">
            Build software that drives measurable outcomes
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 text-balance max-w-3xl mx-auto">
            Senior engineering teams that design, build, and support scalable solutions tailored to your business goals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-cyan-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-100">{benefit.title}</h3>
                  <p className="text-gray-200 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center mb-8">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl hover-lift group"
              aria-label="Contact SoftDAB"
            >
              <Link to="/company/contact">
                Talk to an expert
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="text-sm text-gray-300">
            <p>✓ Transparent pricing • ✓ Direct communication • ✓ Flexible scaling •</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;