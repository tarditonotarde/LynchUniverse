import React from 'react';
import AppMain from './AppMain';
import { AudioProvider } from './contexts/AudioContext';
import { FavoritesProvider } from './contexts/FavoritesContext';

export default function App() {
  return (
    <AudioProvider>
      <FavoritesProvider>
        <AppMain />
      </FavoritesProvider>
    </AudioProvider>
  );
}