import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Download, Mail } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const DPAPage = () => {
  useEffect(() => {
    // Title
    document.title = 'Data Processing Addendum (DPA) | SoftDAB';

    // Ensure meta description exists or create one
    const descText =
      'SoftDAB Data Processing Addendum (DPA) for GDPR compliance. Details on how we process personal data for software development services.';
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', descText);

    // Breadcrumb Schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.softdab.tech' },
        { '@type': 'ListItem', position: 2, name: 'Data Processing Addendum' }
      ]
    };

    // Service/Document Schema
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Data Processing Addendum (DPA)',
      description:
        'SoftDAB DPA outlines GDPR-compliant processing of personal data for software development and related services.',
      provider: {
        '@type': 'Organization',
        name: 'SoftDAB',
        url: 'https://www.softdab.tech',
        foundingDate: '2017'
      },
      areaServed: ['European Union', 'United States'],
      serviceType: 'Software Development',
      termsOfService: 'https://www.softdab.tech/terms',
      offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'USD' }
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

  
  const dpaPdfUrl = '/docs/dpa.pdf'; // поместите файл в public/docs/dpa.pdf
  const hasPdf = true; // поставьте false, если файла пока нет

  const lastUpdated = 'January 1, 2024'; 

  return (
    <div className="min-h-screen">
      <SEOHead title={"Data Processing Agreement — SoftDAB"} description={"Data Processing Agreement (DPA) for clients of SoftDAB."} url={"https://www.softdab.tech/legal/dpa"} breadcrumbs={[{name:'Home', item:'https://www.softdab.tech/'},{name:'Legal', item:'https://www.softdab.tech/legal/dpa'},{name:'DPA', item:'https://www.softdab.tech/legal/dpa'}]} />
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 mt-20">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-gray-600" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-gray-900">Data Processing Addendum</span>
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
                Data Processing Addendum
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                GDPR Compliance for Software Development Services
              </p>
              <p className="text-sm text-gray-500">
                Last updated: {lastUpdated}
              </p>
            </div>

            {/* Download & Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center">
                    <Download className="mr-2 h-5 w-5" aria-hidden="true" />
                    Download DPA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Download the full Data Processing Addendum as a PDF document.
                  </p>
                  {hasPdf ? (
                    <Button
                      asChild
                      className="w-full"
                      aria-label="Download DPA PDF"
                      title="Download DPA PDF"
                    >
                      <a href={dpaPdfUrl} download rel="noopener">
                        Download PDF Version
                      </a>
                    </Button>
                  ) : (
                    <Button className="w-full" disabled title="PDF coming soon">
                      PDF coming soon
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center">
                    <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
                    Request Signed Copy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-800 mb-4">
                    Need a signed DPA for your compliance? Contact our legal team.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-green-300 text-green-800 hover:bg-green-100"
                    aria-label="Contact legal team by email"
                    title="Contact legal team by email"
                  >
                    <a href="mailto:legal@softdab.tech">
                      Contact Legal Team
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="mb-6 text-gray-700">
                This Data Processing Addendum (“DPA”) forms part of the service agreement between SoftDAB (“Processor”)
                and you (“Controller”) for the provision of software development services. This DPA governs the processing
                of Personal Data (as defined in the GDPR) in connection with our services.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">1. Definitions</h2>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>"Controller"</strong> means the entity that determines the purposes and means of processing Personal Data.</li>
                <li><strong>"Processor"</strong> means SoftDAB, which processes Personal Data on behalf of the Controller.</li>
                <li><strong>"Personal Data"</strong> has the meaning set forth in the GDPR.</li>
                <li><strong>"Processing"</strong> has the meaning set forth in the GDPR.</li>
                <li><strong>"Data Subject"</strong> has the meaning set forth in the GDPR.</li>
                <li><strong>"GDPR"</strong> means the General Data Protection Regulation (EU) 2016/679.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">2. Processing Details</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Subject Matter</h3>
              <p className="mb-4 text-gray-700">
                The processing relates to the provision of software development services including custom application development,
                dedicated team services, and related technical services.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Duration</h3>
              <p className="mb-4 text-gray-700">
                Processing will occur for the duration of the service agreement and may continue as necessary for
                legal compliance or legitimate business purposes.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Nature and Purpose</h3>
              <p className="mb-4 text-gray-700">
                Processing is necessary to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Provide software development services</li>
                <li>Manage project communications and deliverables</li>
                <li>Ensure system security and functionality</li>
                <li>Comply with legal and contractual obligations</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Categories of Data</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Contact information (names, email addresses, phone numbers)</li>
                <li>Professional information (job titles, company details)</li>
                <li>Project-related communications and documents</li>
                <li>Technical data necessary for service provision</li>
                <li>Usage and analytics data</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Categories of Data Subjects</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Client employees and representatives</li>
                <li>End users of developed applications</li>
                <li>Website visitors</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">3. Processor Obligations</h2>
              <p className="mb-4 text-gray-700">
                SoftDAB agrees to:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Process Personal Data only as instructed by the Controller</li>
                <li>Ensure personnel processing data are bound by confidentiality</li>
                <li>Implement appropriate technical and organizational security measures</li>
                <li>Assist with data subject rights requests</li>
                <li>Notify of personal data breaches without undue delay</li>
                <li>Delete or return data upon termination of services</li>
                <li>Maintain records of processing activities</li>
                <li>Cooperate with supervisory authority investigations</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">4. Security Measures</h2>
              <p className="mb-4 text-gray-700">
                We implement appropriate technical and organizational measures including:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Measures</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Encryption of data in transit and at rest</li>
                <li>Access controls and authentication</li>
                <li>Regular security monitoring and logging</li>
                <li>Secure development practices</li>
                <li>Regular security updates and patches</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Organizational Measures</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Staff security training and awareness</li>
                <li>Confidentiality agreements for all personnel</li>
                <li>Incident response procedures</li>
                <li>Regular security assessments</li>
                <li>Data protection impact assessments when required</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">5. Sub-processors</h2>
              <p className="mb-4 text-gray-700">
                We may engage sub-processors to assist in providing services. Current sub-processors include:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Cloud Hosting Providers:</strong> AWS, Microsoft Azure (for infrastructure)</li>
                <li><strong>Communication Tools:</strong> Slack, Microsoft Teams (for project communication)</li>
                <li><strong>Development Tools:</strong> GitHub, Jira (for code and project management)</li>
              </ul>
              <p className="mb-6 text-gray-700">
                We will notify you of any changes to sub-processors and ensure they are bound by equivalent data protection obligations.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">6. Data Transfers</h2>
              <p className="mb-6 text-gray-700">
                Personal Data may be transferred outside the EEA to countries that do not provide adequate protection.
                In such cases, we implement appropriate safeguards such as Standard Contractual Clauses or rely on
                adequacy decisions by the European Commission.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">7. Data Subject Rights</h2>
              <p className="mb-4 text-gray-700">
                We will assist you in responding to data subject requests including:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Access to personal data</li>
                <li>Rectification of inaccurate data</li>
                <li>Erasure of personal data</li>
                <li>Restriction of processing</li>
                <li>Data portability</li>
                <li>Objection to processing</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">8. Data Breach Notification</h2>
              <p className="mb-6 text-gray-700">
                In case of a personal data breach, we will notify you without undue delay and no later than 72 hours
                after becoming aware of the breach. We will provide all information necessary for you to assess
                the breach and comply with notification requirements.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">9. Audits and Inspections</h2>
              <p className="mb-6 text-gray-700">
                We will provide reasonable cooperation for audits and inspections by you or an independent auditor
                to verify compliance with this DPA. Audit costs are borne by the requesting party unless
                non-compliance is found.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">10. Liability and Indemnification</h2>
              <p className="mb-6 text-gray-700">
                Each party's liability is limited as set forth in the main service agreement. We will indemnify you
                against claims arising from our non-compliance with this DPA, subject to the limitations in
                the main agreement.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">11. Contact Information</h2>
              <p className="mb-4 text-gray-700">
                For DPA-related questions or to exercise data subject rights:
              </p>

              <Card className="bg-gray-50 border-0">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-primary" aria-hidden="true" />
                      <span><strong>Data Protection Officer:</strong> dpo@softdab.tech</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                      <span><strong>Legal Team:</strong> legal@softdab.tech</span>
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

export default DPAPage;