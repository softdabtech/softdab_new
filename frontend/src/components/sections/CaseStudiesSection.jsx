
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

const CASE_STUDIES = [
  {
    title: 'IoT Platform for Smart Buildings',
    description: 'Scalable platform for real-time monitoring and control of building systems.',
    link: '/case-studies/iot-platform',
    image: '/icons/iot.svg',
    tags: ['IoT', 'Cloud', 'React', 'Python']
  },
  {
    title: 'Automated Legal Document Processing',
    description: 'AI-powered solution for extracting and analyzing legal documents.',
    link: '/case-studies/legal-ai',
    image: '/icons/python.svg',
    tags: ['AI', 'NLP', 'Python', 'FastAPI']
  },
  {
    title: 'Developer Portal for API Ecosystem',
    description: 'Unified portal for API management, onboarding, and analytics.',
    link: '/case-studies/api-portal',
    image: '/icons/nodejs.svg',
    tags: ['Node.js', 'React', 'API', 'DevOps']
  }
];

/**
 * CaseStudiesSection — showcases selected case studies
 */
/**
 * CaseStudiesSection — showcases selected case studies
 */
const CaseStudiesSection = () => {
  const caseStudies = useMemo(() => CASE_STUDIES, []);
  return (
    <section className="section-padding bg-white text-gray-900" aria-label="Case studies">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Case Studies</h2>
          <p className="text-lg text-gray-600 mb-8 text-balance max-w-2xl mx-auto">
            Explore how we solve complex business challenges with modern technology.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {caseStudies.map((study, idx) => (
            <Card key={idx} className="p-6 flex flex-col items-center text-center hover-lift transition-shadow">
              <img src={study.image} alt="" className="w-16 h-16 mb-4" aria-hidden="true" />
              <h3 className="text-lg font-bold mb-2">{study.title}</h3>
              <p className="text-gray-700 mb-4 text-sm">{study.description}</p>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {study.tags.map((tag, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">{tag}</span>
                ))}
              </div>
              <Button 
                asChild 
                size="sm" 
                className="mt-auto group"
              >
                <Link to={study.link} aria-label={`Read more about ${study.title}`}>
                  Read More
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </Button>
            </Card>
          ))}
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
