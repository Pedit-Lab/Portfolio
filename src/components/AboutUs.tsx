import { AnimatedBackground } from './AnimatedBackground';
import React from 'react';
import { Cpu, Layout, Cloud, Rocket, Award, Users, Brain } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const AboutUs: React.FC = () => {
  const { colors, mode } = useTheme();
  const iotImg = mode === 'dark' ? '/visuals/innovation-lab-dark.svg' : '/visuals/innovation-lab.svg';

  const corePillars = [
    { icon: <Rocket size={22} color={colors.primary} />, title: 'Custom Software Development', desc: 'Custom web platforms, SaaS products, customer portals, and business applications built around your users and operations. From API integrations and workflow automation to testing and deployment, we connect your product idea to dependable software.' },
    { icon: <Brain size={22} color={colors.accentPurple} />, title: 'AI & Intelligent Automation', desc: 'AI-powered workflows, document processing, knowledge search, and predictive insights that help teams use their data and reduce repetitive work.' },
    { icon: <Cloud size={22} color={colors.accentCyan} />, title: 'Robust Cloud Architectures', desc: 'AWS, GCP, MongoDB Atlas, and Firebase powering resilient high-speed backend systems, secure application hosting, deployment pipelines, and connected data.' },
    { icon: <Cpu size={22} color={colors.accentEmerald} />, title: 'IoT & Connected Systems', desc: 'Connected devices, embedded firmware, and sensor integrations that bring useful real-world data into your applications through remote monitoring, control, and cloud connectivity.' },
    { icon: <Layout size={22} color={colors.accentPurple} />, title: 'UI/UX & Graphic Design', desc: 'User research, intuitive interfaces, brand visuals, and graphic assets that make digital products clear and memorable.' },
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
                  src={iotImg}
                  alt="PEDIT Lab Electronics Engineering & IoT Hardware Workbench"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Floating Stat Card */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  right: '20px',
                  background: colors.bgModal,
                  border: `1px solid ${colors.borderGlow}`,
                  borderRadius: '16px',
                  padding: '16px 22px',
                  boxShadow: colors.shadowCard,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(0, 240, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Award size={24} color={colors.primary} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: colors.textPrimary }}>
                    Full-Layer
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: colors.textSecondary, margin: 0 }}>
                    Excellence Guaranteed
                  </p>
                </div>
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
            <p
              style={{
                fontSize: '1.05rem',
                color: colors.textSecondary,
                lineHeight: 1.7,
                marginBottom: '32px',
              }}
            >
              PEDIT Lab is a technology startup focused on building software that solves everyday business challenges. We create custom web applications, SaaS platforms, and business tools, with UI/UX and graphic design that make them easy to use. Our cloud engineering, IoT development, and AI integration services extend those products with reliable infrastructure, connected devices, and intelligent automation. From the first idea to launch, we turn your requirements into useful digital experiences.
            </p>

            {/* Core Pillars Grid */}
            <div className="about-pillars"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '20px',
              }}
            >
              {corePillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className={idx === 0 ? 'about-software-pillar' : undefined}
                  style={{
                    background: colors.bgTertiary,
                    border: `1px solid ${colors.borderColor}`,
                    borderRadius: '14px',
                    padding: '16px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{ marginBottom: '10px' }}>{pillar.icon}</div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 6px 0', color: colors.textPrimary }}>
                    {pillar.title}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: colors.textMuted, margin: 0, lineHeight: 1.5 }}>
                    {pillar.desc}
                  </p>
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
