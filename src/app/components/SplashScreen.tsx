import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAudio } from '../contexts/AudioContext';

interface SplashScreenProps {
  profile: 'conspiranoia' | 'morpheo' | 'paw';
  onComplete: () => void;
}

export function SplashScreen({ profile, onComplete }: SplashScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { startAudio } = useAudio();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 660);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const configs = {
    conspiranoia: {
      color: '#E50914',
      name: 'LynchUniverse',
      gradient: 'radial-gradient(circle, rgba(229,9,20,0.3) 0%, rgba(0,0,0,1) 70%)',
    },
    morpheo: {
      color: '#3B82F6',
      name: 'MORPHEO+',
      gradient: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(0,0,0,1) 70%)',
    },
    paw: {
      color: '#16A34A',
      name: 'PAW+',
      gradient: 'radial-gradient(circle, rgba(22,163,74,0.2) 0%, rgba(0,0,0,1) 70%)',
    },
  };

  const config = configs[profile];

  useEffect(() => {
    // Start audio on mount
    startAudio();

    // Start exit transition after logo animation
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      // Complete after fade out
      setTimeout(onComplete, 1200);
    }, 3500);

    return () => clearTimeout(exitTimer);
  }, [onComplete, startAudio]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: isExiting ? 1.2 : 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#000000',
          backgroundImage: 'url(https://wallpapers.com/images/featured-full/twin-peaks-nlw8kl70650w8gsx.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          overflow: 'hidden',
        }}
      >
        {/* Animated dark overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isExiting ? 1 : 0.75 }}
          transition={{ duration: isExiting ? 1.2 : 0.8 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.9) 100%)',
            zIndex: 0,
          }}
        />

        {/* Smoke/Fog Effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          {/* Gray smoke layers */}
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              animate={{
                x: ['-30%', '130%'],
                y: [
                  `${Math.random() * 15}%`,
                  `${Math.random() * 15 + 25}%`,
                  `${Math.random() * 15}%`,
                ],
                opacity: [0.15, 0.25, 0.30, 0.25, 0.15],
                scale: [0.9, 1.3, 1.1, 1.4, 1],
              }}
              transition={{
                duration: 30 + index * 3,
                repeat: Infinity,
                ease: 'linear',
                delay: index * 2,
              }}
              style={{
                position: 'absolute',
                top: `${index * 15}%`,
                left: '-30%',
                width: '90%',
                height: '40%',
                borderRadius: '50%',
                background: `radial-gradient(ellipse at center, 
                  rgba(120, 120, 140, ${0.35 - index * 0.04}) 0%, 
                  rgba(80, 80, 100, ${0.25 - index * 0.03}) 35%, 
                  rgba(60, 60, 80, ${0.12 - index * 0.02}) 65%, 
                  transparent 100%)`,
                filter: `blur(${45 + index * 8}px)`,
                mixBlendMode: 'screen',
              }}
            />
          ))}

          {/* Red fog for Lynch aesthetic */}
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={`red-${index}`}
              animate={{
                x: ['130%', '-30%'],
                y: [
                  `${Math.random() * 25 + 35}%`,
                  `${Math.random() * 25 + 25}%`,
                  `${Math.random() * 25 + 35}%`,
                ],
                opacity: [0.10, 0.15, 0.18, 0.15, 0.10],
                scale: [1.1, 1.5, 1.3, 1.6, 1.2],
              }}
              transition={{
                duration: 40 + index * 6,
                repeat: Infinity,
                ease: 'linear',
                delay: index * 3,
              }}
              style={{
                position: 'absolute',
                top: `${30 + index * 20}%`,
                left: '130%',
                width: '75%',
                height: '50%',
                borderRadius: '50%',
                background: `radial-gradient(ellipse at center, 
                  rgba(229, 9, 20, ${0.22 - index * 0.04}) 0%, 
                  rgba(200, 15, 25, ${0.15 - index * 0.03}) 35%, 
                  rgba(150, 15, 25, ${0.08 - index * 0.02}) 65%, 
                  transparent 100%)`,
                filter: `blur(${65 + index * 12}px)`,
                mixBlendMode: 'screen',
              }}
            />
          ))}

          {/* Bottom fog */}
          <motion.div
            animate={{
              opacity: [0.15, 0.20, 0.18, 0.20, 0.15],
              scale: [1, 1.05, 1.03, 1.05, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '60%',
              background: 'radial-gradient(ellipse at bottom, rgba(0, 0, 0, 0.5) 0%, rgba(20, 20, 30, 0.3) 40%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        </div>

        {/* Vignette effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.8) 100%)',
            zIndex: 2,
          }}
        />

        {/* Netflix-style TA-DUM animation */}
        <motion.div
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{ 
            scale: isExiting ? 1.2 : [0.2, 1.15, 1],
            opacity: isExiting ? 0 : [0, 1, 1],
          }}
          transition={
            isExiting 
              ? { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }
              : { 
                  duration: 3.5,
                  times: [0, 0.6, 1],
                  ease: [0.87, 0, 0.13, 1],
                }
          }
          style={{
            position: 'relative',
            zIndex: 3,
          }}
        >
          {/* Multiple glow layers */}
          <motion.div
            animate={{ 
              opacity: isExiting ? 0 : [0, 1, 0.3, 0],
              scale: isExiting ? 3.5 : [0.5, 2, 2.5, 3],
            }}
            transition={
              isExiting
                ? { duration: 1.2 }
                : { 
                    duration: 3.5,
                    times: [0, 0.4, 0.7, 1],
                    ease: 'easeOut',
                  }
            }
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '300%',
              height: '300%',
              background: config.gradient,
              filter: 'blur(80px)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />

          {/* Secondary glow pulse */}
          <motion.div
            animate={{ 
              opacity: isExiting ? 0 : [0, 0.8, 0.4, 0],
              scale: isExiting ? 3 : [0.8, 1.5, 2, 2.5],
            }}
            transition={
              isExiting
                ? { duration: 1.2 }
                : { 
                    duration: 3.5,
                    times: [0, 0.5, 0.8, 1],
                    ease: 'easeOut',
                  }
            }
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '200%',
              height: '200%',
              background: `radial-gradient(circle, ${config.color}33 0%, transparent 70%)`,
              filter: 'blur(40px)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />

          {/* Main logo text with enhanced effects */}
          <motion.div
            animate={{ 
              opacity: isExiting ? 0 : [0, 0, 1, 1, 1],
            }}
            transition={
              isExiting
                ? { duration: 1.2 }
                : { 
                    duration: 3.5,
                    times: [0, 0.3, 0.5, 0.9, 1],
                  }
            }
            style={{
              fontSize: isMobile ? '3rem' : '5.5rem',
              fontWeight: 900,
              color: config.color,
              letterSpacing: isMobile ? '-2px' : '-4px',
              textShadow: `
                0 0 10px ${config.color},
                2px 2px 4px rgba(0, 0, 0, 0.9)
              `,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {config.name}
          </motion.div>

          {/* Subtle text reflection */}
          <motion.div
            animate={{ 
              opacity: isExiting ? 0 : [0, 0, 0.15, 0.15, 0],
            }}
            transition={
              isExiting
                ? { duration: 1.2 }
                : { 
                    duration: 3.5,
                    times: [0, 0.3, 0.5, 0.9, 1],
                  }
            }
            style={{
              fontSize: isMobile ? '3rem' : '5.5rem',
              fontWeight: 900,
              color: config.color,
              letterSpacing: isMobile ? '-2px' : '-4px',
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translate(-50%, 10px) scaleY(-1)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 50%)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 50%)',
              zIndex: 0,
            }}
          >
            {config.name}
          </motion.div>
        </motion.div>

        {/* Scanline effect */}
        <motion.div
          animate={{
            opacity: isExiting ? 0 : [0.05, 0.1, 0.05],
          }}
          transition={
            isExiting
              ? { duration: 1.2 }
              : {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }
          }
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)',
            zIndex: 4,
            pointerEvents: 'none',
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}