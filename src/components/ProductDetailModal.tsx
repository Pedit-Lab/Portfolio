import React from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import type { InnovationProduct } from './ProductsInnovations';

interface ProductDetailModalProps {
  product: InnovationProduct | null;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onOpenQuote }) => {
  if (!product) return null;

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
        aria-labelledby="product-detail-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="detail-modal-close"
          aria-label="Close project details"
        >
          <X size={20} />
        </button>

        {/* Product Image & Banner */}
        <div className="detail-modal-hero">
          <img src={product.image} alt="" aria-hidden="true" />
          <div className="detail-modal-hero-shade" />
          <div className="detail-modal-heading">
            <div>
              <span>{product.category} · CONCEPT</span>
              <h3 id="product-detail-title">{product.name}</h3>
            </div>
          </div>
        </div>

        <div className="detail-modal-content">
          <p className="detail-modal-lead">
            {product.description} This is an idea, not an available product. The following specifications and performance figures are proposed targets, not validated results.
          </p>
          <div className="detail-modal-columns">
            <section>
              <h4>Proposed Technical Direction</h4>
              <div className="detail-spec-list">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key}>
                    <span>{key}</span>
                    <strong>{val}</strong>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h4>Planned Features & Targets</h4>
              <div className="detail-feature-grid">
                {product.features.map((feat) => (
                  <div className="detail-feature" key={feat}>
                    <CheckCircle2 size={17} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="detail-modal-actions">
            <button onClick={onClose} className="btn-secondary">Close</button>
            <button onClick={onOpenQuote} className="btn-primary">
              <span>Discuss This Idea</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
