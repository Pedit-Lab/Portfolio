import React from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import type { ServiceDetail } from './Services';

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose, onOpenQuote }) => {
  if (!service) return null;

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
            <div className="detail-modal-icon">{service.icon}</div>
            <div>
              <span>{service.category} · SERVICE</span>
              <h3 id="service-detail-title">{service.title}</h3>
            </div>
          </div>
        </div>

        <div className="detail-modal-content">
          <p className="detail-modal-lead">{service.description}</p>
          <div className="detail-modal-columns">
            <section>
              <h4>Core Engineering Highlights</h4>
              <div className="detail-feature-grid">
                {service.keyFeatures.map((feat) => (
                  <div className="detail-feature" key={feat}>
                    <CheckCircle2 size={17} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h4>Leveraged Platform Stack</h4>
              <div className="detail-tech-list">
                {service.technologies.map((tech) => <span key={tech}>{tech}</span>)}
              </div>
            </section>
          </div>
          <div className="detail-modal-actions">
            <button onClick={onClose} className="btn-secondary">Close</button>
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
