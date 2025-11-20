// frontend/src/components/sections/HeroSection.jsx (ФИНАЛЬНАЯ ЧИСТАЯ ВЕРСИЯ)
import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import ExpertConsultationForm from '../forms/ExpertConsultationForm';
import { useExpertConsultation } from '../../hooks/use-expert-consultation';

const HeroSection = () => {
  const { isOpen, openModal, closeModal } = useExpertConsultation();

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #f1f5f9 100%)'
      }}
      data-hero="true"
      data-lcp-section="true"
    >

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8 fade-in" style={{ minHeight: '600px' }}>
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

            {/* CTAs - КНОПКА С МОДАЛЬНЫМ ОКНОМ */}
            <div className="flex justify-center pt-8 px-4">
              <Button 
                onClick={openModal}
                size="lg"
                className="w-full sm:w-auto group text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              >
                Get Free Consultation
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
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

      {/* Expert Consultation Modal */}
      <ExpertConsultationForm isOpen={isOpen} onClose={closeModal} />
    </section>
  );
};

export default HeroSection;