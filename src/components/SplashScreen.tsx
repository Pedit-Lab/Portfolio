import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SplashScreen.css';

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth <= 768 && window.innerHeight > window.innerWidth;
  });
  const [hasMobileVideo, setHasMobileVideo] = useState(false);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Auto-detect if user has placed a dedicated 9:16 vertical video at public/Intro-Mobile.mp4
    fetch('/Intro-Mobile.mp4', { method: 'HEAD' })
      .then((res) => {
        if (res.ok) setHasMobileVideo(true);
      })
      .catch(() => {
        // Fallback to standard video
      });

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768 && window.innerHeight > window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleVideoEnd = () => {
    setIsVisible(false);
    setTimeout(onComplete, 800);
  };

  const isDedicatedMobile = isMobile && hasMobileVideo;
  const currentVideoSrc = isDedicatedMobile ? '/Intro-Mobile.mp4' : '/Intro.mp4';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="splash-container"
        >
          {/* Ambient background glow */}
          <div className="splash-ambient-aura" />

          {/* Video: Uses intro-mobile.mp4 if present, else seamlessly adapts intro.mp4 */}
          <video 
            key={currentVideoSrc}
            src={currentVideoSrc} 
            autoPlay 
            muted 
            playsInline 
            onEnded={handleVideoEnd}
            onError={handleVideoEnd}
            className={isDedicatedMobile ? 'splash-video-mobile-full' : 'splash-video'}
          />

          {/* Feather overlay for landscape video on mobile */}
          {!isDedicatedMobile && <div className="splash-feather-overlay" />}

          {/* Skip intro button */}
          <button
            type="button"
            onClick={handleVideoEnd}
            className="splash-skip-btn"
          >
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};