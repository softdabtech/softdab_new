// Mock data for SoftDAB website
// This file contains all mock data used throughout the application
// Will be replaced with real API calls during backend integration

export const mockData = {
  caseStudies: [
    {
      id: "skycodec",
      slug: "skycodec-lossless-compression",
      title: "SkyCodec: Lossless Data Compression Core",
      industry: "Developer Tools",
      timeline: "4 years",
      teamSize: "R&D core team",
      client: "Confidential",
      technologies: ["C++", "Qt", "Machine Learning", "Mathematical Algorithms"],
      keyMetric: "Patent-pending algorithms; production-ready encoder",
      description: "Development of low-level compression core and supporting software, from concept and R&D through investor validation and industrial implementation. We joined at concept stage, conducted multi-year research into novel compression transforms and entropy coding, and delivered a production-grade software stack ready for integration in high-throughput systems.",
      image: "/images/cases/skycodec.jpg",
      workPerformed: [
        "Performed algorithm R&D: mathematical modeling, theoretical proofs, and complexity analysis.",
        "Built prototype encoders/decoders in C++ with rigorous unit tests and benchmarks.",
        "Implemented GUI/management tools in Qt for debugging, training, and visualization.",
        "Integrated ML-assisted parameter tuning (models to select optimal transforms per data class).",
        "Built binary format specification, API for integration, and SDK for partner consumption.",
        "Created performance/perf-regression CI, profiling pipelines, and hardware-aware optimizations.",
        "Assisted client through investor demos and technical due diligence."
      ]
    },
    {
      id: "dab",
      slug: "digital-alternative-banking",
      title: "DAB: Digital Alternative Banking (Fintech SaaS)",
      industry: "Fintech",
      timeline: "18 months",
      teamSize: "15 developers",
      client: "SoftDAB (internal startup)",
      technologies: ["React Native", "React", "JavaScript", "PHP", "Android", "SQL Databases"],
      keyMetric: "MVP delivered; core accounting flows automated",
      description: "End‑to‑end development of a SaaS fintech product enabling entrepreneurs to automate complex accounting workflows and process digital cash terminal transactions inside the app. SoftDAB ran this as an in-house startup; we built the MVP with a 15-person team and shipped core features that validated product-market fit.",
      image: "/images/cases/dab.jpg",
      workPerformed: [
        "Product discovery and definitions: user stories, compliance checklist, and backlog grooming.",
        "Architecture & backend: multi-tenant API design, transaction ledger modeling, reconciliations, and secure payment flows (PHP / Node patterns).",
        "Frontend & mobile: React web dashboard and React Native mobile app, UX for cash terminal flows and receipts.",
        "Integrations: POS gateways, bank APIs, and reporting exports for accountants.",
        "Security & compliance: data encryption in-transit & at-rest, role-based access, audit logging.",
        "QA, performance testing, and staged rollout for pilot customers.",
        "Delivered documentation, deployment scripts, and handover for scaling."
      ]
    },
    {
      id: "carlight",
      slug: "carlight-traffic-detection",
      title: "CarLight: Vehicle Traffic Light Detection",
      industry: "Automotive",
      timeline: "6 months",
      teamSize: "Embedded/Computer Vision team",
      client: "BMW",
      technologies: ["C++", "Embedded Vision"],
      keyMetric: "MVP delivered to BMW",
      description: "Embedded computer-vision system to detect traffic light phase reliably in challenging real-world conditions (glare, occlusion, varied camera setups). Worked closely with BMW engineers to deliver an in-vehicle MVP that integrates with existing hardware and provides phase detection confidence scores.",
      image: "/images/cases/carlight.jpg",
      workPerformed: [
        "Requirements & sensors: aligned on camera specs, frame rates, and latency budgets.",
        "Algorithm design: robust detection pipeline with image preprocessing, ROI selection, and phase classification.",
        "Implementation: performant C++ modules optimized for target ECUs and real-time constraints.",
        "Calibration & validation: dataset collection, labeling, edge-case tests (night, weather), and objective metrics.",
        "Integration: packaged module with clear API, integration tests, and deployment artifacts for BMW's CI.",
        "Delivered MVP and technical documentation for next-phase productization."
      ]
    },
    {
      id: "softpokerpro",
      slug: "softpokerpro-ocr-gaming",
      title: "SoftPokerPro: AI-Powered Poker Assistant",
      industry: "Gaming",
      timeline: "30 months (2.5 years)",
      teamSize: "Core development team",
      client: "Confidential",
      technologies: ["C++", "Qt", "OCR", "Machine Learning"],
      keyMetric: "Real‑time OCR + decision engine; high throughput",
      description: "Development of a high-performance multiplayer poker solution with advanced OCR, ML-based pattern recognition, and game-logic optimization. Focus on low-latency real-time processing, robust OCR across multiple visual feeds, and scalable server-side components.",
      image: "/images/cases/softpokerpro.jpg",
      workPerformed: [
        "OCR pipeline: image normalization, multi-engine OCR fusion, and custom text extraction tuned to gameplay visuals.",
        "ML models: built models for card/hand recognition and action prediction; trained and deployed inference pipelines.",
        "Game logic & rules engine: deterministic engine for multiplayer synchronization and anti-cheat logic.",
        "Performance optimization: low-level C++ optimizations, concurrency design, and memory profiling for sustained throughput.",
        "UX tools in Qt for monitoring sessions, visual debugging, and replay analysis.",
        "Production readiness: monitoring, auto-scaling recommendations, and security hardening."
      ]
    },
    {
      id: "rosco",
      slug: "rosco-agro-ecommerce",
      title: "Rosco Group: Agri-Sector E‑Commerce Platform",
      industry: "eCommerce",
      timeline: "12 months",
      teamSize: "E‑commerce delivery team",
      client: "Rosco Group",
      technologies: ["React", "Node.js", "PostgreSQL", "Redis", "AWS"],
      keyMetric: "Full-featured online store with high-load readiness",
      description: "Built a large, production-grade e-commerce store for a leading agricultural retailer in Ukraine. The platform supports complex catalogs, pricing, B2B workflows, and high-traffic events with a focus on resilience and operational efficiency.",
      image: "/images/cases/rosco.jpg",
      workPerformed: [
        "Requirements: catalog modeling, B2B discounts, delivery zones and warehouse rules.",
        "Architecture: scalable microservices, API gateway, and background processing for orders and inventory.",
        "Frontend: responsive React storefront with rich product pages, filters, and checkout flows.",
        "Backend & Data: Node.js/Express services, PostgreSQL for relational data, Redis for cache/session, and workers for order processing.",
        "Integrations: payment gateways, ERP/warehouse systems, shipping providers.",
        "Scalability & reliability: autoscaling on AWS, monitoring (metrics & alerts), and load testing.",
        "Delivered training materials and runbook for ops team."
      ]
    },
    {
      id: "gstcloud",
      slug: "gst-cloud-seal-tracking",
      title: "GST Cloud: Automated Seal Tracking System",
      industry: "Logistics",
      timeline: "6 months",
      teamSize: "Mobile + Cloud team",
      client: "Confidential",
      technologies: ["React Native", "PostgreSQL / NoSQL", "Machine Learning"],
      keyMetric: "Cloud tracking, photo evidence, and re-seal alerting",
      description: "First-in-market cloud service for automated tracking of security seals. The mobile/cloud system records seal events with photos, assigns responsibility, and triggers alerts for re-sealing when seals expire — providing a full audit trail for logistics and security operations.",
      image: "/images/cases/gstcloud.jpg",
      workPerformed: [
        "Mobile app: React Native app for field operators with photo capture, geo-tagging, and offline sync.",
        "Backend: cloud API, authentication, role-based access, and event audit log storage.",
        "Data model: tracked devices, seals, photo attachments, and temporal validity logic.",
        "Notifications: scheduled reminders and push/SMS/email alerts for re-seal events.",
        "ML-assisted checks: image validation to detect tampering and confirm seal type when needed.",
        "Deployment: CI/CD for mobile builds, cloud infra provisioning, and monitoring."
      ]
    }
  ],
  about: {
    title: "About SoftDAB",
    description: "We are a custom software development company with 8+ years of experience, specializing in dedicated teams for US/EU businesses.",
    values: [
      { title: "Client Success First", description: "Your success is our success." },
      { title: "Quality Excellence", description: "Highest standards in code and communication." },
      { title: "Global Reach", description: "Projects delivered for clients in US, EU, and worldwide." }
    ],
    team: [
      { 
        name: "Oleksii Pronichev", 
        role: "CEO & Founder",
        bio: "8+ years in software development. Leads business strategy and client relationships. Passionate about building scalable solutions that drive real business value.",
        image: "/images/team/oleksii.jpg",
        linkedin: "https://linkedin.com/in/oleksii-pronichev"
      },
      { 
        name: "Anna Kolesnik", 
        role: "CTO & Co-Founder",
        bio: "Technical leader with expertise in full-stack development and system architecture. Ensures our delivery standards and guides technology decisions.",
        image: "/images/team/anna.jpg",
        linkedin: "https://linkedin.com/in/anna-kolesnik"
      },
      { 
        name: "Sergey Petrov", 
        role: "Lead Developer",
        bio: "Senior full-stack engineer specializing in React, Node.js, and cloud architecture. Mentors our development teams and drives technical excellence.",
        image: "/images/team/sergey.jpg",
        linkedin: "https://linkedin.com/in/sergey-petrov"
      }
    ]
  },
  customDevelopment: {
    title: "Custom Software Development",
    description: "End-to-end custom software development services. From discovery to deployment, we deliver reliable and scalable solutions tailored to your business needs.",
    features: [
      "Discovery & Requirements",
      "Architecture & Design", 
      "Development & QA",
      "Deployment & Support"
    ],
    projects: [
      { name: "SkyCodec", summary: "Lossless Data Compression Core" },
      { name: "DAB", summary: "Digital Alternative Banking (Fintech SaaS)" }
    ]
  },
  dedicatedTeams: {
    title: "Dedicated Teams",
    description: "Dedicated development teams with seamless integration, predictable delivery, and flexible scaling. Senior engineers aligned to your processes.",
    benefits: [
      "Seamless integration",
      "Predictable delivery", 
      "Flexible scaling",
      "Senior engineers"
    ],
    clients: [
      { name: "BMW", project: "Embedded Vision" },
      { name: "Rosco Group", project: "Agri-Sector E‑Commerce Platform" }
    ],
    teamSizes: [
      {
        size: "Small Team",
        monthlyRate: "$8,000",
        bestFor: "MVPs and small projects",
        developers: "2-3 developers",
        includes: ["Frontend Developer", "Backend Developer", "Project Manager"]
      },
      {
        size: "Medium Team",
        monthlyRate: "$15,000",
        bestFor: "Full-scale product development",
        developers: "4-6 developers",
        includes: ["Full-stack Developers", "UI/UX Designer", "DevOps Engineer", "QA Engineer", "Project Manager"]
      },
      {
        size: "Large Team", 
        monthlyRate: "$25,000",
        bestFor: "Enterprise solutions",
        developers: "7+ developers",
        includes: ["Senior Architects", "Full Development Team", "DevOps Team", "QA Team", "Technical Lead", "Project Manager"]
      }
    ]
  }
};