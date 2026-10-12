import React from 'react';
import {
  X,
  CheckCircle2,
  ArrowRight,
  Tag,
  PackageCheck,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ServiceDetail } from './Services';

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose, onOpenQuote }) => {
  const navigate = useNavigate();

  if (!service) return null;

  const handlePricing = () => {
    onClose();
    const serviceMap: Record<string, string> = {
      'service-1': 'dbcloud',
      'service-2': 'software',
      'service-3': 'iot',
      'service-4': 'aiml',
      'service-5': 'software',
    };
    const mappedId = serviceMap[service.id];
    if (mappedId) {
      navigate(`/pricing?service=${mappedId}`);
    } else {
      navigate('/pricing');
    }
  };

  return (
    <div
      className="detail-modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="glass-modal detail-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-detail-title"
      >
        <button
          onClick={onClose}
          className="detail-modal-close"
          aria-label="Close service details"
        >
          <X size={20} />
        </button>

        <div className="detail-modal-hero">
          <img src={service.image} alt="" aria-hidden="true" />
          <div className="detail-modal-hero-shade" />
          <div className="detail-modal-heading">
            <div className={`detail-modal-icon service-icon-motion service-icon-${service.id}`}>{service.icon}</div>
            <div>
              <span>{service.category} · SERVICE</span>
              <h3 id="service-detail-title">{service.title}</h3>
            </div>
          </div>
        </div>

        <div className="detail-modal-content">
          <p className="detail-modal-lead">{service.description}</p>
          {service.detailedOverview && (
            <p className="detail-modal-overview">{service.detailedOverview}</p>
          )}

          {service.specifications && service.specifications.length > 0 && (
            <div className="detail-kpi-grid">
              {service.specifications.map((spec) => (
                <div className="detail-kpi-card" key={spec.label}>
                  <span>{spec.label}</span>
                  <strong>{spec.value}</strong>
                </div>
              ))}
            </div>
          )}

          <div className="detail-modal-columns">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <section>
                <h4>
                  <Sparkles size={16} color="#00F0FF" />
                  <span>Core Engineering Highlights</span>
                </h4>
                <div className="detail-feature-grid">
                  {service.keyFeatures.map((feat) => (
                    <div className="detail-feature" key={feat}>
                      <CheckCircle2 size={17} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </section>

              {service.deliverables && service.deliverables.length > 0 && (
                <section>
                  <h4>
                    <PackageCheck size={16} color="#00F0FF" />
                    <span>Production Deliverables</span>
                  </h4>
                  <div className="detail-deliverables-grid">
                    {service.deliverables.map((item) => (
                      <div className="detail-deliverable-item" key={item}>
                        <ShieldCheck size={16} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <section>
                <h4>
                  <Cpu size={16} color="#00F0FF" />
                  <span>Leveraged Platform Stack</span>
                </h4>
                <div className="detail-tech-list">
                  {service.technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </section>

              {service.specifications && service.specifications.length > 0 && (
                <section>
                  <h4>
                    <Layers size={16} color="#00F0FF" />
                    <span>Engineering Standards</span>
                  </h4>
                  <div className="detail-spec-list">
                    {service.specifications.map((spec) => (
                      <div key={spec.label}>
                        <span>{spec.label}</span>
                        <strong>{spec.value}</strong>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>

          <div className="detail-modal-actions" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button onClick={onClose} className="btn-secondary">Close</button>
            <button
              onClick={handlePricing}
              className="btn-pricing"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 24px',
                borderRadius: '10px',
                fontWeight: 750,
                fontSize: '0.94rem',
                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.18), rgba(32, 100, 239, 0.28))',
                border: '1px solid rgba(0, 240, 255, 0.6)',
                color: '#00F0FF',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 0 15px rgba(0, 240, 255, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 240, 255, 0.32), rgba(32, 100, 239, 0.45))';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 240, 255, 0.45)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 240, 255, 0.18), rgba(32, 100, 239, 0.28))';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Tag size={17} />
              <span>Pricing</span>
            </button>
            <button onClick={onOpenQuote} className="btn-primary">
              <span>Request Architecture Consultation</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
