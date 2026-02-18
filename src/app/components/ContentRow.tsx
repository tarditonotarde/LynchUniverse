import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { VideoCard, Video } from './VideoCard';
import { motion, AnimatePresence } from 'motion/react';

interface ContentRowProps {
  title: string;
  videos: Video[];
  onVideoClick: (video: Video) => void;
}

export function ContentRow({ title, videos, onVideoClick }: ContentRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hasCardHover, setHasCardHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
    const newScrollLeft = direction === 'left' 
      ? scrollContainerRef.current.scrollLeft - scrollAmount
      : scrollContainerRef.current.scrollLeft + scrollAmount;
    
    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  return (
    <div 
      className="relative"
      style={{
        marginBottom: 'var(--space-2)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Section title */}
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-4"
        style={{
          fontSize: 'var(--text-section)',
          fontWeight: 600,
          paddingLeft: 'var(--horizontal-padding)',
          textShadow: '0 0 20px rgba(229, 9, 20, 0.6), 0 0 40px rgba(229, 9, 20, 0.3), 0 0 60px rgba(229, 9, 20, 0.15)',
          marginTop: '20px',
        }}
      >
        {title}
      </motion.h2>

      {/* Carousel container */}
      <div className="relative" style={{ overflow: 'visible' }}>
        {/* Left arrow */}
        <AnimatePresence>
          {showLeftArrow && isHovered && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => scroll('left')}
              className="absolute left-0 top-0 bottom-0 z-20 flex items-center justify-center hover:bg-opacity-80 transition-all"
              style={{
                width: '60px',
                backgroundColor: 'rgba(20, 20, 20, 0.7)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <ChevronLeft size={48} color="var(--text-primary)" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Right arrow */}
        <AnimatePresence>
          {showRightArrow && isHovered && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => scroll('right')}
              className="absolute right-0 top-0 bottom-0 z-20 flex items-center justify-center hover:bg-opacity-80 transition-all"
              style={{
                width: '60px',
                backgroundColor: 'rgba(20, 20, 20, 0.7)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <ChevronRight size={48} color="var(--text-primary)" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Scrollable cards container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto scrollbar-hide"
          style={{
            gap: isMobile ? '8px' : 'var(--card-gap)',
            paddingLeft: 'var(--horizontal-padding)',
            paddingRight: 'var(--horizontal-padding)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingBottom: hasCardHover ? '120px' : 'var(--space-2)', // Dynamic space based on card hover
            paddingTop: hasCardHover ? '60px' : 'var(--space-1)', // Extra top padding when card is hovered
            transition: 'padding-bottom 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), padding-top 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            overflowY: 'visible', // Allow vertical overflow for scaled cards
          }}
        >
          {videos.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              onCardClick={onVideoClick}
              index={index}
              onCardHover={setHasCardHover}
            />
          ))}
        </div>
      </div>
    </div>
  );
}