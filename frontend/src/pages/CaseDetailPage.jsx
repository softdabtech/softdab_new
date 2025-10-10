import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, Clock, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockData } from '../data/mockData';

// Helpers
const normalizeIndustry = (s) => (s || '').toString().trim().toLowerCase();

const industryBadgeClasses = (industry) => {
  const i = normalizeIndustry(industry);
  if (i === 'fintech') return 'bg-blue-100 text-blue-800';
  if (i === 'healthcare') return 'bg-red-100 text-red-800';
  if (i === 'ecommerce') return 'bg-green-100 text-green-800';
  if (i === 'logistics') return 'bg-amber-100 text-amber-800';
  return 'bg-gray-100 text-gray-800';
};

const extractMainMetric = (val) => {
  if (!val) return '';
  const s = String(val).trim();
  const m = s.match(/^([\$]?\d+(?:\.\d+)?%?|[\d.]+x)\b/i);
  return m ? m[0] : s.split(' ')[0];
};

const extractMetricCaption = (val) => {
  if (!val) return '';
  const s = String(val).trim();
  const main = extractMainMetric(s);
  return s.startsWith(main) ? s.slice(main.length).trim() : s;
};

// Совместимость с существующим вызовом splitMetric
const splitMetric = (val) => ({
  main: extractMainMetric(val),
  rest: extractMetricCaption(val),
});

const CaseDetailPage = () => {
  const { slug } = useParams();

  // Находим кейс по slug с фолбеком на id
  const caseStudy = useMemo(() => {
    const list = Array.isArray(mockData.caseStudies) ? mockData.caseStudies : [];
    return list.find((c) => (c.slug || c.id) === slug) || null;
  }, [slug]);

  // Мета и schema
  useEffect(() => {
    if (!caseStudy) return;

    const prevTitle = document.title;
    document.title = `${caseStudy.title} - Case Study | SoftDAB`;

    const metaDescription =
      document.querySelector('meta[name="description"]') ||
      (() => {
        const m = document.createElement('meta');
        m.setAttribute('name', 'description');
        document.head.appendChild(m);
        return m;
      })();
    const prevDesc = metaDescription.getAttribute('content') || '';
    metaDescription.setAttribute(
      'content',
      `${caseStudy.description} Backed by 8 years in IT delivery. Read the full case study with detailed results and technical implementation.`
    );

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: caseStudy.title,
      description: caseStudy.description,
      author: { '@type': 'Organization', name: 'SoftDAB' },
      publisher: {
        '@type': 'Organization',
        name: 'SoftDAB',
        logo: { '@type': 'ImageObject', url: 'https://www.softdab.tech/logo.png' },
      },
      datePublished: '2024-01-01',
      dateModified: '2024-01-01',
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(articleSchema);
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      metaDescription.setAttribute('content', prevDesc);
      document.head.removeChild(script);
    };
  }, [caseStudy]);

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Case Study Not Found</h1>
          <p className="text-gray-600 mb-6">The case study you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/case-studies">View All Case Studies</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 py-4 mt-20">
        <div className="container mx-auto px-6">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/case-studies">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Case Studies
            </Link>
          </Button>

          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/case-studies" className="hover:text-primary">Case Studies</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{caseStudy.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Badge className={industryBadgeClasses(caseStudy.industry)}>
                {caseStudy.industry || 'General'}
              </Badge>
              <span className="text-gray-600">{caseStudy.client || 'Client NDA'}</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
              {caseStudy.title}
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {caseStudy.description}
            </p>

            {/* Project Meta */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-semibold text-gray-900">Timeline</div>
                  <div className="text-gray-600">{caseStudy.timeline || '—'}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-semibold text-gray-900">Team Size</div>
                  <div className="text-gray-600">{(caseStudy.teamSize || '').split('(')[0] || '—'}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-semibold text-gray-900">Industry</div>
                  <div className="text-gray-600">{caseStudy.industry || '—'}</div>
                </div>
              </div>
            </div>

            {/* Technologies */}
            {Array.isArray(caseStudy.technologies) && caseStudy.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {caseStudy.technologies.map((tech, index) => (
                  <Badge key={index} variant="outline">{tech}</Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Challenge */}
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    The Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {caseStudy.challenge}
                  </p>
                </CardContent>
              </Card>

              {/* Solution */}
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    Our Solution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {caseStudy.solution}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Measurable <span className="gradient-text">Results</span>
              </h2>
              <p className="text-lg text-gray-600">
                The project delivered significant business impact across multiple metrics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(caseStudy.results || {}).map(([key, value], index) => {
                const { main, rest } = splitMetric(value);
                const readableKey = key.replace(/([A-Z])/g, ' $1').trim();
                return (
                  <Card key={index} className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <div className="text-3xl font-bold text-green-700">{main}</div>
                      </div>
                      <div className="text-gray-800 font-medium">{readableKey}</div>
                      {rest && <div className="text-sm text-gray-600 mt-1">{rest}</div>}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {caseStudy.testimonial && (
        <section className="section-padding bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl text-primary mb-6 opacity-20">“</div>
                  <blockquote className="text-xl text-gray-700 mb-6 leading-relaxed italic">
                    {caseStudy.testimonial.text}
                  </blockquote>
                  <div className="flex items-center justify-center space-x-4">
                    <div>
                      <div className="font-bold text-gray-900">{caseStudy.testimonial.author}</div>
                      <div className="text-gray-600">{caseStudy.testimonial.position}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to achieve similar results?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create a custom development plan that delivers measurable business outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link to="/contact">Start Your Project</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link to="/case-studies">View More Case Studies</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseDetailPage;