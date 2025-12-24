import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { mockData } from '../../data/mockData';
import SEOHead from '../../components/seo/SEOHead';

const CaseStudyDetailPage = () => {
  const { slug } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);

  useEffect(() => {
    const study = mockData.caseStudies.find(s => s.slug === slug);
    if (study) {
      setCaseStudy(study);
    }
  }, [slug]);

  if (!caseStudy) {
    return <div>Loading...</div>;
  }

  const {
    title,
    industry,
    timeline,
    teamSize,
    client,
    technologies,
    keyMetric,
    description,
    image,
    workPerformed
  } = caseStudy;

  const keywords = [...(technologies||[]), industry, 'case study', 'custom software development'].filter(Boolean).join(', ');


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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": "https://www.softdab.tech/case-studies/" + slug
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <SEOHead title={title + ' — SoftDAB'} description={description} keywords={keywords} url={`https://www.softdab.tech/case-studies/${slug}`} breadcrumbs={[{name:'Home', item:'https://www.softdab.tech/'},{name:'Case Studies', item:'https://www.softdab.tech/case-studies'},{name:title, item:`https://www.softdab.tech/case-studies/${slug}`}]} />
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 mt-20">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/case-studies" className="hover:text-primary">Case Studies</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{title}</span>
          </nav>
        </div>
      </div>

      {/* Back button */}
      <div className="container mx-auto px-6 mt-8">
        <Button 
          variant="ghost" 
          asChild 
          className="group mb-8"
        >
          <Link to="/case-studies">
            <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Case Studies
          </Link>
        </Button>
      </div>

      {/* Hero section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="border-gray-200 text-gray-700">{industry}</Badge>
              {client !== "Confidential" && (
                <Badge variant="outline" className="border-gray-200 text-gray-700">{client}</Badge>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{title}</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">{description}</p>

            {/* Project stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 bg-gray-50 p-8 rounded-lg">
              <div>
                <div className="text-sm text-gray-600 mb-1">Timeline</div>
                <div className="font-semibold">{timeline}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Team Size</div>
                <div className="font-semibold">{teamSize}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Key Metric</div>
                <div className="font-semibold">{keyMetric}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Industry</div>
                <div className="font-semibold">{industry}</div>
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Work Performed */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-4">Work Performed</h2>
              <ul className="space-y-4 list-disc pl-6">
                {workPerformed.map((work, index) => (
                  <li key={index} className="text-gray-700">{work}</li>
                ))}
              </ul>
            </div>

            {/* Call to Action */}
            <div className="bg-primary/5 p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Build Your Success Story?</h2>
              <p className="text-gray-600 mb-6">
                Let's discuss how we can help you achieve similar results for your business.
              </p>
              <Button asChild size="lg">
                <Link to="/contact">Start Your Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyDetailPage;