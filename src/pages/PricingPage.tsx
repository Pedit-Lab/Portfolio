import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { useTheme } from '../context/ThemeContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SERVICES, calcBill, formatLKR, formatDays, formatAddonDays, getIncludedQty, CATEGORIES } from '../data/pricing';
import type { Plan } from '../data/pricing';
import './PricingPage.css';

import imgSoftware from '../assets/se.png';
import imgAiml from '../assets/ai.png';
import imgIot from '../assets/iot.png';
import imgDbcloud from '../assets/cloud.png';
import imgDataai from '../assets/data.png';
import imgNetwork from '../assets/network.png';

const WHATSAPP_NUMBER = '94770326202';
const MAX_ADDON_QTY = 10;

const SERVICE_IMAGES: Record<string, string> = {
  software: imgSoftware,
  aiml: imgAiml,
  iot: imgIot,
  dbcloud: imgDbcloud,
  dataai: imgDataai,
  network: imgNetwork,
};

const STEPS = [
  { n: 1, label: 'Select Service' },
  { n: 2, label: 'Plan & Add-ons' },
  { n: 3, label: 'Checkout' },
];

type Errors = { name?: string; email?: string; phone?: string };

export default function PricingPage() {
  const { colors } = useTheme();
  const [searchParams] = useSearchParams();
  const urlService = searchParams.get('service');
  const validUrlService = urlService && SERVICES.some((s) => s.id === urlService) ? urlService : null;

  // step: 1 = service, 2 = plan + addons, 3 = checkout, 4 = success
  const [step, setStep] = useState<1 | 2 | 3 | 4>(validUrlService ? 2 : 1);
  const [serviceId, setServiceId] = useState<string | null>(validUrlService);
  const [planId, setPlanId] = useState<string>('standard');
  const [qtyMap, setQtyMap] = useState<Record<string, number>>({});

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const service = SERVICES.find((s) => s.id === serviceId) ?? null;
  const plan: Plan | null = service ? service.plans.find((p) => p.id === planId) ?? service.plans[1] : null;
  const bill = useMemo(
    () => (service && plan ? calcBill(service, plan, qtyMap) : null),
    [service, plan, qtyMap]
  );

  // Handlers
  const handleSelectService = (id: string) => {
    if (id !== serviceId) {
      setServiceId(id);
      setPlanId('standard');
      setQtyMap({});
    }
  };

  const handleSelectPlan = (p: Plan) => {
    setPlanId(p.id);
    setQtyMap((prev) => {
      const next: Record<string, number> = {};
      service?.addons.forEach((addon) => {
        const oldIncluded = getIncludedQty(plan, addon.id);
        const newIncluded = getIncludedQty(p, addon.id);
        const current = prev[addon.id] !== undefined ? prev[addon.id] : oldIncluded;
        const extra = Math.max(0, current - oldIncluded);
        next[addon.id] = newIncluded + extra;
      });
      if (next.express && next.express > p.days - 1) {
        next.express = Math.max(p.days - 1, 0);
      }
      return next;
    });
  };

  const changeQty = (addonId: string, delta: number) => {
    if (!plan || !service) return;
    const min = getIncludedQty(plan, addonId);
    const current = qtyMap[addonId] !== undefined ? qtyMap[addonId] : min;
    const max = addonId === 'express' ? Math.max(plan.days - 1, 0) : min + MAX_ADDON_QTY;
    const nextVal = Math.min(max, Math.max(min, current + delta));
    setQtyMap((prev) => ({
      ...prev,
      [addonId]: nextVal,
    }));
  };

  const validate = (): boolean => {
    const e: Errors = {};
    if (!formData.name.trim()) e.name = 'Please enter your name or university.';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) e.email = 'Please enter a valid email address.';
    if (formData.phone.replace(/[^\d]/g, '').length < 9) e.phone = 'Please enter a valid WhatsApp number.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!service || !plan || !bill || !validate()) return;

    setIsSubmitting(true);

    const addonLines =
      bill.lines
        .slice(1)
        .map((l) => `- ${l.label} (${formatLKR(l.amount)})`)
        .join('\n') || 'No add-ons selected';

    const ref = 'PL-' + Date.now().toString(36).toUpperCase().slice(-6);

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          order_ref: ref,
          user_name: formData.name,
          user_email: formData.email,
          user_phone: formData.phone,
          service_name: service.name,
          package_name: `${plan.name} (${formatLKR(plan.price)})`,
          addons: addonLines,
          total_price: formatLKR(bill.total),
          duration: formatDays(bill.days),
          message: formData.notes || 'Order placed from Pricing Page',
        },
        'YOUR_PUBLIC_KEY'
      );
    } catch (error) {
      console.error('Email sending failed:', error);
    }

    const msg =
      `*New Order Request!* (${ref})\n\n` +
      `*Client:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Phone:* ${formData.phone}\n\n` +
      `*Service:* ${service.name}\n` +
      `*Plan:* ${plan.name} (${formatLKR(plan.price)})\n\n` +
      `*Add-ons:*\n${addonLines}\n\n` +
      `*Total:* ${formatLKR(bill.total)}\n` +
      `*Estimated Duration:* ${formatDays(bill.days)}\n\n` +
      `*Project Notes:* ${formData.notes || 'N/A'}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

    setOrderRef(ref);
    setWhatsappUrl(url);
    setIsSubmitting(false);
    setStep(4);
    window.open(url, '_blank');
  };

  const startNewOrder = () => {
    setStep(1);
    setServiceId(null);
    setPlanId('standard');
    setQtyMap({});
    setFormData({ name: '', email: '', phone: '', notes: '' });
    setErrors({});
    setOrderRef('');
    setWhatsappUrl('');
  };

  // Reusable components
  const Stepper = () => (
    <div className="wz-stepper" aria-label="Order progress">
      {STEPS.map((s, i) => {
        const done = step > s.n;
        const active = step === s.n;
        const clickable = done && step !== 4;
        return (
          <React.Fragment key={s.n}>
            <button
              type="button"
              className={`wz-step ${active ? 'active' : ''} ${done ? 'done' : ''}`}
              onClick={() => clickable && setStep(s.n as 1 | 2 | 3)}
              disabled={!clickable}
              aria-current={active ? 'step' : undefined}
            >
              <span className="wz-step-circle">{done ? '✓' : s.n}</span>
              <span className="wz-step-label">{s.label}</span>
            </button>
            {i < STEPS.length - 1 && <span className={`wz-step-line ${step > s.n ? 'done' : ''}`} />}
          </React.Fragment>
        );
      })}
    </div>
  );

  const OrderSummary = () =>
    service && plan && bill ? (
      <div className="glass-card wz-panel" style={{ position: 'sticky', top: '24px' }}>
        <h3 className="wz-title">Order Summary</h3>

        <div className="wz-sum-service">
          <img src={SERVICE_IMAGES[service.id]} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
          <div>
            <div style={{ fontWeight: 700, color: colors.textPrimary, fontSize: '0.95rem' }}>{service.name}</div>
            <div style={{ fontSize: '0.78rem', color: colors.textSecondary }}>{plan.name} plan</div>
          </div>
        </div>

        <div className="wz-sum-lines">
          {bill.lines.map((l, i) => (
            <div key={i} className="wz-sum-row">
              <span>{l.label}</span>
              <span style={{ whiteSpace: 'nowrap' }}>{formatLKR(l.amount)}</span>
            </div>
          ))}
          {bill.lines.length === 1 && (
            <div style={{ fontSize: '0.78rem', color: colors.textMuted }}>No add-ons selected</div>
          )}
        </div>

        <div className="wz-sum-total">
          <div className="wz-sum-row" style={{ marginBottom: 6 }}>
            <span>Estimated delivery</span>
            <span style={{ fontWeight: 600 }}>⏱ {formatDays(bill.days)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: colors.textPrimary }}>Total</span>
            <span style={{ fontSize: '1.9rem', fontWeight: 800, letterSpacing: '-1px', color: colors.textPrimary }}>
              {formatLKR(bill.total)}
            </span>
          </div>
        </div>
      </div>
    ) : null;

  const CheckoutSummary = () =>
    service && plan && bill ? (
      <div className="glass-card wz-panel">
        <h3 className="wz-title">Order Summary</h3>

        <div className="wz-sum-service">
          <img src={SERVICE_IMAGES[service.id]} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
          <div>
            <div style={{ fontWeight: 700, color: colors.textPrimary, fontSize: '0.95rem' }}>{service.name}</div>
            <div style={{ fontSize: '0.78rem', color: colors.textSecondary }}>{plan.name} plan</div>
          </div>
        </div>

        <table className="wz-table">
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Item</th>
              <th className="wz-col-delivery" style={{ textAlign: 'center' }}>Delivery</th>
              <th style={{ textAlign: 'right' }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {bill.lines.map((l, i) => (
              <tr key={i}>
                <td>{l.label}</td>
                <td className="wz-col-delivery" style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>{formatDays(l.days)}</td>
                <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>{formatLKR(l.amount)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td style={{ textAlign: 'left', fontWeight: 700, color: colors.textPrimary }}>Estimated Total</td>
              <td className="wz-col-delivery" style={{ textAlign: 'center', fontWeight: 700, color: colors.primary, whiteSpace: 'nowrap' }}>
                {formatDays(bill.days)}
              </td>
              <td style={{ textAlign: 'right', fontSize: '1.4rem', fontWeight: 800, color: colors.textPrimary }}>
                {formatLKR(bill.total)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    ) : null;

  return (
    <div className="restored-portfolio" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeSection="pricing" onOpenQuote={() => { window.location.href = '/#contact'; }} />

      

      <main id="main" className="premium-section pricing-page-main" style={{ flex: 1, paddingBottom: '80px' }}>
        <div className="container-custom">
          <div className="wz-header-row">
            <div className="wz-head">
              <h2>Service packages</h2>
              <p>Create your package with adding services what you want </p>
            </div>
            {step <= 3 && <Stepper />}
          </div>

          {/* STEP 1: SELECT SERVICE */}
          {step === 1 && (
            <div key="step1" className="wz-view">
              <div className="wz-services">
                {SERVICES.map((s) => {
                  const selected = serviceId === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      className={`glass-card wz-service ${selected ? 'selected' : ''}`}
                      onClick={() => handleSelectService(s.id)}
                      aria-pressed={selected}
                    >
                      {selected && <span className="wz-check">✓</span>}
                      <img className="wz-service-image" src={SERVICE_IMAGES[s.id]} alt="" aria-hidden="true" />
                      <h3>{s.name}</h3>
                      <ul className="wz-service-tags">
                        {CATEGORIES[s.id]?.slice(0, 5).map((cat, idx) => (
                          <li key={idx}>
                            <span className="wz-dot" />
                            <span className="tag-text">{cat.name}</span>
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>

              {service && (
                <div className="wz-bar">
                  <div className="wz-bar-info">
                    <small>Selected service</small>
                    <strong style={{ fontSize: '1rem' }}>{service.name}</strong>
                  </div>
                  <div className="wz-bar-actions">
                    <button className="btn-primary" onClick={() => setStep(2)} style={{ padding: '12px 28px' }}>
                      Continue →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: PLAN + ADD-ONS */}
          {step === 2 && service && plan && bill && (
            <div key="step2" className="wz-view">
              <div className="wz-split-layout">
                <div className="wz-split-left" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  {service.id === 'iot' && (
                    <div className="wz-iot-notice" style={{
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: 'rgba(152, 94, 58, 0.12)',
                      border: '1px solid rgba(211, 102, 34, 0.35)',
                      fontSize: '0.85rem',
                      lineHeight: 1.5,
                      color: colors.textPrimary,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px'
                    }}>
                      <span style={{ fontSize: '1.1rem' }}>🚨</span>
                      <div>
                        <strong>Hardware Note:</strong> Pricing does not include hardware costs (ESP32, sensors, motors, etc.). Required hardware must be supplied by the client or billed separately.
                      </div>
                    </div>
                  )}
                  <div className="wz-packages">
                  {service.plans.map((p) => {
                    const isSelected = plan.id === p.id;
                    return (
                      <div
                        key={p.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleSelectPlan(p)}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleSelectPlan(p)}
                        className={`glass-card wz-pkg ${isSelected ? 'selected' : ''}`}
                      >
                        {p.popular && <span className="wz-badge">Popular</span>}
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 8px', color: colors.textPrimary }}>{p.name}</h3>
                        <div className="wz-pkg-price" style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-1px', color: colors.textPrimary, marginBottom: '12px' }}>
                          {formatLKR(p.price)}
                        </div>
                        <span className="wz-chip">⏱ {formatDays(p.days)}</span>

                        <ul className="wz-features">
                          {p.features.map((f, i) => (
                            <li key={i}>
                              <span className="wz-dot" />
                              {f}
                            </li>
                          ))}
                        </ul>

                        <button
                          className={isSelected ? 'btn-primary' : 'btn-secondary'}
                          style={{ width: '100%', pointerEvents: 'none', padding: '11px', fontSize: '0.85rem' }}
                          tabIndex={-1}
                        >
                          {isSelected ? 'Selected' : 'Select Plan'}
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="glass-card wz-panel">
                  <h3 className="wz-title">Additional Features</h3>
                  <p className="wz-sub">Optional extras for {service.name}. Unit price and extra duration are shown for each item.</p>

                  <div className="wz-addons">
                    {service.addons.map((addon) => {
                      const included = getIncludedQty(plan, addon.id);
                      const qty = qtyMap[addon.id] !== undefined ? qtyMap[addon.id] : included;
                      const min = included;
                      const max = addon.id === 'express' ? Math.max(plan.days - 1, 0) : min + MAX_ADDON_QTY;
                      const extra = Math.max(0, qty - included);
                      const isExtra = extra > 0;

                      return (
                        <div key={addon.id} className={`wz-addon ${isExtra ? 'active' : ''}`}>
                          <div style={{ minWidth: 0 }}>
                            <div className="wz-addon-name">{addon.name}</div>
                            <div className="wz-addon-meta">
                              {formatLKR(addon.price)} / {addon.unit} · {formatAddonDays(addon.days)}
                            </div>
                          </div>
                          <div className="wz-qty">
                            <button
                              type="button"
                              aria-label={`Decrease ${addon.name}`}
                              disabled={qty <= min}
                              onClick={() => changeQty(addon.id, -1)}
                            >
                              −
                            </button>
                            <span style={{ fontWeight: 700 }}>{qty}</span>
                            <button
                              type="button"
                              aria-label={`Increase ${addon.name}`}
                              disabled={qty >= max}
                              onClick={() => changeQty(addon.id, 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                </div>
                {/* Right side: Sticky Order Summary (hidden on mobile via CSS) */}
                <div className="wz-order-summary-side">
                  <OrderSummary />
                </div>
              </div>

              <div className="wz-bar">
                <div className="wz-bar-info">
                  <small>
                    {service.name} · {plan.name} · ⏱ {formatDays(bill.days)}
                  </small>
                  <strong>{formatLKR(bill.total)}</strong>
                </div>
                <div className="wz-bar-actions">
                  <button className="btn-secondary" onClick={() => setStep(1)} style={{ padding: '12px 22px' }}>
                    ← Back
                  </button>
                  <button className="btn-primary" onClick={() => setStep(3)} style={{ padding: '12px 28px' }}>
                    Continue →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: CHECKOUT */}
          {step === 3 && service && plan && bill && (
            <div key="step3" className="wz-view">
              <div className="wz-checkout-layout">
                <form id="checkout-form" onSubmit={handleSubmit} noValidate className="glass-card wz-panel">
                  <h3 className="wz-title">Your Details</h3>
                  <p className="wz-sub">We will confirm your order through WhatsApp.</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="wz-field">
                      <label className="wz-label" htmlFor="co-name">
                        Name and University <span className="wz-req">*</span>
                      </label>
                      <input
                        id="co-name"
                        type="text"
                        placeholder="e.g. Kamal Perera - University of Moratuwa"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`input-field ${errors.name ? 'invalid' : ''}`}
                      />
                      {errors.name && <span className="wz-error">{errors.name}</span>}
                    </div>

                    <div className="wz-field">
                      <label className="wz-label" htmlFor="co-email">
                        Email Address <span className="wz-req">*</span>
                      </label>
                      <input
                        id="co-email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`input-field ${errors.email ? 'invalid' : ''}`}
                      />
                      {errors.email && <span className="wz-error">{errors.email}</span>}
                    </div>

                    <div className="wz-field">
                      <label className="wz-label" htmlFor="co-phone">
                        WhatsApp Number <span className="wz-req">*</span>
                      </label>
                      <input
                        id="co-phone"
                        type="tel"
                        placeholder="+94 7X XXX XXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`input-field ${errors.phone ? 'invalid' : ''}`}
                      />
                      {errors.phone && <span className="wz-error">{errors.phone}</span>}
                    </div>

                    <div className="wz-field">
                      <label className="wz-label" htmlFor="co-notes">
                        Project topic / requirements <span style={{ opacity: 0.65, fontWeight: 400, marginLeft: 4 }}>(optional)</span>
                      </label>
                      <textarea
                        id="co-notes"
                        placeholder="Briefly describe your project, deadline, university guidelines..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="input-field area"
                      />
                    </div>
                  </div>
                </form>

                <CheckoutSummary />
              </div>

              <div className="wz-bar">
                <div className="wz-bar-info">
                  <small>Total · ⏱ {formatDays(bill.days)}</small>
                  <strong>{formatLKR(bill.total)}</strong>
                </div>
                <div className="wz-bar-actions">
                  <button className="btn-secondary" type="button" onClick={() => setStep(2)} disabled={isSubmitting} style={{ padding: '12px 22px' }}>
                    ← Back
                  </button>
                  <button className="btn-primary" type="submit" form="checkout-form" disabled={isSubmitting} style={{ padding: '12px 28px' }}>
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SUCCESS */}
          {step === 4 && service && plan && bill && (
            <div key="step4" className="wz-view">
              <div className="glass-card wz-success">
                <div className="wz-success-icon">✓</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 8px', color: colors.textPrimary }}>Order Request Sent!</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: colors.textSecondary, margin: '0 0 20px' }}>
                  Thanks, {formData.name}. We will contact you on WhatsApp shortly to confirm the details.
                </p>

                <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 4, padding: '12px 22px', borderRadius: 14, background: 'color-mix(in srgb, var(--color-primary) 14%, transparent)', marginBottom: 24 }}>
                  <small style={{ color: colors.textSecondary }}>Order reference</small>
                  <strong style={{ fontSize: '1.2rem', letterSpacing: 1, color: colors.textPrimary }}>{orderRef}</strong>
                  <small style={{ color: colors.textSecondary }}>
                    {service.name} · {plan.name} · {formatDays(bill.days)} · {formatLKR(bill.total)}
                  </small>
                </div>

                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a className="btn-primary" href={whatsappUrl} target="_blank" rel="noreferrer" style={{ padding: '12px 24px', textDecoration: 'none' }}>
                    Open WhatsApp again
                  </a>
                  <button className="btn-secondary" onClick={startNewOrder} style={{ padding: '12px 24px' }}>
                    Start a new order
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}