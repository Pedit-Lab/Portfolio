import { AnimatedBackground } from './AnimatedBackground';
import React from 'react';
import { Mail, MapPin, ArrowUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { envConfig } from '../config/env';
import logoImg from '../assets/Logo.jpeg';

export const Footer: React.FC = () => {
  const { colors } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="premium-footer"
      style={{
        background: colors.bgSecondary,
        borderTop: `1px solid ${colors.borderColor}`,
        paddingTop: '70px',
        paddingBottom: '30px',
        position: 'relative',
      }}
    >
      <AnimatedBackground />
      <div className="container-custom">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '60px',
          }}
        >
          {/* Column 1: Company Logo & Overview */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img
                src={logoImg}
                alt="PEDIT Lab Logo"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                  border: `2px solid ${colors.primary}`,
                }}
              />
              <span style={{ fontWeight: 800, fontSize: '1.4rem', color: colors.textPrimary }}>
                PEDIT<span style={{ color: colors.primary }}> LAB</span>
              </span>
            </div>

            <p style={{ fontSize: '0.9rem', color: colors.textSecondary, lineHeight: 1.6, marginBottom: '20px' }}>
              Clear, reliable digital products for growing businesses.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              {/* LinkedIn SVG */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: colors.bgTertiary,
                  border: `1px solid ${colors.borderColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.primary,
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.77a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/>
                </svg>
              </a>

              {/* Facebook SVG */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: colors.bgTertiary,
                  border: `1px solid ${colors.borderColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.primary,
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.89h-2.34v6.99C18.34 21.12 22 16.99 22 12z"/>
                </svg>
              </a>

              {/* Twitter SVG */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: colors.bgTertiary,
                  border: `1px solid ${colors.borderColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.primary,
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.56 8.56 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: colors.textPrimary, marginBottom: '20px' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[['Home', '#hero'], ['About Us', '#about'], ['Services', '#services'], ['Why Us', '#why-us'], ['Product Ideas', '#products'], ['Impact & Stats', '#impact'], ['Contact Us', '#contact']].map(([item, href]) => {
                return (
                  <li key={item}>
                    <a
                      href={href}
                      style={{
                        color: colors.textSecondary,
                        fontSize: '0.9rem',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Engineering Services */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: colors.textPrimary, marginBottom: '20px' }}>
              Services Stack
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ color: colors.textSecondary, fontSize: '0.9rem' }}>Custom Software & Web Applications</li>
              <li style={{ color: colors.textSecondary, fontSize: '0.9rem' }}>UI/UX & Graphic Design</li>
              <li style={{ color: colors.textSecondary, fontSize: '0.9rem' }}>Cloud Infrastructure & Backend Services</li>
              <li style={{ color: colors.textSecondary, fontSize: '0.9rem' }}>IoT & Embedded Systems</li>
              <li style={{ color: colors.textSecondary, fontSize: '0.9rem' }}>AI Models & Machine Learning</li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: colors.textPrimary, marginBottom: '20px' }}>
              Headquarters
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Mail size={18} color={colors.primary} style={{ marginTop: '3px' }} />
                <div>
                  <span style={{ fontSize: '0.75rem', color: colors.textMuted, display: 'block' }}>Email Support</span>
                  <a
                    href={`mailto:${envConfig.companyEmail}`}
                    style={{ color: colors.textPrimary, fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}
                  >
                    {envConfig.companyEmail}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={18} color={colors.primary} style={{ marginTop: '3px' }} />
                <div>
                  <span style={{ fontSize: '0.75rem', color: colors.textMuted, display: 'block' }}>Location</span>
                  <span style={{ color: colors.textPrimary, fontWeight: 600, fontSize: '0.88rem' }}>
                    {envConfig.companyLocation}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: `1px solid ${colors.borderColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p style={{ fontSize: '0.85rem', color: colors.textMuted, margin: 0 }}>
            © 2026 PEDIT Lab. All rights reserved. Built with care for software & innovation.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontSize: '0.85rem', color: colors.textMuted }}>
              Socials: LinkedIn | Facebook | Twitter
            </span>
            <button
              onClick={scrollToTop}
              aria-label="Scroll to Top"
              style={{
                background: colors.bgTertiary,
                border: `1px solid ${colors.borderColor}`,
                color: colors.primary,
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
