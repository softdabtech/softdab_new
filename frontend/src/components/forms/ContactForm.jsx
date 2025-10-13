import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { FormField } from '../ui/form-animations';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';

const FormSection = ({ children, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {children}
  </div>
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

const ContactForm = ({
  formData,
  errors,
  isSubmitting,
  isBlocked,
  handleInputChange,
  handleSubmit,
  services,
  timelines,
  budgets
}) => {
  const getHoneypotStyle = () => ({
    position: 'absolute',
    left: '-9999px',
    visibility: 'hidden'
  });

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Базовая информация */}
      <div className="grid gap-6 md:grid-cols-2">
        <FormSection>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={errors.name ? 'border-red-500' : ''}
            disabled={isSubmitting || isBlocked}
            aria-describedby={errors.name ? "name-error" : undefined}
            required
          />
          <ErrorMessage message={errors.name} />
        </FormSection>

        <FormSection>
          <Label htmlFor="email">Work Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={errors.email ? 'border-red-500' : ''}
            disabled={isSubmitting || isBlocked}
            aria-describedby={errors.email ? "email-error" : undefined}
            required
          />
          <ErrorMessage message={errors.email} />
        </FormSection>
      </div>

      {/* Информация о компании */}
      <div className="grid gap-6 md:grid-cols-2">
        <FormSection>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            className={errors.company ? 'border-red-500' : ''}
            disabled={isSubmitting || isBlocked}
            aria-describedby={errors.company ? "company-error" : undefined}
            required
          />
          <ErrorMessage message={errors.company} />
        </FormSection>

        <FormSection>
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            name="role"
            type="text"
            value={formData.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
            className={errors.role ? 'border-red-500' : ''}
            disabled={isSubmitting || isBlocked}
            aria-describedby={errors.role ? "role-error" : undefined}
            required
          />
          <ErrorMessage message={errors.role} />
        </FormSection>
      </div>

      {/* Параметры проекта */}
      <div className="grid gap-6 md:grid-cols-3">
        <FormSection>
          <Label htmlFor="service">Service</Label>
          <Select
            value={formData.service}
            onValueChange={(value) => handleInputChange('service', value)}
            disabled={isSubmitting || isBlocked}
          >
            <SelectTrigger 
              className={errors.service ? 'border-red-500' : ''}
              aria-describedby={errors.service ? "service-error" : undefined}
            >
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ErrorMessage message={errors.service} />
        </FormSection>

        <FormSection>
          <Label htmlFor="timeline">Timeline</Label>
          <Select
            value={formData.timeline}
            onValueChange={(value) => handleInputChange('timeline', value)}
            disabled={isSubmitting || isBlocked}
          >
            <SelectTrigger 
              className={errors.timeline ? 'border-red-500' : ''}
              aria-describedby={errors.timeline ? "timeline-error" : undefined}
            >
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              {timelines.map((timeline) => (
                <SelectItem key={timeline} value={timeline}>
                  {timeline}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ErrorMessage message={errors.timeline} />
        </FormSection>

        <FormSection>
          <Label htmlFor="budget">Budget</Label>
          <Select
            value={formData.budget}
            onValueChange={(value) => handleInputChange('budget', value)}
            disabled={isSubmitting || isBlocked}
          >
            <SelectTrigger 
              className={errors.budget ? 'border-red-500' : ''}
              aria-describedby={errors.budget ? "budget-error" : undefined}
            >
              <SelectValue placeholder="Select budget" />
            </SelectTrigger>
            <SelectContent>
              {budgets.map((budget) => (
                <SelectItem key={budget} value={budget}>
                  {budget}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ErrorMessage message={errors.budget} />
        </FormSection>
      </div>

      {/* Сообщение */}
      <FormSection>
        <Label htmlFor="message">Project Details</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          className={`min-h-[150px] resize-y ${errors.message ? 'border-red-500' : ''}`}
          disabled={isSubmitting || isBlocked}
          aria-describedby="message-hint message-error"
          required
          rows={6}
        />
        <p id="message-hint" className="text-xs text-gray-500 mt-1">
          Please include scope, target platforms, current status (idea/PoC/MVP/scale), and any constraints.
        </p>
        <ErrorMessage message={errors.message} />
      </FormSection>

      {/* Согласие */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="gdprConsent"
            checked={formData.gdprConsent}
            onCheckedChange={(checked) => handleInputChange('gdprConsent', checked)}
            disabled={isSubmitting || isBlocked}
            aria-describedby="gdpr-error"
          />
          <Label htmlFor="gdprConsent" className="text-sm">
            I agree to the <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
          </Label>
        </div>
        <ErrorMessage message={errors.gdprConsent} />

        <div className="flex items-center space-x-2">
          <Checkbox
            id="marketingConsent"
            checked={formData.marketingConsent}
            onCheckedChange={(checked) => handleInputChange('marketingConsent', checked)}
            disabled={isSubmitting || isBlocked}
          />
          <Label htmlFor="marketingConsent" className="text-sm text-gray-600">
            I would like to receive updates about relevant services and industry insights (optional)
          </Label>
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
        className="w-full group"
        disabled={isSubmitting || isBlocked}
      >
        {isSubmitting ? (
          <span className="inline-flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </span>
        ) : (
          <span className="inline-flex items-center">
            Send Message
            <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
        )}
      </Button>
    </motion.form>
  );
};

export default ContactForm;