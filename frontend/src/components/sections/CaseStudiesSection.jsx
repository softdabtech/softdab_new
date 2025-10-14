
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { mockData } from '../../data/mockData';

const CaseStudiesCarousel = ({ cases }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out" 
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {cases.concat(cases.slice(0, 2)).map((study, idx) => (
            <div key={idx} className="w-1/3 flex-shrink-0 px-4">
              <Card className="p-6 flex flex-col items-center text-center hover-lift transition-shadow">
                <img src={study.image} alt="" className="w-16 h-16 mb-4" aria-hidden="true" />
                <h3 className="text-lg font-bold mb-2">{study.title}</h3>
                <p className="text-gray-700 mb-4 text-sm">{study.description}</p>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {study.technologies.map((tech, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                <Button asChild size="sm" className="mt-auto group">
                  <Link to={`/case-studies/${study.slug}`} aria-label={`Read more about ${study.title}`}>
                    Read More
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </Button>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Previous case study"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
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
