import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Mail, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const TermsPage = () => {
  useEffect(() => {
    document.title = 'Terms of Service | SoftDAB';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'SoftDAB Terms of Service - Legal terms and conditions for using our software development services, outsourcing, and dedicated teams.';
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 mt-20">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Terms of Service</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Terms of Service
              </h1>
              <p className="text-lg text-gray-600">
                Last updated: January 1, 2024
              </p>
            </div>

            {/* Important Notice */}
            <Card className="mb-12 border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-800 flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  Important Notice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-800">
                  These terms govern your use of SoftDAB's services. By engaging our services, 
                  you agree to these terms. Please read them carefully and contact us if you have any questions.
                </p>
              </CardContent>
            </Card>

            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="mb-6 text-gray-700">
                By accessing our website, requesting services, or entering into a service agreement with SoftDAB (“we,” “us,” “our”), 
                you (“client,” “you,” “your”) agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">2. Services</h2>
              <p className="mb-4 text-gray-700">
                SoftDAB provides software development services including:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Custom software development (Outsourcing)</li>
                <li>Dedicated development teams (Outstaffing)</li>
                <li>Discovery and proof-of-concept development</li>
                <li>Ongoing support and maintenance</li>
                <li>Technical consulting services</li>
              </ul>
              <p className="mb-6 text-gray-700">
                Specific services, deliverables, timelines, and costs are defined in individual project agreements or statements of work.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">3. Client Responsibilities</h2>
              <p className="mb-4 text-gray-700">
                You agree to:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Provide accurate project requirements, specifications, and necessary information</li>
                <li>Respond to communications and requests for feedback in a timely manner</li>
                <li>Provide access to necessary systems, accounts, and resources</li>
                <li>Make payments according to agreed terms</li>
                <li>Respect intellectual property rights of third parties</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">4. Payment Terms</h2>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>Invoicing:</strong> Invoices are sent monthly or according to project milestones</li>
                <li><strong>Payment Terms:</strong> Payment due within 30 days of invoice date</li>
                <li><strong>Late Payments:</strong> Late payments may incur fees and service suspension</li>
                <li><strong>Disputes:</strong> Payment disputes must be raised within 10 days of invoice</li>
                <li><strong>Expenses:</strong> Pre-approved expenses are billed separately</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">5. Intellectual Property</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Work Product</h3>
              <p className="mb-4 text-gray-700">
                All custom code, documentation, and deliverables created specifically for your project 
                (“Work Product”) are owned by you upon full payment, subject to the terms below.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Pre-existing IP</h3>
              <p className="mb-4 text-gray-700">
                We retain ownership of our pre-existing intellectual property, including methodologies, 
                frameworks, and general knowledge. You receive a license to use such IP as incorporated in the Work Product.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Third-party IP</h3>
              <p className="mb-6 text-gray-700">
                Open-source and third-party components are subject to their respective licenses. 
                We will identify significant third-party dependencies and their license requirements.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">6. Confidentiality</h2>
              <p className="mb-6 text-gray-700">
                We maintain strict confidentiality of your business information, technical specifications, 
                and project details. Our team members sign confidentiality agreements. We may require a 
                separate NDA for highly sensitive projects.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">7. Warranties and Disclaimers</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Warranties</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Services will be performed in a professional manner</li>
                <li>Work will conform to agreed specifications</li>
                <li>We have the right to provide the services</li>
                <li>Services will not infringe third-party intellectual property rights</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Disclaimers</h3>
              <p className="mb-6 text-gray-700">
                EXCEPT AS EXPRESSLY STATED, SERVICES ARE PROVIDED “AS IS” WITHOUT WARRANTIES OF ANY KIND. 
                WE DISCLAIM ALL IMPLIED WARRANTIES INCLUDING MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">8. Limitation of Liability</h2>
              <p className="mb-6 text-gray-700">
                OUR LIABILITY FOR ANY CLAIM RELATED TO SERVICES IS LIMITED TO THE AMOUNT PAID BY YOU IN THE 
                12 MONTHS PRECEDING THE CLAIM. WE ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, CONSEQUENTIAL, 
                OR PUNITIVE DAMAGES.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">9. Termination</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Termination Rights</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Either party may terminate with 30 days written notice</li>
                <li>Immediate termination for material breach (with 10 days cure period)</li>
                <li>Immediate termination for non-payment after 15 days notice</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Effect of Termination</h3>
              <p className="mb-6 text-gray-700">
                Upon termination, you pay for services performed through the termination date. 
                We will deliver completed work and assist with orderly transition.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">10. Governing Law</h2>
              <p className="mb-6 text-gray-700">
                These terms are governed by the laws of Ukraine. Disputes will be resolved through 
                binding arbitration or in Ukrainian courts, as mutually agreed.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">11. Changes to Terms</h2>
              <p className="mb-6 text-gray-700">
                We may update these terms periodically. Continued use of services after changes 
                constitutes acceptance. We will notify you of material changes by email or website notice.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">12. Contact Information</h2>
              <p className="mb-4 text-gray-700">
                For questions about these terms or to report violations:
              </p>
              
              <Card className="bg-gray-50 border-0">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <span><strong>Email:</strong> legal@softdab.tech</span>
                    </div>
                    <div>
                      <strong>Address:</strong><br />
                      SoftDAB LLC<br />
                      Kyiv, Ukraine
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;