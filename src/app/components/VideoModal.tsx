import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Plus, Heart, Volume2, VolumeX, Maximize, Pause, RotateCcw, SkipBack, SkipForward, Minimize, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Video } from './VideoCard';
import { useAudio } from '../contexts/AudioContext';
import { useFavorites } from '../contexts/FavoritesContext';

interface VideoModalProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ video, isOpen, onClose }: VideoModalProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [skipIndicator, setSkipIndicator] = useState<'forward' | 'backward' | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const { isPlaying: isMusicPlaying, togglePlay: toggleMusic } = useAudio();
  const { isInMyList, addToMyList, removeFromMyList, isLiked, toggleLike } = useFavorites();
  
  const videoIsInList = video ? isInMyList(video.id) : false;
  const videoIsLiked = video ? isLiked(video.id) : false;
  
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const skipIndicatorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const wasMusicPlayingRef = useRef(false);

  // Pause background music when modal opens, resume when it closes
  useEffect(() => {
    if (isOpen && isMusicPlaying) {
      // Save state and pause music
      wasMusicPlayingRef.current = true;
      toggleMusic();
    } else if (!isOpen && wasMusicPlayingRef.current) {
      // Resume music when modal closes
      toggleMusic();
      wasMusicPlayingRef.current = false;
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          handleFullscreen();
        } else {
          onClose();
        }
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.body.style.overflow = 'unset';
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isOpen, onClose, isFullscreen]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 660);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sendYouTubeCommand = (command: string, args?: any) => {
    if (iframeRef.current) {
      const message = JSON.stringify({
        event: 'command',
        func: command,
        args: args || ''
      });
      iframeRef.current.contentWindow?.postMessage(message, '*');
    }
  };

  const handleFullscreen = () => {
    if (videoContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch((err) => {
          console.log('Fullscreen exit error:', err);
        });
      } else {
        videoContainerRef.current.requestFullscreen().catch((err) => {
          console.log('Fullscreen not available:', err);
        });
      }
    }
  };

  const handlePlayPause = () => {
    if (video?.youtubeId) {
      if (isPlaying) {
        sendYouTubeCommand('pauseVideo');
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      } else {
        sendYouTubeCommand('playVideo');
        progressIntervalRef.current = setInterval(() => {
          sendYouTubeCommand('getCurrentTime');
          sendYouTubeCommand('getDuration');
        }, 1000);
      }
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(true);
    }
  };

  const handleReplay = () => {
    sendYouTubeCommand('seekTo', [0, true]);
    sendYouTubeCommand('playVideo');
    setIsPlaying(true);
    setCurrentTime(0);
  };

  const handleSkipBackward = () => {
    const newTime = Math.max(0, currentTime - 10);
    sendYouTubeCommand('seekTo', [newTime, true]);
    setCurrentTime(newTime);
    setSkipIndicator('backward');
    if (skipIndicatorTimeoutRef.current) {
      clearTimeout(skipIndicatorTimeoutRef.current);
    }
    skipIndicatorTimeoutRef.current = setTimeout(() => {
      setSkipIndicator(null);
    }, 2000);
  };

  const handleSkipForward = () => {
    const newTime = Math.min(duration, currentTime + 10);
    sendYouTubeCommand('seekTo', [newTime, true]);
    setCurrentTime(newTime);
    setSkipIndicator('forward');
    if (skipIndicatorTimeoutRef.current) {
      clearTimeout(skipIndicatorTimeoutRef.current);
    }
    skipIndicatorTimeoutRef.current = setTimeout(() => {
      setSkipIndicator(null);
    }, 2000);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    sendYouTubeCommand('seekTo', [newTime, true]);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    sendYouTubeCommand('setVolume', [newVolume]);
    setIsMuted(newVolume === 0);
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      sendYouTubeCommand('unMute');
      setVolume(100);
      setIsMuted(false);
    } else {
      sendYouTubeCommand('mute');
      setIsMuted(true);
    }
  };

  const handleAddToList = () => {
    if (video) {
      if (videoIsInList) {
        removeFromMyList(video.id);
      } else {
        addToMyList(video.id);
      }
    }
  };

  const handleLike = () => {
    if (video) {
      toggleLike(video.id);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!video) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(8px)',
            }}
          />

          {/* Modal content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full h-full"
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'var(--bg-elevated)',
                overflow: 'auto',
              }}
            >
              {/* Video Player Section */}
              <div 
                className="relative" 
                ref={videoContainerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => isPlaying && setShowControls(false)}
              >
                {/* Video player */}
                <div 
                  className="relative w-full bg-black lg:max-h-[90vh] lg:w-auto lg:mx-auto"
                  style={{
                    aspectRatio: '16/9',
                  }}
                >
                  {video.youtubeId ? (
                    <>
                      {/* YouTube iframe */}
                      <iframe
                        ref={iframeRef}
                        src={`https://www.youtube.com/embed/${video.youtubeId}?enablejsapi=1&controls=1&rel=0&modestbranding=1&iv_load_policy=3`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                        style={{
                          display: isPlaying ? 'block' : 'none',
                        }}
                      />
                      
                      {/* Thumbnail with play button */}
                      {!isPlaying && (
                        <div 
                          className="absolute inset-0 w-full h-full bg-cover bg-center flex items-center justify-center"
                          style={{
                            backgroundImage: `url(${video.thumbnail})`,
                          }}
                        >
                          {/* Large play button - Netflix style */}
                          <motion.button
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ 
                              scale: [1, 1.05, 1],
                              opacity: 1 
                            }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{
                              scale: {
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                              },
                              opacity: {
                                duration: 0.3
                              }
                            }}
                            whileHover={{ 
                              scale: 1.08,
                              backgroundColor: 'rgba(255, 255, 255, 0.25)',
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handlePlayPause}
                            className="rounded-full flex items-center justify-center transition-all"
                            style={{
                              width: isMobile ? '80px' : '110px',
                              height: isMobile ? '80px' : '110px',
                              backgroundColor: 'rgba(255, 255, 255, 0.15)',
                              backdropFilter: 'blur(10px)',
                              border: 'none',
                              cursor: 'pointer',
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
                            }}
                          >
                            {/* Play icon */}
                            <Play 
                              size={isMobile ? 32 : 48} 
                              fill="white" 
                              color="white" 
                              strokeWidth={0}
                              style={{ 
                                marginLeft: isMobile ? '4px' : '6px',
                              }} 
                            />
                          </motion.button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div 
                      className="w-full h-full bg-cover bg-center flex items-center justify-center"
                      style={{
                        backgroundImage: `url(${video.thumbnail})`,
                      }}
                    >
                      {/* Large premium play button - Netflix style */}
                      <motion.button
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={handlePlayPause}
                        className="rounded-full flex items-center justify-center relative"
                        style={{
                          width: '110px',
                          height: '110px',
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.92) 100%)',
                          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.75), 0 0 0 3px rgba(255, 255, 255, 0.2), inset 0 2px 8px rgba(255, 255, 255, 0.5)',
                          backdropFilter: 'blur(10px)',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        }}
                      >
                        {/* Glow effect */}
                        <motion.div
                          animate={{ 
                            opacity: [0.2, 0.4, 0.2],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
                            filter: 'blur(20px)',
                          }}
                        />
                        
                        {/* Play icon */}
                        <Play 
                          size={48} 
                          fill="black" 
                          color="black" 
                          strokeWidth={0}
                          style={{ 
                            marginLeft: '8px',
                            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
                          }} 
                        />
                      </motion.button>
                    </div>
                  )}

                  {/* Skip Indicators - Center of screen */}
                  <AnimatePresence>
                    {skipIndicator && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ 
                          duration: 0.3,
                          ease: [0.34, 1.56, 0.64, 1] // Spring bounce
                        }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      >
                        <motion.div 
                          className="relative flex flex-col items-center justify-center"
                          style={{
                            width: '140px',
                            height: '140px',
                          }}
                        >
                          {/* Background blur circle with gradient */}
                          <div 
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: 'radial-gradient(circle, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.85) 100%)',
                              backdropFilter: 'blur(20px)',
                              border: '3px solid rgba(255, 255, 255, 0.9)',
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8), inset 0 2px 8px rgba(255, 255, 255, 0.1)',
                            }}
                          />

                          {/* Animated ring */}
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            initial={{ scale: 1, opacity: 0.6 }}
                            animate={{ 
                              scale: [1, 1.15, 1],
                              opacity: [0.6, 0.3, 0.6],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            style={{
                              border: '2px solid rgba(229, 9, 20, 0.6)',
                            }}
                          />

                          {/* Content */}
                          <div className="relative z-10 flex flex-col items-center justify-center">
                            {/* Triple icons for emphasis */}
                            <div className="flex items-center" style={{ gap: '-8px' }}>
                              {skipIndicator === 'backward' ? (
                                <>
                                  <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: [0, 0.4, 0], x: [10, 0, -10] }}
                                    transition={{ duration: 0.6, delay: 0 }}
                                  >
                                    <SkipBack size={28} color="rgba(255, 255, 255, 0.4)" fill="rgba(255, 255, 255, 0.4)" strokeWidth={0} />
                                  </motion.div>
                                  <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: [0, 0.7, 0.7], x: [10, 0, 0] }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                  >
                                    <SkipBack size={36} color="rgba(255, 255, 255, 0.8)" fill="rgba(255, 255, 255, 0.8)" strokeWidth={0} />
                                  </motion.div>
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                  >
                                    <SkipBack size={44} color="white" fill="white" strokeWidth={0} />
                                  </motion.div>
                                </>
                              ) : (
                                <>
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                  >
                                    <SkipForward size={44} color="white" fill="white" strokeWidth={0} />
                                  </motion.div>
                                  <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: [0, 0.7, 0.7], x: [-10, 0, 0] }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                  >
                                    <SkipForward size={36} color="rgba(255, 255, 255, 0.8)" fill="rgba(255, 255, 255, 0.8)" strokeWidth={0} />
                                  </motion.div>
                                  <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: [0, 0.4, 0], x: [-10, 0, 10] }}
                                    transition={{ duration: 0.6, delay: 0 }}
                                  >
                                    <SkipForward size={28} color="rgba(255, 255, 255, 0.4)" fill="rgba(255, 255, 255, 0.4)" strokeWidth={0} />
                                  </motion.div>
                                </>
                              )}
                            </div>

                            {/* Time badge */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.15 }}
                              className="mt-3 px-4 py-1 rounded-full"
                              style={{
                                backgroundColor: 'rgba(229, 9, 20, 0.9)',
                                boxShadow: '0 4px 12px rgba(229, 9, 20, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
                              }}
                            >
                              <span 
                                style={{
                                  fontSize: '16px',
                                  fontWeight: 800,
                                  color: 'white',
                                  letterSpacing: '0.5px',
                                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                                }}
                              >
                                10 seconds
                              </span>
                            </motion.div>
                          </div>

                          {/* Glow effect */}
                          <div 
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: 'radial-gradient(circle, rgba(229, 9, 20, 0.2) 0%, transparent 70%)',
                              filter: 'blur(20px)',
                              transform: 'scale(1.3)',
                            }}
                          />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Gradient overlay - Below controls, above video */}
                {!isPlaying && (
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: isMobile ? '60px' : '80px',
                      background: 'linear-gradient(to top, rgba(24, 24, 24, 1) 0%, rgba(24, 24, 24, 0) 100%)',
                      pointerEvents: 'none',
                      zIndex: 3,
                    }}
                  />
                )}

                {/* Custom Video Controls Overlay - Netflix Style */}
                <AnimatePresence>
                  {!isPlaying && (
                    <>
                      {/* Top title bar (shown when paused or hovering) */}
                      <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          padding: isMobile ? '16px' : '32px',
                          zIndex: 20,
                        }}
                      >
                        <h2 
                          style={{
                            fontSize: isMobile ? '24px' : '42px',
                            fontWeight: 700,
                            lineHeight: '110%',
                            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)',
                            color: 'white',
                            display: isMobile ? 'none' : 'block',
                            paddingLeft: '20px',
                          }}
                        >
                          {video.title}
                        </h2>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

                {/* Close button - Netflix style - Always on top */}
                <motion.button
                  whileHover={{ 
                    scale: 1.08,
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  }}
                  whileTap={{ scale: 0.92 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="absolute top-6 right-6 rounded-full flex items-center justify-center transition-all"
                  style={{
                    width: isMobile ? '36px' : '48px',
                    height: isMobile ? '36px' : '48px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    border: 'none',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
                    cursor: 'pointer',
                    zIndex: 50,
                  }}
                  title="Close"
                >
                  <X size={isMobile ? 20 : 26} color="white" strokeWidth={3} />
                </motion.button>
              </div>

              {/* Info Section */}
              <div 
                className="relative"
                style={{ 
                  padding: '0',
                  backgroundColor: '#181818',
                }}
              >
                {/* Content */}
                <div style={{ 
                  paddingTop: isMobile ? '24px' : '30px',
                  paddingRight: isMobile ? '20px' : '48px',
                  paddingBottom: isMobile ? '40px' : '80px',
                  paddingLeft: isMobile ? '20px' : '48px',
                  position: 'relative' 
                }}>
                  
                  {/* About Title and Action Buttons */}
                  <div className="flex items-center justify-between mb-3" style={{ gap: '16px' }}>
                    <h3 
                      style={{
                        fontSize: isMobile ? '20px' : '24px',
                        fontWeight: 700,
                        color: '#e5e5e5',
                        letterSpacing: '0',
                        margin: 0,
                      }}
                    >
                      About {video.title}
                    </h3>

                    {/* Action Buttons - Add to list & Like */}
                    <div className="flex items-center" style={{ gap: '12px' }}>
                      {/* Add to list */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-full border-2 transition-all flex items-center justify-center"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderColor: videoIsInList ? '#46d369' : 'rgba(255, 255, 255, 0.5)',
                          backgroundColor: videoIsInList ? 'rgba(70, 211, 105, 0.15)' : 'rgba(42, 42, 42, 1)',
                          flexShrink: 0,
                        }}
                        onClick={handleAddToList}
                        title={videoIsInList ? "Remove from My List" : "Add to My List"}
                      >
                        <motion.div
                          key={videoIsInList ? 'check' : 'plus'}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {videoIsInList ? (
                            <Check size={16} color="#46d369" strokeWidth={3} />
                          ) : (
                            <Plus size={16} color="white" strokeWidth={3} />
                          )}
                        </motion.div>
                      </motion.button>

                      {/* Like button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-full border-2 transition-all flex items-center justify-center"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderColor: videoIsLiked ? '#46d369' : 'rgba(255, 255, 255, 0.5)',
                          backgroundColor: videoIsLiked ? 'rgba(70, 211, 105, 0.15)' : 'rgba(42, 42, 42, 1)',
                          flexShrink: 0,
                        }}
                        onClick={handleLike}
                        title={videoIsLiked ? "Rated" : "Rate this"}
                      >
                        <motion.div
                          key={videoIsLiked ? 'filled' : 'empty'}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.3, type: "spring" }}
                        >
                          <Heart 
                            size={16} 
                            color={videoIsLiked ? '#46d369' : 'white'} 
                            fill="none"
                            strokeWidth={2.5}
                          />
                        </motion.div>
                      </motion.button>
                    </div>
                  </div>

                  <div 
                    className={isMobile ? "flex flex-col gap-6" : "grid grid-cols-3 gap-12"}
                    style={{ position: 'relative', zIndex: 2 }}
                  >
                    {/* Left column - Main info */}
                    <div className={isMobile ? "" : "col-span-2"}>
                      {/* Match, Year, Duration - Netflix style */}
                      <div className="flex items-center mb-5" style={{ gap: isMobile ? '8px' : '12px', flexWrap: 'wrap' }}>
                        <span 
                          style={{
                            fontSize: isMobile ? '15px' : '18px',
                            fontWeight: 700,
                            color: '#46d369',
                          }}
                        >
                          {Math.floor(94 + Math.random() * 6)}% Match
                        </span>
                        <span style={{ fontSize: isMobile ? '15px' : '18px', fontWeight: 500, color: '#d2d2d2' }}>
                          {video.title.match(/\((\d{4})\)/) ? video.title.match(/\((\d{4})\)/)?.[1] : 'Classic'}
                        </span>
                        <span 
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1px 5px',
                            fontSize: isMobile ? '10px' : '11.5px',
                            fontWeight: 500,
                            color: '#bcbcbc',
                            border: '1.5px solid #808080',
                            borderRadius: '2px',
                            lineHeight: '1.4',
                          }}
                        >
                          {video.tags?.includes('Horror') || video.tags?.includes('Psychological Horror') ? '18+' : 
                           video.tags?.includes('Animation') || video.tags?.includes('Comedy') ? '13+' : '16+'}
                        </span>
                        <span style={{ fontSize: isMobile ? '15px' : '18px', fontWeight: 500, color: '#d2d2d2' }}>
                          {video.duration}
                        </span>
                        <span 
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '2px 6px',
                            fontSize: isMobile ? '10px' : '11px',
                            fontWeight: 700,
                            letterSpacing: '0.5px',
                            color: '#d2d2d2',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                            borderRadius: '2px',
                          }}
                        >
                          HD
                        </span>
                      </div>

                      {/* Description */}
                      {video.description && (
                        <p 
                          className="mb-0"
                          style={{
                            fontSize: isMobile ? '14px' : '18px',
                            fontWeight: 400,
                            lineHeight: isMobile ? '22px' : '28px',
                            color: '#d2d2d2',
                          }}
                        >
                          {video.description}
                        </p>
                      )}
                    </div>

                    {/* Right column - Additional info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '12px' : '16px' }}>
                      {/* Tags */}
                      {video.tags && video.tags.length > 0 && (
                        <div>
                          <span 
                            style={{
                              fontSize: isMobile ? '13px' : '14px',
                              fontWeight: 400,
                              lineHeight: '20px',
                              color: '#777777',
                            }}
                          >
                            <span style={{ color: '#777777' }}>Genres:{' '}</span>
                            <span style={{ color: '#ffffff' }}>{video.tags.join(', ')}</span>
                          </span>
                        </div>
                      )}

                      {/* This is */}
                      <div>
                        <span 
                          style={{
                            fontSize: isMobile ? '13px' : '14px',
                            fontWeight: 400,
                            lineHeight: '20px',
                            color: '#777777',
                          }}
                        >
                          <span style={{ color: '#777777' }}>This {
                            video.tags?.includes('Documentary') || video.tags?.includes('Interview') ? 'content' :
                            video.tags?.includes('Album') || video.tags?.includes('Soundtrack') ? 'album' :
                            video.tags?.includes('Series') || video.tags?.includes('Web Series') ? 'series' :
                            video.duration?.includes('min') ? 'short film' : 'film'
                          } is:{' '}</span>
                          <span style={{ color: '#ffffff' }}>{
                            video.tags?.includes('Surreal') || video.tags?.includes('Experimental') ? 'Mind-bending, Atmospheric, Visionary' :
                            video.tags?.includes('Documentary') ? 'Insightful, Illuminating, Inspiring' :
                            video.tags?.includes('Interview') || video.tags?.includes('Message') ? 'Intimate, Revealing, Thoughtful' :
                            video.tags?.includes('Horror') || video.tags?.includes('Psychological') ? 'Disturbing, Haunting, Unforgettable' :
                            video.tags?.includes('Mystery') ? 'Enigmatic, Intriguing, Captivating' :
                            video.tags?.includes('Comedy') ? 'Quirky, Dark, Unconventional' :
                            video.tags?.includes('Album') || video.tags?.includes('Music') ? 'Atmospheric, Experimental, Immersive' :
                            'Thought-provoking, Artistic, Original'
                          }</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div 
                    className="my-12"
                    style={{
                      height: '1px',
                      backgroundColor: '#404040',
                      position: 'relative',
                      zIndex: 2,
                    }}
                  />

                  {/* About Section */}
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#777777', minWidth: '120px' }}>
                          Creator:
                        </span>
                        <span style={{ fontSize: '14px', fontWeight: 400, color: '#ffffff', flex: 1 }}>
                          David Lynch
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#777777', minWidth: '120px' }}>
                          Type:
                        </span>
                        <span style={{ fontSize: '14px', fontWeight: 400, color: '#ffffff', flex: 1 }}>
                          {video.tags?.includes('Album') || video.tags?.includes('Soundtrack') ? 'Music Album' :
                           video.tags?.includes('Documentary') ? 'Documentary' :
                           video.tags?.includes('Interview') || video.tags?.includes('Message') ? 'Interview / Talk' :
                           video.tags?.includes('Series') || video.tags?.includes('Web Series') ? 'TV Series' :
                           video.tags?.includes('Trailer') || video.duration?.includes('Official Trailer') ? 'Film Trailer' :
                           video.duration?.includes('min') ? 'Short Film' : 'Feature Film'}
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#777777', minWidth: '120px' }}>
                          Style:
                        </span>
                        <span style={{ fontSize: '14px', fontWeight: 400, color: '#ffffff', flex: 1 }}>
                          {video.tags?.includes('Experimental') ? 'Experimental Cinema' :
                           video.tags?.includes('Surreal') ? 'Surrealist Art' :
                           video.tags?.includes('Neo-Noir') ? 'Neo-Noir' :
                           video.tags?.includes('Animation') ? 'Experimental Animation' :
                           video.tags?.includes('Twin Peaks') ? 'Twin Peaks Universe' :
                           'Lynchian Masterwork'}
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#777777', minWidth: '120px' }}>
                          Era:
                        </span>
                        <span style={{ fontSize: '14px', fontWeight: 400, color: '#ffffff', flex: 1 }}>
                          {(() => {
                            const year = video.title.match(/\((\d{4})\)/)?.[1];
                            if (!year) return 'Classic Lynch';
                            const y = parseInt(year);
                            if (y >= 2020) return 'Recent Work (2020s)';
                            if (y >= 2010) return 'Late Period (2010s)';
                            if (y >= 2000) return 'Mature Period (2000s)';
                            if (y >= 1990) return 'Peak Period (1990s)';
                            if (y >= 1980) return 'Classic Period (1980s)';
                            return 'Early Works (1960s-70s)';
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div 
                    className="my-12"
                    style={{
                      height: '1px',
                      backgroundColor: '#404040',
                      position: 'relative',
                      zIndex: 2,
                    }}
                  />

                  {/* Disclaimer */}
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <p 
                      style={{
                        fontSize: '11px',
                        fontWeight: 400,
                        color: '#808080',
                        lineHeight: '16px',
                      }}
                    >
                      <strong style={{ color: 'var(--accent-red)', fontWeight: 700 }}>LynchUniverse</strong> — A tribute to David Lynch's visionary filmmaking. 
                      Content streamed from YouTube. All rights belong to their respective owners. For educational and entertainment purposes.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}