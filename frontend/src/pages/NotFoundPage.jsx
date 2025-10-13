// frontend/src/pages/NotFoundPage.jsx (ИСПРАВЛЕННАЯ ВЕРСИЯ)
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '../components/ui/button';

const QUICK_LINKS = [
  { to: '/services/custom-development', text: 'Custom Development' },
  { to: '/services/dedicated-team', text: 'Dedicated Teams' },
  { to: '/case-studies', text: 'Case Studies' },
  { to: '/company/about', text: 'About Us' }
];

const NotFoundPage = () => {
  useEffect(() => {
    // Update page title
    document.title = '404 - Page Not Found | SoftDAB';

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = 'The page you are looking for could not be found. Explore our custom software development and dedicated team services.';

    // Set noindex for 404 pages
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = 'noindex, follow';

    // Cleanup function
    return () => {
      document.title = 'SoftDAB';
      if (metaDescription.parentNode) {
        metaDescription.content = '';
      }
      if (metaRobots.parentNode) {
        metaRobots.content = 'index, follow';
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <section className="max-w-2xl mx-auto text-center" role="alert" aria-labelledby="error-heading">
          {/* Large 404 */}
          <div className="text-9xl md:text-[12rem] font-bold text-primary/20 mb-6" aria-hidden="true">
            404
          </div>
          
          {/* Heading */}
          <h1 id="error-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Page Not Found
          </h1>
          
          {/* Description */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
          
          {/* Action Buttons */}
          <nav className="flex flex-col sm:flex-row gap-4 justify-center mb-12" aria-label="Primary navigation">
            <Button asChild size="lg" className="bg-primary hover:bg-primary-dark">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" aria-hidden="true" />
                <span>Go Home</span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <Link to="/company/contact">
                <Search className="mr-2 h-5 w-5" aria-hidden="true" />
                <span>Contact Support</span>
              </Link>
            </Button>
          </nav>
          
          {/* Quick Links */}
          <nav aria-label="Quick links">
            <p className="text-gray-600 mb-4" id="quick-links-heading">Or try one of these popular pages:</p>
            <ul className="flex flex-wrap justify-center gap-4" aria-labelledby="quick-links-heading">
              {QUICK_LINKS.map(({ to, text }) => (
                <li key={to}>
                  <Link 
                    to={to} 
                    className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </div>
    </div>
  );
};

export default NotFoundPage;