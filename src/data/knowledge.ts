import { capabilities } from './portfolio';
import { envConfig } from '../config/env';

export interface ChatAction {
  label: string;
  type: 'navigate' | 'scroll' | 'quote';
  target: string;
}

export interface KnowledgeChunk {
  id: string;
  title: string;
  text: string;
  keywords?: string[];
  always?: boolean;
  action?: ChatAction;
}

// Convert portfolio capabilities into structured chunks with tool keywords
function fromCapabilities(): KnowledgeChunk[] {
  return capabilities.map((c) => ({
    id: `cap-${c.id}`,
    title: `${c.category} Engineering - ${c.title}`,
    text: `${c.summary} Deliverables: ${c.deliverables.join(', ')}. Tech stack: ${c.tools.join(', ')}.`,
    keywords: [c.category.toLowerCase(), ...c.tools.map((t) => t.toLowerCase())],
  }));
}

// Core website knowledge chunks
const manualChunks: KnowledgeChunk[] = [
  {
    id: 'about',
    title: 'About pedit-lab',
    always: true,
    text: `pedit-lab is a software engineering and technology studio delivering custom web and SaaS applications, interactive UI/UX designs, scalable cloud backends, IoT embedded hardware systems, and applied AI assistants. Location: ${envConfig.companyLocation}. Email: ${envConfig.companyEmail}, Phone: ${envConfig.companyPhone}, WhatsApp: +${envConfig.whatsappNumber}.`,
    keywords: ['about', 'about us', 'who are you', 'what is pedit', 'who is pedit', 'team', 'company', 'studio', 'portfolio'],
    action: { label: 'ℹ️ About Us', type: 'scroll', target: 'about' },
  },
  {
    id: 'reviews-stats',
    title: 'Client Reviews, Testimonials & Track Record',
    text: `PEDIT Lab has delivered over 125+ completed projects for 48+ active clients across 15+ countries globally (including USA, Germany, Japan, Sri Lanka, UK, Australia, Singapore, UAE) and synced over 10,000+ IoT devices.
Real client reviews & ratings (5/5 Stars):
- "PEDIT Lab turned our automation hardware into a reliable real-time cloud dashboard." — Marcus Vance (CTO, OmniScale Systems, USA)
- "The application was fast, responsive, and better than we expected. Outstanding engineering." — Elena Rostova (Head of Product, CyberVantage Tech, Germany)
- "A rare team that understands both connected hardware and scalable cloud systems." — Kavinda Perera (Director of Innovation, SmartGrid IoT, Sri Lanka)
- "Their cloud deployment and API architecture reduced our data latency by over 60%." — David Miller (VP of Engineering, CloudCore Labs, Australia)
- "Intuitive UI and clean modular code. They delivered ahead of schedule with zero friction." — Sarah Jenkins (Lead Designer, NovaDesign Studios, UK)`,
    keywords: ['review', 'reviews', 'testimonial', 'testimonials', 'rating', 'ratings', 'feedback', 'client review', 'clients', 'track record', 'reputation', 'past clients'],
    action: { label: '⭐ View Client Reviews', type: 'scroll', target: 'impact' },
  },
  {
    id: 'projects-delivered',
    title: 'Completed Projects & Products Innovation',
    text: `PEDIT Lab has completed 125+ projects across software engineering, cloud, IoT, and AI.
Featured in-house products & past innovations:
- BizFlow (Business Operations): Multi-user platform for order fulfillment, inventory tracking, role-based staff portals, and API automation.
- DocPilot (Document AI Assistant): Intelligent RAG document knowledge search that extracts verified answers from internal business files with source citations.
- PulseGrid (IoT Remote Telemetry): Real-time industrial telemetry engine syncing sensor telemetry via MQTT, ESP32, and live dashboards.
- CloudScale (API & Infrastructure Orchestrator): Automated zero-downtime microservice container pipeline on AWS/GCP with active metric monitoring.
- StudioFlow (Design System & Prototype Kit): Complete component architecture with accessible tokens and interactive Figma workflows.`,
    keywords: ['how many projects', 'projects done', 'completed projects', 'portfolio work', 'past projects', 'case studies', 'products', 'innovations', 'built'],
    action: { label: '🛠️ View Projects & Products', type: 'scroll', target: 'products' },
  },
  {
    id: 'faq',
    title: 'Frequently Asked Questions (FAQ)',
    text: `Key FAQs answered on the PEDIT Lab website:
1. What types of projects does PEDIT Lab build? Custom web and mobile applications, business SaaS, AI and data solutions, cloud platforms, and IoT systems.
2. How is project price decided? Based on features, architecture, integrations, delivery speed, and support tiers via our interactive calculator or custom quotes.
3. Can you support university / final-year projects? Yes, comprehensive mentorship covering software, AI/ML, IoT, research, reports, and viva preparation.
4. Will I own the source code and files? Yes, 100% full intellectual property handover of code, designs, and assets.
5. How long does a project take? From a few days for focused milestones to several weeks for full-scale platforms.
6. Do you provide deployment and maintenance? Yes, hosting setup, CI/CD, database management, and ongoing support.
7. Can you improve an existing system? Yes, system audits, UI redesigns, speed optimization, and feature enhancements.
8. How to get started? Fill out the contact form, reach out on WhatsApp, or build a package on our pricing page.`,
    keywords: ['faq', 'faqs', 'frequently asked questions', 'questions', 'common questions', 'questions and answers'],
    action: { label: '❓ View FAQ Section', type: 'scroll', target: 'faq' },
  },
  {
    id: 'student-support-packages',
    title: 'University Student Project Support & Packages',
    text: 'PEDIT Lab offers dedicated University Project Support and student-friendly pricing packages. Support areas include: 1) Topic & Project Planning (scope review, roadmap, proposals), 2) Software Development (web, mobile, APIs, testing, debugging), 3) AI & Data Projects (ML, GenAI, analytics, models), 4) Embedded & IoT (Arduino, ESP32, sensors, MQTT), 5) Cloud & Databases (architecture, hosting, deployment), 6) Documentation & Presentation (reports, slides, presentation coaching), and 7) Research Support & Viva Preparation (mock viva, demo sessions, thesis/paper methodology). We mentor and guide students so they understand and submit their own academic work with confidence. Visitors can explore student pricing and packages directly on the pricing page.',
    keywords: ['student', 'students', 'university', 'undergraduate', 'academic', 'final year', 'fyp', 'viva', 'assignment', 'research', 'thesis', 'student pricing'],
    action: { label: '🎓 View Student Packages', type: 'navigate', target: '/pricing?audience=student' },
  },
  {
    id: 'services-overview',
    title: 'Services Overview',
    text: 'We offer Software Engineering (React, Next.js, Node.js), UI/UX Design (Figma, design systems), Cloud Architecture (AWS, GCP, Docker, CI/CD), IoT Development (ESP32, STM32, MQTT), and Applied AI (LLMs, RAG, agents, computer vision).',
    keywords: ['service', 'services', 'offer', 'provide', 'capability', 'solution', 'help', 'work', 'build', 'what do you do'],
    action: { label: '🚀 Explore Services', type: 'scroll', target: 'services' },
  },
  {
    id: 'pricing',
    title: 'Standard Service Pricing, Plans & Calculator',
    text: 'We provide structured pricing tiers (Basic, Standard, Premium) and an interactive online package builder for commercial software, AI/ML systems, cloud infrastructure, IoT, and network services at the /pricing page. Project prices depend on features, deliverables, and delivery timeline.',
    keywords: ['price', 'pricing', 'cost', 'standard pricing', 'commercial pricing', 'service package', 'service packages', 'rate', 'charge', 'much', 'estimate', 'fee', 'calculator', 'plans', 'plan'],
    action: { label: '💳 View Service Pricing', type: 'navigate', target: '/pricing' },
  },
  {
    id: 'contact',
    title: 'Contact Details & Inquiries',
    text: `You can reach out to PEDIT Lab through any of the following channels:
- Email: ${envConfig.companyEmail}
- Phone: ${envConfig.companyPhone}
- WhatsApp: +${envConfig.whatsappNumber}
- Location: ${envConfig.companyLocation}
- Interactive Contact Form: available in the Contact section on this website to send project requirements directly.`,
    keywords: ['contact', 'contacts', 'email', 'phone', 'whatsapp', 'reach', 'hire', 'talk', 'call', 'location', 'address', 'where are you', 'how to reach'],
    action: { label: '📞 Contact Us', type: 'scroll', target: 'contact' },
  },
  {
    id: 'process',
    title: 'How We Work & Timeline',
    text: 'Our development workflow encompasses: discovery and requirements alignment, architectural & UI prototype design, iterative development sprints with milestones, comprehensive testing, code and deliverable handover (full client ownership), and deployment with maintenance support.',
    keywords: ['process', 'timeline', 'long', 'steps', 'workflow', 'delivery', 'support', 'start', 'ownership', 'own code'],
  },
];

export const knowledge: KnowledgeChunk[] = [...manualChunks, ...fromCapabilities()];
