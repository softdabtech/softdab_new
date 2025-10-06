import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, ShoppingCart, Search, BarChart, Users, Zap, Globe } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { mockData } from '../../data/mockData';

const EcommercePage = () => {
  useEffect(() => {
    document.title = 'eCommerce Software Development | Online Marketplace Solutions | SoftDAB';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Custom eCommerce development services. Build scalable online stores, marketplaces, and B2B platforms with advanced features and integrations.';
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
          "item": "https://www.softdab.tech"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Industries",
          "item": "https://www.softdab.tech/industries"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "eCommerce"
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const industry = mockData.industries.ecommerce;
  
  const solutions = [
    {
      icon: ShoppingCart,
      title: 'Online Stores',
      description: 'Custom eCommerce platforms with advanced product catalogs, payment processing, and inventory management.',
      features: ['Product catalog management', 'Multiple payment gateways', 'Inventory tracking', 'Order management']
    },
    {
      icon: Users,
      title: 'Multi-vendor Marketplaces',
      description: 'Scalable marketplace platforms connecting multiple vendors with customers, featuring vendor management and commission systems.',
      features: ['Vendor onboarding', 'Commission management', 'Multi-store functionality', 'Dispute resolution']
    },
    {
      icon: Search,
      title: 'Advanced Search & Analytics',
      description: 'Intelligent search capabilities with AI-powered recommendations and comprehensive analytics dashboards.',
      features: ['Elasticsearch integration', 'AI recommendations', 'Customer behavior analytics', 'Sales reporting']
    },
    {
      icon: Globe,
      title: 'B2B Platforms',
      description: 'Enterprise-grade B2B commerce solutions with custom pricing, bulk ordering, and integration capabilities.',
      features: ['Custom pricing tiers', 'Bulk order processing', 'ERP integrations', 'Account management']
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Optimized for speed and scalability to handle high traffic and large product catalogs.'
    },
    {
      icon: BarChart,
      title: 'Advanced Analytics',
      description: 'Comprehensive reporting and analytics to understand customer behavior and optimize sales.'
    },
    {
      icon: CheckCircle,
      title: 'Mobile Optimized',
      description: 'Responsive design and mobile-first approach for optimal shopping experience across devices.'
    },
    {
      icon: Globe,
      title: 'SEO Friendly',
      description: 'Built-in SEO optimization features to improve search engine rankings and organic traffic.'
    }
  ];

  const caseStudy = mockData.caseStudies.find(study => study.industry === 'eCommerce');

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
            <span className="text-gray-900">eCommerce</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
              <ShoppingCart className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              eCommerce Software Development
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-balance leading-relaxed">
              Build scalable eCommerce solutions with our expertise in online marketplaces, 
              B2B platforms, and high-performance retail applications.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {industry.features.map((item, index) => (
                <Badge key={index} variant="outline" className="bg-white/80">
                  {item}
                </Badge>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <Link to="/contact">
                  Start Your eCommerce Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-white/80 hover:bg-white">
                View Case Study
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
                eCommerce <span className="gradient-text">challenges</span> we solve
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Online retail demands high performance, scalability, and seamless user experience. 
                We build solutions that handle these complex requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industry.challenges.map((challenge, index) => (
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
                Our eCommerce <span className="gradient-text">solutions</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Comprehensive eCommerce platforms built for performance, scalability, and exceptional user experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {solutions.map((solution, index) => {
                const IconComponent = solution.icon;
                return (
                  <Card key={index} className="bg-white border-0 shadow-sm hover:shadow-lg transition-all hover-lift">
                    <CardHeader>
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                        <IconComponent className="h-6 w-6 text-green-600" />
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

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Built for <span className="gradient-text">success</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our eCommerce solutions include essential features for modern online retail success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="bg-gradient-to-br from-green-50 to-blue-50 border-0 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
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
              We use proven technologies to build fast, scalable, and maintainable eCommerce solutions.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3">
              {industry.technologies.map((tech, index) => (
                <Badge key={index} variant="outline" className="bg-white text-gray-700 border-gray-300 text-sm py-2 px-4">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      {caseStudy && (
        <section className="section-padding bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Success <span className="gradient-text">story</span>
                </h2>
              </div>

              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-green-100 text-green-800">{caseStudy.industry}</Badge>
                    <span className="text-sm text-gray-500">{caseStudy.client}</span>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{caseStudy.title}</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed text-base">
                    {caseStudy.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-bold text-green-800 mb-2">Key Results</h4>
                      <div className="space-y-2 text-sm">
                        {Object.entries(caseStudy.results).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-green-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="font-semibold text-green-800">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium w-20">Timeline:</span>
                        <span>{caseStudy.timeline}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium w-20">Team:</span>
                        <span>{caseStudy.teamSize}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {caseStudy.technologies.map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                    <Link to={`/case-studies/${caseStudy.id}`}>
                      Read Full Case Study
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to launch your eCommerce platform?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you build a high-performing eCommerce solution 
              that drives sales and scales with your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <Link to="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Download eCommerce Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EcommercePage;