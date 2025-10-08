import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, Clock, ExternalLink, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { mockData } from '../data/mockData';

const CaseDetailPage = () => {
  const { slug } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);

  useEffect(() => {
    const study = mockData.caseStudies.find(study => study.id === slug);
    setCaseStudy(study);
    
    if (study) {
      document.title = `${study.title} - Case Study | SoftDAB`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
  metaDescription.content = `${study.description} Backed by 8 years in IT delivery. Read the full case study with detailed results and technical implementation.`;
}

      // Article Schema
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": study.title,
        "description": study.description,
        "author": {
          "@type": "Organization",
          "name": "SoftDAB"
        },
        "publisher": {
          "@type": "Organization",
          "name": "SoftDAB",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.softdab.tech/logo.png"
          }
        },
        "datePublished": "2024-01-01",
        "dateModified": "2024-01-01"
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(articleSchema);
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [slug]);

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
              <Badge className={`${
                caseStudy.industry === 'Fintech' ? 'bg-blue-100 text-blue-800' :
                caseStudy.industry === 'Healthcare' ? 'bg-red-100 text-red-800' :
                caseStudy.industry === 'eCommerce' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {caseStudy.industry}
              </Badge>
              <span className="text-gray-600">{caseStudy.client}</span>
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
      <div className="text-gray-600">{caseStudy.teamSize || '—'}</div>
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
            <div className="flex flex-wrap gap-2">
              <div className="flex flex-wrap gap-2">
               {caseStudy.technologies.map((tech, index) => (
                  <Badge key={index} variant="outline">{tech}</Badge>
           ))}
              </div>
            </div>
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
    return (
      <Card key={index} className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{main}</div>
          <div className="text-gray-700 font-medium">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </div>
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
                <Link to="/contact">
                  Start Your Project
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link to="/case-studies">
                  View More Case Studies
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseDetailPage;