import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, Shield } from 'lucide-react';
import { Button } from '../ui/button';

const CTASection = () => {
  const benefits = [
    {
      icon: Clock,
      title: '2-Week Start',
      description: 'Get your team up and running in just 2 weeks'
    },
    {
      icon: Shield,
      title: 'Risk-Free Trial', 
      description: 'Try our services with no long-term commitments'
    },
    {
      icon: CheckCircle,
      title: 'Proven Process',
      description: '98% client satisfaction across 100+ projects'
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Start in 2 weeks —{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              risk-free trial
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 text-balance max-w-3xl mx-auto">
            Join 50+ companies who've accelerated their development with SoftDAB. 
            No contracts, no risk, just results.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-300 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl hover-lift group"
            >
              <Link to="/contact">
                Book a Free Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-xl hover-lift"
            >
              Get Pricing PDF
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="text-sm text-gray-400">
            <p>✓ No setup fees • ✓ Flexible scaling • ✓ Direct communication • ✓ Transparent pricing</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;