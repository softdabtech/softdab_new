import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Clock, Globe, Shield, Zap, Code } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const DedicatedTeamPage = () => {
  useEffect(() => {
    document.title = 'Dedicated Development Teams | Staff Augmentation | SoftDAB';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Scale your development capabilities with dedicated teams. Senior engineers seamlessly integrated into your workflow for sustained velocity and predictable outcomes.';
    }
  }, []);

  const benefits = [
    {
      icon: Users,
      title: 'Team Integration',
      description: 'Seamless integration with your in-house team and processes.'
    },
    {
      icon: Clock,
      title: 'Quick Scaling',
      description: 'Rapidly scale your team up or down based on project needs.'
    },
    {
      icon: Globe,
      title: 'Global Talent',
      description: 'Access to skilled developers from around the world.'
    },
    {
      icon: Shield,
      title: 'Risk Mitigation',
      description: 'Reduced hiring risks and overhead costs.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Dedicated Development Teams
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Scale your development capabilities with experienced engineers who integrate
            seamlessly with your team and processes.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild size="lg">
              <Link to="/contact">Build Your Team</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/case-studies">Success Stories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Benefits of Dedicated Teams
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card key={benefit.title} className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-4">
                      <Icon className="w-12 h-12 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{benefit.title}</CardTitle>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { number: '01', title: 'Requirements Analysis', description: 'We analyze your needs and team structure' },
              { number: '02', title: 'Team Assembly', description: 'We select and onboard suitable developers' },
              { number: '03', title: 'Integration & Scaling', description: 'Team integrates and scales as needed' }
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
            Ready to Scale Your Team?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get in touch to discuss your needs and how our dedicated teams can help.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">Get Started</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default DedicatedTeamPage;
