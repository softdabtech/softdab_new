import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const PrivacyPage = () => {
  const lastUpdated = 'January 1, 2024'; // вынесите в конфиг/mockData при желании

  useEffect(() => {
    // Title
    document.title = 'Privacy Policy | SoftDAB';

    // Ensure meta description exists or create one
    const descText =
      'SoftDAB Privacy Policy - How we collect, use, and protect your personal information when you use our software development services.';
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', descText);

    // JSON-LD: Breadcrumb
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.softdab.tech' },
        { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: 'https://www.softdab.tech/privacy' }
      ]
    };

    // JSON-LD: PrivacyPolicy (CreativeWork)
    const privacySchema = {
      '@context': 'https://schema.org',
      '@type': 'PrivacyPolicy',
      name: 'SoftDAB Privacy Policy',
      url: 'https://www.softdab.tech/privacy',
      dateModified: '2024-01-01',
      publisher: {
        '@type': 'Organization',
        name: 'SoftDAB',
        url: 'https://www.softdab.tech'
      },
      inLanguage: 'en'
    };

    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'application/ld+json';
    script2.text = JSON.stringify(privacySchema);
    document.head.appendChild(script2);

    return () => {
      if (document.head.contains(script1)) document.head.removeChild(script1);
      if (document.head.contains(script2)) document.head.removeChild(script2);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <SEOHead title={"Privacy Policy — SoftDAB"} description={"Privacy Policy for SoftDAB — how we collect, use, and protect your data."} url={"https://www.softdab.tech/legal/privacy"} breadcrumbs={[{name:'Home', item:'https://www.softdab.tech/'},{name:'Privacy Policy', item:'https://www.softdab.tech/legal/privacy'}]} />
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 mt-20">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-gray-600" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
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
                <Shield className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Privacy Policy
              </h1>
              <p className="text-lg text-gray-600">
                Last updated: {lastUpdated}
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
                <li><strong>Cookies:</strong> Essential cookies for site functionality and analytics (with your consent)</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Legal Bases for Processing (GDPR)</h2>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>Contract:</strong> Processing necessary to perform our contract with you.</li>
                <li><strong>Legitimate Interests:</strong> Improving services, ensuring security, preventing fraud.</li>
                <li><strong>Consent:</strong> For marketing communications and non-essential cookies/analytics.</li>
                <li><strong>Legal Obligation:</strong> Compliance with laws, regulatory requirements, tax and accounting.</li>
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
                <li><strong>Service Providers:</strong> Hosting, analytics, communication and collaboration tools</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Data Security</h2>
              <p className="mb-4 text-gray-700">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Encryption of data in transit and at rest (where applicable)</li>
                <li>Regular security audits, updates, and vulnerability management</li>
                <li>Access controls, authentication, and least-privilege principles</li>
                <li>Secure development practices and incident response procedures</li>
                <li>Reputable cloud hosting providers</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Your Rights</h2>
              <p className="mb-4 text-gray-700">
                Depending on your location and applicable law, you may have the right to:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Rectification:</strong> Correct inaccurate or incomplete information</li>
                <li><strong>Erasure:</strong> Request deletion of your personal information</li>
                <li><strong>Restriction:</strong> Request restriction of processing</li>
                <li><strong>Portability:</strong> Receive your data in a structured, commonly used format</li>
                <li><strong>Objection:</strong> Object to processing, including for direct marketing</li>
                <li><strong>Withdraw Consent:</strong> At any time where processing is based on consent</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">How to Exercise Your Rights</h3>
              <p className="mb-4 text-gray-700">
                Send your request to <a href="mailto:privacy@softdab.tech" className="text-primary underline">privacy@softdab.tech</a>.
                We may need to verify your identity before responding. You can also review our{' '}
                <Link to="/legal/dpa" className="text-primary underline">Data Processing Addendum (DPA)</Link> for more details.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Data Retention</h2>
              <p className="mb-6 text-gray-700">
                We retain your information only as long as necessary to provide our services and comply with legal obligations.
                Contact information is typically retained for 3 years after our last interaction; project data may be retained longer for support or legal purposes.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Cookies</h2>
              <p className="mb-6 text-gray-700">
                We use essential cookies for site functionality and analytics cookies (with your consent). You can control cookies through your browser settings.
                For more details, see our{' '}
                <Link to="/legal/cookies" className="text-primary underline">Cookies Policy</Link> (if available).
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">International Transfers</h2>
              <p className="mb-6 text-gray-700">
                Your information may be transferred to and processed in countries other than your own. Where such transfers occur,
                we implement appropriate safeguards (e.g., Standard Contractual Clauses and, if applicable, the UK Addendum).
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Children’s Privacy</h2>
              <p className="mb-6 text-gray-700">
                Our services are not directed to children under 16, and we do not knowingly collect personal information from children.
                If you believe a child has provided us with personal information, please contact us to request deletion.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Data Controller vs. Processor</h2>
              <p className="mb-6 text-gray-700">
                For our website and marketing operations, SoftDAB is the data Controller. When we provide software development services to clients,
                we typically act as a Processor, processing personal data on behalf of the client under the terms of our{' '}
                <Link to="/legal/dpa" className="text-primary underline">DPA</Link>.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">CCPA/CPRA Notice for California Residents</h2>
              <p className="mb-4 text-gray-700">
                If you are a California resident, you have specific rights under the CCPA/CPRA, including the right to know, delete,
                correct, and opt-out of sale or sharing of personal information. We do not sell your personal information.
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Right to Know: categories and specific pieces of personal information collected</li>
                <li>Right to Delete: request deletion of personal information (subject to exceptions)</li>
                <li>Right to Correct: correct inaccurate personal information</li>
                <li>Right to Opt-Out: of sale or sharing of personal information (not applicable — we do not sell)</li>
                <li>Right to Non-Discrimination: for exercising any of your rights</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Changes to This Policy</h2>
              <p className="mb-6 text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of significant changes by email or through our website.
                The "Last updated" date at the top indicates when changes were made.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Contact Us</h2>
              <p className="mb-4 text-gray-700">
                If you have questions about this Privacy Policy or want to exercise your rights, please contact us:
              </p>

              <Card className="bg-gray-50 border-0">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                      <span><strong>Email:</strong> privacy@softdab.tech</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-primary" aria-hidden="true" />
                      <span><strong>Response Time:</strong> Within 30 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <p className="text-sm text-gray-500 mt-6">
                For EU/EEA residents, you may also lodge a complaint with your local supervisory authority. In Ukraine, contact the Ukrainian Parliament Commissioner for Human Rights.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;