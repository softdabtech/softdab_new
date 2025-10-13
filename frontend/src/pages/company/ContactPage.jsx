import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Clock, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { FormContainer, FormField, SubmitButton, showToast } from '../../components/ui/form-animations';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Checkbox } from '../../components/ui/checkbox';
import { validateForm } from '../../lib/validation';
import { addCSRFToken } from '../../lib/csrf';
import { useRateLimit } from '../../hooks/use-rate-limit';
import { motion, AnimatePresence } from 'framer-motion';

const initialForm = {
  name: '',
  email: '',
  company: '',
  role: '',
  service: '',
  timeline: '',
  budget: '',
  message: '',
  // GDPR согласие
  gdprConsent: false,
  marketingConsent: false,
  // honeypot
  website: ''
};

const ContactPage = () => {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isBlocked, checkRateLimit, incrementAttempts } = useRateLimit();

  useEffect(() => {
    document.title = 'Contact Us - Start Your Software Development Project | SoftDAB';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content =
        'Contact SoftDAB for software development projects. Get free consultation and custom quote for outsourcing and dedicated teams.';
    }
  }, []);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Проверка rate limit
    const rateLimit = checkRateLimit();
    if (!rateLimit.allowed) {
      showToast('error', rateLimit.message);
      return;
    }

      // Проверка GDPR согласия
    if (!formData.gdprConsent) {
      setErrors({ gdprConsent: 'You must accept our Privacy Policy to continue' });
      showToast('error', 'Please accept our Privacy Policy to continue');
      return;
    }

    // Валидация формы
    const validation = await validateForm(formData);
    if (!validation.success) {
      const errorMessages = validation.errors.reduce((acc, err) => ({
        ...acc,
        [err.path]: err.message
      }), {});
      setErrors(errorMessages);
      showToast('error', 'Please fix the errors in the form');
      return;
    }    setIsSubmitting(true);
    setSubmitStatus('loading');
    showToast('loading', 'Sending your message...');

    try {
      // Подготовка полезной мета‑информации
      const payload = {
        ...validation.data,
        page: window.location.pathname,
        referrer: document.referrer || null,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      };

      // TODO: заменить на реальный endpoint
      // const res = await fetch('/api/contact', {
      //   method: 'POST',
      //   ...addCSRFToken({
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(payload)
      //   })
      // });
      // if (!res.ok) throw new Error('Failed to submit');

      // Симуляция API
      await new Promise(r => setTimeout(r, 1500));

      setSubmitStatus('success');
      showToast('success', "Thank you! Your message has been sent. We'll get back to you within 24 hours.");
      setFormData(initialForm);
      setErrors({});
      incrementAttempts();
    } catch (error) {
      setSubmitStatus('error');
      showToast('error', 'Something went wrong. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Добавляем скрытое поле для honeypot
  const getHoneypotStyle = () => ({
    position: 'absolute',
    left: '-9999px',
    visibility: 'hidden'
  });

  // Контактная информация
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Office',
      content: 'Estonia, Tallinn'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'hello@softdab.tech'
    },
    {
      icon: Clock,
      title: 'Response Time',
      content: 'Within 24 hours'
    }
  ];

  // Варианты для селектов
  const services = [
    'Web Development',
    'Mobile Development',
    'Desktop Development',
    'IoT Solutions',
    'Custom Development',
    'System Integration',
    'Consulting'
  ];

  const timelines = [
    'Within 1 month',
    '1-3 months',
    '3-6 months',
    '6+ months',
    'Not sure yet'
  ];

  const budgets = [
    'Less than €10,000',
    '€10,000 - €25,000',
    '€25,000 - €50,000',
    'Over €50,000',
    'Not sure yet'
  ];

  // Список преимуществ
  const benefits = [
    'Detailed project assessment',
    'Technical consultation',
    'Cost estimation',
    'Timeline planning',
    'Team composition suggestion',
    'Technology stack recommendations'
  ];

  // ...дублирующие объявления удалены...

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-subtle mt-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Let's Build Something <span className="gradient-text">Amazing</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-balance leading-relaxed">
              Ready to start your software development project? Get a free consultation and custom quote tailored to your
              specific needs.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">&lt; 24h</div>
                <div className="text-gray-600">Response time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">Fast start</div>
                <div className="text-gray-600">Quick team ramp‑up</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-gray-600">Free consultation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900">Start Your Project</CardTitle>
                    <CardDescription className="text-gray-600">
                      Tell us about your project and we'll get back to you with a detailed proposal.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} noValidate>
                      {/* honeypot */}
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                      />

                      {/* Basic Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                            placeholder="John Smith"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Work Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company *</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            required
                            placeholder="Your Company Name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Your Role</Label>
                          <Select
                            value={formData.role}
                            onValueChange={(value) => handleInputChange('role', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ceo">CEO/Founder</SelectItem>
                              <SelectItem value="cto">CTO</SelectItem>
                              <SelectItem value="product-manager">Product Manager</SelectItem>
                              <SelectItem value="developer">Developer</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="service">Service Needed *</Label>
                          <Select
                            value={formData.service}
                            onValueChange={(value) => handleInputChange('service', value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="outsourcing">Outsourcing (Full Project)</SelectItem>
                              <SelectItem value="dedicated-teams">Dedicated Teams</SelectItem>
                              <SelectItem value="discovery">Discovery & PoC</SelectItem>
                              <SelectItem value="support">Support & Maintenance</SelectItem>
                              <SelectItem value="consultation">Free Consultation</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="timeline">Timeline</Label>
                          <Select
                            value={formData.timeline}
                            onValueChange={(value) => handleInputChange('timeline', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="When do you want to start?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="asap">ASAP</SelectItem>
                              <SelectItem value="1-month">Within 1 month</SelectItem>
                              <SelectItem value="3-months">Within 3 months</SelectItem>
                              <SelectItem value="6-months">Within 6 months</SelectItem>
                              <SelectItem value="planning">Just planning</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget Range (Optional)</Label>
                        <Select
                          value={formData.budget}
                          onValueChange={(value) => handleInputChange('budget', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10-25k">$10k - $25k</SelectItem>
                            <SelectItem value="25-50k">$25k - $50k</SelectItem>
                            <SelectItem value="50-100k">$50k - $100k</SelectItem>
                            <SelectItem value="100k+">$100k+</SelectItem>
                            <SelectItem value="not-sure">Not sure yet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Project Details *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          required
                          placeholder="Tell us about your project: What do you want to build? What are your main goals? Any specific requirements or challenges?"
                          rows={6}
                        />
                        <p className="text-xs text-gray-500">
                          Please include scope, target platforms, current status (idea/PoC/MVP/scale), and any constraints.
                        </p>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="inline-flex items-center">
                            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Sending...
                          </span>
                        ) : (
                          <span className="inline-flex items-center group">
                            Send Message
                            <Send className="group-hover:translate-x-1 transition-transform" />
                          </span>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Get in Touch</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {contactInfo.map((info, index) => {
                      const IconComponent = info.icon;
                      return (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{info.title}</h4>
                            <p className="text-primary font-medium">{info.details}</p>
                            <p className="text-sm text-gray-600">{info.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">What You Get</CardTitle>
                    <CardDescription>Free consultation includes:</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-primary to-primary-dark text-white">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">Prefer Email?</h3>
                    <p className="text-blue-100 mb-4 text-sm">
                      Send us your requirements directly and we'll respond within 24 hours.
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-white text-white"
                    >
                      <a href="mailto:hello@softdab.tech" className="group">
                        hello@softdab.tech
                        <Mail className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;