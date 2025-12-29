import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock, ArrowRight, Heart, Users, TrendingUp, Award, AlertCircle, Loader } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const benefits = [
  {
    icon: Heart,
    title: 'Work-Life Balance',
    description: 'Flexible hours, remote options, and generous PTO policy'
  },
  {
    icon: TrendingUp,
    title: 'Career Growth',
    description: 'Professional development budget, mentorship, and clear career paths'
  },
  {
    icon: Users,
    title: 'Great Team',
    description: 'Collaborative culture with experienced professionals'
  },
  {
    icon: Award,
    title: 'Competitive Compensation',
    description: 'Market-leading salaries, bonuses, and benefits package'
  }
];

// Fallback positions if API fails
const DEFAULT_POSITIONS = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    location: 'Remote / Kyiv',
    type: 'Full-time',
    experience: '5+ years',
    technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL']
  },
  {
    id: 2,
    title: 'Senior Frontend Developer',
    location: 'Remote / Kyiv',
    type: 'Full-time',
    experience: '4+ years',
    technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS']
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    location: 'Remote / Kyiv',
    type: 'Full-time',
    experience: '3+ years',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform']
  },
  {
    id: 4,
    title: 'QA Automation Engineer',
    location: 'Remote / Kyiv',
    type: 'Full-time',
    experience: '3+ years',
    technologies: ['Selenium', 'Cypress', 'Jest', 'Python']
  }
];

import SEOHead from '../../components/seo/SEOHead';

const CareersPage = () => {
  const [positions] = useState(DEFAULT_POSITIONS);
  const [loading] = useState(false);
  const [error] = useState(null);

  useEffect(() => {
    // Careers metadata handled by SEOHead
  }, []);

  const breadcrumbSchema = [
    { name: 'Home', item: 'https://www.softdab.tech/' },
    { name: 'Company', item: 'https://www.softdab.tech/company/about' },
    { name: 'Careers', item: 'https://www.softdab.tech/company/careers' }
  ];

  return (
    <div className="min-h-screen">
      <SEOHead title={"Careers at SoftDAB — Join Our Team | SoftDAB"} description={"Join SoftDAB — remote and Kyiv positions for senior developers, DevOps, and QA engineers. Competitive compensation and career growth."} url={"https://www.softdab.tech/company/careers"} breadcrumbs={breadcrumbSchema} />
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 mt-20">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/company/about" className="hover:text-primary">Company</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Careers</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Build Your Career with SoftDAB
            </h1>
            <p className="text-xl text-gray-600">
              Join a team of talented engineers working on cutting-edge projects for US/EU clients. 
              Grow your skills, work remotely, and make an impact.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join SoftDAB?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Open Positions</h2>
            <p className="text-center text-gray-600 mb-12">
              We're always looking for talented engineers. If you don't see a perfect fit, reach out anyway!
            </p>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 text-red-700">
                    <AlertCircle className="h-5 w-5" />
                    <p>{error}</p>
                  </div>
                </CardContent>
              </Card>
            ) : positions && positions.length > 0 ? (
              <div className="space-y-6">
                {positions.map((position) => (
                  <Card key={position.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{position.title}</CardTitle>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {position.location}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {position.type}
                            </div>
                            <div className="flex items-center">
                              <Briefcase className="h-4 w-4 mr-1" />
                              {position.experience}
                            </div>
                          </div>
                        </div>
                        <Link to="/company/contact">
                          <Button className="group">
                            Apply Now
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {position.technologies && position.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="secondary">{tech}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-gray-600">No open positions at the moment. Please check back soon or reach out to us!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Don't See the Right Role?</h2>
            <p className="text-xl text-gray-600">
              We're always interested in meeting talented professionals. Send us your CV and let's talk!
            </p>
            <a href="mailto:info@softdab.tech?subject=Job%20Inquiry%20%E2%80%94%20SoftDAB%20Careers">
              <Button size="lg" className="group w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                Apply Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
