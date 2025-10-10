import { z } from 'zod';
import DOMPurify from 'dompurify';

// Очистка входящих данных от HTML/JS
const sanitizeInput = (value) => {
  if (typeof value === 'string') {
    return DOMPurify.sanitize(value.trim());
  }
  return value;
};

// Расширенная валидация email
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const businessEmailRegex = /^[a-zA-Z0-9._%+-]+@(?!gmail\.com|yahoo\.com|hotmail\.com|outlook\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Схема валидации формы
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .transform(sanitizeInput),
    
  email: z.string()
    .email('Invalid email format')
    .regex(emailRegex, 'Invalid email format')
    .regex(businessEmailRegex, 'Please use your business email')
    .transform(sanitizeInput),
    
  company: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters')
    .transform(sanitizeInput),
    
  role: z.string()
    .min(2, 'Role must be at least 2 characters')
    .max(100, 'Role must be less than 100 characters')
    .transform(sanitizeInput),
    
  service: z.string()
    .min(1, 'Please select a service')
    .transform(sanitizeInput),
    
  timeline: z.string()
    .min(1, 'Please select a timeline')
    .transform(sanitizeInput),
    
  budget: z.string()
    .min(1, 'Please select a budget')
    .transform(sanitizeInput),
    
  message: z.string()
    .min(20, 'Message must be at least 20 characters')
    .max(5000, 'Message must be less than 5000 characters')
    .transform(sanitizeInput),
    
  // honeypot поле
  website: z.string()
    .max(0, 'Should be empty'),
});

// Валидация формы
export const validateForm = async (data) => {
  try {
    const validatedData = await contactFormSchema.parseAsync(data);
    return { success: true, data: validatedData };
  } catch (error) {
    return { 
      success: false, 
      errors: error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message
      }))
    };
  }
};