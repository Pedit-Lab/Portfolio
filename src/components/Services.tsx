import { AnimatedBackground } from './AnimatedBackground';
import React from 'react';
import { PentagonShowcase } from './PentagonShowcase';
import { Cloud, Globe, Cpu, Brain, ArrowUpRight, Layers, Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export interface ServiceDetail {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  keyFeatures: string[];
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
        'Build a reliable foundation for your software with cloud hosting, secure APIs, managed databases, and deployment automation. We use AWS, GCP, MongoDB Atlas, and Firebase to support growing applications and keep your services connected.',
      technologies: ['AWS Cloud', 'GCP', 'MongoDB Atlas', 'Firebase Realtime', 'Node.js / Express', 'REST & GraphQL APIs', 'Docker & K8s'],
      keyFeatures: [
        'High-concurrency microservices architecture',
        '99.99% high availability & disaster recovery',
        'Real-time WebSocket & Firebase pub/sub streaming',
        'Encrypted MongoDB Atlas database clusters',
      ],
      image: '/visuals/service-service-1.svg',
      icon: <Cloud size={28} color={colors.primary} />,
    },
    {
      id: 'service-2',
      title: 'Custom Software Development',
      category: 'Software Development',
      description:
        'Build custom web applications, SaaS products, customer portals, and internal business tools tailored to your workflows. From requirements and API integration to testing and release, we build maintainable systems around the people using them. Customer portals, role-based workspaces, and connected business data help your team spend less time on repetitive work.',
      technologies: ['React / Next.js', 'TypeScript', 'SaaS & Business Applications', 'Vercel Deployment', 'Tailwind & Vanilla CSS'],
      keyFeatures: [
        'Requirements, application architecture & release planning',
        'Custom web apps, SaaS platforms & customer portals',
        'Business workflow automation & API integrations',
        'Responsive, accessible interfaces & maintainable code',
      ],
      image: '/visuals/service-service-2.svg',
      icon: <Globe size={28} color={colors.accentCyan} />,
    },
    {
      id: 'service-3',
      title: 'IoT & Embedded Systems Engineering',
      category: 'Hardware & IoT',
      description:
        'Connect physical devices to your business applications. We develop embedded firmware, sensor integrations, and IoT prototypes with remote monitoring, device control, and cloud connectivity for industrial and everyday automation.',
      technologies: ['Microcontrollers (ESP32, STM32)', 'Micro Switches & Sensors', 'Custom PCB Design', 'MQTT & CoAP', 'Firmware (C/C++)', 'Telemetry Dashboards'],
      keyFeatures: [
        'Custom PCB circuit design & micro switch integration',
        'Ultra-low power sleep states for field devices',
        'Bi-directional cloud remote switch control',
        'Over-The-Air (OTA) firmware update capability',
      ],
      image: '/visuals/service-service-3.svg',
      icon: <Cpu size={28} color={colors.accentEmerald} />,
    },
    {
      id: 'service-4',
      title: 'AI & Machine Learning Integration',
      category: 'Artificial Intelligence',
      description:
        'Add practical intelligence to your software with AI assistants, document processing, predictive analytics, and computer vision. We integrate AI into business workflows to reduce repetitive work and help teams make better use of their data.',
      technologies: ['Python AI Stack', 'PyTorch & TensorFlow', 'OpenAI & LLM APIs', 'Computer Vision', 'Predictive Maintenance', 'Automated Workflows'],
      keyFeatures: [
        'AI assistants & document processing workflows',
        'Predictive analytics & tailored machine learning models',
        'Business process automation & knowledge search',
        'Computer vision & real-time anomaly detection',
      ],
      image: '/visuals/service-service-4.svg',
      icon: <Brain size={28} color={colors.accentPurple} />,
    },
    {
      id: 'service-5',
      title: 'UI/UX & Graphic Design',
      category: 'Design',
      description: 'User research, intuitive interfaces, interactive prototypes, and brand graphics that make your software clear, accessible, and consistent.',
      technologies: ['Figma UI/UX', 'Graphic & Brand Design', 'Design Systems'],
      keyFeatures: ['User research, UI/UX prototypes & brand graphics', 'Accessible interfaces & reusable design systems', 'Consistent product and brand experiences'],
      image: '/visuals/service-service-5.svg',
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
            Custom software is at the core of what we do. UI/UX and graphic design bring clarity to your products, while cloud engineering, IoT systems, and AI integration add the capabilities your business needs.
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
              <img className="service-art" src={`/visuals/service-${service.id}.svg`} alt="" aria-hidden="true" loading="lazy" width="640" height="360" />
              {/* Top Card Section */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '24px',
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      background: 'rgba(0, 240, 255, 0.08)',
                      border: `1px solid ${colors.borderColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {service.icon}
                  </div>
                  <span
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

                <h3
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    marginBottom: '14px',
                    color: colors.textPrimary,
                    lineHeight: 1.3,
                  }}
                >
                  {service.title}
                </h3>

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

              {service.id === 'service-2' && <div className="software-delivery">
                <div><h4>Web & SaaS Products</h4><p>Customer-facing applications with account management, purposeful features, and room to grow.</p></div>
                <div><h4>Business Platforms</h4><p>Internal tools, customer portals, and connected workflows tailored to your daily operations.</p></div>
                <div><h4>Integration & Delivery</h4><p>APIs, automated workflows, testing, and release planning that turn separate systems into dependable software.</p></div>
              </div>}
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
