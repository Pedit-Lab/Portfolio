import { AnimatedBackground } from './AnimatedBackground';
import React from 'react';
import { Sparkles, Send, Mail, BriefcaseBusiness, GraduationCap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface CallToActionProps {
  onOpenQuote: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onOpenQuote }) => {
  const { colors, mode } = useTheme();

  return (
    <section id="cta" className="cta-section premium-section"
      style={{
        padding: '90px 0',
        position: 'relative',
        background: `radial-gradient(ellipse at 50% 50%, ${colors.glowPrimary} 0%, ${colors.bgPrimary} 100%)`,
        overflow: 'hidden',
      }}
    >
      <AnimatedBackground />
      <div className="container-custom">
        <div
          className="glass-card"
          style={{
            padding: '60px 40px',
            borderRadius: '32px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            border: `1px solid ${colors.borderGlow}`,
            boxShadow: `0 20px 50px -10px ${colors.glowPrimary}`,
          }}
        >
          {/* Background Ambient Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              left: '30%',
              width: '400px',
              height: '400px',
              background: colors.primary,
              filter: 'blur(150px)',
              opacity: 0.15,
              pointerEvents: 'none',
            }}
          />

          <div className="cta-visual" aria-hidden="true">
            <img
              src={mode === 'dark' ? '/visuals/innovation-lab-dark.svg' : '/visuals/innovation-lab.svg'}
              alt=""
            />
            <span className="cta-visual-orbit cta-visual-orbit-one" />
            <span className="cta-visual-orbit cta-visual-orbit-two" />
          </div>

          <div className="cta-copy" style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '30px',
                background: 'rgba(0, 240, 255, 0.15)',
                border: `1px solid ${colors.primary}`,
                marginBottom: '20px',
              }}
            >
              <Sparkles size={16} color={colors.primary} />
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: colors.primary, letterSpacing: '0.5px' }}>
                START YOUR PROJECT TODAY
              </span>
            </div>

            {/* Heading */}
            <h2
              className="flow-heading"
              style={{
                fontSize: 'clamp(2.3rem, 4.5vw, 3.4rem)',
                fontWeight: 800,
                color: colors.textPrimary,
                marginBottom: '20px',
                lineHeight: 1.15,
              }}
            >
              <span className="flow-heading-line">Ready to Build</span>
              <span className="flow-heading-line">Something Extraordinary?</span>
            </h2>

            {/* Body Text */}
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                color: colors.textSecondary,
                lineHeight: 1.6,
                marginBottom: '36px',
              }}
            >
              Tell us what you want to build. We will help shape the right solution and next steps.
            </p>

            {/* Button */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={onOpenQuote}
                className="btn-primary"
                style={{
                  padding: '16px 36px',
                  fontSize: '1.05rem',
                }}
              >
                <span>Contact Us Today</span>
                <Send size={18} />
              </button>

              <a
                href="mailto:hello@peditlab.com"
                className="btn-secondary"
                style={{
                  padding: '16px 32px',
                  fontSize: '1.05rem',
                  textDecoration: 'none',
                }}
              >
                <Mail size={18} color={colors.primary} />
                <span>hello@peditlab.com</span>
              </a>

              <a href="/pricing" className="btn-secondary cta-pricing-link">
                <BriefcaseBusiness size={18} />
                <span>Service Pricing</span>
              </a>

              <a href="/pricing?audience=student" className="btn-secondary cta-pricing-link">
                <GraduationCap size={18} />
                <span>Student Pricing</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
