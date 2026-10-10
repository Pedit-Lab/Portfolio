import { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { Services } from './components/Services';
import type { ServiceDetail } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProductsInnovations } from './components/ProductsInnovations';
import type { InnovationProduct } from './components/ProductsInnovations';
import { GlobalImpactStats } from './components/GlobalImpactStats';
import { CallToAction } from './components/CallToAction';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { useVisualMotion } from './hooks/useVisualMotion';
import { FloatingChat } from './components/FloatingChat';
import { Routes, Route } from 'react-router-dom';
import PricingPage from './pages/PricingPage';

function Portfolio() {
  useVisualMotion();
  const [activeSection, setActiveSection] = useState('hero');
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [product, setProduct] = useState<InnovationProduct | null>(null);

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
    <Navbar activeSection={activeSection} onOpenQuote={goToContact} />
    <main id="main">
      <Hero onOpenQuote={goToContact} />
      <AboutUs />
      <Services onSelectService={setService} />
      <WhyChooseUs />
      <ProductsInnovations onOpenProductModal={setProduct} />
      <GlobalImpactStats />
      <CallToAction onOpenQuote={goToContact} />
      <ContactSection />
    </main>
    <Footer />
    <ServiceDetailModal service={service} onClose={() => setService(null)} onOpenQuote={goToContact} />
    <ProductDetailModal product={product} onClose={() => setProduct(null)} onOpenQuote={goToContact} />
  </div>;
}

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
      <FloatingChat />
    </ThemeProvider>
  );
}
