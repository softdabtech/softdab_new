import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Server, Cloud, Activity, Lock } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const IoTPlatformPage = () => {
  useEffect(() => {
    document.title = 'IoT Platform for Smart Buildings Case Study | SoftDAB';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Learn how we built a scalable IoT platform for real-time monitoring and control of building systems, using modern cloud technologies and IoT solutions.';
    }
  }, []);

  const technologies = ['IoT', 'Cloud', 'React', 'Python'];
  const deliverables = [
    'Real-time monitoring dashboard',
    'Device management system',
    'Data analytics platform',
    'Alert and notification system',
    'Building automation controls'
  ];
  const outcomes = [
    'Reduced energy consumption by 30%',
    'Improved building maintenance efficiency',
    'Enhanced occupant comfort',
    'Automated system responses',
    'Centralized building management'
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
            <span className="text-gray-900">IoT Platform</span>
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
            <h1 className="text-4xl font-bold mb-4">IoT Platform for Smart Buildings</h1>
            <p className="text-xl text-gray-600 mb-6">
              Scalable platform for real-time monitoring and control of building systems.
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
                We developed a comprehensive IoT platform that enables real-time monitoring and control of various building systems, 
                including HVAC, lighting, security, and energy management. The platform integrates with multiple IoT sensors and 
                devices to collect data, process it in real-time, and provide actionable insights for building managers.
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
                  <h3 className="font-semibold mb-2">Real-time Data Processing</h3>
                  <p className="text-gray-600">
                    Implemented a scalable architecture using microservices and message queues to handle 
                    thousands of simultaneous device connections and real-time data processing.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Device Integration</h3>
                  <p className="text-gray-600">
                    Developed a flexible device integration layer that supports multiple IoT protocols 
                    and can easily adapt to new types of sensors and devices.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Data Security</h3>
                  <p className="text-gray-600">
                    Implemented end-to-end encryption and robust authentication mechanisms to ensure 
                    secure data transmission and storage.
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
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Build Your IoT Solution?</h2>
            <p className="text-gray-600 mb-6">
              Let's discuss how we can help you implement smart building technology for your properties.
            </p>
            <Link to="/contact">
              <Button size="lg">
                Contact Us
                <ArrowLeft className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoTPlatformPage;