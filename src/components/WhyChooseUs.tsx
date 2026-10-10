import { AnimatedBackground } from './AnimatedBackground';
import React from 'react';
import { Layers, TrendingUp, Cpu, CheckCircle, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const WhyChooseUs: React.FC = () => {
  const { colors } = useTheme();

  const reasons = [
    {
      icon: <Layers size={32} color={colors.primary} />,
      title: 'End-to-End Delivery',
      subtitle: 'From Product Idea to Software Launch',
      description:
        'From requirements and UI/UX prototypes to software development, graphic assets, testing, and deployment, we keep your product focused on the people who use it.',
      badge: 'Complete Product Delivery',
      accentColor: colors.primary,
    },
    {
      icon: <TrendingUp size={32} color={colors.accentPurple} />,
      title: 'Scalable Architecture',
      subtitle: 'Built for Exponential Growth',
      description:
        'Solutions designed to grow seamlessly with your user base. Powered by auto-scaling cloud microservices, distributed MongoDB Atlas databases, and high-throughput serverless endpoints.',
      badge: 'Zero Bottlenecks',
      accentColor: colors.accentPurple,
    },
    {
      icon: <Cpu size={32} color={colors.accentEmerald} />,
      title: 'Intelligent Integrations',
      subtitle: 'Cloud, IoT & AI Working Together',
      description:
        'Extend your software with cloud services, connected IoT devices, and AI-powered workflows. We design integrations around practical needs such as remote monitoring, knowledge search, and business automation.',
      badge: 'Connected Business Tools',
      accentColor: colors.accentEmerald,
    },
  ];

  return (
    <section
      id="why-us"
      className="premium-section why-us-section"
      style={{
        padding: '100px 0',
        position: 'relative',
        background: colors.bgSecondary,
      }}
    >
      <AnimatedBackground />
      <div className="container-custom">
        {/* Header */}
        <div className="section-intro" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 14px',
              borderRadius: '20px',
              background: 'rgba(112, 0, 255, 0.1)',
              border: `1px solid ${colors.accentPurple}`,
              marginBottom: '16px',
            }}
          >
            <Sparkles size={14} color={colors.accentPurple} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: colors.accentPurple, letterSpacing: '0.5px' }}>
              THE PEDIT LAB ADVANTAGE
            </span>
          </div>

          <h2
            className="flow-heading"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: colors.textPrimary,
              marginBottom: '16px',
            }}
          >
            <span className="flow-heading-line">Why Choose</span>
            <span className="flow-heading-line">Us</span>
          </h2>

          <p style={{ fontSize: '1.05rem', color: colors.textSecondary, lineHeight: 1.6 }}>
            We combine custom software development with thoughtful design and expertise in cloud, IoT, and AI. Your business goals guide every feature, integration, and product decision.
          </p>
        </div>

        {/* 3 Main Highlight Cards */}
        <div className="advantage-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="glass-card advantage-card"
              style={{
                padding: '36px',
                borderRadius: '24px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
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
                      width: '64px',
                      height: '64px',
                      borderRadius: '18px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${colors.borderColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {reason.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: reason.accentColor,
                      border: `1px solid ${reason.accentColor}`,
                      padding: '4px 12px',
                      borderRadius: '20px',
                      background: 'rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    {reason.badge}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: colors.textPrimary,
                    marginBottom: '6px',
                  }}
                >
                  {reason.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: colors.primary,
                    marginBottom: '16px',
                  }}
                >
                  {reason.subtitle}
                </p>

                <p
                  style={{
                    fontSize: '0.95rem',
                    color: colors.textSecondary,
                    lineHeight: 1.65,
                    marginBottom: '24px',
                  }}
                >
                  {reason.description}
                </p>
              </div>

              {/* Bottom Checklist highlight */}
              <div
                style={{
                  paddingTop: '16px',
                  borderTop: `1px solid ${colors.borderColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <CheckCircle size={16} color={reason.accentColor} />
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: colors.textPrimary }}>
                  100% Quality & Performance SLA
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
