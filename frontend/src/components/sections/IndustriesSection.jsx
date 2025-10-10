import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CreditCard, Heart, ShoppingCart, Truck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const IndustriesSection = () => {
  const industries = [
    {
      icon: CreditCard,
      title: 'Fintech',
      description: 'Secure, compliant financial software: payments, core banking, risk and fraud controls.',
      features: ['Payment rails', 'KYC/AML workflows', 'Banking APIs', 'Security audits'],
      href: '/industries/fintech',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Heart,
      title: 'Healthcare',
      description: 'HIPAA-ready solutions: telemedicine, EMR integrations, patient engagement tools.',
      features: ['HIPAA compliance', 'Telemedicine', 'EMR/EHR integration', 'Patient portals'],
      href: '/industries/healthcare', 
      color: 'from-red-500 to-red-600'
    },
    {
      icon: ShoppingCart,
      title: 'eCommerce',
      description: 'Scalable B2C/B2B platforms with conversion-focused UX and robust operations.',
      features: ['Multi‑vendor', 'Gateways & checkout', 'Inventory & OMS', 'Analytics'],
      href: '/industries/ecommerce',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Truck,
      title: 'Logistics',
      description: 'Real‑time visibility and optimization across fleet, routing, and supply chains.',
      features: ['Fleet ops', 'Route optimization', 'Live tracking', 'Supply chain analytics'],
      href: '/industries/logistics',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Industry <span className="gradient-text">expertise</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Domain‑driven engineering for regulated and high‑scale environments — with best practices built in.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {industries.map((industry, index) => {
            const IconComponent = industry.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover-lift border-0 bg-white relative overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
              
                <CardHeader className="relative z-10 pb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${industry.color} text-white flex items-center justify-center mb-4`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                    {industry.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed text-sm">
                    {industry.description}
                  </CardDescription>
                </CardHeader>
              
                <CardContent className="relative z-10 pt-0">
                  <ul className="space-y-2 mb-6">
                    {industry.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-xs text-gray-600">
                        <div className={`w-1.5 h-1.5 rounded-full mr-2 bg-gradient-to-r ${industry.color}`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                
                  <Button 
                    asChild 
                    variant="ghost" 
                    size="sm"
                    className="w-full text-gray-700 hover:text-primary group-hover:bg-gray-50 transition-all p-0 h-auto py-2"
                  >
                    <Link to={industry.href} className="flex items-center justify-center">
                      Learn more
                      <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">90%</div>
            <div className="text-gray-600">Regulatory adherence</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10+</div>
            <div className="text-gray-600">Industry‑specific projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-gray-600">Support & monitoring</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;