import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import logoImg from '../assets/Logo.jpeg';

interface NavbarProps {
  onOpenQuote: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote, activeSection }) => {
  const { mode, toggleTheme, colors } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const precisePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!precisePointer.matches) {
      setNavHidden(false);
      return;
    }

    let idleTimer = window.setTimeout(() => setNavHidden(true), 2000);
    const showNavigation = () => {
      setNavHidden(false);
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        const header = document.querySelector('.premium-header');
        const focusedInside = header?.contains(document.activeElement) ?? false;
        if (!header?.matches(':hover') && !focusedInside && !mobileMenuOpen) {
          setNavHidden(true);
        }
      }, 2600);
    };

    window.addEventListener('pointermove', showNavigation, { passive: true });
    window.addEventListener('keydown', showNavigation);
    window.addEventListener('scroll', showNavigation, { passive: true });
    return () => {
      window.clearTimeout(idleTimer);
      window.removeEventListener('pointermove', showNavigation);
      window.removeEventListener('keydown', showNavigation);
      window.removeEventListener('scroll', showNavigation);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/#hero' },
    { name: 'About Us', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Students', href: '/#student-support' },
    { name: 'Why Us', href: '/#why-us' },
    { name: 'Projects', href: '/#products' },
    { name: 'Impact', href: '/#impact' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Contact Us', href: '/#contact' },
  ];

  return (
    <header
      className={`premium-header fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navHidden ? 'nav-is-hidden' : ''} ${
        scrolled ? 'glass-nav py-3 shadow-lg' : 'bg-transparent py-5'
      }`}
      onPointerEnter={() => setNavHidden(false)}
      onFocusCapture={() => setNavHidden(false)}
    >
      <div className="container-custom flex items-center justify-between" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo & Name */}
        <a href="/#hero" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div
            style={{
              position: 'relative',
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: `2px solid ${colors.primary}`,
              boxShadow: `0 0 15px ${colors.glowPrimary}`,
              background: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={logoImg}
              alt="PEDIT Lab Logo"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: 800, fontSize: '1.35rem', letterSpacing: '-0.5px', color: colors.textPrimary }}>
                PEDIT<span style={{ color: colors.primary }}> LAB</span>
              </span>
              <span
                style={{
                  background: 'rgba(0, 240, 255, 0.15)',
                  color: colors.primary,
                  border: `1px solid ${colors.primary}`,
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '6px',
                  textTransform: 'uppercase',
                }}
              >
                2026
              </span>
            </div>
            <p style={{ fontSize: '0.7rem', color: colors.textSecondary, letterSpacing: '0.5px', margin: 0, marginTop: '-2px' }}>
              Software, Design & Technology
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none', gap: '18px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                color: activeSection === link.href.replace('/#', '') ? colors.primary : colors.textSecondary,
                fontWeight: activeSection === link.href.replace('/#', '') ? 700 : 500,
                fontSize: '0.92rem',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                position: 'relative',
                padding: '4px 0',
              }}
            >
              {link.name}
              {activeSection === link.href.replace('/#', '') && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    borderRadius: '2px',
                    background: colors.primary,
                    boxShadow: `0 0 8px ${colors.primary}`,
                  }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Theme Toggle & CTA Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Light / Dark Mode Switcher Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Light/Dark Mode"
            title={`Switch to ${mode === 'dark' ? 'Light' : 'Dark'} Mode`}
            style={{
              background: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
              border: `1px solid ${colors.borderColor}`,
              color: colors.primary,
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {mode === 'dark' ? <Sun size={20} color={colors.primary} /> : <Moon size={20} color={colors.primary} />}
          </button>

          {/* Quick Quote CTA Button */}
          <button
            onClick={onOpenQuote}
            className="btn-primary desktop-nav"
            style={{
              padding: '10px 20px',
              fontSize: '0.88rem',
            }}
          >
            <span>Let's Talk</span>
            <ArrowRight size={16} />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: colors.textPrimary,
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
            }}
            className="mobile-toggle"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: colors.bgModal,
            borderBottom: `1px solid ${colors.borderColor}`,
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
          className="mobile-menu"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: colors.textPrimary,
                fontSize: '1.05rem',
                fontWeight: 600,
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: '8px',
                background: activeSection === link.href.replace('/#', '') ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
              }}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuote();
            }}
            className="btn-primary"
            style={{ marginTop: '12px', width: '100%', justifyContent: 'center' }}
          >
            <span>Let's Talk</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* Responsive Inline CSS Styles */}
      <style>{`
        @media (min-width: 1400px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 1399px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  );
};
