import React, { useState, useEffect, useRef } from 'react';
import { Search, Volume2, VolumeX, Play, Pause, Square, MoreVertical, User } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useAudio } from '../contexts/AudioContext';

interface NavbarProps {
  transparent?: boolean;
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
  onLogoClick?: () => void;
  profile?: 'conspiranoia';
}

export function Navbar({ transparent = false, activeCategory, onCategoryChange, onLogoClick, profile = 'conspiranoia' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isPlaying, isMuted, togglePlay, stop, toggleMute } = useAudio();
  const { scrollY } = useScroll();
  const menuRef = useRef<HTMLDivElement>(null);
  
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(20, 20, 20, 0)', 'rgba(20, 20, 20, 0.95)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 660);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const shouldBeTransparent = transparent && !scrolled;

  const profileConfig = {
    conspiranoia: {
      name: 'LynchUniverse',
      color: '#E50914',
      shadow: '0 0 20px rgba(229, 9, 20, 0.5)',
    },
  };

  const config = profileConfig[profile];

  const categories = {
    conspiranoia: ['All', 'Dreamscape Films', 'Midnight Series', 'Strange Short Films', 'Inner Light Docs', 'Whispered Conversations', 'Soundscapes'],
  };

  const currentCategories = categories[profile];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: 'transparent',
      }}
    >
      {/* First row: Logo and Icons */}
      <div 
        className="m-[0px]"
        style={{
          paddingLeft: 'var(--horizontal-padding)',
          paddingRight: 'var(--horizontal-padding)',
          paddingTop: '0',
          paddingBottom: '12px',
          maxWidth: '100%',
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.9) 50%, rgba(0, 0, 0, 0) 100%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0px',
        }}
      >
        {/* Top row: Logo and Icons */}
        <div className="flex items-center justify-between" style={{ height: '68px' }}>
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="font-bold tracking-tight relative"
            style={{ 
              fontSize: 'var(--text-logo)',
              color: config.color,
              letterSpacing: '-0.5px',
              textShadow: config.shadow,
              cursor: 'pointer',
            }}
            onClick={onLogoClick}
          >
            {config.name}
          </motion.div>

          {/* Right section - Icons */}
          <div className="flex items-center" style={{ gap: '0.5rem' }}>
            {/* Audio Waves Visualizer */}
            {isPlaying && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center justify-center"
                style={{
                  gap: '2px',
                  height: '24px',
                }}
              >
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: ['6px', '18px', '10px', '16px', '8px', '18px', '6px'],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut",
                    }}
                    style={{
                      width: '3px',
                      backgroundColor: '#E50914',
                      borderRadius: '2px',
                      boxShadow: '0 0 8px rgba(229, 9, 20, 0.6), 0 0 12px rgba(229, 9, 20, 0.3)',
                    }}
                  />
                ))}
              </motion.div>
            )}

            {/* Play/Pause button */}
            <motion.button 
              whileHover={{ 
                scale: 1.15,
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
              }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full flex items-center justify-center transition-all cursor-pointer"
              style={{
                width: '24px',
                height: '24px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                border: 'none',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              }}
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause size={12} color="white" fill="white" strokeWidth={0} />
              ) : (
                <Play size={12} color="white" fill="white" strokeWidth={0} />
              )}
            </motion.button>

            {/* Stop button */}
            <motion.button 
              whileHover={{ 
                scale: 1.15,
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
              }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full flex items-center justify-center transition-all cursor-pointer"
              style={{
                width: '24px',
                height: '24px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                border: 'none',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              }}
              onClick={stop}
            >
              <Square size={12} color="white" fill="white" strokeWidth={0} />
            </motion.button>

            {/* Mute/Unmute button */}
            <motion.button 
              whileHover={{ 
                scale: 1.15,
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
              }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full flex items-center justify-center transition-all cursor-pointer"
              style={{
                width: '24px',
                height: '24px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                border: 'none',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              }}
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX size={12} color="white" strokeWidth={2.5} />
              ) : (
                <Volume2 size={12} color="white" strokeWidth={2.5} />
              )}
            </motion.button>

            {/* Profile button */}
            <motion.button 
              whileHover={{ 
                scale: 1.15,
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
              }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full flex items-center justify-center transition-all cursor-pointer"
              style={{
                width: '24px',
                height: '24px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                border: 'none',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              }}
              onClick={onLogoClick}
            >
              <User size={12} color="white" strokeWidth={2.5} />
            </motion.button>

            {/* Mobile: Categories Menu Button */}
            {isMobile && (
              <div className="relative" ref={menuRef}>
                <motion.button
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="rounded-full flex items-center justify-center transition-all cursor-pointer"
                  style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: menuOpen ? 'rgba(229, 9, 20, 0.2)' : 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    border: menuOpen ? '1px solid #E50914' : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: menuOpen ? '0 0 16px rgba(229, 9, 20, 0.4)' : '0 4px 16px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <MoreVertical size={14} color="white" strokeWidth={2.5} />
                </motion.button>

                {/* Dropdown menu */}
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2"
                      style={{
                        backgroundColor: 'rgba(20, 20, 20, 0.98)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '8px',
                        paddingTop: '8px',
                        paddingRight: '8px',
                        paddingBottom: '8px',
                        paddingLeft: '8px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                        minWidth: '200px',
                        maxHeight: '80vh',
                        overflowY: 'auto',
                      }}
                    >
                      {currentCategories.map((item, index) => (
                        <motion.button
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            onCategoryChange && onCategoryChange(item);
                            setMenuOpen(false);
                          }}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '12px 16px',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#e5e5e5',
                            backgroundColor: activeCategory === item ? 'rgba(229, 9, 20, 0.15)' : 'transparent',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            borderLeft: activeCategory === item ? '3px solid #E50914' : '3px solid transparent',
                          }}
                          onMouseEnter={(e) => {
                            if (activeCategory !== item) {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                            }
                            e.currentTarget.style.color = '#ffffff';
                          }}
                          onMouseLeave={(e) => {
                            if (activeCategory !== item) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                            e.currentTarget.style.color = '#e5e5e5';
                          }}
                        >
                          {item}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Bottom row: Navigation Categories - Desktop only */}
        {!isMobile && (
          /* Desktop: Original horizontal layout */
          <div 
            className="flex items-center justify-center"
            style={{
              columnGap: '1.5rem',
              rowGap: '0.25rem',
              flexWrap: 'wrap',
              paddingTop: '0',
              paddingRight: '20px',
              paddingBottom: '0',
              paddingLeft: '20px',
              width: 'calc(100% + calc(var(--horizontal-padding) * 2))',
              marginLeft: 'calc(var(--horizontal-padding) * -1)',
              marginRight: 'calc(var(--horizontal-padding) * -1)',
            }}
          >
            {currentCategories.map((item, index) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                whileHover={{ 
                  scale: 1.05,
                  textShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#e5e5e5',
                  paddingTop: '8px',
                  paddingRight: '0',
                  paddingBottom: '8px',
                  paddingLeft: '0',
                  letterSpacing: '0.3px',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#e5e5e5';
                }}
                onClick={() => onCategoryChange && onCategoryChange(item)}
              >
                {item}
                <motion.div
                  className="absolute bottom-0 left-0 right-0"
                  initial={{ scaleX: 0, height: '2px' }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ 
                    originX: 0,
                    background: 'linear-gradient(90deg, #E50914 0%, #ff2a2a 100%)',
                    boxShadow: '0 0 12px rgba(229, 9, 20, 0.8)',
                  }}
                />
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </motion.nav>
  );
}