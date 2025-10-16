import * as yup from 'yup';

export const contactFormSchema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Must be a valid email'),
  company: yup.string().required('Company name is required'),
  role: yup.string().required('Role is required'),
  service: yup.string().required('Please select a service'),
  timeline: yup.string().required('Please select a timeline'),
  budget: yup.string().required('Please select a budget range'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
  marketingConsent: yup.boolean(),
  page: yup.string(),
  referrer: yup.string(),
  userAgent: yup.string()
});

export const submitContactForm = async (data) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      ...data,
      page: window.location.pathname,
      referrer: document.referrer,
      userAgent: navigator.userAgent
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to submit form');
  }

  return response.json();
};