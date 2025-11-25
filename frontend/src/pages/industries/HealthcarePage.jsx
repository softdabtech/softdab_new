import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Heart, Shield, Video, Database, Lock, FileCheck, Download, X, AlertTriangle, Users, FileText, Key, Eye } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { mockData } from '../../data/mockData';

const HealthcarePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // HIPAA Guide Content
  const hipaaGuide = {
    overview: "HIPAA (Health Insurance Portability and Accountability Act) sets the standard for protecting sensitive patient data. Any company that deals with protected health information (PHI) must ensure that all the required physical, network, and process security measures are in place and followed.",
    keyRules: [
      {
        icon: Shield,
        title: "Privacy Rule",
        description: "Establishes national standards for the protection of individually identifiable health information. Covers how PHI can be used and disclosed.",
        points: [
          "Patient rights to access their health information",
          "Limits on use and disclosure of PHI",
          "Requirements for patient authorization",
          "Administrative requirements for covered entities"
        ]
      },
      {
        icon: Lock,
        title: "Security Rule",
        description: "Sets standards for the security of electronic protected health information (ePHI). Focuses on technical and administrative safeguards.",
        points: [
          "Access controls and user authentication",
          "Encryption of data at rest and in transit",
          "Audit controls and integrity controls",
          "Transmission security and disaster recovery"
        ]
      },
      {
        icon: AlertTriangle,
        title: "Breach Notification Rule",
        description: "Requires covered entities to notify affected individuals, HHS, and in some cases the media, of a breach of unsecured PHI.",
        points: [
          "Individual notification within 60 days",
          "Media notification for breaches affecting 500+ individuals",
          "HHS notification requirements",
          "Documentation of breach investigation"
        ]
      }
    ],
    technicalSafeguards: [
      {
        icon: Key,
        title: "Access Control",
        items: [
          "Unique user identification for all system users",
          "Emergency access procedures",
          "Automatic logoff after inactivity",
          "Encryption and decryption mechanisms"
        ]
      },
      {
        icon: Eye,
        title: "Audit Controls",
        items: [
          "Hardware, software, and procedural mechanisms to record and examine activity",
          "Monitoring of system access and PHI modifications",
          "Regular review of audit logs",
          "Incident detection and response procedures"
        ]
      },
      {
        icon: Shield,
        title: "Integrity Controls",
        items: [
          "Mechanisms to ensure ePHI is not improperly altered or destroyed",
          "Data validation and checksums",
          "Version control and change management",
          "Regular data integrity audits"
        ]
      },
      {
        icon: Lock,
        title: "Transmission Security",
        items: [
          "Encryption of ePHI during transmission",
          "Secure communication protocols (TLS 1.2+)",
          "VPN for remote access",
          "Integrity controls for transmitted data"
        ]
      }
    ],
    bestPractices: [
      "Conduct regular risk assessments and security audits",
      "Implement role-based access control (RBAC)",
      "Maintain comprehensive audit trails",
      "Encrypt all PHI/ePHI at rest and in transit",
      "Establish business associate agreements (BAAs)",
      "Provide ongoing HIPAA training for all staff",
      "Develop and test incident response plans",
      "Implement multi-factor authentication (MFA)",
      "Regular backup and disaster recovery testing",
      "Document all policies and procedures"
    ],
    penalties: [
      {
        tier: "Tier 1: Unknowing",
        range: "$100-$50,000 per violation",
        description: "Organization was unaware and could not have avoided the violation"
      },
      {
        tier: "Tier 2: Reasonable Cause",
        range: "$1,000-$50,000 per violation",
        description: "Violation due to reasonable cause, not willful neglect"
      },
      {
        tier: "Tier 3: Willful Neglect (Corrected)",
        range: "$10,000-$50,000 per violation",
        description: "Violation due to willful neglect but corrected within 30 days"
      },
      {
        tier: "Tier 4: Willful Neglect (Not Corrected)",
        range: "$50,000 per violation",
        description: "Violation due to willful neglect and not corrected"
      }
    ]
  };

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
              <Badge variant="outline" className="border-red-200 text-red-700">5+ years in IT</Badge>
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
              <Button 
                size="lg" 
                className="bg-red-800 text-white hover:bg-white hover:text-gray-900 transition-all"
                onClick={() => setIsModalOpen(true)}
              >
                HIPAA Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* HIPAA Guide Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">HIPAA Compliance Guide</h3>
                  <p className="text-red-100">Essential guide for healthcare software development</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Overview */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Overview</h4>
                <p className="text-gray-700 leading-relaxed">{hipaaGuide.overview}</p>
              </div>

              {/* Key Rules */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Three Key HIPAA Rules</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {hipaaGuide.keyRules.map((rule, index) => {
                    const IconComponent = rule.icon;
                    return (
                      <Card key={index} className="border-2 border-red-100 hover:border-red-300 transition-colors">
                        <CardHeader>
                          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-3">
                            <IconComponent className="h-6 w-6 text-red-600" />
                          </div>
                          <CardTitle className="text-lg">{rule.title}</CardTitle>
                          <CardDescription className="text-sm">{rule.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {rule.points.map((point, pIndex) => (
                              <li key={pIndex} className="flex items-start text-sm text-gray-600">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Technical Safeguards */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Technical Safeguards</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hipaaGuide.technicalSafeguards.map((safeguard, index) => {
                    const IconComponent = safeguard.icon;
                    return (
                      <Card key={index} className="bg-gray-50 border-0">
                        <CardHeader>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <IconComponent className="h-5 w-5 text-green-600" />
                            </div>
                            <CardTitle className="text-base">{safeguard.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {safeguard.items.map((item, iIndex) => (
                              <li key={iIndex} className="flex items-start text-sm text-gray-600">
                                <span className="text-green-500 mr-2">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Best Practices */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Best Practices for Compliance</h4>
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {hipaaGuide.bestPractices.map((practice, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{practice}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Penalties */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Penalty Tiers for Non-Compliance</h4>
                <div className="space-y-3">
                  {hipaaGuide.penalties.map((penalty, index) => (
                    <Card key={index} className="border-l-4 border-l-red-500 bg-red-50">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-bold text-gray-900 mb-1">{penalty.tier}</h5>
                            <p className="text-sm text-gray-600 mb-2">{penalty.description}</p>
                          </div>
                          <Badge className="bg-red-600 text-white ml-4">{penalty.range}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      <strong>Annual Cap:</strong> Maximum penalty is $1.5 million per violation category per year. Criminal penalties can also apply, including imprisonment.
                    </p>
                  </div>
                </div>
              </div>

              {/* SoftDAB's Approach */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">SoftDAB's HIPAA Compliance Approach</h4>
                    <p className="text-gray-700 mb-4">
                      With 8+ years of experience in healthcare software development, we implement HIPAA compliance from the ground up:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Security-first architecture with encryption and access controls</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Comprehensive audit logging and monitoring systems</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Regular security assessments and penetration testing</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Business Associate Agreements (BAAs) and compliance documentation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Ongoing compliance monitoring and updates</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="flex-1 bg-red-600 hover:bg-red-700">
                  <Link to="/contact" onClick={() => setIsModalOpen(false)}>
                    Discuss Your HIPAA Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex-1"
                  onClick={() => {
                    // In a real implementation, this would trigger a PDF download
                    alert('PDF download functionality would be implemented here');
                  }}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download as PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthcarePage;