import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, TrendingUp, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockData } from '../data/mockData';

// Constants
const INDUSTRY_BADGE_CLASS = 'text-xs';
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
  const caseStudies = Array.isArray(mockData.caseStudies) ? mockData.caseStudies : [];
  const pageTitle = "Case Studies | SoftDAB";
  const pageDescription = "Explore our portfolio of successful software development projects across various industries.";

  return (
    <section className="section-padding bg-gray-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Case <span className="gradient-text">Studies</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real projects, measurable outcomes, and the tech behind them.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {caseStudies.map((study) => {
            const slug = study.slug || study.id;
            const path = `/case-studies/${slug}`;

            // Extract main metric and caption, covering both formats
            const { value: metricValue, caption: metricCaption } = getMetric(study.results);

            // Use image with fallback
            const image = study.image || DEFAULT_IMAGE_FALLBACK;

            // Team size extraction - cleaner fallback logic
            const teamSizeDisplay = study.teamSize
              ? String(study.teamSize).split('(')[0].trim()
              : '—';

            return (
              <Link
                key={slug}
                to={path}
                className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
                aria-label={`Read case study about ${study.title}`}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 hover-lift border-0 bg-white overflow-hidden h-full">
                  {/* Image */}
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={image}
                      alt={study.title ? `Case study for ${study.title}` : "Case study image"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = DEFAULT_IMAGE_FALLBACK;
                      }}
                    />
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className={INDUSTRY_BADGE_CLASS}>
                        {study.industry || 'General'}
                      </Badge>
                      <span className="text-xs text-gray-500">{study.client || 'Client NDA'}</span>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                      {study.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {study.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Metric block — aligned as on main */}
                    {(metricValue || metricCaption) && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6" aria-label="Key achievement">
                        <div className="flex items-center">
                          <TrendingUp className="h-5 w-5 text-green-600 mr-3 shrink-0" aria-hidden="true" />
                          <div className="flex items-baseline gap-2">
                            <div className="text-3xl font-extrabold leading-none text-green-700">
                              {metricValue}
                            </div>
                            {metricCaption && (
                              <div className="text-sm text-green-700 leading-snug">
                                {metricCaption}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Project Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div className="flex items-center text-gray-600" aria-label="Project timeline">
                        <Clock className="h-4 w-4 mr-2" aria-hidden="true" />
                        <span>{study.timeline || '—'}</span>
                      </div>
                      <div className="flex items-center text-gray-600" aria-label="Team size">
                        <Users className="h-4 w-4 mr-2" aria-hidden="true" />
                        <span>{teamSizeDisplay}</span>
                      </div>
                    </div>

                    {/* Technologies */}
                    {Array.isArray(study.technologies) && study.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-6" aria-label="Technologies used">
                        {study.technologies.slice(0, 4).map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {study.technologies.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{study.technologies.length - 4}
                          </Badge>
                        )}
                      </div>
                    )}

                    <div className="text-primary font-medium group-hover:underline flex items-center">
                      Read Full Case Study
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaseDetailPage;