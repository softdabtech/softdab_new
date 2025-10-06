import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-subtle overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8 fade-in">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-sm text-gray-700 font-medium">
              <span className="mr-2">🚀</span>
              Trusted by 50+ US/EU companies
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 text-balance leading-tight">
              Custom software development — start in{' '}
              <span className="gradient-text">2 weeks</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto text-balance leading-relaxed">
              Outsourcing teams for US/EU companies. Ship faster without long hiring cycles — risk‑free trial.
            </p>

            {/* Value Props */}
            <div className="flex flex-wrap justify-center gap-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Senior engineers only</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>2‑week trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Transparent pricing</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex justify-center pt-8">
              <Button 
                asChild 
                size="lg" 
                style={{ backgroundColor: '#2F89FC', color: '#fff' }}
                className="hover:bg-[#1F6ED4] px-8 py-4 text-lg font-semibold rounded-xl hover-lift group transition-colors"
                onMouseEnter={(e) => e.target.style.backgroundColor = '#1F6ED4'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2F89FC'}
              >
                <Link to="/contact">
                  Book a Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-12 text-sm text-gray-500">
              <p>No long-term contracts • Start with 1 developer • Scale as needed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;