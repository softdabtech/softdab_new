import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, ActivitySquare, ShoppingBag, Truck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

const industries = [
  {
    icon: CreditCard,
    title: 'Fintech',
    path: '/industries/fintech',
    description: 'End-to-end financial technology solutions with a focus on security and compliance.',
    features: ['Payment Processing', 'Banking Systems', 'Regulatory Compliance', 'Fraud Detection']
  },
  {
    icon: ActivitySquare,
    title: 'Healthcare',
    path: '/industries/healthcare',
    description: 'HIPAA-compliant healthcare software solutions for modern medical institutions.',
    features: ['EHR/EMR Systems', 'Telemedicine', 'Patient Portals', 'Medical Billing']
  },
  {
    icon: ShoppingBag,
    title: 'eCommerce',
    path: '/industries/ecommerce',
    description: 'Scalable eCommerce solutions that drive sales and enhance customer experience.',
    features: ['Online Stores', 'Marketplace Platforms', 'Inventory Management', 'Payment Integration']
  },
  {
    icon: Truck,
    title: 'Logistics',
    path: '/industries/logistics',
    description: 'Smart logistics solutions for modern supply chain management.',
    features: ['Fleet Management', 'Route Optimization', 'Warehouse Management', 'Supply Chain']
  }
];

const IndustriesPage = () => {
  useEffect(() => {
    document.title = 'Industry Expertise | Custom Software Development | SoftDAB';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Expert software development across Fintech, Healthcare, eCommerce, and Logistics industries. 8+ years delivering secure, compliant, and scalable solutions.';
    }
  }, []);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Industry-Specific Software Solutions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            We deliver tailored software solutions across multiple industries,
            combining deep domain expertise with technical excellence.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <Card key={industry.title} className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <Icon className="w-12 h-12 text-primary mb-4" />
                    <CardTitle className="text-2xl">{industry.title}</CardTitle>
                    <CardDescription>{industry.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {industry.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm">
                          <span className="w-2 h-2 bg-primary rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => navigate(industry.path)}
                      variant="secondary"
                      className="w-full"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndustriesPage;
