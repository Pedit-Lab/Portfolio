import { useEffect, useRef, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { Services } from './components/Services';
import { StudentProjectSupport } from './components/StudentProjectSupport';
import type { ServiceDetail } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProductsInnovations } from './components/ProductsInnovations';
import type { InnovationProduct } from './components/ProductsInnovations';
import { GlobalImpactStats } from './components/GlobalImpactStats';
import { CallToAction } from './components/CallToAction';
import { ContactSection } from './components/ContactSection';
import { FrequentlyAskedQuestions } from './components/FrequentlyAskedQuestions';
import { Footer } from './components/Footer';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { useVisualMotion } from './hooks/useVisualMotion';
import { useSectionTransition } from './hooks/useSectionTransition';
import { ParticleTransition } from './components/ParticleTransition';
import type { ParticleTransitionHandle } from './components/ParticleTransition';
import { FloatingChat } from './components/FloatingChat';
import { Routes, Route } from 'react-router-dom';
import PricingPage from './pages/PricingPage';
import { SplashScreen } from './components/SplashScreen';

function PortfolioEntry() {
  return <Portfolio />;
}

function Portfolio() {
  useVisualMotion();
  const [activeSection, setActiveSection] = useState('hero');
  const particleRef = useRef<ParticleTransitionHandle | null>(null);
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [product, setProduct] = useState<InnovationProduct | null>(null);

  useSectionTransition({ particleRef, activeSection });

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId || targetId === 'hero') return;

    const scrollToTarget = () => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'auto', block: 'start' });
    };
    const frame = window.requestAnimationFrame(() => window.requestAnimationFrame(scrollToTarget));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const goToContact = () => {
    setService(null);
    setProduct(null);
    window.setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(window.history.state, '', '#contact');
    }, 0);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: '-15% 0px -55% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!service && !product) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setService(null);
        setProduct(null);
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [service, product]);

  return <div className="restored-portfolio">
    <a className="skip-link" href="#main">Skip to content</a>
    <ParticleTransition ref={particleRef} />
    <Navbar activeSection={activeSection} onOpenQuote={goToContact} />
    <main id="main">
      <Hero onOpenQuote={goToContact} />
      <AboutUs />
      <Services onSelectService={setService} />
      <StudentProjectSupport />
      <WhyChooseUs />
      <ProductsInnovations onOpenProductModal={setProduct} />
      <GlobalImpactStats />
      <FrequentlyAskedQuestions />
      <CallToAction onOpenQuote={goToContact} />
      <ContactSection />
    </main>
    <Footer />
    <ServiceDetailModal service={service} onClose={() => setService(null)} onOpenQuote={goToContact} />
    <ProductDetailModal product={product} onClose={() => setProduct(null)} onOpenQuote={goToContact} />
  </div>;
}

export default function App() {
  // Intro video only plays on root home page without hash deep-links
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.location.pathname === '/' && !window.location.hash;
  });

  return (
    <ThemeProvider>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {/* Video eka iwara una gaman Portfolio eka mount wenawa, 
          ethakota Hero section eke robot hand animation eka first frame eke sita play wenawa! */}
      {!showSplash && (
        <div style={{ animation: 'hero-concept-load 0.8s ease-out' }}>
          <Routes>
            <Route path="/" element={<PortfolioEntry />} />
            <Route path="/pricing" element={<PricingPage />} />
          </Routes>
          <FloatingChat />
        </div>
      )}
    </ThemeProvider>
  );
}
