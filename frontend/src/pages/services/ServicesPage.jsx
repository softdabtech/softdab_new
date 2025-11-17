import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Code, Users, Lightbulb, Headphones, Building } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

const services = [
  {
    icon: Code,
    title: 'Custom Development',
    path: '/services/custom-development',
    description: 'End-to-end custom software development from discovery to deployment.',
    features: ['Web Applications', 'Mobile Apps', 'API Development', 'System Integration']
  },
  {
    icon: Users,
    title: 'Dedicated Teams',
    path: '/services/dedicated-teams',
    description: 'Extended development teams seamlessly integrated with your processes.',
    features: ['Senior Engineers', 'Flexible Scaling', 'Your Management', 'Fast Onboarding']
  },
  {
    icon: Building,
    title: 'Outsourcing',
    path: '/services/outsourcing',
    description: 'Full project ownership from requirements to delivery and support.',
    features: ['Project Management', 'Quality Assurance', 'Delivery Guarantee', 'Post-Launch Support']
  },
  {
    icon: Lightbulb,
    title: 'Discovery & PoC',
    path: '/services/discovery',
    description: 'Technical validation and proof of concept before full development.',
    features: ['Feasibility Analysis', 'Rapid Prototyping', 'Risk Assessment', 'Roadmap Planning']
  },
  {
    icon: Headphones,
    title: 'Support & Maintenance',
    path: '/services/support',
    description: '24/7 professional software support and continuous improvements.',
    features: ['Bug Fixes', 'Performance Monitoring', 'Security Updates', 'Feature Enhancement']
  }
];

const ServicesPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Software Development Services | Custom Development & Teams | SoftDAB';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Comprehensive software development services: custom development, dedicated teams, outsourcing, discovery, and 24/7 support. 8+ years delivering for US/EU companies.';
    }

    // Breadcrumb Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.softdab.tech/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://www.softdab.tech/services"
        }
      ]
    };

    let schemaScript = document.querySelector('script[data-schema="breadcrumb"]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.setAttribute('data-schema', 'breadcrumb');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(breadcrumbSchema);

    return () => {
      if (schemaScript && schemaScript.parentNode) {
        schemaScript.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 mt-20">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Services</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Software Development Services
            </h1>
            <p className="text-xl text-gray-600">
              From custom development to dedicated teams — flexible engagement models designed for US/EU businesses seeking reliable, scalable solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => navigate(service.path)}
              >
                <CardHeader>
                  <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="ghost" 
                    className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(service.path);
                    }}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Not sure which service fits your needs?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Schedule a free consultation with our experts to discuss your project requirements and find the best engagement model.
          </p>
          <Link to="/company/contact">
            <Button size="lg" variant="secondary" className="group">
              Talk to an Expert
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
