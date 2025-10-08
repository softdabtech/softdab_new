import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Heart, Shield, Video, Database, Lock, FileCheck } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { mockData } from '../../data/mockData';

const HealthcarePage = () => {
  useEffect(() => {
    // Title
    document.title = 'Healthcare Software Development | HIPAA Compliance | SoftDAB';

    // Meta description (add  years)
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content =
        'HIPAA-compliant healthcare software development from a partner with 8 years in IT. Telemedicine platforms, EMR/EHR systems, and patient management solutions for providers.';
    }

    // Breadcrumb Schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.softdab.tech' },
        { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://www.softdab.tech/industries' },
        { '@type': 'ListItem', position: 3, name: 'Healthcare' }
      ]
    };

    // Service Schema (SEO)
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Healthcare Software Development',
      description:
        'HIPAA-compliant development of telemedicine platforms, EMR/EHR systems, patient portals, and medical IoT solutions with HL7 FHIR interoperability.',
      provider: {
        '@type': 'Organization',
        name: 'SoftDAB',
        url: 'https://www.softdab.tech',
        foundingDate: '2017',
        logo: 'https://www.softdab.tech/logo.png'
      },
      areaServed: ['United States', 'European Union'],
      serviceType: 'Software Development',
      category: 'Healthcare IT',
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

  // Safe reads
  const industry = mockData?.industries?.healthcare || { compliance: [], challenges: [], technologies: [] };

  const solutions = [
    {
      icon: Video,
      title: 'Telemedicine Platforms',
      description:
        'Secure video consultation platforms with integrated scheduling, patient records, and prescription management.',
      features: ['HD video consultations', 'Appointment scheduling', 'Digital prescriptions', 'Insurance integration']
    },
    {
      icon: Database,
      title: 'EMR/EHR Systems',
      description:
        'Electronic health record systems with interoperability, clinical workflows, and comprehensive reporting.',
      features: ['Patient data management', 'Clinical workflows', 'HL7 FHIR compliance', 'Analytics dashboards']
    },
    {
      icon: Heart,
      title: 'Patient Portals',
      description:
        'Patient-facing applications for appointment booking, health records access, and communication with providers.',
      features: ['Appointment booking', 'Lab results access', 'Secure messaging', 'Health tracking']
    },
    {
      icon: Shield,
      title: 'Medical IoT Solutions',
      description:
        'Connected health devices and remote patient monitoring systems with real-time data collection.',
      features: ['Device integration', 'Real-time monitoring', 'Alert systems', 'Data analytics']
    }
  ];

  const complianceItems = [
    {
      icon: Lock,
      title: 'HIPAA Compliance',
      description:
        'Full compliance with Health Insurance Portability and Accountability Act requirements for protecting PHI.'
    },
    {
      icon: FileCheck,
      title: 'HITECH Act',
      description:
        'Compliance with HITECH provisions to strengthen privacy and security protections for electronic health records.'
    },
    {
      icon: Shield,
      title: 'HL7 FHIR Standards',
      description:
        'Implementation of Fast Healthcare Interoperability Resources standards for seamless data exchange.'
    },
    {
      icon: CheckCircle,
      title: 'FDA Regulations',
      description:
        'Understanding of FDA requirements for medical device software and digital health applications.'
    }
  ];

  const caseStudy = (mockData?.caseStudies || []).find((study) => study.industry === 'Healthcare');

  const humanizeKey = (key) => (key || 'Result').replace(/([A-Z])/g, ' $1').trim();

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
            <span className="text-gray-900">Healthcare</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-red-50 to-pink-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge variant="outline" className="border-red-200 text-red-700"> years in IT</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Healthcare Software Development
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-balance leading-relaxed">
              Build HIPAA-compliant healthcare applications with our expertise in telemedicine,
              patient management systems, and medical device integration.
            </p>
            {Array.isArray(industry.compliance) && industry.compliance.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {industry.compliance.map((item, index) => (
                  <Badge key={index} variant="outline" className="bg-white/80">
                    {item}
                  </Badge>
                ))}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                <Link to="/contact">
                  Start Your Healthcare Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/80 hover:bg-white"
                disabled={!caseStudy}
                title={caseStudy ? 'View Case Study' : 'Case study coming soon'}
              >
                <Link to={caseStudy ? `/case-studies/${caseStudy.id}` : '#'}>
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
                Healthcare <span className="gradient-text">challenges</span> we solve
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Healthcare technology requires the highest standards of security, privacy, and regulatory compliance.
                We navigate these complex requirements successfully.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(industry.challenges || []).map((challenge, index) => (
                <Card key={index} className="bg-gray-50 border-0 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full mb-4"></div>
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
                Our healthcare <span className="gradient-text">solutions</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Comprehensive healthcare technology solutions built for patient safety, regulatory compliance,
                and operational efficiency.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {solutions.map((solution, index) => {
                const IconComponent = solution.icon;
                return (
                  <Card key={index} className="bg-white border-0 shadow-sm hover:shadow-lg transition-all hover-lift">
                    <CardHeader>
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                        <IconComponent className="h-6 w-6 text-red-600" />
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

      {/* Compliance Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Compliance & <span className="gradient-text">standards</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We ensure your healthcare applications meet all regulatory requirements and industry standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {complianceItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Card key={index} className="bg-gradient-to-br from-green-50 to-red-50 border-0 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-green-600" />
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

      {/* Case Study Section */}
      {caseStudy && (
        <section className="section-padding bg-gray-50">
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
                    <Badge className="bg-red-100 text-red-800">{caseStudy.industry}</Badge>
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
                        {Object.entries(caseStudy.results || {}).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-green-700 capitalize">{humanizeKey(key)}</span>
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
                        {(caseStudy.technologies || []).map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button asChild className="w-full bg-red-600 hover:bg-red-700">
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
      <section className="section-padding bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to transform healthcare with technology?
            </h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help you build secure, compliant healthcare applications
              that improve patient outcomes and operational efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                <Link to="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Download HIPAA Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthcarePage;