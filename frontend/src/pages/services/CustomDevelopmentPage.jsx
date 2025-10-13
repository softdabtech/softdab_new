import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Code, Shield, Zap, Users } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const CustomDevelopmentPage = () => {
  useEffect(() => {
    document.title = 'Custom Software Development Services | End-to-End Solutions | SoftDAB';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'End-to-end custom software development services from an experienced partner. From discovery to deployment and support, we deliver scalable solutions that solve real business problems.';
    }
  }, []);

  const features = [
    {
      icon: Code,
      title: 'Full-Cycle Development',
      description: 'End-to-end software delivery from requirements analysis to deployment and support.'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Comprehensive testing and QA processes to ensure reliable, bug-free software.'
    },
    {
      icon: Zap,
      title: 'Agile Development',
      description: 'Flexible, iterative approach with regular deliveries and feedback loops.'
    },
    {
      icon: Users,
      title: 'Dedicated Teams',
      description: 'Experienced developers fully committed to your projects success.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Custom Software Development
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Transform your business ideas into powerful software solutions. 
            We deliver end-to-end custom development services tailored to your needs.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild size="lg">
              <Link to="/contact">Start Your Project</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/case-studies">View Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Development Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-4">
                      <Icon className="w-12 h-12 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Development Process
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '01', title: 'Discovery', description: 'Understanding your needs and goals' },
              { number: '02', title: 'Planning', description: 'Creating detailed roadmap and architecture' },
              { number: '03', title: 'Development', description: 'Agile implementation with regular updates' },
              { number: '04', title: 'Delivery', description: 'Testing, deployment and ongoing support' }
            ].map((step) => (
              <div key={step.number} className="text-center">
                <div className="text-4xl font-bold text-primary mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how our custom development services can help transform your business.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">Schedule Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CustomDevelopmentPage;
