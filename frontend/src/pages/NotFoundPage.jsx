import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '../components/ui/button';

const NotFoundPage = () => {
  useEffect(() => {
    // Set page title
    document.title = '404 - Page Not Found | SoftDAB';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'The page you are looking for could not be found. Explore our custom software development and dedicated team services.';
    }

    // Set noindex for 404 pages (SEO best practice)
    const metaRobots = document.querySelector('meta[name="robots"]') || document.createElement('meta');
    metaRobots.setAttribute('name', 'robots');
    metaRobots.setAttribute('content', 'noindex, follow');
    if (!document.head.contains(metaRobots)) {
      document.head.appendChild(metaRobots);
    }

    return () => {
      // Clean up robots meta on unmount
      if (document.head.contains(metaRobots)) {
        document.head.removeChild(metaRobots);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Large 404 */}
          <div className="text-9xl md:text-[12rem] font-bold text-primary/20 mb-6">
            404
          </div>
          
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Page Not Found
          </h1>
          
          {/* Description */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="bg-primary hover:bg-primary-dark">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Go Home
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">
                <Search className="mr-2 h-5 w-5" />
                Contact Support
              </Link>
            </Button>
          </div>
          
          {/* Quick Links */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">Or try one of these popular pages:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/services/outsourcing" className="text-primary hover:underline">
                Outsourcing Services
              </Link>
              <Link to="/services/dedicated-teams" className="text-primary hover:underline">
                Dedicated Teams
              </Link>
              <Link to="/case-studies" className="text-primary hover:underline">
                Case Studies
              </Link>
              <Link to="/about" className="text-primary hover:underline">
                About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;