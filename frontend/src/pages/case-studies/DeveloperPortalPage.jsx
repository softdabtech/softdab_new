import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code, Layout, Terminal, Share2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const DeveloperPortalPage = () => {
  useEffect(() => {
    document.title = 'Developer Portal for API Ecosystem Case Study | SoftDAB';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Learn how we built a unified developer portal for API management, onboarding, and analytics, streamlining the developer experience and API adoption.';
    }
  }, []);

  const technologies = ['Node.js', 'React', 'API', 'DevOps'];
  const deliverables = [
    'Interactive API documentation',
    'Developer onboarding system',
    'Analytics dashboard',
    'API key management',
    'Usage monitoring tools'
  ];
  const outcomes = [
    'Improved developer experience',
    'Increased API adoption rate',
    'Reduced support tickets',
    'Better usage insights',
    'Streamlined onboarding process'
  ];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/case-studies" className="hover:text-primary">Case Studies</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Developer Portal</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/case-studies">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Case Studies
            </Button>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Developer Portal for API Ecosystem</h1>
            <p className="text-xl text-gray-600 mb-6">
              Unified portal for API management, onboarding, and analytics.
            </p>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </div>

          {/* Project Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We created a comprehensive developer portal that serves as a central hub for API documentation, 
                onboarding, and analytics. The platform provides developers with all the tools and resources 
                they need to integrate with the API ecosystem effectively.
              </p>
            </CardContent>
          </Card>

          {/* Challenges & Solutions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Challenges & Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Documentation Management</h3>
                  <p className="text-gray-600">
                    Implemented an automated documentation system that keeps API documentation 
                    in sync with the actual API implementation.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">User Experience</h3>
                  <p className="text-gray-600">
                    Created an intuitive interface with interactive examples and playgrounds 
                    to help developers quickly understand and test API functionality.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Analytics and Monitoring</h3>
                  <p className="text-gray-600">
                    Developed comprehensive analytics tools to track API usage, performance metrics, 
                    and developer engagement.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deliverables */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Key Deliverables</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Outcomes */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Business Outcomes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center px-4">
            <h2 className="text-2xl font-bold mb-4">Ready to Create Your Developer Portal?</h2>
            <p className="text-gray-600 mb-6">
              Let's discuss how we can help you build a developer-first API platform.
            </p>
            <Link to="/contact">
              <Button size="lg" className="w-full sm:w-auto text-base px-6 py-3">
                Build Your Developer Portal
                <ArrowLeft className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperPortalPage;