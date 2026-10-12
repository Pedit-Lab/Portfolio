import { AnimatedBackground } from './AnimatedBackground';
import React, { useEffect, useState } from 'react';
import { Layers, TrendingUp, Cpu, CheckCircle, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const WhyChooseUs: React.FC = () => {
  const { colors } = useTheme();
  const [activeReason, setActiveReason] = useState(0);

  const reasons = [
    {
      icon: <Layers size={32} color={colors.primary} />,
      title: 'End-to-End Delivery',
      subtitle: 'From Product Idea to Software Launch',
      description:
        'One team takes your product from planning and design through development, testing, and launch.',
      badge: 'Complete Product Delivery',
      accentColor: colors.primary,
    },
    {
      icon: <TrendingUp size={32} color={colors.accentPurple} />,
      title: 'Scalable Architecture',
      subtitle: 'Built for Exponential Growth',
      description:
        'Flexible architecture keeps your product fast and dependable as users and data grow.',
      badge: 'Zero Bottlenecks',
      accentColor: colors.accentPurple,
    },
    {
      icon: <Cpu size={32} color={colors.accentEmerald} />,
      title: 'Intelligent Integrations',
      subtitle: 'Cloud, IoT & AI Working Together',
      description:
        'Connect cloud, IoT, and AI around practical needs such as monitoring and automation.',
      badge: 'Connected Business Tools',
      accentColor: colors.accentEmerald,
    },
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveReason(current => (current + 1) % reasons.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [reasons.length]);

  const reason = reasons[activeReason];

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
            One practical team, clear decisions, and technology chosen around your goals.
          </p>
        </div>

        <div className="why-showcase">
          <div className="why-slider-column">
            <div className="why-triangle" style={{ '--triangle-turn': `${activeReason * 120}deg` } as React.CSSProperties} aria-hidden="true">
              <span /><span /><span />
            </div>
            <div key={activeReason} className="glass-card advantage-card why-reason-slide">
              <div>
                <div className="why-reason-topline">
                  <div className={`why-reason-icon why-reason-icon-${activeReason + 1}`}>
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

                <h3>{reason.title}</h3>

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
            <div className="why-slider-controls" aria-label="Why choose us slides">
              {reasons.map((item, index) => <button key={item.title} type="button" className={index === activeReason ? 'is-active' : ''} onClick={() => setActiveReason(index)} aria-label={`Show ${item.title}`} aria-pressed={index === activeReason} />)}
            </div>
          </div>
          <div className="why-photo-panel">
            <img src="/visuals/why-choose-team.webp" alt="Software product team collaborating in a modern technology studio" width="1280" height="720" loading="lazy" />
            <div><strong>One connected delivery team</strong><span>Software · Design · Cloud · IoT · AI</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};
