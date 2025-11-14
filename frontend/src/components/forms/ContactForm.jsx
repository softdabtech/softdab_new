import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Card } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const formSchema = yup.object().shape({
  name: yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: yup.string()
    .required('Email is required')
    .email('Please enter a valid email'),
  company: yup.string()
    .required('Company name is required')
    .min(2, 'Company name must be at least 2 characters'),
  role: yup.string()
    .required('Role is required')
    .min(2, 'Role must be at least 2 characters'),
  service: yup.string()
    .required('Please select a service'),
  timeline: yup.string()
    .required('Please select a timeline'),
  budget: yup.string()
    .required('Please select a budget range'),
  message: yup.string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  marketingConsent: yup.boolean(),
  gdprConsent: yup.boolean()
    .required('You must accept the Privacy Policy')
    .oneOf([true], 'You must accept the Privacy Policy')
});

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

const ContactForm = ({ services, roles, timelines, budgets, onSuccess, onError, isBlocked }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      role: '',
      service: '',
      timeline: '',
      budget: '',
      message: '',
      marketingConsent: false,
      gdprConsent: false
    }
  });

  const onSubmit = async (data) => {
    if (isBlocked) {
      onError(new Error('Too many attempts. Please try again later.'));
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      reset();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };

  const handleSelectChange = (field) => (value) => {
    setValue(field, value, { shouldValidate: true });
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 shadow-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <FormSection>
              <FormLabel required>Name</FormLabel>
              <Input
                {...register('name')}
                className={errors.name ? 'border-red-500' : ''}
                disabled={isSubmitting || isBlocked}
              />
              <ErrorMessage message={errors.name?.message} />
            </FormSection>

            <FormSection>
              <FormLabel required>Work Email</FormLabel>
              <Input
                {...register('email')}
                type="email"
                className={errors.email ? 'border-red-500' : ''}
                disabled={isSubmitting || isBlocked}
              />
              <ErrorMessage message={errors.email?.message} />
            </FormSection>

            <FormSection>
              <FormLabel required>Company</FormLabel>
              <Input
                {...register('company')}
                className={errors.company ? 'border-red-500' : ''}
                disabled={isSubmitting || isBlocked}
              />
              <ErrorMessage message={errors.company?.message} />
            </FormSection>

            <FormSection>
              <FormLabel required>Role</FormLabel>
              <Select
                onValueChange={handleSelectChange('role')}
                disabled={isSubmitting || isBlocked}
              >
                <SelectTrigger className={errors.role ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ErrorMessage message={errors.role?.message} />
            </FormSection>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Project Details</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <FormSection>
              <FormLabel required>Service</FormLabel>
              <Select
                onValueChange={handleSelectChange('service')}
                disabled={isSubmitting || isBlocked}
              >
                <SelectTrigger className={errors.service ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ErrorMessage message={errors.service?.message} />
            </FormSection>

            <FormSection>
              <FormLabel required>Timeline</FormLabel>
              <Select
                onValueChange={handleSelectChange('timeline')}
                disabled={isSubmitting || isBlocked}
              >
                <SelectTrigger className={errors.timeline ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select a timeline" />
                </SelectTrigger>
                <SelectContent>
                  {timelines.map((timeline) => (
                    <SelectItem key={timeline} value={timeline}>
                      {timeline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ErrorMessage message={errors.timeline?.message} />
            </FormSection>

            <FormSection>
              <FormLabel required>Budget</FormLabel>
              <Select
                onValueChange={handleSelectChange('budget')}
                disabled={isSubmitting || isBlocked}
              >
                <SelectTrigger className={errors.budget ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select a budget range" />
                </SelectTrigger>
                <SelectContent>
                  {budgets.map((budget) => (
                    <SelectItem key={budget} value={budget}>
                      {budget}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ErrorMessage message={errors.budget?.message} />
            </FormSection>
          </div>

          <FormSection>
            <FormLabel required>Project Description</FormLabel>
            <Textarea
              {...register('message')}
              className={errors.message ? 'border-red-500' : ''}
              disabled={isSubmitting || isBlocked}
              rows={5}
              placeholder="Tell us about your project, goals, and requirements..."
            />
            <ErrorMessage message={errors.message?.message} />
          </FormSection>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="gdprConsent"
              checked={!!watch('gdprConsent')}
              onCheckedChange={(checked) => setValue('gdprConsent', checked)}
              disabled={isSubmitting || isBlocked}
              className={errors.gdprConsent ? 'border-red-500' : ''}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="gdprConsent"
                className="text-sm text-gray-600 cursor-pointer"
              >
                I accept the{' '}
                <a
                  href="/legal/privacy"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
                <span className="text-red-500 ml-1">*</span>
              </label>
              {errors.gdprConsent && (
                <p className="text-sm text-red-500">{errors.gdprConsent.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="marketingConsent"
              checked={!!watch('marketingConsent')}
              onCheckedChange={(checked) => setValue('marketingConsent', checked)}
              disabled={isSubmitting || isBlocked}
            />
            <label
              htmlFor="marketingConsent"
              className="text-sm text-gray-600 cursor-pointer"
            >
              I would like to receive updates about products, services and company news
            </label>
          </div>
        </div>

        <Button
          type="submit"
          className="w-auto px-6"
          disabled={isSubmitting || isBlocked}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default ContactForm;