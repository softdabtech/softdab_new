// Mock data for SoftDAB website
// This file contains all mock data used throughout the application
// Will be replaced with real API calls during backend integration

export const mockData = {
  // Case Studies
  caseStudies: [
    {
      id: 'iot-platform',
      title: 'IoT Platform for Smart Buildings',
      description: 'Scalable platform for real-time monitoring and control of building systems.',
      industry: 'Real Estate',
      technologies: ['IoT', 'Cloud', 'React', 'Python'],
      duration: '8 months',
      teamSize: '6 developers',
      results: {
        'Energy Savings': '30%',
        'Maintenance Efficiency': '45%',
        'System Response Time': '< 100ms'
      },
      image: '/case-studies/iot-platform.jpg',
      slug: 'iot-platform'
    },
    {
      id: 'legal-doc-processing',
      title: 'Automated Legal Document Processing',
      description: 'AI-powered solution for extracting and analyzing legal documents.',
      industry: 'Legal Tech',
      technologies: ['AI', 'NLP', 'Python', 'FastAPI'],
      duration: '6 months',
      teamSize: '4 developers',
      results: {
        'Processing Time': '90% reduction',
        'Accuracy Rate': '95%',
        'Cost Savings': '60%'
      },
      image: '/case-studies/legal-doc.jpg',
      slug: 'legal-doc-processing'
    },
    {
      id: 'developer-portal',
      title: 'Developer Portal for API Ecosystem',
      description: 'Unified portal for API management, onboarding, and analytics.',
      industry: 'Developer Tools',
      technologies: ['Node.js', 'React', 'API', 'DevOps'],
      duration: '5 months',
      teamSize: '5 developers',
      results: {
        'API Adoption': '+200%',
        'Support Tickets': '-65%',
        'Developer Satisfaction': '92%'
      },
      image: '/case-studies/dev-portal.jpg',
      slug: 'developer-portal'
    },
    {
      id: 'payment-platform',
      title: 'Multi-Currency Payment Platform',
      description: 'Secure and scalable payment processing system with real-time currency conversion.',
      industry: 'Fintech',
      technologies: ['Node.js', 'React', 'PostgreSQL'],
      duration: '12 months',
      teamSize: '8 developers',
      results: {
        'Transaction Volume': '$500M+',
        'Processing Time': '< 2s',
        'Success Rate': '99.99%'
      },
      image: '/case-studies/payment-platform.jpg',
      slug: 'payment-platform'
    },
    {
      id: 'telemedicine-platform',
      title: 'Telemedicine Platform',
      description: 'HIPAA-compliant platform for remote medical consultations and patient care.',
      industry: 'Healthcare',
      technologies: ['React', 'Node.js', 'WebRTC'],
      duration: '10 months',
      teamSize: '7 developers',
      results: {
        'Patient Satisfaction': '95%',
        'Consultation Time': '-40%',
        'Platform Uptime': '99.9%'
      },
      image: '/case-studies/telemedicine.jpg',
      slug: 'telemedicine-platform'
    }
  ],

  // Company Information
  company: {
    name: 'SoftDAB',
    email: 'hello@softdab.tech',
    phone: '+380 68 379 0819',
    address: 'Kyiv, Ukraine',
    founded: '2017',
    employees: '10+',
    description: 'Custom software development and dedicated teams for US and EU businesses'
  },

  // Statistics
  stats: {
    yearsExperience: '8',
    projectsDelivered: '20+',
    clientSatisfaction: '93%',
    happyClients: '10+'
  },

  // Services
  services: {
    support: {
      title: 'Support & Maintenance',
      subtitle: '24/7 Professional Support',
      description: 'Keep your software running at peak performance with our comprehensive support and maintenance services.',
      benefits: [
        'Proactive system monitoring',
        'Quick issue resolution',
        'Performance optimization',
        'Security updates',
        'Regular maintenance',
        'Continuous improvements'
      ],
      features: [
        '24/7 system monitoring',
        'Bug fixing & troubleshooting',
        'Performance optimization',
        'Security updates',
        'Feature enhancements',
        'Technical documentation',
        'User support',
        'Regular maintenance'
      ],
      plans: [
        {
          name: 'Basic Support',
          price: '$2,000/month',
          description: 'Essential support for small applications',
          features: [
            'Email support',
            'Bug fixes',
            'Security updates',
            'Monthly reports',
            'Basic monitoring'
          ]
        },
        {
          name: 'Business Support',
          price: '$5,000/month',
          description: 'Advanced support for growing businesses',
          features: [
            'Priority email & phone support',
            'Bug fixes & enhancements',
            'Security & performance updates',
            'Weekly reports',
            'Advanced monitoring',
            'Dedicated support manager'
          ]
        },
        {
          name: 'Enterprise Support',
          price: 'Custom pricing',
          description: 'Full coverage for mission-critical systems',
          features: [
            '24/7 phone & email support',
            'Priority bug fixes & features',
            'All updates & optimizations',
            'Real-time reporting',
            'Comprehensive monitoring',
            'Dedicated team',
            'SLA guarantee'
          ]
        }
      ]
    },
    discovery: {
      title: 'Discovery & PoC',
      subtitle: 'Technical Validation Services',
      description: 'Validate your ideas with our comprehensive Discovery & Proof of Concept services. Get clarity and reduce risks before full development.',
      benefits: [
        'Risk mitigation through early validation',
        'Clear technical roadmap and direction',
        'Faster time-to-market',
        'Cost-effective solution validation',
        'Expert technical assessment',
        'Rapid prototyping and testing'
      ],
      features: [
        'Technical feasibility analysis',
        'Rapid prototyping',
        'Architecture design',
        'Risk assessment',
        'Cost estimation',
        'Implementation roadmap'
      ],
      process: [
        'Requirements workshop',
        'Technical research',
        'Prototype development',
        'Testing & validation',
        'Documentation',
        'Roadmap planning'
      ]
    },
    clientSatisfaction: '93%',
    happyClients: '10+'
  },

  // Services
  services: {
    customDevelopment: {
      title: 'Custom Software Development',
      subtitle: 'End-to-end Solutions',
      description: 'Transform your business ideas into powerful software solutions with our end-to-end development services.',
      benefits: [
        'Tailored solutions that perfectly match your business needs',
        'Full project ownership from requirements to deployment',
        'Senior developers with deep technical expertise',
        'Agile development with regular deliveries',
        'Comprehensive testing and quality assurance',
        'Long-term technical partnership'
      ],
      features: [
        'Web and mobile applications',
        'Enterprise software solutions',
        'API development and integration',
        'Cloud-native applications',
        'DevOps and infrastructure',
        'Technical consulting'
      ]
    },
    outsourcing: {
      title: 'Outsourcing',
      subtitle: 'Custom Software Development',
      description: 'End-to-end development of custom software solutions tailored to your business needs.',
      features: [
        'Full project ownership and management',
        'Agile development methodology',
        'Quality assurance and testing',
        'On-time delivery guarantee',
        'Post-launch support and maintenance',
        'Transparent communication and reporting'
      ],
      benefits: [
        'Reduce development costs by up to 60%',
        'Access to senior developers and architects',
        'Faster time-to-market',
        'Focus on your core business activities',
        'Scalable team based on project needs',
        'Risk mitigation through proven processes'
      ],
      process: [
        'Requirements analysis and planning',
        'UI/UX design and prototyping',
        'Development and iterative feedback',
        'Quality assurance and testing',
        'Deployment and launch',
        'Ongoing support and maintenance'
      ],
      pricing: {
        starter: {
          name: 'MVP Development',
          price: '$15,000 - $50,000',
          duration: '8-16 weeks',
          features: [
            'Core functionality',
            '2-3 developers',
            'Basic UI/UX design',
            'Quality assurance',
            'Deployment support'
          ]
        },
        professional: {
          name: 'Full Product',
          price: '$50,000 - $150,000',
          duration: '16-32 weeks',
          features: [
            'Complete feature set',
            '4-6 developers',
            'Advanced UI/UX design',
            'Comprehensive testing',
            'DevOps and monitoring'
          ]
        },
        enterprise: {
          name: 'Enterprise Solution',
          price: 'Custom quote',
          duration: '32+ weeks',
          features: [
            'Complex integrations',
            '6+ developers',
            'Enterprise architecture',
            'Security compliance',
            '24/7 support'
          ]
        }
      }
    },
    dedicatedTeams: {
      title: 'Dedicated Teams',
      subtitle: 'Extended Development Teams',
      description: 'Skilled developers who integrate seamlessly with your existing team and processes.',
      features: [
        'Seamless integration with your team',
        'Direct communication channels',
        'Flexible scaling up or down',
        'Long-term partnership approach',
        'Your project management tools',
        'Transparent time tracking'
      ],
      benefits: [
        'Scale your team without hiring overhead',
        'Access to specialized skills on-demand',
        'Maintain full control over development',
        'Reduce recruitment and onboarding time',
        'Flexible contract terms',
        'Cost-effective compared to in-house hiring'
      ],
      teamSizes: [
        { size: '1-2 developers', bestFor: 'Small projects, MVP development', monthlyRate: '$8,000 - $16,000' },
        { size: '3-5 developers', bestFor: 'Medium projects, feature development', monthlyRate: '$24,000 - $40,000' },
        { size: '6+ developers', bestFor: 'Large projects, full product teams', monthlyRate: '$48,000+' }
      ]
    }
  },

  // Industries
  industries: {
    fintech: {
      title: 'Fintech',
      description: 'Secure financial applications with regulatory compliance and advanced security measures.',
      challenges: [
        'Complex regulatory requirements (PCI DSS, SOX, etc.)',
        'High security and data protection standards',
        'Real-time transaction processing',
        'Integration with multiple payment providers',
        'KYC/AML compliance automation'
      ],
      solutions: [
        'End-to-end encrypted payment processing',
        'Automated compliance reporting',
        'Real-time fraud detection systems',
        'Multi-currency and multi-region support',
        'Advanced analytics and risk management'
      ],
      technologies: ['React', 'Node.js', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Stripe API'],
      compliance: ['PCI DSS', 'SOX', 'GDPR', 'PSD2', 'Open Banking']
    },
    healthcare: {
      title: 'Healthcare',
      description: 'HIPAA-compliant healthcare solutions including telemedicine platforms and patient management systems.',
      challenges: [
        'HIPAA compliance and patient data security',
        'Integration with existing EHR systems',
        'Real-time communication for telemedicine',
        'Complex healthcare workflows',
        'Interoperability between different systems'
      ],
      solutions: [
        'Secure patient data management',
        'Telemedicine platforms with video/chat',
        'EHR/EMR system integrations',
        'Automated appointment scheduling',
        'Clinical decision support systems'
      ],
      technologies: ['Vue.js', 'Python', 'MongoDB', 'WebRTC', 'HL7 FHIR', 'Docker', 'Azure', 'Twilio'],
      compliance: ['HIPAA', 'HITECH', 'FDA', 'HL7', 'DICOM']
    },
    ecommerce: {
      title: 'eCommerce',
      description: 'Scalable online retail platforms with advanced features for B2B and B2C marketplaces.',
      challenges: [
        'High traffic and scalability requirements',
        'Complex inventory management',
        'Multiple payment gateway integrations',
        'Advanced search and filtering',
        'Multi-vendor marketplace functionality'
      ],
      solutions: [
        'High-performance product catalogs',
        'Advanced search and recommendation engines',
        'Multi-vendor marketplace platforms',
        'Integrated payment processing',
        'Comprehensive analytics dashboards'
      ],
      technologies: ['React', 'Next.js', 'Django', 'PostgreSQL', 'Elasticsearch', 'Redis', 'AWS', 'Shopify API'],
      features: ['Multi-vendor support', 'Advanced analytics', 'Mobile optimization', 'SEO-friendly']
    },
    logistics: {
      title: 'Logistics',
      description: 'Custom logistics and supply chain solutions: fleet management, route optimization, WMS, and real-time visibility.',
      challenges: [
        'Complex supply chain visibility across multiple stakeholders',
        'Real-time tracking and inventory management at scale',
        'Route optimization with dynamic constraints and traffic',
        'Integration with legacy warehouse management systems',
        'Compliance with international shipping and customs regulations',
        'Managing fleet maintenance schedules and driver safety'
      ],
      solutions: [
        'Fleet management and telematics systems',
        'AI-powered route optimization',
        'Real-time supply chain visibility',
        'Warehouse management automation',
        'Carrier and customs API integrations'
      ],
      technologies: ['React', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS', 'Google Maps API', 'TensorFlow'],
      compliance: ['DOT Regulations', 'FMCSA Compliance', 'HAZMAT Standards', 'International Shipping', 'Customs Integration']
    }
  },

  // Case Studies
  caseStudies: [
    {
      id: 'fintech-payment-platform',
      slug: 'payment-platform',
      industry: 'Fintech',
      title: 'Payment Platform MVP',
      client: 'US Fintech Startup',
      description: 'Built a secure payment processing platform from scratch, handling $2M+ in transactions within 6 months.',
      challenge: 'The client needed to launch a payment platform quickly to compete with established players while ensuring bank-level security and compliance.',
      solution: 'We developed a scalable payment processing platform with advanced security measures, real-time fraud detection, and seamless API integrations.',
      results: {
        timeToMarket: '60% faster than in-house development',
        transactions: '$2M+ processed in first 6 months',
        uptime: '99.9% platform availability',
        compliance: '100% PCI DSS compliance achieved'
      },
      timeline: '12 weeks',
      teamSize: '5 developers (2 backend, 2 frontend, 1 DevOps)',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Stripe'],
      testimonial: {
        text: 'SoftDAB helped us launch our payment platform 60% faster than we could have done in-house. Their expertise in fintech compliance was invaluable.',
        author: 'Sarah Johnson',
        position: 'CTO, PayTech Solutions'
      }
    },
    {
      id: 'healthcare-telemedicine',
      slug: 'telemedicine-platform',
      industry: 'Healthcare',
      title: 'Telemedicine Platform',
      client: 'EU Healthcare Provider',
      description: 'HIPAA-compliant telemedicine platform serving 10,000+ patients with video consultations and health records.',
      challenge: 'During COVID-19, the client needed to rapidly deploy a telemedicine solution to serve patients remotely while maintaining HIPAA compliance.',
      solution: 'We built a comprehensive telemedicine platform with secure video consultations, patient records management, and prescription handling.',
      results: {
        patientIncrease: '300% increase in patient consultations',
        satisfaction: '95% patient satisfaction score',
        compliance: 'Full HIPAA compliance achieved',
        availability: '24/7 platform availability'
      },
      timeline: '16 weeks',
      teamSize: '7 developers (3 backend, 2 frontend, 1 mobile, 1 DevOps)',
      technologies: ['Vue.js', 'Python', 'MongoDB', 'WebRTC', 'Docker', 'Azure', 'Twilio'],
      testimonial: {
        text: 'The telemedicine platform developed by SoftDAB transformed our practice. We saw a 300% increase in patient consultations and maintained excellent care quality.',
        author: 'Dr. Michael Weber',
        position: 'Medical Director, HealthCare Plus'
      }
    },
    {
      id: 'ecommerce-marketplace',
      slug: 'multi-vendor-marketplace',
      industry: 'eCommerce',
      title: 'Multi-vendor Marketplace',
      client: 'European Retailer',
      description: 'Scalable marketplace platform connecting 500+ vendors with advanced analytics and inventory management.',
      challenge: 'The client wanted to transform from a single-vendor store to a multi-vendor marketplace while maintaining performance and user experience.',
      solution: 'We developed a comprehensive marketplace platform with vendor onboarding, advanced search, inventory management, and analytics.',
      results: {
        vendorGrowth: '500+ active vendors onboarded',
        satisfaction: '45% increase in vendor satisfaction',
        revenue: '250% increase in platform revenue',
        performance: '2x improvement in page load times'
      },
      timeline: '20 weeks',
      teamSize: '8 developers (3 backend, 2 frontend, 1 mobile, 1 DevOps, 1 QA)',
      technologies: ['React', 'Django', 'PostgreSQL', 'Elasticsearch', 'Redis', 'Docker', 'AWS'],
      testimonial: {
        text: 'SoftDAB delivered a marketplace platform that exceeded our expectations. The vendor satisfaction increase of 45% speaks volumes about the quality of their work.',
        author: 'Anna Mueller',
        position: 'CEO, EuroMarket'
      }
    },
    {
      id: 'logistics-fleet-optimization',
      slug: 'fleet-optimization-tracking',
      industry: 'Logistics',
      title: 'Fleet Optimization & Real-time Tracking',
      client: 'Global 3PL Provider',
      description: 'Reduced delivery times by 18% and fuel costs by 12% with AI-driven route optimization and live tracking.',
      challenge: 'Lack of real-time visibility and suboptimal routing led to missed SLAs, high fuel spend, and customer complaints.',
      solution: 'Deployed comprehensive telematics, traffic-aware routing, delivery-window planning, and real-time KPI dashboards for operations teams.',
      results: {
        deliveryTime: '18% reduction in average delivery time',
        fuelCost: '12% reduction in fuel costs',
        onTimeRate: '95% on-time delivery rate',
        visibility: 'End-to-end real-time visibility'
      },
      timeline: '14 weeks',
      teamSize: '6 developers (2 backend, 2 frontend, 1 data engineer, 1 DevOps)',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Google Maps API', 'TensorFlow'],
      testimonial: {
        text: 'SoftDAB helped us boost on-time delivery to 95% while cutting fuel costs by 12%. The real-time dashboards completely changed how our operations team works.',
        author: 'Martin Lopez',
        position: 'Operations Director, Global 3PL'
      }
    }
  ],

  // Team Members
  team: [
    {
      name: 'Alex Petrov',
      position: 'CEO & Co-founder',
      bio: '10+ years in software development and business management. Led teams for Fortune 500 companies.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      linkedin: '#'
    },
    {
      name: 'Maria Kovalenko',
      position: 'CTO & Co-founder',
      bio: 'Former tech lead at major fintech company. Expert in scalable architecture and team leadership.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=300&q=80',
      linkedin: '#'
    },
    {
      name: 'Dmitry Ivanov',
      position: 'Head of Engineering',
      bio: '8+ years building complex web applications. Specialized in React, Node.js, and cloud architecture.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
      linkedin: '#'
    }
  ],

  // Testimonials
  testimonials: [
    {
      text: 'SoftDAB delivered exceptional results. Their team became an extension of ours, and the quality of work was outstanding.',
      author: 'John Smith',
      position: 'CTO, TechStartup Inc',
      company: 'TechStartup Inc',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80'
    },
    {
      text: 'Working with SoftDAB was a game-changer. They understood our needs and delivered a solution that exceeded expectations.',
      author: 'Lisa Chen',
      position: 'Product Manager, FinanceApp',
      company: 'FinanceApp',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80'
    },
    {
      text: 'The expertise and professionalism of the SoftDAB team is unmatched. Highly recommend for any software development project.',
      author: 'Robert Taylor',
      position: 'CEO, HealthTech Solutions',
      company: 'HealthTech Solutions',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=100&q=80'
    }
  ],

  // FAQ
  faq: {
    general: [
      { question: 'How quickly can we start working together?', answer: 'We can typically assemble your team and start development within 1-2 weeks after the initial consultation and requirements gathering.' },
      { question: 'What is your pricing model?', answer: 'We offer flexible pricing models including fixed-price projects, time & materials, and dedicated team arrangements. Pricing depends on project complexity and team size.' },
      { question: 'Do you provide ongoing support after project completion?', answer: 'Yes, we offer comprehensive post-launch support including bug fixes, feature updates, performance monitoring, and maintenance services.' },
      { question: 'What technologies do you specialize in?', answer: 'We specialize in modern web technologies including React, Vue.js, Node.js, Python, Django, PostgreSQL, MongoDB, and cloud platforms like AWS and Azure.' },
      { question: 'How do you ensure project quality?', answer: 'We follow strict quality assurance processes including code reviews, automated testing, continuous integration, and regular client feedback sessions throughout development.' }
    ]
  }
};

export default mockData;