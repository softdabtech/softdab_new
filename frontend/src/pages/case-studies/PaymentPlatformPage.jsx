import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ArrowRight } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';

export default function PaymentPlatformPage() {
  return (
    <div className="mt-24 section-padding">
      <div className="container mx-auto px-6 max-w-5xl">
        <Link to="/case-studies" className="text-primary underline">← Back to Case Studies</Link>

        {/* Hero */}
        <div className="mt-4">
          <Badge className="bg-blue-100 text-blue-800 mr-2">Fintech</Badge>
          <span className="text-sm text-gray-500">US Fintech Startup</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">Payment Platform MVP</h1>
          <p className="text-lg text-gray-600 mt-3">
            Built a secure payment processing platform from scratch, handling $2M+ in transactions within 6 months.
          </p>
        </div>

        {/* Highlight */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mt-6">
          <div className="text-3xl font-bold text-green-800">60%</div>
          <div className="text-green-700">Faster time-to-market vs in-house development</div>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm text-gray-700">
          <div className="flex items-center"><Clock className="h-4 w-4 mr-2" /> 12 weeks</div>
          <div className="flex items-center"><Users className="h-4 w-4 mr-2" /> 5 developers (2 backend, 2 frontend, 1 DevOps)</div>
        </div>

        {/* Overview */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Challenge</h2>
          <p className="text-gray-700 mt-2">
            The client needed to launch a payment platform quickly to compete with established players while ensuring bank-level security and compliance.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Solution</h2>
          <p className="text-gray-700 mt-2">
            We developed a scalable payment processing platform with advanced security measures, real-time fraud detection, and seamless API integrations.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Results</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2 mt-2">
            <li>60% faster time-to-market than in-house development</li>
            <li>$2M+ processed in first 6 months</li>
            <li>99.9% platform availability</li>
            <li>100% PCI DSS compliance achieved</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">Tech Stack</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Stripe'].map(t => (
              <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-12 bg-gray-50 border rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-2">Need a secure payment product?</h3>
          <p className="text-gray-700">We’ll design a compliant architecture and deliver a fast MVP.</p>
          <Button asChild className="mt-4">
            <Link to="/contact">
              Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}