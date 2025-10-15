import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import { FormField } from '../ui/form-animations';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { contactFormSchema, submitContactForm } from '../../lib/contact-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Card } from '../ui/card';

const FormSection = ({ children, className = '' }) => (
  <div className={`space-y-2 w-full ${className}`}>
    {children}
  </div>
);

const FormLabel = ({ children, required }) => (
  <Label className="text-sm font-medium text-gray-700">
    {children}
    {required && <span className="text-red-500 ml-1">*</span>}
  </Label>
);

const ErrorMessage = ({ message }) => (
  <AnimatePresence>
    {message && (
      <motion.p
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="text-sm text-red-500"
      >
        {message}
      </motion.p>
    )}
  </AnimatePresence>
);

const ContactForm = ({ services, timelines, budgets }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: yupResolver(contactFormSchema),
    defaultValues: {
      marketingConsent: false,
      page: window.location.pathname,
      referrer: document.referrer,
      userAgent: navigator.userAgent
    }
  });

  const onSubmit = async (data) => {
    const submitPromise = submitContactForm(data)
      .then(() => {
        reset();
        return 'Thank you! We will contact you soon.';
      })
      .catch((error) => {
        throw new Error(error.message || 'Failed to submit form');
      });

    toast.promise(submitPromise, {
      loading: 'Submitting...',
      success: (message) => message,
      error: (err) => err.message
    });
  };

  const getHoneypotStyle = () => ({
    position: 'absolute',
    left: '-9999px',
    visibility: 'hidden'
  });

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 shadow-xl">
      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Базовая информация */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <FormSection>
              <FormLabel required>Name</FormLabel>
              <Input
                {...register('name')}
                type="text"
                className={`h-11 text-base ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 hover:border-primary/50 focus:border-primary'}`}
                disabled={isSubmitting}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              <ErrorMessage message={errors.name} />
            </FormSection>

            <FormSection>
              <FormLabel required>Work Email</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`h-11 text-base ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 hover:border-primary/50 focus:border-primary'}`}
                disabled={isSubmitting || isBlocked}
                aria-describedby={errors.email ? "email-error" : undefined}
                required
              />
              <ErrorMessage message={errors.email} />
            </FormSection>
          </div>
        </div>

        {/* Информация о компании */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <FormSection>
              <FormLabel required>Company</FormLabel>
              <Input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className={`h-11 text-base ${errors.company ? 'border-red-500 focus:border-red-500' : 'border-gray-200 hover:border-primary/50 focus:border-primary'}`}
                disabled={isSubmitting || isBlocked}
                aria-describedby={errors.company ? "company-error" : undefined}
                required
              />
              <ErrorMessage message={errors.company} />
            </FormSection>

            <FormSection>
              <FormLabel required>Role</FormLabel>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className={`h-11 text-base w-full rounded-md border ${errors.role ? 'border-red-500 focus:border-red-500' : 'border-gray-200 hover:border-primary/50 focus:border-primary'}`}
                disabled={isSubmitting || isBlocked}
                aria-describedby={errors.role ? "role-error" : undefined}
                required
              >
                <option value="">Select your role</option>
                <option value="CEO">CEO</option>
                <option value="CTO">CTO</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Lead Developer">Lead Developer</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Business Analyst">Business Analyst</option>
                <option value="Marketing Director">Marketing Director</option>
                <option value="Operations Manager">Operations Manager</option>
                <option value="Founder">Founder</option>
                <option value="Other">Other</option>
              </select>
              <ErrorMessage message={errors.role} />
            </FormSection>
          </div>
        </div>

      {/* Параметры проекта */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Project Details</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <FormSection>
              <FormLabel required>Service</FormLabel>
              <Select
                value={formData.service}
                onValueChange={(value) => handleInputChange('service', value)}
                disabled={isSubmitting || isBlocked}
              >
                <SelectTrigger 
                  className={`h-11 text-base ${errors.service ? 'border-red-500' : 'border-gray-200 hover:border-primary/50'}`}
                  aria-describedby={errors.service ? "service-error" : undefined}
                >
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service} className="text-base">
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ErrorMessage message={errors.service} />
            </FormSection>

            <FormSection>
              <FormLabel required>Timeline</FormLabel>
              <Select
                value={formData.timeline}
                onValueChange={(value) => handleInputChange('timeline', value)}
                disabled={isSubmitting || isBlocked}
              >
                <SelectTrigger 
                  className={`h-11 text-base ${errors.timeline ? 'border-red-500' : 'border-gray-200 hover:border-primary/50'}`}
                  aria-describedby={errors.timeline ? "timeline-error" : undefined}
                >
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  {timelines.map((timeline) => (
                    <SelectItem key={timeline} value={timeline} className="text-base">
                      {timeline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ErrorMessage message={errors.timeline} />
            </FormSection>

            <FormSection>
              <FormLabel required>Budget</FormLabel>
              <Select
                value={formData.budget}
                onValueChange={(value) => handleInputChange('budget', value)}
                disabled={isSubmitting || isBlocked}
              >
                <SelectTrigger 
                  className={`h-11 text-base ${errors.budget ? 'border-red-500' : 'border-gray-200 hover:border-primary/50'}`}
                  aria-describedby={errors.budget ? "budget-error" : undefined}
                >
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  {budgets.map((budget) => (
                    <SelectItem key={budget} value={budget} className="text-base">
                      {budget}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ErrorMessage message={errors.budget} />
            </FormSection>
          </div>
        </div>

        {/* Сообщение */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
          <FormSection>
            <FormLabel required>Project Details</FormLabel>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className={`min-h-[150px] resize-y text-base ${errors.message ? 'border-red-500' : 'border-gray-200 hover:border-primary/50'}`}
              disabled={isSubmitting || isBlocked}
              aria-describedby="message-hint message-error"
              required
              rows={6}
            />
            <p id="message-hint" className="text-sm text-gray-500 mt-2">
              Please include scope, target platforms, current status (idea/PoC/MVP/scale), and any constraints.
            </p>
            <ErrorMessage message={errors.message} />
          </FormSection>
        </div>

        {/* Согласие */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Consent</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="gdprConsent"
                checked={formData.gdprConsent}
                onCheckedChange={(checked) => handleInputChange('gdprConsent', checked)}
                disabled={isSubmitting || isBlocked}
                aria-describedby="gdpr-error"
                className="mt-1"
              />
              <Label htmlFor="gdprConsent" className="text-sm leading-tight">
                I agree to the <a href="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</a> and consent to the processing of my personal data
              </Label>
            </div>
            <ErrorMessage message={errors.gdprConsent} />

            <div className="flex items-start space-x-3">
              <Checkbox
                id="marketingConsent"
                checked={formData.marketingConsent}
                onCheckedChange={(checked) => handleInputChange('marketingConsent', checked)}
                disabled={isSubmitting || isBlocked}
                className="mt-1"
              />
              <Label htmlFor="marketingConsent" className="text-sm leading-tight text-gray-600">
                I would like to receive updates about relevant services, industry insights, and event invitations (optional)
              </Label>
            </div>
          </div>
        </div>

        {/* honeypot */}
        <div style={getHoneypotStyle()}>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            type="text"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full group bg-gradient-to-r from-primary to-primary/90 hover:to-primary text-white h-12 text-base font-medium"
          disabled={isSubmitting || isBlocked}
        >
          {isSubmitting ? (
            <span className="inline-flex items-center">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Sending...
            </span>
          ) : (
            <span className="inline-flex items-center">
              Send Message
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          )}
        </Button>
      </motion.form>
    </Card>
  );
};

export default ContactForm;