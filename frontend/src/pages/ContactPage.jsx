import React, { useState } from 'react';
import { useToast } from '../hooks/use-toast';
import { useRateLimit } from '../hooks/use-rate-limit';
import { z } from 'zod';
import ContactForm from '../components/forms/ContactForm';
import { getZohoToken, sendZohoMail } from '../lib/zoho-mail';

const services = [
  'Web Development',
  'Mobile Development',
  'Cloud Solutions',
  'Data Engineering',
  'DevOps',
  'Consulting'
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

const contactSchema = z.object({
  name: z.string().min(2, 'Name is too short').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name is too short').max(100, 'Company name is too long'),
  role: z.string().min(2, 'Role is too short').max(100, 'Role is too long'),
  service: z.string().min(1, 'Please select a service'),
  timeline: z.string().min(1, 'Please select a timeline'),
  budget: z.string().min(1, 'Please select a budget'),
  message: z.string()
    .min(50, 'Please provide more details (minimum 50 characters)')
    .max(5000, 'Message is too long'),
  gdprConsent: z.boolean().refine(val => val === true, {
    message: 'You must accept the Privacy Policy to continue'
  }),
  marketingConsent: z.boolean(),
  website: z.string() // honeypot
});

const initialFormData = {
  name: '',
  email: '',
  company: '',
  role: '',
  service: '',
  timeline: '',
  budget: '',
  message: '',
  gdprConsent: false,
  marketingConsent: false,
  website: '' // honeypot
};

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isBlocked, incrementCounter } = useRateLimit('contact-form', 5, 3600); // 5 attempts per hour

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is edited
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    try {
      contactSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      const newErrors = {};
      error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Don't submit if rate limited
    if (isBlocked) {
      toast({
        title: "Too many attempts",
        description: "Please try again later",
        variant: "destructive"
      });
      return;
    }

    // Don't submit if honeypot is filled
    if (formData.website) {
      toast({
        title: "Error",
        description: "Form submission failed",
        variant: "destructive"
      });
      return;
    }

    // Validate form
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    incrementCounter();

    try {
      // Send emails using Zoho Mail API
      await sendZohoMail(formData);

      // Reset form on success
      setFormData(initialFormData);
      toast({
        title: "Success",
        description: "Your message has been sent. We'll get back to you soon!",
        variant: "default"
      });
    } catch (error) {
      console.error('Submit error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative isolate">
      {/* Background градиент */}
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

          <ContactForm 
            formData={formData}
            errors={errors}
            isSubmitting={isSubmitting}
            isBlocked={isBlocked}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            services={services}
            timelines={timelines}
            budgets={budgets}
          />
        </div>
      </div>

      {/* Background градиент */}
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