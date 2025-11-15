"use client";

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-provider';
import { CartSheet } from './cart-sheet';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';

export function CartIcon() {
  const { cartCount } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Button variant="ghost" size="icon" className="relative" disabled>
        <ShoppingCart className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label={`View cart, ${cartCount} items`}>
          <ShoppingCart className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
              {cartCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <CartSheet />
    </Sheet>
  );
}
