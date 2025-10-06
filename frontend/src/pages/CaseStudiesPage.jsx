import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter, Search, TrendingUp, Clock, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { mockData } from '../data/mockData';

const CaseStudiesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [filteredCases, setFilteredCases] = useState(mockData.caseStudies);

  useEffect(() => {
    document.title = 'Case Studies - Software Development Success Stories | SoftDAB';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Explore our software development case studies. Real results from fintech, healthcare, and eCommerce projects with measurable business outcomes.';
    }

    // Breadcrumb Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.softdab.tech"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Case Studies"
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    let filtered = mockData.caseStudies;

    // Filter by industry
    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(caseStudy => 
        caseStudy.industry.toLowerCase() === selectedIndustry.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(caseStudy =>
        caseStudy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseStudy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseStudy.industry.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCases(filtered);
  }, [searchTerm, selectedIndustry]);

  const industries = ['all', 'fintech', 'healthcare', 'ecommerce'];

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

      {/* Hero Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Success Stories
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-balance leading-relaxed">
              Discover how we've helped companies like yours accelerate development, 
              reduce costs, and achieve remarkable business results.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <div className="text-gray-600">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search case studies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Industry Filter */}
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry === 'all' ? 'All Industries' : industry.charAt(0).toUpperCase() + industry.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Results count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredCases.length} of {mockData.caseStudies.length} case studies
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {filteredCases.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No case studies found matching your criteria.</p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedIndustry('all');
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredCases.map((caseStudy) => {
                  // Get the main result metric
                  const mainResult = Object.entries(caseStudy.results)[0];
                  
                  return (
                    <Card key={caseStudy.id} className="group hover:shadow-xl transition-all duration-300 hover-lift border-0 bg-white overflow-hidden">
                      {/* Header */}
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${
                              caseStudy.industry === 'Fintech' ? 'bg-blue-100 text-blue-800' :
                              caseStudy.industry === 'Healthcare' ? 'bg-red-100 text-red-800' :
                              caseStudy.industry === 'eCommerce' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {caseStudy.industry}
                          </Badge>
                          <span className="text-xs text-gray-500">{caseStudy.client}</span>
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                          {caseStudy.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 leading-relaxed text-sm">
                          {caseStudy.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        {/* Key Result Highlight */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                          <div className="flex items-center">
                            <TrendingUp className="h-5 w-5 text-green-600 mr-3" />
                            <div>
                              <div className="text-2xl font-bold text-green-800">
                                {mainResult[1].includes('%') || mainResult[1].includes('x') || mainResult[1].includes('$') 
                                  ? mainResult[1].split(' ')[0] 
                                  : mainResult[1]
                                }
                              </div>
                              <div className="text-sm text-green-700">
                                {mainResult[0].replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Project Details */}
                        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{caseStudy.timeline}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="h-4 w-4 mr-2" />
                            <span>{caseStudy.teamSize.split('(')[0]}</span>
                          </div>
                        </div>
                        
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1 mb-6">
                          {caseStudy.technologies.slice(0, 4).map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {caseStudy.technologies.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{caseStudy.technologies.length - 4}
                            </Badge>
                          )}
                        </div>
                        
                        {/* CTA */}
                        <Button 
                          asChild 
                          className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                          variant="outline"
                        >
                          <Link to={`/case-studies/${caseStudy.id}`}>
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

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to become our next success story?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create a custom development plan that delivers measurable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link to="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                View Our Services
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesPage;