import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Home } from 'lucide-react';
import { Button } from '../components/ui/button';

const UnsubscribePage = () => {
  useEffect(() => {
    document.title = 'Unsubscribed | SoftDAB';
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = 'You have successfully unsubscribed from marketing emails. SoftDAB values your privacy.';
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = 'noindex, follow';
    return () => {
      document.title = 'SoftDAB';
      if (metaDescription.parentNode) metaDescription.content = '';
      if (metaRobots.parentNode) metaRobots.content = 'index, follow';
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <section className="max-w-xl mx-auto text-center" role="alert" aria-labelledby="unsub-heading">
          <CheckCircle className="mx-auto text-green-500 mb-6" size={72} aria-hidden="true" />
          <h1 id="unsub-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            You are unsubscribed
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            You have successfully unsubscribed from marketing emails.<br />
            We value your privacy and preferences.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary-dark">
            <Link to="/">
              <Home className="mr-2 h-5 w-5" aria-hidden="true" />
              <span>Go Home</span>
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
};

export default UnsubscribePage;
