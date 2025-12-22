import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Cpu, Database, FileCode, Globe, Layers } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockData } from '../data/mockData';

// Constants
const PAGE_TITLE = 'Case Studies - Software Development Success Stories | SoftDAB';
const PAGE_DESCRIPTION = 'Explore our software development case studies from a partner with 8 years in IT. Real results from fintech, healthcare, eCommerce and logistics with measurable business outcomes.';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80';

const CaseStudiesPage = () => {
  const [caseStudies, setCaseStudies] = useState([]);

  useEffect(() => {
    setCaseStudies(mockData.caseStudies || []);
  }, []);

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

      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseStudies.map((study) => (
                <Card key={study.id} className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 h-[540px] flex flex-col">
                  {/* Top Banner with industry-specific gradients */}
                  <div className={`absolute top-0 left-0 right-0 py-2 px-4 flex justify-between items-center text-xs text-gray-600
                    ${study.industry === "Developer Tools" && "bg-gradient-to-r from-blue-50 to-blue-100/50"}
                    ${study.industry === "Fintech" && "bg-gradient-to-r from-emerald-50 to-emerald-100/50"}
                    ${study.industry === "Automotive" && "bg-gradient-to-r from-slate-50 to-slate-100/50"}
                    ${study.industry === "Gaming" && "bg-gradient-to-r from-purple-50 to-purple-100/50"}
                    ${study.industry === "eCommerce" && "bg-gradient-to-r from-orange-50 to-orange-100/50"}
                    ${study.industry === "Logistics" && "bg-gradient-to-r from-cyan-50 to-cyan-100/50"}
                  `}>
                    <span className="flex items-center gap-1">
                      <Badge variant="secondary" className="bg-white/80">
                        {study.industry}
                      </Badge>
                    </span>
                    <span className="flex items-center gap-1">
                      {study.timeline}
                    </span>
                  </div>

                  {/* Main Content */}
                  <div className="pt-12 p-6 flex-1 flex flex-col">
                    {/* Project Icon */}
                    <div className="mb-6 flex justify-center">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm
                        ${study.industry === "Developer Tools" && "bg-gradient-to-br from-blue-100 to-blue-50"}
                        ${study.industry === "Fintech" && "bg-gradient-to-br from-emerald-100 to-emerald-50"}
                        ${study.industry === "Automotive" && "bg-gradient-to-br from-slate-100 to-slate-50"}
                        ${study.industry === "Gaming" && "bg-gradient-to-br from-purple-100 to-purple-50"}
                        ${study.industry === "eCommerce" && "bg-gradient-to-br from-orange-100 to-orange-50"}
                        ${study.industry === "Logistics" && "bg-gradient-to-br from-cyan-100 to-cyan-50"}
                      `}>
                        {study.id === "skycodec" && <FileCode className="w-8 h-8 text-blue-600" />}
                        {study.id === "dab" && <Database className="w-8 h-8 text-emerald-600" />}
                        {study.id === "carlight" && <Cpu className="w-8 h-8 text-slate-600" />}
                        {study.id === "softpokerpro" && <Code className="w-8 h-8 text-purple-600" />}
                        {study.id === "rosco" && <Globe className="w-8 h-8 text-orange-600" />}
                        {study.id === "gstcloud" && <Layers className="w-8 h-8 text-cyan-600" />}
                      </div>
                    </div>

                    {/* Title and Description */}
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900">{study.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{study.description}</p>
                    </div>

                    {/* Key Metric */}
                    <div className={`p-3 rounded-lg mb-4
                      ${study.industry === "Developer Tools" && "bg-blue-50"}
                      ${study.industry === "Fintech" && "bg-emerald-50"}
                      ${study.industry === "Automotive" && "bg-slate-50"}
                      ${study.industry === "Gaming" && "bg-purple-50"}
                      ${study.industry === "eCommerce" && "bg-orange-50"}
                      ${study.industry === "Logistics" && "bg-cyan-50"}
                    `}>
                      <div className="text-xs text-gray-700 font-medium mb-1">Key Achievement</div>
                      <div className="text-sm font-medium text-gray-900">{study.keyMetric}</div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 mt-auto mb-6">
                      {study.technologies && study.technologies.slice(0, 3).map((tech, i) => (
                        <Badge key={i} variant="outline" className="bg-white border-gray-200">
                          {tech}
                        </Badge>
                      ))}
                      {study.technologies && study.technologies.length > 3 && (
                        <Badge variant="outline" className="bg-white border-gray-200">
                          +{study.technologies.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Call to Action */}
                    <div className="pt-4 border-t border-gray-100">
                      <Button 
                        asChild 
                        variant="ghost"
                        className="w-full group"
                      >
                        <Link 
                          to={"/case-studies/" + (study.slug || study.id)} 
                          aria-label={"Read more about " + study.title}
                          className="flex items-center justify-between"
                        >
                          <span>View Case Study</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesPage;
