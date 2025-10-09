import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ArrowRight } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';

export default function TelemedicinePlatformPage() {
  return (
    <div className="mt-24 section-padding">
      <div className="container mx-auto px-6 max-w-5xl">
        <Link to="/case-studies" className="text-primary underline">← Back to Case Studies</Link>

        {/* Hero */}
        <div className="mt-4">
          <Badge className="bg-red-100 text-red-800 mr-2">Healthcare</Badge>
          <span className="text-sm text-gray-500">EU Healthcare Provider</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">Telemedicine Platform</h1>
          <p className="text-lg text-gray-600 mt-3">
            HIPAA-compliant telemedicine platform serving 10,000+ patients with video consultations and health records.
          </p>
        </div>

        {/* Highlight */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mt-6">
          <div className="text-3xl font-bold text-green-800">300%</div>
          <div className="text-green-700">Increase in patient consultations</div>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm text-gray-700">
          <div className="flex items-center"><Clock className="h-4 w-4 mr-2" /> 16 weeks</div>
          <div className="flex items-center"><Users className="h-4 w-4 mr-2" /> 7 developers (3 backend, 2 frontend, 1 mobile, 1 DevOps)</div>
        </div>

        {/* Content */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Challenge</h2>
          <p className="text-gray-700 mt-2">
            During COVID-19, the client needed to rapidly deploy a telemedicine solution to serve patients remotely while maintaining HIPAA compliance.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Solution</h2>
          <p className="text-gray-700 mt-2">
            We built a comprehensive telemedicine platform with secure video consultations, patient records management, and prescription handling.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Results</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2 mt-2">
            <li>300% increase in patient consultations</li>
            <li>95% patient satisfaction score</li>
            <li>Full HIPAA compliance achieved</li>
            <li>24/7 platform availability</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">Tech Stack</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {['Vue.js', 'Python', 'MongoDB', 'WebRTC', 'Docker', 'Azure', 'Twilio'].map(t => (
              <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-12 bg-gray-50 border rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-2">Need a compliant telemedicine app?</h3>
          <p className="text-gray-700">We’ll ship secure video visits, EHR integrations, and patient portals.</p>
          <Button asChild className="mt-4">
            <Link to="/contact">
              Talk to Experts <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}