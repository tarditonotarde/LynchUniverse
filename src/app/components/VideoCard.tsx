import React, { useState, useEffect } from 'react';
import { Play, Plus, Heart, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useFavorites } from '../contexts/FavoritesContext';

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  description?: string;
  tags?: string[];
  youtubeId?: string;
}

interface VideoCardProps {
  video: Video;
  onCardClick: (video: Video) => void;
  index: number;
  onCardHover?: (isHovered: boolean) => void;
}

export function VideoCard({ video, onCardClick, index, onCardHover }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isInMyList, addToMyList, removeFromMyList, isLiked, toggleLike } = useFavorites();

  const videoIsInList = isInMyList(video.id);
  const videoIsLiked = isLiked(video.id);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 660);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
      onCardHover?.(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
      onCardHover?.(false);
    }
  };

  const handleCardClick = () => {
    // Abrir modal con clic o tap (funciona en todos los dispositivos)
    onCardClick(video);
  };

  const handleAddToList = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoIsInList) {
      removeFromMyList(video.id);
    } else {
      addToMyList(video.id);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(video.id);
  };

  const handleMoreInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCardClick(video);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={isMobile ? handleCardClick : undefined}
      className="relative cursor-pointer"
      style={{
        minWidth: isMobile ? '280px' : 'var(--card-width)',
        aspectRatio: isMobile ? '16/10' : '16/9',
        marginBottom: isHovered ? '120px' : '0',
        transition: 'margin-bottom 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      {/* Base card */}
      <motion.div
        animate={{
          scale: isHovered ? 1.3 : 1,
          y: isHovered ? -12 : 0,
          zIndex: isHovered ? 30 : 1,
        }}
        transition={{ 
          duration: 0.35,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="relative w-full h-full"
        style={{
          transformOrigin: 'center center',
          overflow: 'visible', // Allow content to overflow when scaled
        }}
      >
        {/* Thumbnail container */}
        <motion.div 
          className="w-full h-full bg-cover bg-center rounded relative"
          style={{
            backgroundImage: `url(${video.thumbnail})`,
            boxShadow: isHovered 
              ? '0 32px 64px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.15)' 
              : '0 4px 12px rgba(0, 0, 0, 0.4)',
          }}
          animate={{
            filter: isHovered ? 'brightness(1.15) contrast(1.05)' : 'brightness(1)',
            borderRadius: isHovered ? '8px 8px 0 0' : '8px',
          }}
          transition={{ duration: 0.35 }}
          onClick={handleCardClick}
        >
          {/* Gradient overlay - transparent on hover */}
          <motion.div 
            className="absolute inset-0"
            animate={{
              opacity: isHovered ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.85) 10%, rgba(0, 0, 0, 0.7) 20%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0.35) 40%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.1) 60%, rgba(0, 0, 0, 0.05) 70%, rgba(0, 0, 0, 0.02) 80%, rgba(0, 0, 0, 0) 90%)',
              borderRadius: '8px',
            }}
          />

          {/* Title on hover - separate from gradient */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-3"
                style={{ zIndex: 2 }}
              >
                <h3
                  className="line-clamp-2"
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    lineHeight: '1.3',
                    color: 'white',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  {video.title}
                </h3>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Duration badge - animated - Hidden on mobile */}
          {!isMobile && (
            <motion.div 
              className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                fontSize: '11px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
              animate={{
                scale: isHovered ? 0.9 : 1,
                opacity: isHovered ? 0.7 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              {video.duration}
            </motion.div>
          )}

          {/* Hover play icon overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                key="play-overlay"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle, rgba(0, 0, 0, 0.4) 0%, transparent 70%)',
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: '56px',
                    height: '56px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
                  }}
                >
                  <Play size={24} fill="white" color="white" strokeWidth={0} style={{ marginLeft: '3px' }} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Hover expanded info panel */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ 
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.1
              }}
              className="absolute w-full"
              style={{
                top: '100%',
                backgroundColor: 'var(--bg-elevated)',
                borderRadius: '0 0 var(--border-radius-card) var(--border-radius-card)',
                padding: 'var(--space-2)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Action buttons */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center" style={{ gap: 'var(--space-1)' }}>
                  <motion.button
                    whileHover={{ 
                      scale: 1.15,
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full flex items-center justify-center transition-all"
                    style={{
                      width: '36px',
                      height: '36px',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      border: 'none',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
                    }}
                    onClick={handleMoreInfo}
                  >
                    <Play size={16} fill="white" color="white" strokeWidth={0} style={{ marginLeft: '2px' }} />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.15, borderColor: '#ffffff' }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full border-2 transition-all flex items-center justify-center"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderColor: videoIsInList ? '#46d369' : 'rgba(255, 255, 255, 0.4)',
                      backgroundColor: videoIsInList ? 'rgba(70, 211, 105, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    }}
                    onClick={handleAddToList}
                  >
                    <motion.div
                      key={videoIsInList ? 'check' : 'plus'}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {videoIsInList ? (
                        <Check size={16} color="#46d369" />
                      ) : (
                        <Plus size={16} color="var(--text-primary)" />
                      )}
                    </motion.div>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.15, borderColor: '#ffffff' }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full border-2 transition-all flex items-center justify-center"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderColor: videoIsLiked ? '#46d369' : 'rgba(255, 255, 255, 0.4)',
                      backgroundColor: videoIsLiked ? 'rgba(70, 211, 105, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    }}
                    onClick={handleLike}
                  >
                    <Heart size={16} color={videoIsLiked ? '#46d369' : 'var(--text-primary)'} />
                  </motion.button>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.15, borderColor: '#ffffff' }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full border-2 transition-all flex items-center justify-center"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                  onClick={handleMoreInfo}
                >
                  <ChevronDown size={16} color="var(--text-primary)" />
                </motion.button>
              </div>

              {/* Match & Duration */}
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="flex items-center mb-2" 
                style={{ gap: 'var(--space-1)' }}
              >
                <span 
                  className="font-bold"
                  style={{
                    fontSize: '13px',
                    color: '#46d369',
                  }}
                >
                  98% Match
                </span>
                <span 
                  className="px-1.5 py-0.5 border font-semibold"
                  style={{
                    fontSize: '10px',
                    color: 'var(--text-secondary)',
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                    borderRadius: '2px',
                  }}
                >
                  16+
                </span>
                <span 
                  style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {video.duration}
                </span>
              </motion.div>

              {/* Tags */}
              {video.tags && video.tags.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="flex flex-wrap gap-1.5"
                >
                  {video.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5">
                      <span
                        style={{
                          fontSize: '12px',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {tag}
                      </span>
                      {i < Math.min(video.tags!.length, 3) - 1 && (
                        <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
                      )}
                    </span>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Title and category - fade out on hover */}
        <AnimatePresence>
          {!isHovered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 p-3"
            >
              <div 
                className="mb-1 line-clamp-2"
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  lineHeight: '1.3',
                  color: 'white',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
                }}
              >
                {video.title}
              </div>
              {video.tags && video.tags.length > 0 && (
                <div 
                  style={{
                    fontSize: '11px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  {video.tags[0]}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}