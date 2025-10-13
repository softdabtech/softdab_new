// frontend/src/components/sections/HeroSection.jsx (ФИНАЛЬНАЯ ЧИСТАЯ ВЕРСИЯ)
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react'; // Убрали неиспользуемый Play
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
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-xs sm:text-sm text-gray-700 font-medium">
              <span className="mr-1 sm:mr-2">🚀</span>
              <span className="line-clamp-1">Trusted by 20+ World Wide companies</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 text-balance leading-tight px-4 sm:px-0">
              Custom software that solves real business problems
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto text-balance leading-relaxed px-4 sm:px-6">
              We design, build, and support reliable, scalable solutions tailored to your processes and goals — from discovery to launch and beyond.
            </p>

            {/* Value Props */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-gray-600 px-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">Middle/Senior engineers</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">Discovery-first engagement</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">Transparent pricing</span>
              </div>
            </div>

            {/* CTAs - ИСПРАВЛЕННАЯ КНОПКА */}
            <div className="flex justify-center pt-8">
              <Button 
                asChild 
                size="lg" 
                className="bg-[#2F89FC] text-white hover:bg-[#1F6ED4] px-8 py-4 text-lg font-semibold rounded-xl hover-lift group transition-colors"
              >
                <Link to="/company/contact">
                  Talk to an expert
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-12 text-sm text-gray-500">
              <p>Flexible start • Measurable outcomes • Long‑term support</p>
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