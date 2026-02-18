import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoritesContextType {
  myList: string[];
  likedVideos: string[];
  addToMyList: (videoId: string) => void;
  removeFromMyList: (videoId: string) => void;
  isInMyList: (videoId: string) => boolean;
  toggleLike: (videoId: string) => void;
  isLiked: (videoId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [myList, setMyList] = useState<string[]>([]);
  const [likedVideos, setLikedVideos] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedMyList = localStorage.getItem('lynchUniverse_myList');
    const savedLiked = localStorage.getItem('lynchUniverse_liked');
    
    if (savedMyList) {
      setMyList(JSON.parse(savedMyList));
    }
    if (savedLiked) {
      setLikedVideos(JSON.parse(savedLiked));
    }
  }, []);

  // Save to localStorage whenever lists change
  useEffect(() => {
    localStorage.setItem('lynchUniverse_myList', JSON.stringify(myList));
  }, [myList]);

  useEffect(() => {
    localStorage.setItem('lynchUniverse_liked', JSON.stringify(likedVideos));
  }, [likedVideos]);

  const addToMyList = (videoId: string) => {
    setMyList(prev => {
      if (!prev.includes(videoId)) {
        return [...prev, videoId];
      }
      return prev;
    });
  };

  const removeFromMyList = (videoId: string) => {
    setMyList(prev => prev.filter(id => id !== videoId));
  };

  const isInMyList = (videoId: string) => {
    return myList.includes(videoId);
  };

  const toggleLike = (videoId: string) => {
    setLikedVideos(prev => {
      if (prev.includes(videoId)) {
        return prev.filter(id => id !== videoId);
      } else {
        return [...prev, videoId];
      }
    });
  };

  const isLiked = (videoId: string) => {
    return likedVideos.includes(videoId);
  };

  return (
    <FavoritesContext.Provider value={{
      myList,
      likedVideos,
      addToMyList,
      removeFromMyList,
      isInMyList,
      toggleLike,
      isLiked,
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}