// src/pages/legal/CookiesPolicy.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, Shield, Settings, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Separator } from '../../components/ui/separator';

const CookiesPolicy = () => {
  const lastUpdated = 'January 1, 2025';

  useEffect(() => {
    document.title = 'Cookies Policy | SoftDAB';
    const desc =
      'SoftDAB Cookies Policy: types of cookies we use, purposes, retention periods, and how to manage your preferences.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);
    window.scrollTo(0, 0);
  }, []);

  const handleManageCookies = () => {
    localStorage.removeItem('softdab_cookie_consent_v1');
    window.dispatchEvent(new CustomEvent('softdab:open-cookie-banner', { detail: { openCustomize: true } }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b mt-20">
        <div className="container mx-auto px-6 py-4">
          <nav className="text-sm text-gray-600" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-gray-900 font-medium">Cookies Policy</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl shadow-lg flex items-center justify-center">
              <Cookie className="h-10 w-10 text-primary" aria-hidden="true" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Cookies Policy
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              How we use cookies to improve your experience
            </p>
            <p className="text-sm text-gray-500">
              Last updated: <time dateTime="2025-01-01">{lastUpdated}</time>
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-gray-700">
                  Cookies are small text files stored on your device when you visit our website. 
                  We use cookies to ensure the site functions properly and, with your consent, 
                  to analyze usage, remember your preferences, and deliver personalized marketing.
                </p>
              </CardContent>
            </Card>

            {/* Types of Cookies */}
            <Card>
              <CardHeader>
                <CardTitle>Types of Cookies We Use</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Strictly Necessary (Always Active)
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Required for core site functionality, navigation, and security. 
                      These cookies cannot be disabled in our systems.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Examples: session management, authentication, CSRF protection
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Analytics (Optional)
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Help us understand how visitors use our site (page views, traffic sources, user flows) 
                      to improve content and user experience.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Examples: Google Analytics, Plausible Analytics
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Functional (Optional)
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Remember your preferences and settings (language, region, theme) 
                      to provide enhanced, personalized features.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Examples: language preference, UI customization
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Marketing (Optional)
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Used for personalized advertising, retargeting, and conversion tracking. 
                      Only activated with your explicit consent.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Examples: Meta Pixel, LinkedIn Insight Tag, Google Ads
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Purposes */}
            <Card>
              <CardHeader>
                <CardTitle>Purposes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Ensure site functionality and security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Analyze site performance and user behavior</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Remember user preferences and settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Deliver personalized marketing and measure campaign effectiveness</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Cookie Lifetimes */}
            <Card>
              <CardHeader>
                <CardTitle>Cookie Retention Periods</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-gray-700">
                  <strong>Session cookies:</strong> Deleted when you close your browser.
                </p>
                <p className="text-gray-700">
                  <strong>Persistent cookies:</strong> Stored from 1 day to 13 months, 
                  depending on purpose and legal requirements (e.g., GDPR, CCPA).
                </p>
              </CardContent>
            </Card>

            {/* Managing Cookies */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Managing Your Cookie Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  You can change your cookie preferences at any time by clicking the button below 
                  or using the "Manage Cookies" button in the footer.
                </p>
                <Button onClick={handleManageCookies} size="lg" className="w-full sm:w-auto">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Cookie Preferences
                </Button>
                <p className="text-sm text-gray-600">
                  Alternatively, you can configure your browser to block or delete cookies. 
                  Note that disabling certain cookies may affect site functionality.
                </p>
              </CardContent>
            </Card>

            {/* Third-Party Cookies */}
            <Card>
              <CardHeader>
                <CardTitle>Third-Party Cookies</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  We may use third-party cookies for analytics and marketing. 
                  These providers have their own privacy policies:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    <strong>Plausible Analytics:</strong> Privacy-friendly, cookieless by default; 
                    anonymizes all data.
                  </li>
                  <li>
                    <strong>Google Analytics:</strong> Sets cookies only with your consent; 
                    IP anonymization enabled.
                  </li>
                  <li>
                    <strong>Meta Pixel / LinkedIn Insight Tag:</strong> Marketing tags activated 
                    only with explicit consent.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Separator />

            {/* Your Rights */}
            <Card className="bg-gray-50 border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Your Rights & Choices
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-gray-700">
                  You have the right to accept, reject, or customize cookie preferences at any time. 
                  For more information about how we process your personal data, please see our{' '}
                  <Link to="/privacy" className="text-primary underline font-medium">
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link to="/dpa" className="text-primary underline font-medium">
                    Data Processing Addendum (DPA)
                  </Link>.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Questions?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  If you have any questions about our use of cookies, please contact us:
                </p>
                <a 
                  href="mailto:hello@softdab.tech" 
                  className="text-primary hover:underline font-medium"
                >
                  hello@softdab.tech
                </a>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiesPolicy;