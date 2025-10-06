import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const CaseStudiesSection = () => {
  const caseStudies = [
    {
      id: 'fintech-payment-platform',
      industry: 'Fintech',
      title: 'Payment Platform MVP',
      client: 'US Fintech Startup',
      description: 'Built a secure payment processing platform from scratch, handling $2M+ in transactions within 6 months.',
      results: {
        metric: '60%',
        description: 'Faster time-to-market vs in-house development'
      },
      timeline: '12 weeks',
      teamSize: '5 developers',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'healthcare-telemedicine',
      industry: 'Healthcare', 
      title: 'Telemedicine Platform',
      client: 'EU Healthcare Provider',
      description: 'HIPAA-compliant telemedicine platform serving 10,000+ patients with video consultations and health records.',
      results: {
        metric: '300%',
        description: 'Increase in patient consultations'
      },
      timeline: '16 weeks',
      teamSize: '7 developers',
      technologies: ['Vue.js', 'Python', 'MongoDB', 'WebRTC'],
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'ecommerce-marketplace',
      industry: 'eCommerce',
      title: 'Multi-vendor Marketplace',
      client: 'European Retailer',
      description: 'Scalable marketplace platform connecting 500+ vendors with advanced analytics and inventory management.',
      results: {
        metric: '45%',
        description: 'Increase in vendor satisfaction'
      },
      timeline: '20 weeks',
      teamSize: '8 developers',
      technologies: ['React', 'Django', 'Redis', 'AWS'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Real <span className="gradient-text">results</span> for real businesses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how we've helped companies like yours accelerate development and achieve their goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {caseStudies.map((study, index) => (
            <Card key={study.id} className="group hover:shadow-xl transition-all duration-300 hover-lift border-0 bg-white overflow-hidden">
              {/* Image */}
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img 
                  src={study.image} 
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {study.industry}
                  </Badge>
                  <span className="text-xs text-gray-500">{study.client}</span>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                  {study.title}
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {study.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                {/* Key Result */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <div className="text-2xl font-bold text-green-800">{study.results.metric}</div>
                      <div className="text-sm text-green-700">{study.results.description}</div>
                    </div>
                  </div>
                </div>
                
                {/* Project Details */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{study.timeline}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{study.teamSize}</span>
                  </div>
                </div>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mb-6">
                  {study.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                >
                  <Link to={`/case-studies/${study.id}`}>
                    Read Full Case Study
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="hover-lift">
            <Link to="/case-studies">
              View All Case Studies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;