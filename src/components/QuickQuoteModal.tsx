import React, { useState } from 'react';
import { X, Send, CheckCircle2, Terminal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickQuoteModal: React.FC<QuickQuoteModalProps> = ({ isOpen, onClose }) => {
  const { colors } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Custom Software Development',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        onClose();
      }, 2000);
    }, 1000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="glass-modal"
        style={{
          width: '100%',
          maxWidth: '540px',
          borderRadius: '24px',
          padding: '36px',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: colors.bgTertiary,
            border: `1px solid ${colors.borderColor}`,
            color: colors.textPrimary,
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <X size={20} />
        </button>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <CheckCircle2 size={50} color={colors.accentEmerald} style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: colors.textPrimary, marginBottom: '8px' }}>
              Consultation Dispatched!
            </h3>
            <p style={{ fontSize: '0.9rem', color: colors.textSecondary }}>
              Our engineering team will contact you at <strong>{formData.email}</strong> shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Terminal size={22} color={colors.primary} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: colors.textPrimary, margin: 0 }}>
                Let's Talk Technology
              </h3>
            </div>

            <p style={{ fontSize: '0.88rem', color: colors.textSecondary, margin: 0, lineHeight: 1.5 }}>
              Tell PEDIT Lab about your software idea, design brief, cloud needs, IoT project, or AI workflow.
            </p>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: colors.textPrimary, marginBottom: '6px' }}>
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="Full Name"
                className="input-field"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: colors.textPrimary, marginBottom: '6px' }}>
                Work Email *
              </label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                className="input-field"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: colors.textPrimary, marginBottom: '6px' }}>
                Project Focus
              </label>
              <select
                className="input-field"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              >
                <option value="Cloud Infrastructure & Backend Services">Custom Cloud & Backend Dev (AWS/GCP/Mongo)</option>
                <option value="Custom Software Development">Custom Software Development</option>
                <option value="UI/UX & Graphic Design">UI/UX & Graphic Design</option>
                      <option value="IoT & Embedded Systems Engineering">IoT & Embedded Systems</option>
                <option value="AI & Machine Learning Integration">AI & Machine Learning Integration</option>
                <option value="Product Idea Discussion">Discuss a Product Idea</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: colors.textPrimary, marginBottom: '6px' }}>
                Project Overview / Requirements *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Briefly describe what you'd like us to engineer..."
                className="input-field"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button type="submit" disabled={submitting} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '6px' }}>
              {submitting ? <span>Dispatching...</span> : (
                <>
                  <span>Send Consultation Request</span>
                  <Send size={16} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
