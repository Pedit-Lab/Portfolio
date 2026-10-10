import React from 'react';
import { AnimatedBackground } from './AnimatedBackground';
import { ArrowRight, Cpu, Cloud, Zap, Sparkles, Terminal, Brain } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
const heroImg = '/visuals/technology-sculpture.svg';
import logoImg from '../assets/Logo.jpeg';

interface HeroProps {
  onOpenQuote: () => void;
}

const heroMessages = [
  ['Building', 'Software That', 'Moves You', 'Forward.'],
  ['Applying', 'AI That Simplifies', 'Your Work.'],
  ['Engineering', 'Cloud Systems', 'That Scale.'],
  ['Connecting', 'Devices, Data', '& Decisions.'],
  ['Designing', 'Experiences People', 'Remember.'],
];

export const Hero: React.FC<HeroProps> = ({ onOpenQuote }) => {
  const { colors } = useTheme();

  return (
    <section
      id="hero"
      className="premium-section hero-section"
      style={{
        paddingTop: '140px',
        paddingBottom: '90px',
        position: 'relative',
        overflow: 'hidden',
        background: `radial-gradient(ellipse at 50% 0%, ${colors.glowPrimary} 0%, transparent 70%)`,
      }}
    >
      <AnimatedBackground />

      <div className="hero-depth-intro" aria-hidden="true">
        <div className="hero-depth-portal" />
        <img src="/visuals/hero-depth-hand.png" alt="" className="hero-depth-hand" />
        <div className="hero-depth-flash" />
      </div>

      <div className="container-custom hero-reveal-content" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '48px',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Hero Left Content */}
          <div className="hero-copy">
            {/* Status / Badge Tag */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '30px',
                background: 'rgba(0, 240, 255, 0.08)',
                border: `1px solid ${colors.borderGlow}`,
                marginBottom: '24px',
              }}
            >
              <Sparkles size={16} color={colors.primary} />
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: colors.primary, letterSpacing: '0.5px' }}>
                SOFTWARE / DESIGN / CLOUD / IoT / AI
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className="hero-rotating-title"
              aria-label="Building Software That Moves You Forward."
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-1.5px',
                marginBottom: '20px',
                color: colors.textPrimary,
              }}
            >
              <span className="hero-title-flow" aria-hidden="true">
                {heroMessages.map((lines, messageIndex) => (
                  <span
                    className="hero-title-message"
                    key={lines.join(' ')}
                  >
                    {lines.map((line, lineIndex) => (
                      <span
                        className={`hero-title-line${lineIndex > 0 ? ' gradient-text' : ''}`}
                        key={line}
                        style={{ animationDelay: `${3 + messageIndex * 7 + lineIndex * 0.42}s` }}
                      >
                        {line}
                      </span>
                    ))}
                  </span>
                ))}
              </span>
            </h1>

            {/* Sub-headline */}
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                color: colors.textSecondary,
                lineHeight: 1.6,
                marginBottom: '36px',
                maxWidth: '620px',
              }}
            >
              We build custom software that simplifies work and helps businesses grow. Practical AI automates work, cloud engineering keeps applications connected, and IoT brings real-world data into your systems. Thoughtful UI/UX and graphic design make it all easy to use.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
              {/* Primary Button */}
              <a href="#services" className="btn-primary" style={{ textDecoration: 'none' }}>
                <span>Explore Our Services</span>
                <ArrowRight size={18} />
              </a>

              {/* Secondary Button */}
              <button onClick={onOpenQuote} className="btn-secondary">
                <span>Let's Talk</span>
                <Terminal size={18} color={colors.primary} />
              </button>
            </div>

            {/* Micro Highlights Banner */}
            <div className="hero-highlights"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '16px',
                paddingTop: '20px',
                borderTop: `1px solid ${colors.borderColor}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(0, 240, 255, 0.1)' }}>
                  <Cpu size={18} color={colors.primary} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0, color: colors.textPrimary }}>Custom Software</h4>
                  <p style={{ fontSize: '0.72rem', color: colors.textMuted, margin: 0 }}>Web & Business Apps</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(112, 0, 255, 0.1)' }}>
                  <Cloud size={18} color={colors.accentPurple} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0, color: colors.textPrimary }}>AWS & GCP</h4>
                  <p style={{ fontSize: '0.72rem', color: colors.textMuted, margin: 0 }}>Cloud Arch</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)' }}>
                  <Zap size={18} color={colors.accentEmerald} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0, color: colors.textPrimary }}>Connected IoT</h4>
                  <p style={{ fontSize: '0.72rem', color: colors.textMuted, margin: 0 }}>Devices & Embedded Systems</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Brain size={24} color={colors.accentPurple} />
                <div><h4 style={{ fontSize: '0.85rem', margin: 0, color: colors.textPrimary }}>Practical AI</h4><p style={{ fontSize: '0.72rem', margin: 0, color: colors.textMuted }}>Insights & Automation</p></div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Card */}
          <div className="hero-art" style={{ position: 'relative' }}>
            <div
              className="glass-card animate-float"
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '24px',
                padding: '12px',
                border: `1px solid ${colors.borderGlow}`,
              }}
            >
              <div className="hero-art-stage" style={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', aspectRatio: '16/10' }}>
                <img
                  src={heroImg}
                  alt="PEDIT Lab Cybernetic Hardware & Cloud Ecosystem"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10, 14, 23, 0.8) 0%, transparent 60%)',
                  }}
                />

                {/* Overlay Floating Card 1: Cloud Telemetry */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    right: '20px',
                    background: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${colors.borderGlow}`,
                    padding: '14px 18px',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: '#10B981',
                        boxShadow: '0 0 10px #10B981',
                      }}
                    />
                    <div>
                      <h5 style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0, color: '#F8FAFC' }}>
                        Software & Cloud Connected
                      </h5>
                      <p style={{ fontSize: '0.72rem', color: '#94A3B8', margin: 0 }}>
                        Applications / APIs / Data / Automation
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      background: 'rgba(0, 240, 255, 0.2)',
                      color: '#00F0FF',
                      padding: '4px 10px',
                      borderRadius: '8px',
                    }}
                  >
                    99.99% Uptime
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Badge 2: Official Company Logo Card */}
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-10px',
                background: colors.bgModal,
                border: `1px solid ${colors.primary}`,
                borderRadius: '16px',
                padding: '12px 18px',
                boxShadow: `0 10px 25px ${colors.glowPrimary}`,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                zIndex: 4,
              }}
            >
              <img
                src={logoImg}
                alt="PEDIT Lab Logo"
                style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }}
              />
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: colors.textPrimary, display: 'block' }}>
                  PEDIT LAB
                </span>
                <span style={{ fontSize: '0.65rem', color: colors.primary, fontWeight: 700 }}>
                  INNOVATION READY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
        }
      `}</style>
    </section>
  );
};
