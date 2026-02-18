import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  togglePlay: () => void;
  stop: () => void;
  toggleMute: () => void;
  startAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startAudio = () => {
    if (!audioRef.current) {
      try {
        const audio = new Audio('https://archive.org/download/tvtunes_657/Twin%20Peaks.mp3');
        audio.volume = 0.4;
        audio.loop = true;
        audio.play().catch((err) => {
          console.log('Audio playback failed:', err);
        });
        audioRef.current = audio;
        setIsPlaying(true);
      } catch (err) {
        console.log('Audio error:', err);
      }
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) {
      startAudio();
    } else {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch((err) => {
          console.log('Audio playback failed:', err);
        });
        setIsPlaying(true);
      }
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0.4;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <AudioContext.Provider value={{ isPlaying, isMuted, togglePlay, stop, toggleMute, startAudio }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
