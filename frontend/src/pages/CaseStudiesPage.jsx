import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Filter, Search, TrendingUp, Clock, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { mockData } from '../data/mockData';

// Constants
const PAGE_TITLE = 'Case Studies - Software Development Success Stories | SoftDAB';
const PAGE_DESCRIPTION = 'Explore our software development case studies from a partner with 8 years in IT. Real results from fintech, healthcare, eCommerce and logistics with measurable business outcomes.';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80';

const industryOptions = [
  { value: 'all', label: 'All Industries' },
  { value: 'real estate', label: 'Real Estate' },
  { value: 'legal tech', label: 'Legal Tech' },
  { value: 'developer tools', label: 'Developer Tools' },
  { value: 'fintech', label: 'Fintech' },
  { value: 'healthcare', label: 'Healthcare' },
];

// Utility functions
const normalizeIndustry = (s) => (s || '').toString().trim().toLowerCase();

const extractMainMetric = (val) => {
  if (typeof val !== 'string') return String(val || '');
  const trimmed = val.trim();
  const match = trimmed.match(/^([\$]?\d+(\.\d+)?%?|[\d\.]+x)\b/i);
  if (match) return match[0];
  return trimmed.split(' ')[0] || trimmed;
};

const getFirstResultEntry = (resultsObj) => {
  if (!resultsObj || typeof resultsObj !== 'object') return ['Result', ''];
  const entries = Object.entries(resultsObj);
  if (entries.length === 0) return ['Result', ''];
  return entries[0];
};

const formatTeamSize = (teamSize) => {
  if (!teamSize) return '—';
  return String(teamSize).split('(')[0].trim();
};

const getIndustryBadgeClasses = (industry) => {
  const i = normalizeIndustry(industry);
  if (i === 'fintech') return 'bg-blue-100 text-blue-800';
  if (i === 'healthcare') return 'bg-red-100 text-red-800';
  if (i === 'real estate') return 'bg-green-100 text-green-800';
  if (i === 'legal tech') return 'bg-purple-100 text-purple-800';
  if (i === 'developer tools') return 'bg-amber-100 text-amber-800';
  return 'bg-gray-100 text-gray-800';
};

const CaseStudiesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [allCases, setAllCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);

  useEffect(() => {
    const cases = mockData.caseStudies || [];
    setAllCases(cases);
    setFilteredCases(cases);
  }, []);

  useEffect(() => {
    let filtered = allCases;

    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(cs => normalizeIndustry(cs.industry) === normalizeIndustry(selectedIndustry));
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(cs =>
        (cs.title || '').toLowerCase().includes(term) ||
        (cs.description || '').toLowerCase().includes(term) ||
        (cs.industry || '').toLowerCase().includes(term)
      );
    }

    setFilteredCases(filtered);
  }, [searchTerm, selectedIndustry, allCases]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedIndustry('all');
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.softdab.tech/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Case Studies",
        "item": "https://www.softdab.tech/case-studies"
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <div className="bg-gray-50 py-4 mt-20">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Case Studies</span>
          </nav>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge variant="outline" className="border-gray-200 text-gray-700">8 years in IT</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Success Stories</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover how we've helped companies accelerate development, reduce costs, and achieve measurable outcomes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">20+</div>
                <div className="text-gray-600">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">93%</div>
                <div className="text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search case studies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>

              <div className="w-full md:w-56">
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger className="w-full h-10">
                    <Filter className="mr-2 h-4 w-4 shrink-0 text-gray-500" />
                    <SelectValue placeholder="Filter by industry" />
                  </SelectTrigger>
                  <SelectContent align="end">
                    {industryOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full md:w-auto">
                <Button variant="outline" className="w-full md:w-auto h-10" onClick={resetFilters}>
                  Clear
                </Button>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredCases.length} of {allCases.length} case studies
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {filteredCases.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No case studies found matching your criteria.</p>
                <Button onClick={resetFilters} variant="outline">Clear Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredCases.map((cs) => {
                  const [resultKey, resultVal] = getFirstResultEntry(cs.results);
                  const mainMetric = extractMainMetric(resultVal || '');
                  const readableKey = (resultKey || 'Result').replace(/([A-Z])/g, ' $1').trim();
                  const slug = cs.slug || cs.id;
                  const path = `/case-studies/${slug}`;

                  return (
                    <Link
                      key={cs.id}
                      to={path}
                      className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
                      aria-label={`Read case study about ${cs.title}`}
                    >
                      <Card className="group hover:shadow-xl transition-all duration-300 hover-lift border-0 bg-white overflow-hidden h-full">
                        <CardHeader className="pb-4">
                          {cs.image && (
                            <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                              <img
                                src={cs.image || DEFAULT_IMAGE}
                                alt={cs.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className={`text-xs ${getIndustryBadgeClasses(cs.industry)}`}>
                              {cs.industry || 'General'}
                            </Badge>
                            <span className="text-xs text-gray-500">{cs.client || 'Client NDA'}</span>
                          </div>
                          <CardTitle className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                            {cs.title}
                          </CardTitle>
                          <CardDescription className="text-gray-600 leading-relaxed text-sm">
                            {cs.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="pt-0">
                          {resultVal ? (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6" aria-label="Key achievement">
                              <div className="flex items-center gap-3">
                                <TrendingUp className="h-5 w-5 text-green-600 shrink-0" aria-hidden="true" />
                                <div className="flex items-baseline gap-3 flex-wrap">
                                  <div className="text-3xl font-extrabold leading-none text-green-700 tabular-nums">
                                    {mainMetric}
                                  </div>
                                  {readableKey && (
                                    <div className="text-sm text-green-700 leading-snug">
                                      {readableKey}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : null}

                          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                            <div className="flex items-center text-gray-600" aria-label="Project timeline">
                              <Clock className="h-4 w-4 mr-2" aria-hidden="true" />
                              <span>{cs.duration || cs.timeline || '—'}</span>
                            </div>
                            <div className="flex items-center text-gray-600" aria-label="Team size">
                              <Users className="h-4 w-4 mr-2" aria-hidden="true" />
                              <span>{formatTeamSize(cs.teamSize)}</span>
                            </div>
                          </div>

                          {Array.isArray(cs.technologies) && cs.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-6" aria-label="Technologies used">
                              {cs.technologies.slice(0, 4).map((tech, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                              {cs.technologies.length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +{cs.technologies.length - 4} more
                                </Badge>
                              )}
                            </div>
                          )}

                          <div className="text-primary font-medium group-hover:underline flex items-center">
                            Read Case Study
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesPage;