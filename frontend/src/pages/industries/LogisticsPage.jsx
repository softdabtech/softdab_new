import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Truck, BarChart, MapPin, Clock, Zap, Shield } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const LogisticsPage = () => {
  useEffect(() => {
    // Title
    document.title = 'Logistics Software Development | Supply Chain Management | SoftDAB';

    // Meta description (add 8 years)
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content =
        'Custom logistics & supply chain software from a partner with 8 years in IT. Fleet management, route optimization, WMS, and real-time tracking solutions.';
    }

    // Breadcrumb Schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.softdab.tech' },
        { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://www.softdab.tech/industries' },
        { '@type': 'ListItem', position: 3, name: 'Logistics' }
      ]
    };

    // Service Schema (SEO)
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Logistics Software Development',
      description:
        'Custom logistics and supply chain management software: fleet management, route optimization, WMS, and real-time visibility.',
      provider: {
        '@type': 'Organization',
        name: 'SoftDAB',
        url: 'https://www.softdab.tech',
        foundingDate: '2017',
        logo: 'https://www.softdab.tech/logo.png'
      },
      areaServed: ['United States', 'European Union'],
      serviceType: 'Software Development',
      category: 'Logistics & Supply Chain',
      termsOfService: 'https://www.softdab.tech/terms',
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'USD'
      }
    };

    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'application/ld+json';
    script2.text = JSON.stringify(serviceSchema);
    document.head.appendChild(script2);

    return () => {
      if (document.head.contains(script1)) document.head.removeChild(script1);
      if (document.head.contains(script2)) document.head.removeChild(script2);
    };
  }, []);

  // Content
  const challenges = [
    'Complex supply chain visibility across multiple stakeholders',
    'Real-time tracking and inventory management at scale',
    'Route optimization with dynamic constraints and traffic',
    'Integration with legacy warehouse management systems',
    'Compliance with international shipping and customs regulations',
    'Managing fleet maintenance schedules and driver safety'
  ];

  const solutions = [
    {
      icon: Truck,
      title: 'Fleet Management Systems',
      description:
        'Comprehensive fleet tracking, maintenance scheduling, and driver management with real-time GPS monitoring.',
      features: ['Vehicle tracking & telematics', 'Maintenance scheduling', 'Driver performance monitoring', 'Fuel optimization']
    },
    {
      icon: MapPin,
      title: 'Route Optimization',
      description:
        'AI-powered route planning that considers traffic, delivery windows, vehicle capacity, and driver hours.',
      features: ['Dynamic route planning', 'Traffic integration', 'Delivery time windows', 'Multi-stop optimization']
    },
    {
      icon: BarChart,
      title: 'Supply Chain Analytics',
      description:
        'Real-time visibility across your entire supply chain with predictive analytics and KPI dashboards.',
      features: ['Real-time tracking', 'Predictive analytics', 'Performance dashboards', 'Exception alerts']
    },
    {
      icon: Clock,
      title: 'Warehouse Management',
      description:
        'Automated warehouse operations including inventory management, picking optimization, and dock scheduling.',
      features: ['Inventory management', 'Pick path optimization', 'Dock scheduling', 'Automated workflows']
    }
  ];

  const integrations = [
    { icon: Shield, title: 'ERP Integration', description: 'Seamless integration with SAP, Oracle, Microsoft Dynamics, and other enterprise systems.' },
    { icon: Zap, title: 'API Connectivity', description: 'RESTful APIs for connecting with carriers, customs systems, and third-party logistics providers.' },
    { icon: CheckCircle, title: 'Compliance Systems', description: 'Built-in compliance with DOT, international shipping, and safety standards.' },
    { icon: BarChart, title: 'IoT & Sensors', description: 'Integration with temperature sensors, RFID tags, and other IoT devices for cargo monitoring.' }
  ];

  const technologies = ['React', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS', 'Google Maps API', 'TensorFlow'];
  const compliance = ['DOT Regulations', 'FMCSA Compliance', 'HAZMAT Standards', 'International Shipping', 'Customs Integration'];

  // Helper
  const humanizeKey = (key) => (key || 'Result').replace(/([A-Z])/g, ' $1').trim();

  // Optional: if you have a logistics case in your dataset, plug here (kept safe)
  // const caseStudy = (mockData?.caseStudies || []).find(s => s.industry === 'Logistics');

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 mt-20">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Industries</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Logistics</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
              <Truck className="h-10 w-10 text-white" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge variant="outline" className="border-orange-200 text-orange-700">8 years in IT</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Logistics & Supply Chain Software Development
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-balance leading-relaxed">
              Transform your supply chain with custom software: fleet management, route optimization, WMS, and real-time visibility.
            </p>
            {Array.isArray(compliance) && compliance.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {compliance.map((item, index) => (
                  <Badge key={index} variant="outline" className="bg-white/80">
                    {item}
                  </Badge>
                ))}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
                <Link to="/contact">
                  Start Your Logistics Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {/* If you add a logistics caseStudy later, link it here and enable */}
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/80 hover:bg-white"
                disabled
                title="Case study coming soon"
              >
                <Link to="#">
                  View Case Study
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Logistics <span className="gradient-text">challenges</span> we solve
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Modern logistics operations face complex challenges that require sophisticated technology solutions.
                We build systems that address these critical pain points.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge, index) => (
                <Card key={index} className="bg-gray-50 border-0 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mb-4"></div>
                    <p className="text-gray-700 font-medium">{challenge}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our logistics <span className="gradient-text">solutions</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Comprehensive logistics technology solutions built for operational excellence and scalability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {solutions.map((solution, index) => {
                const IconComponent = solution.icon;
                return (
                  <Card key={index} className="bg-white border-0 shadow-sm hover:shadow-lg transition-all hover-lift">
                    <CardHeader>
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                        <IconComponent className="h-6 w-6 text-orange-600" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900">{solution.title}</CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {solution.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-2">
                        {solution.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Integrations & <span className="gradient-text">compliance</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Seamless integration with existing systems and full compliance with logistics industry standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {integrations.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Card key={index} className="bg-gradient-to-br from-orange-50 to-yellow-50 border-0 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Technology <span className="gradient-text">Stack</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We use proven technologies to build robust, scalable logistics solutions.
            </p>

            {Array.isArray(technologies) && technologies.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3">
                {technologies.map((tech, index) => (
                  <Badge key={index} variant="outline" className="bg-white text-gray-700 border-gray-300 text-sm py-2 px-4">
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-orange-600 to-orange-700 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to optimize your logistics operations?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help you build efficient logistics software
              that reduces costs and improves delivery performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                <Link to="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Download Logistics Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LogisticsPage;