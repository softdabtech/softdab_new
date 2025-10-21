import React from 'react';
import toast from 'react-hot-toast';
import ContactFormLite from '../components/forms/ContactFormLite';

const services = [
  'Web Development',
  'Mobile Development',
  'Cloud Solutions',
  'Data Engineering',
  'DevOps',
  'Consulting'
];

const roles = [
  'CEO/Founder',
  'CTO/Technical Director',
  'Product Manager',
  'Project Manager',
  'Development Team Lead',
  'Business Analyst',
  'Marketing Director',
  'Operations Manager',
  'Startup Founder',
  'Other'
];

const timelines = [
  'ASAP',
  '1-3 months',
  '3-6 months',
  '6+ months',
  'Not sure yet'
];

const budgets = [
  'Under $50K',
  '$50K - $100K',
  '$100K - $250K',
  '$250K+',
  'Not sure yet'
];

const ContactPage = () => {
  const onSubmitSuccess = () => {
    toast.success('Thank you! We will contact you soon.');
  };

  const onSubmitError = (error) => {
    toast.error(error.message || 'Failed to submit form');
  };

  return (
    <div className="relative isolate">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-purple-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Let's Build Something Great Together
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Share your vision with us, and we'll respond within 24 hours with insights on how we can bring your project to life.
            </p>
          </div>

          <ContactFormLite onSuccess={onSubmitSuccess} onError={onSubmitError} />
        </div>
      </div>

      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-purple-600 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>
    </div>
  );
};

export default ContactPage;