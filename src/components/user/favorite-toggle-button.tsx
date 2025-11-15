"use client";

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/contexts/favorites-provider';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface FavoriteToggleButtonProps {
  productId: string;
}

export function FavoriteToggleButton({ productId }: FavoriteToggleButtonProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { toast } = useToast();
  const isFav = isFavorite(productId);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFav) {
      removeFavorite(productId);
       toast({ title: 'Removido dos favoritos.' });
    } else {
      addFavorite(productId);
       toast({ title: 'Adicionado aos favoritos!' });
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full bg-card/60 hover:bg-card text-primary"
      onClick={toggleFavorite}
      aria-label={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <Heart className={cn('w-5 h-5 transition-all', isFav ? 'fill-current text-accent' : 'text-primary')} />
    </Button>
  );
}
