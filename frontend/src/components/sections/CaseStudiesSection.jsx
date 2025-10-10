import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { mockData } from '../../data/mockData';

const normalizeIndustry = (s) => (s || '').toString().trim().toLowerCase();
const industryBadgeClasses = (industry) => {
  const i = normalizeIndustry(industry);
  if (i === 'fintech') return 'text-xs';
  if (i === 'healthcare') return 'text-xs';
  if (i === 'ecommerce') return 'text-xs';
  if (i === 'logistics') return 'text-xs';
  return 'text-xs';
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

// Укажем обложки по slug (или id)
const coverBySlug = {
  'payment-platform':
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1400&q=80',
  'telemedicine-platform':
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1400&q=80',
  'multi-vendor-marketplace':
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=80',
};

const fallbackCovers = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1400&q=80',
];

const CaseStudiesSection = () => {
  const all = Array.isArray(mockData.caseStudies) ? mockData.caseStudies : [];
  const caseStudies = all.slice(0, 3);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Real <span className="gradient-text">results</span> for real businesses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how we've helped companies like yours accelerate development and achieve their goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {caseStudies.map((study, idx) => {
            const slug = study.slug || study.id;
            const path = `/case-studies/${slug}`;

            // Обложка: сначала кастом по slug, затем study.image, затем один из fallbacks
            const cover =
              coverBySlug[slug] ||
              study.image ||
              fallbackCovers[idx % fallbackCovers.length];

            // Метрики
            let metricValue = '';
            let metricCaption = '';
            if (study.results && typeof study.results === 'object') {
              const [_, firstVal] = Object.entries(study.results)[0] || [];
              const combined = firstVal || '';
              metricValue = extractMainMetric(combined);
              metricCaption = extractMetricCaption(combined);

              // Поддержка старого формата { metric, description }
              if (!firstVal && study.results.metric) {
                metricValue = study.results.metric;
                metricCaption = study.results.description || '';
              }
            }

            return (
              <Card
                key={study.id}
                className="group hover:shadow-xl transition-all duration-300 hover-lift border-0 bg-white overflow-hidden"
              >
                {/* Image */}
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={cover}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className={industryBadgeClasses(study.industry)}>
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
                  {/* Key Result — вертикальное выравнивание и единый стиль */}
                  {(metricValue || metricCaption) && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center">
                        <TrendingUp className="h-5 w-5 text-green-600 mr-3 shrink-0" />
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
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{study.timeline || '—'}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{(study.teamSize || '').split('(')[0] || '—'}</span>
                    </div>
                  </div>

                  {/* Technologies */}
                  {Array.isArray(study.technologies) && study.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-6">
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

                  <Button
                    asChild
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                  >
                    <Link to={path}>
                      Read Full Case Study
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="hover-lift">
            <Link to="/case-studies">
              View All Case Studies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;