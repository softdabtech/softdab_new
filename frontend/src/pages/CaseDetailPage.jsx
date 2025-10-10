import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Clock, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockData } from '../data/mockData';

// Constants
const DEFAULT_IMAGE_FALLBACK = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80';

// Utility functions
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

const getMetric = (results) => {
  if (!results || typeof results !== 'object') return { value: '', caption: '' };
  
  // Handle case where results is an object with metric/description
  if ('metric' in results) {
    return {
      value: results.metric,
      caption: results.description || ''
    };
  }
  
  // Handle case where results is an object with key-value pairs
  const entries = Object.entries(results);
  if (entries.length > 0) {
    const [, val] = entries[0];
    const value = extractMainMetric(val);
    const caption = extractMetricCaption(val);
    return { value, caption };
  }
  
  return { value: '', caption: '' };
};

const CaseDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Find the case study by slug
  const caseStudy = (mockData.caseStudies || []).find(study => 
    (study.slug || study.id) === slug
  );

  const pageTitle = caseStudy 
    ? `${caseStudy.title} Case Study | SoftDAB`
    : "Case Study Not Found | SoftDAB";
  
  const pageDescription = caseStudy
    ? `Learn how ${caseStudy.title} achieved ${getMetric(caseStudy.results).value} through our software development services.`
    : "The requested case study could not be found.";

  useEffect(() => {
    // Handle case study not found
    if (!caseStudy) {
      setTimeout(() => navigate('/case-studies'), 5000); // Redirect after 5 seconds
    }

    // Update page title and meta tags
    document.title = pageTitle;

    const metaTags = [
      { name: 'description', content: pageDescription },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: pageDescription },
      { property: 'og:type', content: 'article' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: pageDescription }
    ];

    // Add image meta tags if available
    if (caseStudy?.image) {
      metaTags.push(
        { property: 'og:image', content: caseStudy.image },
        { name: 'twitter:image', content: caseStudy.image },
        { name: 'twitter:card', content: 'summary_large_image' }
      );
    }

    metaTags.forEach(({ name, property, content }) => {
      let meta = document.querySelector(`meta[${name ? `name="${name}"` : `property="${property}"`}]`);
      if (!meta) {
        meta = document.createElement('meta');
        if (name) meta.name = name;
        if (property) meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    });

    return () => {
      document.title = 'SoftDAB';
      metaTags.forEach(({ name, property }) => {
        const meta = document.querySelector(`meta[${name ? `name="${name}"` : `property="${property}"`}]`);
        if (meta && meta.parentNode) {
          meta.content = '';
        }
      });
    };
  }, [pageTitle, pageDescription, caseStudy, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/case-studies')}
            className="mb-8 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Case Studies
          </Button>

          {caseStudy ? (
            <>
              {/* Header */}
              <header className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <Badge variant="secondary" className="text-sm">
                    {caseStudy.industry || 'General'}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {caseStudy.client || 'Client NDA'}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {caseStudy.title}
                </h1>
                <p className="text-xl text-gray-600">
                  {caseStudy.description}
                </p>
              </header>

              {/* Main image */}
              {caseStudy.image && (
                <div className="rounded-xl overflow-hidden mb-12 bg-gray-100">
                  <img
                    src={caseStudy.image || DEFAULT_IMAGE_FALLBACK}
                    alt={`${caseStudy.title} project overview`}
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.target.src = DEFAULT_IMAGE_FALLBACK;
                    }}
                  />
                </div>
              )}

              {/* Key metrics */}
              {caseStudy.results && (
                <Card className="mb-12">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Key Achievements</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(caseStudy.results).map(([key, value], index) => (
                        <div
                          key={index}
                          className="bg-green-50 border border-green-200 rounded-lg p-4"
                        >
                          <div className="flex items-center">
                            <TrendingUp className="h-5 w-5 text-green-600 mr-3" />
                            <div>
                              <div className="text-2xl font-bold text-green-700">
                                {extractMainMetric(value)}
                              </div>
                              <div className="text-sm text-green-600">
                                {key}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Project details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Project Timeline</h3>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-3" />
                    <span>{caseStudy.timeline || 'Timeline information not available'}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Team Size</h3>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-3" />
                    <span>
                      {caseStudy.teamSize
                        ? String(caseStudy.teamSize).split('(')[0].trim()
                        : 'Team size information not available'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              {Array.isArray(caseStudy.technologies) && caseStudy.technologies.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-lg font-semibold mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            // Not found state
            <div className="text-center py-16">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Case Study Not Found
              </h1>
              <p className="text-gray-600 mb-8">
                We couldn't find the case study you're looking for.
                Redirecting you to the case studies page in 5 seconds...
              </p>
              <Button onClick={() => navigate('/case-studies')}>
                Go to Case Studies
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseDetailPage;