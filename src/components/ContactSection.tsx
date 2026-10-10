import { AnimatedBackground } from './AnimatedBackground';
import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, Clock, MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { envConfig } from '../config/env';

export const ContactSection: React.FC = () => {
  const { colors } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Custom Software Development',
    budget: '$5,000 - $15,000',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Custom Software Development',
        budget: '$5,000 - $15,000',
        message: '',
      });
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="premium-section contact-section"
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
            <MessageSquare size={14} color={colors.primary} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: colors.primary, letterSpacing: '0.5px' }}>
              GET IN TOUCH WITH OUR ENGINEERS
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
            <span className="flow-heading-line">Contact</span>
            <span className="flow-heading-line">PEDIT Lab</span>
          </h2>

          <p style={{ fontSize: '1.05rem', color: colors.textSecondary, lineHeight: 1.6 }}>
            Planning a software product, a UI/UX or graphic design project, or a cloud, IoT, or AI solution? Tell us what you need and our team will respond within 24 hours.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '48px',
          }}
          className="contact-grid"
        >
          {/* Contact Information & Cards */}
          <div className="contact-info">
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: colors.textPrimary, marginBottom: '24px' }}>
              Direct Contact & Headquarters
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              {/* Email Card */}
              <a
                href={`mailto:${envConfig.companyEmail}`}
                className="glass-card"
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '14px',
                    background: 'rgba(0, 240, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Mail size={24} color={colors.primary} />
                </div>
                <div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: colors.textMuted, display: 'block' }}>
                    OFFICIAL EMAIL
                  </span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: colors.textPrimary }}>
                    {envConfig.companyEmail}
                  </span>
                </div>
              </a>

              {/* Location Card */}
              <div
                className="glass-card"
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '14px',
                    background: 'rgba(112, 0, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={24} color={colors.accentPurple} />
                </div>
                <div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: colors.textMuted, display: 'block' }}>
                    HEADQUARTERS LOCATION
                  </span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: colors.textPrimary }}>
                    {envConfig.companyLocation}
                  </span>
                </div>
              </div>

              {/* Phone Card */}
              <div
                className="glass-card"
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '14px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Phone size={24} color={colors.accentEmerald} />
                </div>
                <div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: colors.textMuted, display: 'block' }}>
                    DIRECT PHONE / WHATSAPP
                  </span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: colors.textPrimary }}>
                    {envConfig.companyPhone}
                  </span>
                </div>
              </div>
            </div>

            {/* Operating SLA Banner */}
            <div
              style={{
                background: colors.bgTertiary,
                border: `1px solid ${colors.borderColor}`,
                padding: '20px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <Clock size={24} color={colors.primary} />
              <div>
                <h5 style={{ fontSize: '0.9rem', fontWeight: 700, color: colors.textPrimary, margin: 0 }}>
                  24-Hour Engineer SLA
                </h5>
                <p style={{ fontSize: '0.78rem', color: colors.textMuted, margin: 0 }}>
                  Project consultations are handled by our software, design, cloud, IoT, and AI specialists.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Interactive Form */}
          <div
            className="glass-card"
            style={{
              padding: '40px',
              borderRadius: '24px',
              border: `1px solid ${colors.borderGlow}`,
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: `2px solid ${colors.accentEmerald}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px auto',
                  }}
                >
                  <CheckCircle2 size={38} color={colors.accentEmerald} />
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: colors.textPrimary, marginBottom: '12px' }}>
                  Message Received!
                </h3>
                <p style={{ fontSize: '0.98rem', color: colors.textSecondary, marginBottom: '28px', lineHeight: 1.6 }}>
                  Thank you for reaching out to PEDIT Lab. An engineering team representative will inspect your request and reply to your email shortly.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-secondary">
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: colors.textPrimary, marginBottom: '4px' }}>
                  Send Us a Project Inquiry
                </h3>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: colors.textPrimary,
                      marginBottom: '8px',
                    }}
                  >
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    className="input-field"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: colors.textPrimary,
                        marginBottom: '8px',
                      }}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      className="input-field"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: colors.textPrimary,
                        marginBottom: '8px',
                      }}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="input-field"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: colors.textPrimary,
                        marginBottom: '8px',
                      }}
                    >
                      Service Category
                    </label>
                    <select
                      className="input-field"
                      style={{ cursor: 'pointer' }}
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      <option value="Cloud Infrastructure & Backend Services">Cloud & Backend Dev</option>
                      <option value="Custom Software Development">Software Development</option>
                      <option value="UI/UX & Graphic Design">UI/UX & Graphic Design</option>
                      <option value="IoT & Embedded Systems Engineering">IoT & Hardware Engineering</option>
                      <option value="AI & Machine Learning Integration">AI & ML Models Integration</option>
                      <option value="Product Idea Discussion">Product Idea Discussion</option>
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: colors.textPrimary,
                        marginBottom: '8px',
                      }}
                    >
                      Estimated Budget
                    </label>
                    <select
                      className="input-field"
                      style={{ cursor: 'pointer' }}
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    >
                      <option value="Under $5,000">Under $5,000</option>
                      <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                      <option value="$15,000 - $50,000">$15,000 - $50,000</option>
                      <option value="$50,000+">$50,000 Enterprise</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: colors.textPrimary,
                      marginBottom: '8px',
                    }}
                  >
                    Project Description & Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your software requirements, design needs, cloud goals, IoT use case, or AI workflow..."
                    className="input-field"
                    style={{ resize: 'vertical' }}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
                >
                  {submitting ? (
                    <span>Encrypting & Dispatching...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .contact-grid {
            grid-template-columns: 0.9fr 1.1fr !important;
          }
        }
        @media (max-width: 600px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
