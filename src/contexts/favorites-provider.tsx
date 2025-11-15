"use client";

import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '@/lib/hooks';

interface FavoritesContextType {
  favoriteIds: string[];
  addFavorite: (productId: string) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useLocalStorage<string[]>('favorites', []);

  const addFavorite = (productId: string) => {
    setFavoriteIds(prev => [...new Set([...prev, productId])]);
  };

  const removeFavorite = (productId: string) => {
    setFavoriteIds(prev => prev.filter(id => id !== productId));
  };

  const isFavorite = (productId: string) => {
    return favoriteIds.includes(productId);
  };

  return (
    <FavoritesContext.Provider value={{ favoriteIds, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
