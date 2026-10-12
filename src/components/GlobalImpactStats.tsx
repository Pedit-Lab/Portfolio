import { AnimatedBackground } from './AnimatedBackground';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatedCounter } from './AnimatedCounter';
import { Globe, CheckCircle2, Users, Radio, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const GlobalImpactStats: React.FC = () => {
  const { colors } = useTheme();

  const metrics = [
    {
      value: '125+',
      label: 'Completed Projects',
      subtext: 'Projects delivered',
      icon: <CheckCircle2 size={28} color={colors.primary} />,
    },
    {
      value: '48+',
      label: 'Active Clients',
      subtext: 'Businesses and startups',
      icon: <Users size={28} color={colors.accentPurple} />,
    },
    {
      value: '15+',
      label: 'Countries Served',
      subtext: 'Global reach',
      icon: <Globe size={28} color={colors.accentCyan} />,
    },
    {
      value: '10k+',
      label: 'IoT Devices Synced',
      subtext: 'Connected devices',
      icon: <Radio size={28} color={colors.accentEmerald} />,
    },
  ];

  const countriesList = [
    { name: 'United States', code: 'USA', flag: '🇺🇸', clients: 14, region: 'North America' },
    { name: 'Germany', code: 'DEU', flag: '🇩🇪', clients: 8, region: 'Europe' },
    { name: 'Japan', code: 'JPN', flag: '🇯🇵', clients: 6, region: 'Asia-Pacific' },
    { name: 'Sri Lanka', code: 'LKA', flag: '🇱🇰', clients: 12, region: 'South Asia (HQ)' },
    { name: 'United Kingdom', code: 'GBR', flag: '🇬🇧', clients: 5, region: 'Europe' },
    { name: 'Australia', code: 'AUS', flag: '🇦🇺', clients: 4, region: 'Oceania' },
    { name: 'Singapore', code: 'SGP', flag: '🇸🇬', clients: 7, region: 'SE Asia' },
    { name: 'United Arab Emirates', code: 'ARE', flag: '🇦🇪', clients: 5, region: 'Middle East' },
  ];

  const testimonials = [
    {
      quote:
        'PEDIT Lab turned our automation hardware into a reliable real-time cloud dashboard.',
      author: 'Marcus Vance',
      role: 'CTO, OmniScale Systems (USA)',
      rating: 5,
    },
    {
      quote:
        'The application was fast, responsive, and better than we expected. Outstanding engineering.',
      author: 'Elena Rostova',
      role: 'Head of Product, CyberVantage Tech (Germany)',
      rating: 5,
    },
    {
      quote:
        'A rare team that understands both connected hardware and scalable cloud systems.',
      author: 'Kavinda Perera',
      role: 'Director of Innovation, SmartGrid IoT (Sri Lanka)',
      rating: 5,
    },
    {
      quote:
        'Their cloud deployment and API architecture reduced our data latency by over 60%.',
      author: 'David Miller',
      role: 'VP of Engineering, CloudCore Labs (Australia)',
      rating: 5,
    },
    {
      quote:
        'Intuitive UI and clean modular code. They delivered ahead of schedule with zero friction.',
      author: 'Sarah Jenkins',
      role: 'Chief Digital Officer, Nexus Retail (UK)',
      rating: 5,
    },
    {
      quote:
        'Impressive IoT sensor integration and AI capabilities. Reliable long-term technology partner.',
      author: 'Kenji Sato',
      role: 'Head of IoT Solutions, Mirai Robotics (Japan)',
      rating: 5,
    },
  ];

  // Carousel State: 3 visible cards, 4-second continuous rotation
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [cardOffset, setCardOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Pad items with first 3 items for infinite seamless sliding loop
  const displayItems = [...testimonials, ...testimonials.slice(0, 3)];

  const updateCardOffset = useCallback(() => {
    if (trackRef.current && trackRef.current.children.length > 1) {
      const first = trackRef.current.children[0] as HTMLElement;
      const second = trackRef.current.children[1] as HTMLElement;
      if (first && second) {
        const step = second.offsetLeft - first.offsetLeft;
        if (step > 0) {
          setCardOffset(step);
        }
      }
    }
  }, []);

  useEffect(() => {
    updateCardOffset();
    window.addEventListener('resize', updateCardOffset);
    return () => window.removeEventListener('resize', updateCardOffset);
  }, [updateCardOffset]);

  // 4s auto-advance rotation
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Handle wrap-around when reaching duplicate cards
  const handleTransitionEnd = () => {
    if (currentIndex >= testimonials.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(testimonials.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setCurrentIndex(testimonials.length - 1);
        });
      });
    } else {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <section
      id="impact"
      className="premium-section impact-section"
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
            <Globe size={14} color={colors.primary} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: colors.primary, letterSpacing: '0.5px' }}>
              GLOBAL FOOTPRINT & METRICS
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
            <span className="flow-heading-line">Our Track Record</span>
            <span className="flow-heading-line">&amp; Global Reach</span>
          </h2>

          <p style={{ fontSize: '1.05rem', color: colors.textSecondary, lineHeight: 1.6 }}>
            Proven delivery across projects, clients, countries, and connected devices.
          </p>
        </div>

        {/* 4 Counter Metric Cards */}
        <div className="metric-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
            marginBottom: '70px',
          }}
        >
          {metrics.map((m, i) => (
            <div
              key={i}
              className="glass-card impact-card"
              style={{
                padding: '28px',
                borderRadius: '20px',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${colors.borderColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                }}
              >
                {m.icon}
              </div>
              <h3
                className="gradient-text metric-value"
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  marginBottom: '4px',
                }}
              >
                <AnimatedCounter value={m.value} />
              </h3>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: colors.textPrimary, margin: '0 0 6px 0' }}>
                {m.label}
              </h4>
              <p style={{ fontSize: '0.8rem', color: colors.textMuted, margin: 0 }}>
                {m.subtext}
              </p>
            </div>
          ))}
        </div>

        {/* Global Client Countries Showcase */}
        <div
          className="glass-card global-network"
          style={{
            padding: '40px',
            borderRadius: '24px',
            marginBottom: '70px',
            border: `1px solid ${colors.borderGlow}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '28px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: colors.textPrimary, margin: 0 }}>
                International Client Locations
              </h3>
              <p style={{ fontSize: '0.88rem', color: colors.textSecondary, margin: '4px 0 0 0' }}>
                Supporting businesses around the world.
              </p>
            </div>
            <span
              style={{
                background: 'rgba(0, 240, 255, 0.15)',
                color: colors.primary,
                fontWeight: 700,
                fontSize: '0.82rem',
                padding: '6px 14px',
                borderRadius: '20px',
                border: `1px solid ${colors.primary}`,
              }}
            >
              15+ Countries Connected
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: '16px',
            }}
          >
            {countriesList.map((country, idx) => (
              <div
                key={idx}
                style={{
                  background: colors.bgTertiary,
                  border: `1px solid ${colors.borderColor}`,
                  padding: '14px 18px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.6rem' }}>{country.flag}</span>
                  <div>
                    <h5 style={{ fontSize: '0.92rem', fontWeight: 700, margin: 0, color: colors.textPrimary }}>
                      {country.name}
                    </h5>
                    <p style={{ fontSize: '0.72rem', color: colors.textMuted, margin: 0 }}>
                      {country.region}
                    </p>
                  </div>
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: colors.primary }}>
                  {country.clients} Projects
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Client Testimonials Carousel / 6 Dummy Comments (3 visible, 4s auto-rotation) */}
        <div
          className="testimonials"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '32px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: colors.textPrimary,
                  margin: 0,
                }}
              >
                What Our Clients Say
              </h3>
              <p style={{ fontSize: '0.88rem', color: colors.textSecondary, margin: '4px 0 0 0' }}>
                Trusted by technology founders and enterprise engineering teams worldwide.
              </p>
            </div>

            {/* Navigation buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="carousel-nav-btn"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${colors.borderColor}`,
                  color: colors.textPrimary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="carousel-nav-btn"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${colors.borderColor}`,
                  color: colors.textPrimary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Carousel Viewport */}
          <div
            style={{
              overflow: 'hidden',
              width: '100%',
              padding: '8px 2px',
            }}
          >
            <div
              ref={trackRef}
              onTransitionEnd={handleTransitionEnd}
              style={{
                display: 'flex',
                gap: '24px',
                transform: `translateX(-${currentIndex * cardOffset}px)`,
                transition: isTransitioning
                  ? 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)'
                  : 'none',
                willChange: 'transform',
              }}
            >
              {displayItems.map((t, idx) => (
                <div
                  key={idx}
                  className="glass-card impact-card testimonial-slide-card"
                  style={{
                    flex: '0 0 calc((100% - 48px) / 3)',
                    minWidth: '280px',
                    boxSizing: 'border-box',
                    padding: '28px',
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '220px',
                    position: 'relative',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '16px',
                      }}
                    >
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />
                        ))}
                      </div>
                      <Quote size={20} color={colors.primary} style={{ opacity: 0.4 }} />
                    </div>
                    <p
                      style={{
                        fontSize: '0.92rem',
                        color: colors.textSecondary,
                        fontStyle: 'italic',
                        lineHeight: 1.6,
                        marginBottom: '20px',
                      }}
                    >
                      "{t.quote}"
                    </p>
                  </div>

                  <div
                    style={{
                      paddingTop: '14px',
                      borderTop: `1px solid ${colors.borderColor}`,
                    }}
                  >
                    <h5 style={{ fontSize: '0.92rem', fontWeight: 700, margin: 0, color: colors.textPrimary }}>
                      {t.author}
                    </h5>
                    <p style={{ fontSize: '0.78rem', color: colors.primary, margin: 0, fontWeight: 600 }}>
                      {t.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator (6 dots) */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              marginTop: '28px',
            }}
          >
            {testimonials.map((_, dotIdx) => {
              const activeDot = currentIndex % testimonials.length;
              const isActive = activeDot === dotIdx;
              return (
                <button
                  key={dotIdx}
                  onClick={() => {
                    setIsTransitioning(true);
                    setCurrentIndex(dotIdx);
                  }}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  style={{
                    width: isActive ? '28px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: isActive ? colors.primary : 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                />
              );
            })}
          </div>

          <style>{`
            .carousel-nav-btn:hover {
              background: rgba(0, 240, 255, 0.15) !important;
              border-color: rgba(0, 240, 255, 0.5) !important;
              color: #00F0FF !important;
            }
            @media (max-width: 1023px) {
              .testimonial-slide-card {
                flex: 0 0 calc((100% - 24px) / 2) !important;
              }
            }
            @media (max-width: 639px) {
              .testimonial-slide-card {
                flex: 0 0 100% !important;
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};
