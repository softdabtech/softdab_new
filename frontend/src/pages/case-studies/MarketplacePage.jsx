import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ArrowRight } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';

export default function MarketplacePage() {
  return (
    <div className="mt-24 section-padding">
      <div className="container mx-auto px-6 max-w-5xl">
        <Link to="/case-studies" className="text-primary underline">← Back to Case Studies</Link>

        {/* Hero */}
        <div className="mt-4">
          <Badge className="bg-green-100 text-green-800 mr-2">eCommerce</Badge>
          <span className="text-sm text-gray-500">European Retailer</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">Multi‑vendor Marketplace</h1>
          <p className="text-lg text-gray-600 mt-3">
            Scalable marketplace platform connecting 500+ vendors with advanced analytics and inventory management.
          </p>
        </div>

        {/* Highlight */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mt-6">
          <div className="text-3xl font-bold text-green-800">45%</div>
          <div className="text-green-700">Increase in vendor satisfaction</div>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm text-gray-700">
          <div className="flex items-center"><Clock className="h-4 w-4 mr-2" /> 20 weeks</div>
          <div className="flex items-center"><Users className="h-4 w-4 mr-2" /> 8 developers (3 backend, 2 frontend, 1 mobile, 1 DevOps, 1 QA)</div>
        </div>

        {/* Content */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Challenge</h2>
          <p className="text-gray-700 mt-2">
            Transform from a single‑vendor store to a multi‑vendor marketplace while maintaining performance and UX.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Solution</h2>
          <p className="text-gray-700 mt-2">
            We built a marketplace with vendor onboarding, advanced search, inventory management, and analytics.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Results</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2 mt-2">
            <li>500+ active vendors onboarded</li>
            <li>45% increase in vendor satisfaction</li>
            <li>250% increase in platform revenue</li>
            <li>2x improvement in page load times</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">Tech Stack</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {['React', 'Django', 'PostgreSQL', 'Elasticsearch', 'Redis', 'Docker', 'AWS'].map(t => (
              <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-12 bg-gray-50 border rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-2">Need a scalable marketplace?</h3>
          <p className="text-gray-700">We’ll deliver multi‑vendor features, performance and analytics.</p>
          <Button asChild className="mt-4">
            <Link to="/contact">
              Discuss Your Marketplace <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}