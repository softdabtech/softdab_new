import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter, Search, TrendingUp, Clock, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { mockData } from '../data/mockData';

const industryOptions = [
  { value: 'all', label: 'All Industries' },
  { value: 'fintech', label: 'Fintech' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'ecommerce', label: 'eCommerce' },
  { value: 'logistics', label: 'Logistics' },
];

// Нормализация значения industry из данных (Fintech/Healthcare/eCommerce/Logistics → fintech/…)
const normalizeIndustry = (s) => (s || '').toString().trim().toLowerCase();

const CaseStudiesPage = () => {
  const allCases = Array.isArray(mockData.caseStudies) ? mockData.caseStudies : [];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [filteredCases, setFilteredCases] = useState(allCases);

  useEffect(() => {
    document.title = 'Case Studies - Software Development Success Stories | SoftDAB';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content =
        'Explore our software development case studies from a partner with 8 years in IT. Real results from fintech, healthcare, eCommerce and logistics with measurable business outcomes.';
    }

    // Breadcrumb Schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.softdab.tech' },
        { '@type': 'ListItem', position: 2, name: 'Case Studies', item: 'https://www.softdab.tech/case-studies' },
      ],
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  useEffect(() => {
    let filtered = allCases.slice();

    // Фильтр по индустрии
    if (selectedIndustry !== 'all') {
      filtered = filtered.filter((cs) => normalizeIndustry(cs.industry) === selectedIndustry);
    }

    // Поиск
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (cs) =>
          (cs.title || '').toLowerCase().includes(term) ||
          (cs.description || '').toLowerCase().includes(term) ||
          normalizeIndustry(cs.industry).includes(term) ||
          (cs.client || '').toLowerCase().includes(term)
      );
    }

    setFilteredCases(filtered);
  }, [searchTerm, selectedIndustry, allCases]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedIndustry('all');
  };

  // Извлечение основной метрики из строки
  const extractMainMetric = (val) => {
    if (typeof val !== 'string') return String(val || '');
    const trimmed = val.trim();
    const match = trimmed.match(/^([\$]?\d+(\.\d+)?%?|[\d\.]+x)\b/i);
    if (match) return match[0];
    return trimmed.split(' ')[0] || trimmed;
  };

  // Берём первую пару ключ-значение из results
  const getFirstResultEntry = (resultsObj) => {
    if (!resultsObj || typeof resultsObj !== 'object') return ['Result', ''];
    const entries = Object.entries(resultsObj);
    if (entries.length === 0) return ['Result', ''];
    return entries[0];
  };

  // Цвет бейджа по индустрии
  const industryBadgeClasses = (industry) => {
    const i = normalizeIndustry(industry);
    if (i === 'fintech') return 'bg-blue-100 text-blue-800';
    if (i === 'healthcare') return 'bg-red-100 text-red-800';
    if (i === 'ecommerce') return 'bg-green-100 text-green-800';
    if (i === 'logistics') return 'bg-amber-100 text-amber-800';
    return 'bg-gray-100 text-gray-800';
    };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 mt-20">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Case Studies</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge variant="outline" className="border-gray-200 text-gray-700">8 years in IT</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Success Stories</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover how we’ve helped companies accelerate development, reduce costs, and achieve measurable outcomes.
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

      {/* Filters */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search case studies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>

              {/* Industry */}
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

              {/* Clear */}
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

      {/* Grid */}
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

                  return (
                    <Card
                      key={cs.id}
                      className="group hover:shadow-xl transition-all duration-300 hover-lift border-0 bg-white overflow-hidden"
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className={`text-xs ${industryBadgeClasses(cs.industry)}`}>
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
                        {/* Key Result */}
                        {resultVal ? (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center">
                              <TrendingUp className="h-5 w-5 text-green-600 mr-3" />
                              <div>
                                <div className="text-2xl font-bold text-green-800">{mainMetric}</div>
                                <div className="text-sm text-green-700">{readableKey}</div>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{cs.timeline || '—'}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="h-4 w-4 mr-2" />
                            <span>{(cs.teamSize || '').split('(')[0] || '—'}</span>
                          </div>
                        </div>

                        {/* Technologies */}
                        {Array.isArray(cs.technologies) && cs.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-6">
                            {cs.technologies.slice(0, 4).map((tech, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                            {cs.technologies.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{cs.technologies.length - 4}
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* CTA */}
                        <Button
                          asChild
                          className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                          variant="outline"
                        >
                          <Link to={`/case-studies/${cs.id}`}>
                            Read Case Study
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="section-padding bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to become our next success story?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let’s discuss your project and create a custom development plan that delivers measurable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link to="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link to="/services/outsourcing">View Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesPage;