
"use client";

import React from 'react';
import { CartProvider } from '@/contexts/cart-provider';
import { FavoritesProvider } from '@/contexts/favorites-provider';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseClientProvider>
        <CartProvider>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
        </CartProvider>
    </FirebaseClientProvider>
  );
}
