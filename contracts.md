# SoftDAB Website - Frontend/Backend Integration Contracts

This document outlines the API contracts, data structure, and integration requirements for the SoftDAB website.

## Current Frontend Implementation

### Mock Data Structure
The frontend currently uses mock data from `/src/data/mockData.js` with the following structure:

#### Company Information
```javascript
company: {
  name: 'SoftDAB',
  email: 'hello@softdab.tech',
  phone: '+380 XX XXX XXXX',
  address: 'Kyiv, Ukraine',
  founded: '2019',
  employees: '50+',
  description: 'Custom software development and dedicated teams for US and EU businesses'
}
```

#### Services Data
```javascript
services: {
  outsourcing: { /* pricing, features, benefits, process steps */ },
  dedicatedTeams: { /* team sizes, pricing, features */ }
}
```

#### Case Studies
```javascript
caseStudies: [
  {
    id: 'fintech-payment-platform',
    industry: 'Fintech',
    title: 'Payment Platform MVP',
    client: 'US Fintech Startup',
    description: '...',
    challenge: '...',
    solution: '...',
    results: { /* measurable outcomes */ },
    timeline: '12 weeks',
    teamSize: '5 developers',
    technologies: ['React', 'Node.js', ...],
    testimonial: { text, author, position }
  }
]
```

## Backend API Requirements

### 1. Contact Form API
**Endpoint:** `POST /api/contact`

**Request Body:**
```javascript
{
  name: string (required),
  email: string (required, valid email),
  company: string (required),
  role: string (optional),
  service: string (required), // 'outsourcing', 'dedicated-teams', etc.
  timeline: string (optional),
  budget: string (optional),
  message: string (required)
}
```

**Response:**
```javascript
{
  success: boolean,
  message: string,
  id?: string // submission ID for tracking
}
```

**Database Model:**
```javascript
ContactSubmission {
  id: ObjectId,
  name: String,
  email: String,
  company: String,
  role: String,
  service: String,
  timeline: String,
  budget: String,
  message: String,
  createdAt: Date,
  status: String // 'new', 'contacted', 'qualified', 'closed'
}
```

### 2. Newsletter/Pricing PDF API
**Endpoint:** `POST /api/newsletter`

**Request Body:**
```javascript
{
  email: string (required),
  type: string // 'pricing-pdf', 'newsletter', 'compliance-guide'
}
```

### 3. Case Studies API
**Endpoint:** `GET /api/case-studies`
**Query Parameters:** `?industry=fintech&limit=10&offset=0`

**Endpoint:** `GET /api/case-studies/:slug`

**Response:** Return case study data matching the mock structure

### 4. Blog API (Future)
**Endpoint:** `GET /api/blog/posts`
**Endpoint:** `GET /api/blog/posts/:slug`

## Frontend Integration Points

### 1. Contact Form Integration
**File:** `/src/pages/company/ContactPage.jsx`
**Current:** Mock submission with setTimeout
**Replace:** 
```javascript
const response = await fetch(`${BACKEND_URL}/api/contact`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
const result = await response.json();
```

### 2. Case Studies Dynamic Loading
**File:** `/src/pages/CaseStudiesPage.jsx`
**Current:** Static mockData.caseStudies
**Replace:** API call to load case studies with filtering

### 3. SEO Meta Data
**Current:** Static meta tags
**Future:** Dynamic meta tags from API for case studies and blog posts

## Email Integration

### Form Notifications
- Send email notification to `hello@softdab.tech` when contact form is submitted
- Send auto-reply to user confirming form submission

### Email Templates
1. **Contact Form Notification (Internal)**
   - Subject: "New Contact Form Submission - [Company Name]"
   - Include all form data and internal tracking link

2. **Contact Form Confirmation (User)**
   - Subject: "Thank you for contacting SoftDAB"
   - Confirmation message with next steps and team contact info

3. **Pricing PDF Download**
   - Subject: "SoftDAB Pricing Guide"
   - PDF attachment with pricing information

## Analytics Integration

### PostHog Events
Track the following events:
- `contact_form_submitted` - When contact form is submitted
- `pricing_pdf_downloaded` - When pricing PDF is requested
- `case_study_viewed` - When case study detail page is viewed
- `service_page_viewed` - When service page is visited

### GA4 Events (if implemented)
- Form conversions
- Page views
- User engagement metrics

## File Upload Requirements

### Future Features
- Client logo uploads for testimonials
- Case study images
- Team member photos
- Blog post featured images

## Security Requirements

### Input Validation
- Validate all form inputs server-side
- Sanitize HTML content
- Rate limiting on form submissions (max 5 per IP per hour)

### Email Security
- Validate email addresses
- Implement double opt-in for newsletter
- GDPR compliance for data collection

### CORS Configuration
```javascript
{
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200
}
```

## Database Schema

### Collections Required
1. **contacts** - Contact form submissions
2. **newsletter_subscribers** - Email subscriptions
3. **case_studies** - Case study content (for CMS)
4. **blog_posts** - Blog content (future)
5. **analytics_events** - Custom event tracking

## Environment Variables

### Backend
```
FRONTEND_URL=http://localhost:3000
MONGO_URL=mongodb://localhost:27017/softdab
EMAIL_SERVICE_API_KEY=
POSTHOG_API_KEY=
GA4_MEASUREMENT_ID=
```

### Frontend
```
REACT_APP_BACKEND_URL=http://localhost:8001
REACT_APP_POSTHOG_KEY=
REACT_APP_GA4_ID=
```

## Performance Considerations

### Caching Strategy
- Cache case studies data for 1 hour
- Cache static content (services, company info) for 24 hours
- Implement CDN for images and static assets

### Image Optimization
- Serve WebP format with JPEG fallback
- Implement lazy loading for below-fold images
- Compress images to < 100KB

## Testing Requirements

### Backend Testing
- Unit tests for all API endpoints
- Integration tests for email sending
- Load testing for contact form under high traffic

### Frontend Testing
- Form validation testing
- API integration testing
- Cross-browser compatibility testing

## Deployment Checklist

### Frontend
- [ ] Environment variables configured
- [ ] API endpoints updated to production URLs
- [ ] SEO meta tags verified
- [ ] Performance optimizations applied
- [ ] Error boundary implemented

### Backend
- [ ] Database migrations run
- [ ] Email service configured
- [ ] Rate limiting implemented
- [ ] Error logging configured
- [ ] Health check endpoint added

## Monitoring & Logging

### Backend Monitoring
- API response times
- Form submission success rates
- Email delivery success rates
- Database connection health

### Frontend Monitoring
- Page load times
- JavaScript errors
- Form completion rates
- User session analytics

## Content Management

### Static Content Updates
Current static content should be easily updatable through:
- Environment variables (company info)
- Database records (case studies, testimonials)
- CMS integration (future blog posts)

### SEO Content
- Generate sitemap.xml dynamically
- Update robots.txt for production
- Implement structured data for case studies and services

## Future Enhancements

### Phase 2 Features
1. Blog system with CMS
2. Client portal for project tracking
3. Online project estimation tool
4. Team member profiles and expertise filtering
5. Interactive technology stack selector
6. Webinar/event registration system

### Integration Opportunities
- CRM integration (HubSpot, Salesforce)
- Calendar integration for consultation booking
- Slack notifications for form submissions
- AI chatbot for initial lead qualification

This document serves as the blueprint for seamless frontend-backend integration while maintaining the high-quality user experience already established in the frontend implementation.