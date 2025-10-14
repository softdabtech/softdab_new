
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Code, Cpu, Database, FileCode, Globe, Layers } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { mockData } from '../../data/mockData';

const CaseStudiesCarousel = ({ cases }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(3); // default desktop

  // Responsive logic: 1 slide on small screens, 3 on md+
  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSlidesPerView(1);
      } else {
        setSlidesPerView(3);
      }
    };
    updateSlides();
    window.addEventListener('resize', updateSlides);
    return () => window.removeEventListener('resize', updateSlides);
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % cases.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + cases.length) % cases.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // For infinite feel, duplicate needed number of slides (slidesPerView)
  const extendedCases = cases.concat(cases.slice(0, slidesPerView));
  const translatePercent = currentIndex * (100 / slidesPerView);

  return (
    <div className="relative" aria-live="polite">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${translatePercent}%)` }}
        >
          {extendedCases.map((study, idx) => (
            <div
              key={idx}
              className={
                // base full width, md 1/3
                `flex-shrink-0 px-4 pb-2 ${slidesPerView === 1 ? 'w-full' : 'w-1/3 md:w-1/3'} w-full md:w-1/3`
              }
            >
              <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 h-[540px] flex flex-col">
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
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{study.description}</p>
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
                    <div className="text-xs text-gray-500 mb-1">Key Achievement</div>
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
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Previous case study"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Next case study"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

/**
 * CaseStudiesSection — showcases selected case studies
 */
const CaseStudiesSection = () => {
  const [caseStudies, setCaseStudies] = useState([]);

  useEffect(() => {
    const cases = mockData.caseStudies || [];
    setCaseStudies(cases);
  }, []);

  return (
    <section className="section-padding bg-white text-gray-900" aria-label="Case studies">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Success Stories</h2>
          <p className="text-lg text-gray-600 mb-8 text-balance max-w-2xl mx-auto">
            Explore how we solve complex business challenges with modern technology.
          </p>
        </div>

        <div className="mb-12">
          {caseStudies.length > 0 && <CaseStudiesCarousel cases={caseStudies} />}
        </div>

        <div className="flex justify-center">
          <Button 
            asChild 
            size="lg" 
            className="w-full sm:w-auto group"
            aria-label="View all case studies"
          >
            <Link to="/case-studies">
              View all case studies
              <ArrowRight className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
