import { AnimatedBackground } from './AnimatedBackground';
import React from 'react';
import { AnimatedCounter } from './AnimatedCounter';
import { Globe, CheckCircle2, Users, Radio, Star } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const GlobalImpactStats: React.FC = () => {
  const { colors } = useTheme();

  const metrics = [
    {
      value: '125+',
      label: 'Completed Projects',
      subtext: 'Software, Design, Cloud, IoT & AI Solutions',
      icon: <CheckCircle2 size={28} color={colors.primary} />,
    },
    {
      value: '48+',
      label: 'Active Clients',
      subtext: 'Enterprise Corporations & Tech Startups',
      icon: <Users size={28} color={colors.accentPurple} />,
    },
    {
      value: '15+',
      label: 'Countries Served',
      subtext: 'Global Client Footprint',
      icon: <Globe size={28} color={colors.accentCyan} />,
    },
    {
      value: '10,000+',
      label: 'IoT Devices Synced',
      subtext: 'Connected to Applications & Cloud Platforms',
      icon: <Radio size={28} color={colors.accentEmerald} />,
    },
  ];

  const countriesList = [
    { name: 'United States', code: 'USA', flag: '🇺🇸', clients: 14, region: 'North America' },
    { name: 'Germany', code: 'DEU', flag: '🇩🇪', clients: 8, region: 'Europe' },
    { name: 'Japan', code: 'JPN', flag: '🇯🇵', clients: 6, region: 'Asia-Pacific' },
    { name: 'Sri Lanka', code: 'LKA', flag: '🇱🇰', clients: 12, region: 'South Asia (HQ)' },
    { name: 'United Kingdom', code: 'GBR', flag: '🇬🇧', clients: 5, region: 'Europe' },
    { name: 'Australia', code: 'AUS', flag: '🇦🇺', clients: 4, region: 'Oceania' },
    { name: 'Singapore', code: 'SGP', flag: '🇸🇬', clients: 7, region: 'SE Asia' },
    { name: 'United Arab Emirates', code: 'ARE', flag: '🇦🇪', clients: 5, region: 'Middle East' },
  ];

  const testimonials = [
    {
      quote:
        'PEDIT Lab transformed our industrial automation hardware setup into a real-time AWS cloud dashboard. Their micro switch & sensor integration with Node.js backend was flawless.',
      author: 'Marcus Vance',
      role: 'CTO, OmniScale Systems (USA)',
      rating: 5,
    },
    {
      quote:
        'The speed and responsiveness of their web application built with Figma and Vercel exceeded our expectations. Truly a top-tier technology partner.',
      author: 'Elena Rostova',
      role: 'Head of Product, CyberVantage Tech (Germany)',
      rating: 5,
    },
    {
      quote:
        'Finding an engineering team that excels at both physical PCB hardware soldering and scalable cloud architecture is rare. PEDIT Lab is the complete package.',
      author: 'Kavinda Perera',
      role: 'Director of Innovation, SmartGrid IoT (Sri Lanka)',
      rating: 5,
    },
  ];

  return (
    <section
      id="impact"
      className="premium-section impact-section"
      style={{
        padding: '100px 0',
        position: 'relative',
        background: colors.bgPrimary,
      }}
    >
      <AnimatedBackground />
      <div className="container-custom">
        {/* Header */}
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
            <Globe size={14} color={colors.primary} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: colors.primary, letterSpacing: '0.5px' }}>
              GLOBAL FOOTPRINT & METRICS
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
            <span className="flow-heading-line">Our Track Record</span>
            <span className="flow-heading-line">&amp; Global Reach</span>
          </h2>

          <p style={{ fontSize: '1.05rem', color: colors.textSecondary, lineHeight: 1.6 }}>
            Supporting clients across 15+ countries with custom software, UI/UX and graphic design, cloud platforms, IoT solutions, and AI integrations.
          </p>
        </div>

        {/* 4 Counter Metric Cards */}
        <div className="metric-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
            marginBottom: '70px',
          }}
        >
          {metrics.map((m, i) => (
            <div
              key={i}
              className="glass-card impact-card"
              style={{
                padding: '28px',
                borderRadius: '20px',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${colors.borderColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                }}
              >
                {m.icon}
              </div>
              <h3
                className="gradient-text metric-value"
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  marginBottom: '4px',
                }}
              >
                <AnimatedCounter value={m.value} />
              </h3>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: colors.textPrimary, margin: '0 0 6px 0' }}>
                {m.label}
              </h4>
              <p style={{ fontSize: '0.8rem', color: colors.textMuted, margin: 0 }}>
                {m.subtext}
              </p>
            </div>
          ))}
        </div>

        {/* Global Client Countries Showcase */}
        <div
          className="glass-card global-network"
          style={{
            padding: '40px',
            borderRadius: '24px',
            marginBottom: '70px',
            border: `1px solid ${colors.borderGlow}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '28px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: colors.textPrimary, margin: 0 }}>
                International Client Locations
              </h3>
              <p style={{ fontSize: '0.88rem', color: colors.textSecondary, margin: '4px 0 0 0' }}>
                Serving startups & enterprises worldwide from our engineering labs.
              </p>
            </div>
            <span
              style={{
                background: 'rgba(0, 240, 255, 0.15)',
                color: colors.primary,
                fontWeight: 700,
                fontSize: '0.82rem',
                padding: '6px 14px',
                borderRadius: '20px',
                border: `1px solid ${colors.primary}`,
              }}
            >
              15+ Countries Connected
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: '16px',
            }}
          >
            {countriesList.map((country, idx) => (
              <div
                key={idx}
                style={{
                  background: colors.bgTertiary,
                  border: `1px solid ${colors.borderColor}`,
                  padding: '14px 18px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.6rem' }}>{country.flag}</span>
                  <div>
                    <h5 style={{ fontSize: '0.92rem', fontWeight: 700, margin: 0, color: colors.textPrimary }}>
                      {country.name}
                    </h5>
                    <p style={{ fontSize: '0.72rem', color: colors.textMuted, margin: 0 }}>
                      {country.region}
                    </p>
                  </div>
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: colors.primary }}>
                  {country.clients} Projects
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Client Testimonials Carousel / Cards */}
        <div className="testimonials">
          <h3
            style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              color: colors.textPrimary,
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            What Our Clients Say
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="glass-card impact-card"
                style={{
                  padding: '28px',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: colors.textSecondary,
                      fontStyle: 'italic',
                      lineHeight: 1.6,
                      marginBottom: '20px',
                    }}
                  >
                    "{t.quote}"
                  </p>
                </div>

                <div
                  style={{
                    paddingTop: '14px',
                    borderTop: `1px solid ${colors.borderColor}`,
                  }}
                >
                  <h5 style={{ fontSize: '0.92rem', fontWeight: 700, margin: 0, color: colors.textPrimary }}>
                    {t.author}
                  </h5>
                  <p style={{ fontSize: '0.78rem', color: colors.primary, margin: 0, fontWeight: 600 }}>
                    {t.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
