import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const PrivacyPage = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | SoftDAB';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'SoftDAB Privacy Policy - How we collect, use, and protect your personal information when you use our software development services.';
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
            <span className="text-gray-900">Privacy Policy</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Privacy Policy
              </h1>
              <p className="text-lg text-gray-600">
                Last updated: January 1, 2024
              </p>
            </div>

            {/* Quick Summary */}
            <Card className="mb-12 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-primary">Quick Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We collect minimal personal information necessary to provide our services, 
                  never sell your data, and use industry-standard security measures to protect your information. 
                  You have full control over your data and can request its deletion at any time.
                </p>
              </CardContent>
            </Card>

            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Information You Provide</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>Contact Information:</strong> Name, email address, phone number, company name</li>
                <li><strong>Project Information:</strong> Project requirements, technical specifications, business goals</li>
                <li><strong>Communication:</strong> Messages, feedback, and other communications with our team</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Information We Collect Automatically</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>Usage Data:</strong> Pages visited, time spent on site, referral sources</li>
                <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
                <li><strong>Cookies:</strong> Essential cookies for site functionality and analytics</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">How We Use Your Information</h2>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Provide and improve our software development services</li>
                <li>Communicate about projects, updates, and support</li>
                <li>Analyze website usage to improve user experience</li>
                <li>Send relevant information about our services (with your consent)</li>
                <li>Comply with legal obligations and protect our rights</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Information Sharing</h2>
              <p className="mb-4 text-gray-700">
                We do not sell, trade, or rent your personal information to third parties. We may share information only in these limited circumstances:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>Service Providers:</strong> Trusted partners who help us operate our business (hosting, analytics, communication tools)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Data Security</h2>
              <p className="mb-4 text-gray-700">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication requirements</li>
                <li>Secure hosting with reputable cloud providers</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Your Rights</h2>
              <p className="mb-4 text-gray-700">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Rectification:</strong> Correct inaccurate or incomplete information</li>
                <li><strong>Erasure:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Objection:</strong> Object to processing of your personal information</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for marketing communications</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Data Retention</h2>
              <p className="mb-6 text-gray-700">
                We retain your information only as long as necessary to provide our services and comply with legal obligations. 
                Contact information is typically retained for 3 years after our last interaction, 
                while project-related data may be retained longer for support purposes.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Cookies</h2>
              <p className="mb-6 text-gray-700">
                We use essential cookies for site functionality and analytics cookies (with your consent) to understand how you use our website. 
                You can control cookies through your browser settings.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">International Transfers</h2>
              <p className="mb-6 text-gray-700">
                As we serve clients globally, your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place for such transfers.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Changes to This Policy</h2>
              <p className="mb-6 text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any significant changes by 
                email or through our website. The "Last updated" date at the top indicates when changes were made.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Contact Us</h2>
              <p className="mb-4 text-gray-700">
                If you have questions about this Privacy Policy or want to exercise your rights, please contact us:
              </p>
              
              <Card className="bg-gray-50 border-0">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <span><strong>Email:</strong> privacy@softdab.tech</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span><strong>Response Time:</strong> Within 30 days</span>
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

export default PrivacyPage;