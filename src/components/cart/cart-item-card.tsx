"use client";

import Image from 'next/image';
import type { CartItem } from '@/lib/types';
import { useCart } from '@/contexts/cart-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const image = PlaceHolderImages.find(p => p.imageUrl === item.image);

  const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price);
  
  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="flex items-start gap-4">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        {image && (
             <Image
                src={image.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={image.imageHint}
            />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex justify-between">
            <h4 className="font-semibold">{item.name}</h4>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id)}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remover item</span>
            </Button>
        </div>
        <p className="text-sm text-muted-foreground">{formattedPrice}</p>
        <div className="flex items-center gap-2 mt-2">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.quantity - 1)} disabled={item.quantity <= 1}>
                <Minus className="h-4 w-4" />
                <span className="sr-only">Diminuir quantidade</span>
            </Button>
            <Input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 1)}
                className="h-8 w-14 text-center"
                min="1"
            />
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.quantity + 1)}>
                <Plus className="h-4 w-4" />
                <span className="sr-only">Aumentar quantidade</span>
            </Button>
        </div>
      </div>
    </div>
  );
}
