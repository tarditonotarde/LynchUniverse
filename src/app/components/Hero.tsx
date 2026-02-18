import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  title: string;
  description: string;
  backgroundImage: string;
  onPlayClick?: () => void;
  onInfoClick?: () => void;
}

export function Hero({ title, description, backgroundImage, onPlayClick, onInfoClick }: HeroProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 660);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div 
      className="relative w-full overflow-hidden"
      style={{
        height: isMobile ? '70vh' : '90vh',
        minHeight: isMobile ? '500px' : '600px',
      }}
    >
      {/* Background image with parallax effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center 20%',
          opacity: 1,
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 60%, rgba(0, 0, 0, 0) 100%)',
          maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 60%, rgba(0, 0, 0, 0) 100%)',
        }}
      />

      {/* Gradient overlays - Netflix style */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0) 100%)',
        }}
      />
      <div 
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '50%',
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)',
        }}
      />

      {/* Content */}
      <div 
        className="relative h-full flex items-center"
        style={{
          padding: '0 var(--horizontal-padding)',
          paddingBottom: '150px',
        }}
      >
        <div style={{ 
          maxWidth: '40%', 
          minWidth: isMobile ? '100%' : '500px', 
          marginTop: '20vh',
          width: '100%',
        }}>
          {/* Title with staggered animation */}
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-6"
            style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: 900,
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              textShadow: '2px 2px 4px rgb(0 0 0 / 45%)',
            }}
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-6"
            style={{
              fontSize: 'clamp(12px, 1.4vw, 20px)',
              lineHeight: '1.4',
              color: 'var(--text-primary)',
              maxWidth: '100%',
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textShadow: '2px 2px 4px rgb(0 0 0 / 45%)',
            }}
          >
            {description}</motion.p>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center" 
            style={{ gap: '0.75rem' }}
          >
            {/* Play button */}
            <motion.button
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{
                scale: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              whileHover={{ 
                scale: 1.08, 
                backgroundColor: 'rgba(255, 255, 255, 0.25)' 
              }}
              whileTap={{ scale: 0.98 }}
              onClick={onPlayClick}
              className="flex items-center justify-center transition-all"
              style={{
                height: 'auto',
                padding: '0.4rem 1.2rem 0.4rem 1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                borderRadius: '4px',
                fontSize: '0.95rem',
                fontWeight: 600,
                gap: '0.4rem',
                border: 'none',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
                cursor: 'pointer',
              }}
            >
              <Play size={18} fill="white" color="white" strokeWidth={0} />
              Play
            </motion.button>

            {/* Info button */}
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(109, 109, 110, 0.7)',
              }}
              whileTap={{ scale: 0.98 }}
              onClick={onInfoClick}
              className="flex items-center justify-center transition-all"
              style={{
                height: 'auto',
                padding: '0.4rem 1.2rem 0.4rem 1rem',
                backgroundColor: 'rgba(109, 109, 110, 0.7)',
                color: 'white',
                borderRadius: '4px',
                fontSize: '0.95rem',
                fontWeight: 600,
                gap: '0.4rem',
                border: 'none',
              }}
            >
              <Info size={18} strokeWidth={2} />
              Fire Walk With Me
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}