import { AnimatedBackground } from './AnimatedBackground';
import React from 'react';
import { Cpu, Layout, Cloud, Rocket, Users, Brain } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const AboutUs: React.FC = () => {
  const { colors } = useTheme();
  const aboutImg = '/visuals/about-office-employee.png';

  const corePillars = [
    { icon: <Rocket size={22} color={colors.primary} />, title: 'Custom Software Development', desc: 'Web apps, SaaS products, portals, and business tools built around your workflow.' },
    { icon: <Brain size={22} color={colors.accentPurple} />, title: 'AI & Intelligent Automation', desc: 'Practical AI that reduces repetitive work and helps teams use their data.' },
    { icon: <Cloud size={22} color={colors.accentCyan} />, title: 'Robust Cloud Architectures', desc: 'Secure, scalable hosting, backends, databases, and deployment pipelines.' },
    { icon: <Cpu size={22} color={colors.accentEmerald} />, title: 'IoT & Connected Systems', desc: 'Connected devices, sensors, remote monitoring, and cloud control.' },
    { icon: <Layout size={22} color={colors.accentPurple} />, title: 'UI/UX & Graphic Design', desc: 'Clear interfaces and visual identities people enjoy using.' },
  ];

  return (
    <section
      id="about"
      className="premium-section about-section"
      style={{
        padding: '100px 0',
        position: 'relative',
        background: colors.bgSecondary,
      }}
    >
      <AnimatedBackground />
      <div className="container-custom">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '56px',
            alignItems: 'center',
          }}
          className="about-grid"
        >
          {/* About Left Image Visual */}
          <div className="about-art" style={{ position: 'relative' }}>
            <div
              className="glass-card"
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
                padding: '12px',
              }}
            >
              <div style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/3' }}>
                <img
                  src={aboutImg}
                  alt="Software professional working on a laptop in a modern office"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

            </div>
          </div>

          {/* About Right Content */}
          <div className="about-copy">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                borderRadius: '20px',
                background: 'rgba(112, 0, 255, 0.1)',
                border: `1px solid ${colors.accentPurple}`,
                marginBottom: '16px',
              }}
            >
              <Users size={14} color={colors.accentPurple} />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: colors.accentPurple, letterSpacing: '0.5px' }}>
                ABOUT PEDIT LAB
              </span>
            </div>

            {/* Heading */}
            <h2
              className="flow-heading"
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: '20px',
                color: colors.textPrimary,
              }}
            >
              <span className="flow-heading-line">Who We</span>
              <span className="flow-heading-line">Are</span>
            </h2>

            {/* Body Text */}
            <div style={{ marginBottom: '32px' }}>
              <p
                style={{
                  fontSize: '1.05rem',
                  color: colors.textPrimary,
                  lineHeight: 1.75,
                  fontWeight: 500,
                  marginBottom: '14px',
                }}
              >
                PEDIT Lab is an innovation-driven software engineering and digital product studio. We transform complex business challenges into reliable, high-performance digital solutions—guiding projects seamlessly from initial concept and architecture to production launch.
              </p>
              <p
                style={{
                  fontSize: '0.96rem',
                  color: colors.textSecondary,
                  lineHeight: 1.7,
                  marginBottom: '18px',
                }}
              >
                Combining full-stack web and mobile engineering, practical artificial intelligence, cloud architectures, and connected IoT systems, our multidisciplinary team empowers ambitious startups and established businesses with scalable technology that drives tangible impact.
              </p>

              {/* Core Strengths Badges */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  marginTop: '16px',
                }}
              >
                {[
                  '🚀 End-to-End Product Lifecycle',
                  '⚡ High-Performance Architecture',
                  '🛡️ Scalable & Secure Cloud Systems',
                ].map((badge, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      padding: '5px 14px',
                      borderRadius: '20px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: `1px solid ${colors.borderColor}`,
                      color: colors.textSecondary,
                      letterSpacing: '0.2px',
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Core pillars: one animated service slide every three seconds. */}
            <div className="about-pillars" aria-label="PEDIT Lab core capabilities">
              {corePillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className={`about-pillar-slide about-pillar-${idx + 1}`}
                  style={{ '--pillar-delay': `${idx * 3}s` } as React.CSSProperties}
                >
                  <div className="about-pillar-heading">
                    <span className="about-pillar-icon">{pillar.icon}</span>
                    <h4>{pillar.title}</h4>
                  </div>
                  <p>{pillar.desc}</p>
                  <span className="about-pillar-progress" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: 0.9fr 1.1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
