import { AnimatedBackground } from './AnimatedBackground';
import React from 'react';
import { PentagonShowcase } from './PentagonShowcase';
import { Cpu as Microchip, ArrowRight, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export interface InnovationProduct {
  id: string;
  name: string;
  tagline: string;
  category: 'Software Development' | 'AI' | 'Cloud' | 'IoT' | 'UI/UX & Design';
  description: string;
  features: string[];
  specs: { [key: string]: string };
  image: string;
}

interface ProductsInnovationsProps {
  onOpenProductModal: (product: InnovationProduct) => void;
}

export const ProductsInnovations: React.FC<ProductsInnovationsProps> = ({ onOpenProductModal }) => {
  const { colors } = useTheme();

  const products: InnovationProduct[] = [
  {
    "id": "software",
    "name": "BizFlow \u2014 Business Operations",
    "tagline": "One workspace for orders, inventory, and customer accounts",
    "category": "Software Development",
    "description": "A sample business application for small teams to manage orders, track inventory, and maintain customer records in one workspace. The concept includes role-based access, searchable records, and reporting, with separate customer and staff journeys. It demonstrates how custom software can replace disconnected spreadsheets and support everyday operations.",
    "features": [
      "Order and inventory management",
      "Customer portal and staff workspaces",
      "Role-based access and business reports",
      "API integrations and automated task reminders"
    ],
    "specs": {
      "Frontend": "React & TypeScript",
      "Backend": "Node.js REST API",
      "Database": "PostgreSQL",
      "Delivery": "Responsive web application"
    },
    "image": "/concepts/software.svg"
  },
  {
    "id": "ai",
    "name": "DocPilot \u2014 Document Assistant",
    "tagline": "Turn business documents into useful answers",
    "category": "AI",
    "description": "A sample AI assistant for searching policies, manuals, and business documents. Users could ask questions, review answers with source references, and confirm extracted information before using it in a workflow.",
    "features": [
      "Document search with source references",
      "Structured information extraction",
      "Human review and feedback"
    ],
    "specs": {
      "Approach": "Retrieval-augmented generation",
      "Stack": "Python & LLM APIs",
      "Knowledge": "Document ingestion & vector search",
      "Review": "Source checks and human approval"
    },
    "image": "/concepts/ai.svg"
  },
  {
    "id": "cloud",
    "name": "DeployDock \u2014 Cloud Delivery",
    "tagline": "A clear path from commit to deployment",
    "category": "Cloud",
    "description": "A sample cloud engineering project for deploying a web application across staging and production. It brings together container hosting, automated build checks, service monitoring, and backup planning in a repeatable release workflow.",
    "features": [
      "Automated build and release pipeline",
      "Service health and log monitoring",
      "Environment management and recovery planning"
    ],
    "specs": {
      "Hosting": "AWS container services",
      "Automation": "GitHub Actions & Terraform",
      "Packaging": "Docker",
      "Operations": "Logs, alerts & database backups"
    },
    "image": "/concepts/cloud.svg"
  },
  {
    "id": "iot",
    "name": "GrowSense \u2014 Smart Greenhouse",
    "tagline": "Make growing conditions visible",
    "category": "IoT",
    "description": "A sample connected greenhouse system that collects soil moisture, temperature, and humidity readings. The concept pairs an embedded sensor device with a monitoring dashboard, configurable alerts, and manual irrigation controls.",
    "features": [
      "Soil moisture and environmental readings",
      "Threshold alerts and device status",
      "Remote irrigation control with manual override"
    ],
    "specs": {
      "Device": "ESP32 sensor prototype",
      "Sensors": "Soil moisture, temperature & humidity",
      "Messaging": "MQTT",
      "Controls": "Irrigation relay & manual override"
    },
    "image": "/concepts/iot.svg"
  },
  {
    "id": "design",
    "name": "CarePath \u2014 Appointment Experience",
    "tagline": "A simpler booking journey",
    "category": "UI/UX & Design",
    "description": "A sample clinic booking experience with user journeys, accessible screens, and a consistent visual identity.",
    "features": [
      "Booking flow, prototype & design system"
    ],
    "specs": {
      "Tool": "Figma",
      "Deliverables": "User flow, clickable prototype & visual system"
    },
    "image": "/concepts/design.svg"
  }
];

  return (
    <section
      id="products"
      className="premium-section products-section"
      style={{
        padding: '100px 0',
        position: 'relative',
        background: colors.bgSecondary,
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
              background: 'rgba(16, 185, 129, 0.1)',
              border: `1px solid ${colors.accentEmerald}`,
              marginBottom: '16px',
            }}
          >
            <Microchip size={14} color={colors.accentEmerald} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: colors.accentEmerald, letterSpacing: '0.5px' }}>
              ILLUSTRATIVE PROJECTS
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
            <span className="flow-heading-line">Sample Project</span>
            <span className="flow-heading-line">Concepts</span>
          </h2>

          <p style={{ fontSize: '1.05rem', color: colors.textSecondary, lineHeight: 1.6 }}>
            Sample projects showing how our software, AI, cloud, IoT, and design services could solve practical problems. These are illustrative concepts, not completed client work or available products.
          </p>
        </div>

        {/* Software leads; AI, cloud and IoT share equal space; design stays compact. */}
        <PentagonShowcase items={products} title={prod => prod.name} label={prod => prod.category === 'Software Development' ? 'Software' : prod.category}>
          {(prod) => (
            <div
              key={prod.id}
              className={`glass-card concept-project concept-${prod.id}`}
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Product Image */}
                <div className="concept-preview" style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }}>
                  <img
                    loading="lazy"
                    width="1200"
                    height="760"
                    src={prod.image}
                    alt={`${prod.name} — illustrative interface concept`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      background: 'rgba(15, 23, 42, 0.85)',
                      backdropFilter: 'blur(10px)',
                      color: colors.primary,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '4px 12px',
                      borderRadius: '8px',
                      border: `1px solid ${colors.borderGlow}`,
                    }}
                  >
                    Concept · {prod.category}
                  </div>
                </div>

                {/* Product Details */}
                <div className="concept-details" style={{ padding: '28px' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: colors.textPrimary, margin: '0 0 4px 0' }}>
                    {prod.name}
                  </h3>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: colors.primary, margin: '0 0 16px 0' }}>
                    {prod.tagline}
                  </p>
                  <p style={{ fontSize: '0.92rem', color: colors.textSecondary, lineHeight: 1.6, marginBottom: '20px' }}>
                    {prod.description}
                  </p>

                  {/* Highlights */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                    {prod.features.slice(0, 3).map((feat, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Check size={16} color={colors.accentEmerald} />
                        <span style={{ fontSize: '0.82rem', color: colors.textPrimary }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div style={{ padding: '0 28px 28px 28px' }}>
                <button
                  onClick={() => onOpenProductModal(prod)}
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Explore Project Concept</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </PentagonShowcase>
      </div>
    </section>
  );
};
