import { AnimatedBackground } from './AnimatedBackground';
import React from 'react';
import { PentagonShowcase } from './PentagonShowcase';
import { Cloud, Globe, Cpu, Brain, ArrowUpRight, Layers, Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export interface ServiceSpecification {
  label: string;
  value: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  category: string;
  description: string;
  detailedOverview: string;
  technologies: string[];
  keyFeatures: string[];
  deliverables: string[];
  specifications: ServiceSpecification[];
  image: string;
  icon: React.ReactNode;
}

interface ServicesProps {
  onSelectService: (service: ServiceDetail) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const { colors } = useTheme();

  const servicesList: ServiceDetail[] = [
    {
      id: 'service-1',
      title: 'Cloud Infrastructure & Backend Services',
      category: 'Cloud Systems',
      description:
        'Secure cloud hosting, microservices, databases, and automated deployments built for extreme scale.',
      detailedOverview:
        'We engineer robust, enterprise-grade cloud ecosystems and scalable backend architectures. From containerized microservices orchestrated via Kubernetes to low-latency serverless workflows and distributed SQL/NoSQL databases, our cloud solutions guarantee high availability, resilient failover, and automated self-healing.',
      technologies: [
        'AWS Cloud',
        'Google Cloud (GCP)',
        'Docker & K8s',
        'MongoDB Atlas',
        'PostgreSQL',
        'Redis Caching',
        'Firebase Realtime',
        'Node.js / Express',
        'Python FastAPI',
        'REST & GraphQL APIs',
        'Terraform IaC',
        'Prometheus & Grafana',
      ],
      keyFeatures: [
        'High-concurrency microservices architecture with auto-scaling',
        '99.99% high availability with automated multi-region failover',
        'Real-time WebSocket, gRPC, and pub/sub message streaming',
        'Encrypted MongoDB Atlas clusters and optimized SQL schemas',
        'Zero-downtime CI/CD deployment pipelines with rollback safety',
        'Enterprise VPC isolation, IAM role security & WAF firewall protection',
      ],
      deliverables: [
        'Production Cloud Infrastructure as Code (Terraform / Docker)',
        'Secure API Gateway with JWT / OAuth2 token authentication',
        'Distributed database clustering with automated snapshot backups',
        'Centralized logging, real-time APM metrics & uptime alerting',
      ],
      specifications: [
        { label: 'Uptime SLA', value: '99.99% Guaranteed' },
        { label: 'Edge Latency', value: '< 45ms Worldwide' },
        { label: 'Security', value: 'TLS 1.3 & AES-256' },
        { label: 'Deployment', value: 'Multi-Region Cloud' },
      ],
      image: '/visuals/service-cloud-photo.webp',
      icon: <Cloud size={28} color={colors.primary} />,
    },
    {
      id: 'service-2',
      title: 'Custom Software Development',
      category: 'Software Development',
      description:
        'Custom web apps, SaaS products, portals, and business tools shaped precisely around your workflow.',
      detailedOverview:
        'We develop scalable, full-stack digital products engineered with modern frameworks, modular architectures, and clean code principles. Whether building a complex multi-tenant SaaS application, internal operations tool, or customer-facing digital experience, our software is built for lightning-fast responsiveness, frictionless usability, and rapid scaling.',
      technologies: [
        'React / Next.js',
        'TypeScript',
        'Node.js & Express',
        'PostgreSQL & Prisma',
        'Tailwind CSS',
        'MongoDB',
        'Redis',
        'Stripe API',
        'Vercel Deployment',
        'Docker',
        'Jest / Playwright',
        'Git CI/CD',
      ],
      keyFeatures: [
        'End-to-end full-stack development from architecture to production release',
        'Multi-tenant SaaS architectures with tiered billing & granular role permissions',
        'Lightning-fast reactive frontend interfaces with server-side rendering (SSR)',
        'High-throughput RESTful and GraphQL backend APIs',
        'Real-time collaborative workflows and WebSocket state synchronization',
        'Strict type-safety, component modularity, and automated end-to-end testing',
      ],
      deliverables: [
        'Production-ready web application with mobile-first responsive UI',
        'Administrative dashboard with role-based user management & analytics',
        'Clean, thoroughly documented source code repository',
        'Automated testing suite and continuous deployment pipeline',
      ],
      specifications: [
        { label: 'Architecture', value: 'Next.js & TypeScript' },
        { label: 'Lighthouse Score', value: '95+ Core Web Vitals' },
        { label: 'Delivery Cycle', value: 'Agile 2-Week Sprints' },
        { label: 'Code Quality', value: 'Strict TypeScript + CI' },
      ],
      image: '/visuals/service-software-photo.webp',
      icon: <Globe size={28} color={colors.accentCyan} />,
    },
    {
      id: 'service-3',
      title: 'IoT & Embedded Systems Engineering',
      category: 'Hardware & IoT',
      description:
        'Firmware, sensors, and connected devices with real-time remote monitoring and cloud control.',
      detailedOverview:
        'Bridging physical electronic hardware with modern cloud platforms. We design custom micro-circuitry, calibrate precision sensors, develop ultra-low-power firmware, and implement bidirectional MQTT/CoAP protocols so your team can monitor, automate, and control remote physical assets in real time.',
      technologies: [
        'ESP32 & STM32 Microcontrollers',
        'Custom PCB Design (KiCAD)',
        'Embedded C / C++',
        'FreeRTOS',
        'MQTT & CoAP Protocols',
        'WebSockets Streaming',
        'Firebase Realtime IoT',
        'LoRaWAN & BLE 5.0',
        'Sensors & Relays',
        'Telemetry Dashboards',
        'OTA Firmware Pipelines',
        'Industrial Automation',
      ],
      keyFeatures: [
        'Custom PCB schematic design, rapid prototyping, and component sourcing',
        'Ultra-low power deep-sleep modes (<15µA) for battery-powered field sensors',
        'Bidirectional cloud communication with remote relay and switch actuation',
        'Secure Over-The-Air (OTA) firmware updating with cryptographic verification',
        'Real-time telemetry ingestion pipelines and instant threshold alert triggers',
        'Industrial protocol support across Wi-Fi, BLE 5.0, LoRaWAN, and GSM/4G',
      ],
      deliverables: [
        'Production PCB Gerber manufacturing files & CAD 3D enclosure models',
        'Tested & flashed C/C++ embedded firmware codebase',
        'Live cloud telemetry dashboard with interactive switch controls',
        'Circuit schematics, pinout documentation, and wiring diagrams',
      ],
      specifications: [
        { label: 'Processing', value: 'Dual-Core ESP32 / STM32' },
        { label: 'Connectivity', value: 'Wi-Fi / BLE / LoRaWAN' },
        { label: 'Sleep Current', value: '< 15µA Ultra-Low Power' },
        { label: 'Reliability', value: 'Hardware Watchdog Timer' },
      ],
      image: '/visuals/service-iot-photo.webp',
      icon: <Cpu size={28} color={colors.accentEmerald} />,
    },
    {
      id: 'service-4',
      title: 'AI & Machine Learning Integration',
      category: 'Artificial Intelligence',
      description:
        'AI assistants, LLMs, and automation that reduce repetitive work and unlock useful insights.',
      detailedOverview:
        'We turn cutting-edge artificial intelligence into high-ROI business applications. From Retrieval-Augmented Generation (RAG) knowledge systems that answer complex internal inquiries to automated document processing, real-time image recognition, and predictive machine learning models, we integrate AI directly into your existing workflow.',
      technologies: [
        'Python AI Stack',
        'PyTorch & TensorFlow',
        'OpenAI GPT-4 APIs',
        'Anthropic Claude',
        'LangChain & LlamaIndex',
        'Pinecone & Milvus Vector DBs',
        'Hugging Face Transformers',
        'Computer Vision (OpenCV)',
        'FastAPI Inference Servers',
        'Pandas & NumPy',
        'Scikit-learn',
        'Predictive Analytics',
      ],
      keyFeatures: [
        'Custom RAG knowledge retrieval engines with semantic vector search',
        'Automated document extraction, OCR parsing, and data summarization',
        'Predictive analytics models for demand forecasting and churn detection',
        'Real-time computer vision for object detection and visual anomaly inspection',
        'Tailored fine-tuning of Large Language Models (LLMs) on private datasets',
        'Low-latency inference serving with token streaming and caching',
      ],
      deliverables: [
        'Deployed AI API endpoints with real-time streaming inference',
        'Vector database embedding pipeline for custom document indexing',
        'Interactive AI conversational interface with chat history retention',
        'Model evaluation benchmark reports and inference cost optimization plan',
      ],
      specifications: [
        { label: 'Response Time', value: '< 1.2s First-Token Stream' },
        { label: 'Data Privacy', value: 'Zero-Retention / Private VPC' },
        { label: 'Accuracy', value: 'Evaluated Benchmark Tests' },
        { label: 'Vector Index', value: 'Sub-10ms Hybrid Search' },
      ],
      image: '/visuals/service-ai-photo.webp',
      icon: <Brain size={28} color={colors.accentPurple} />,
    },
    {
      id: 'service-5',
      title: 'UI/UX & Graphic Design',
      category: 'Design',
      description:
        'Intuitive interfaces, design systems, and brand visuals that make products effortless to use.',
      detailedOverview:
        'Great software begins with human-centered product design. We research user journeys, craft wireframes and clickable high-fidelity prototypes, and establish scalable design systems. Every interaction, typeface, and color palette is intentionally chosen to make your digital product feel effortless, premium, and memorable.',
      technologies: [
        'Figma UI/UX',
        'FigJam User Journey Mapping',
        'Design Systems & Tokens',
        'Interactive Prototyping',
        'Adobe Illustrator',
        'Adobe Photoshop',
        'Wireframing & Information Architecture',
        'WCAG Accessibility Audits',
        'Tailwind Design Tokens',
        'Framer',
        'Micro-Interactions',
        'Brand Identity Guidelines',
      ],
      keyFeatures: [
        'Comprehensive user research, competitor auditing, and persona mapping',
        'Clickable high-fidelity Figma prototypes for rapid interactive user testing',
        'Scalable design systems with tokens, atomic components, and dark/light modes',
        'WCAG 2.1 AA accessibility compliance with optimal contrast and touch targets',
        'Bespoke brand identity systems: logos, typography, iconography, and color palettes',
        'Developer-ready handoff specs with auto-layout, spacing rules, and CSS tokens',
      ],
      deliverables: [
        'Interactive Figma prototype covering desktop, tablet, and mobile views',
        'Comprehensive UI Component Kit with typography scales & color tokens',
        'Production-ready SVG icons, vector illustrations, and brand assets',
        'UX user flow diagrams, screen wireframes, and design rationale guide',
      ],
      specifications: [
        { label: 'Design Tool', value: 'Figma & Design Tokens' },
        { label: 'Accessibility', value: 'WCAG 2.1 AA Compliant' },
        { label: 'Handoff', value: 'Pixel-Perfect Auto-Layout' },
        { label: 'Deliverable', value: 'Interactive Cloud Prototype' },
      ],
      image: '/visuals/service-design-photo.webp',
      icon: <Palette size={28} color={colors.accentPurple} />,
    },
  ];

  return (
    <section
      id="services"
      className="premium-section services-section"
      style={{
        padding: '100px 0',
        position: 'relative',
        background: colors.bgPrimary,
      }}
    >
      <AnimatedBackground />
      <div className="container-custom">
        {/* Section Header */}
        <div className="section-intro" style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 14px',
              borderRadius: '20px',
              background: 'rgba(0, 240, 255, 0.1)',
              border: `1px solid ${colors.borderGlow}`,
              marginBottom: '16px',
            }}
          >
            <Layers size={14} color={colors.primary} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: colors.primary, letterSpacing: '0.5px' }}>
              OUR CORE CAPABILITIES
            </span>
          </div>

          <h2
            className="flow-heading"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: colors.textPrimary,
              marginBottom: '16px',
              lineHeight: 1.2,
            }}
          >
            <span className="flow-heading-line">Software Development</span>
            <span className="flow-heading-line">&amp; Technology Services</span>
          </h2>

          <p style={{ fontSize: '1.08rem', color: colors.textSecondary, lineHeight: 1.6 }}>
            Everything needed to design, build, connect, and grow your digital product.
          </p>
        </div>

        {/* Software leads, with equal AI / cloud / IoT coverage and compact design support. */}
        <PentagonShowcase items={[...servicesList].sort((a, b) => ['service-2', 'service-4', 'service-1', 'service-3', 'service-5'].indexOf(a.id) - ['service-2', 'service-4', 'service-1', 'service-3', 'service-5'].indexOf(b.id))} title={service => service.title} label={service => ({ 'service-2': 'Software', 'service-4': 'AI', 'service-1': 'Cloud', 'service-3': 'IoT', 'service-5': 'UI/UX & Design' }[service.id] || service.category)}>
          {(service) => (
            <div
              key={service.id}
              className={`glass-card service-card ${service.id}`}
              style={{
                padding: '32px',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <img className="service-art" src={service.image} alt={`${service.title} workspace`} loading="lazy" width="1280" height="720" />
              {/* Top Card Section */}
              <div>
                <div className="service-card-heading-row">
                  <div className="service-card-title-line">
                    <div className={`service-card-icon service-icon-motion service-icon-${service.id}`}>
                      {service.icon}
                    </div>
                    <h3>{service.title}</h3>
                  </div>
                  <span
                    className="service-category-badge"
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: colors.primary,
                      background: 'rgba(0, 240, 255, 0.1)',
                      padding: '4px 10px',
                      borderRadius: '8px',
                    }}
                  >
                    {service.category}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: colors.textSecondary,
                    lineHeight: 1.6,
                    marginBottom: '24px',
                  }}
                >
                  {service.description}
                </p>

                {/* Tech Stack Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  {service.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        color: colors.textMuted,
                        background: colors.bgTertiary,
                        border: `1px solid ${colors.borderColor}`,
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                  {service.technologies.length > 4 && (
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        color: colors.primary,
                        padding: '3px 6px',
                      }}
                    >
                      +{service.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Action */}
              <button
                onClick={() => onSelectService(service)}
                style={{
                  background: 'transparent',
                  border: `1px solid ${colors.borderColor}`,
                  color: colors.textPrimary,
                  padding: '12px 18px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginTop: '12px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.primary;
                  e.currentTarget.style.color = colors.primary;
                  e.currentTarget.style.background = 'rgba(0, 240, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.borderColor;
                  e.currentTarget.style.color = colors.textPrimary;
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <span>Explore Service Details</span>
                <ArrowUpRight size={18} />
              </button>
            </div>
          )}
        </PentagonShowcase>
      </div>
    </section>
  );
};
