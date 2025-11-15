"use client"

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { AddToCartButton } from '@/components/cart/add-to-cart-button';
import { FavoriteToggleButton } from '@/components/user/favorite-toggle-button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = PlaceHolderImages.find(p => p.id === product.imagePlaceholderId);
  const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50 transform hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.slug}`} className="block">
          {image && (
            <Image
              src={image.imageUrl}
              alt={product.name}
              width={600}
              height={600}
              className="object-cover w-full h-48 sm:h-64"
              data-ai-hint={image.imageHint}
            />
          )}
        </Link>
        <div className="absolute top-2 right-2">
            <FavoriteToggleButton productId={product.id} />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <CardTitle className="text-lg font-headline leading-tight mb-2 flex-grow">
          <Link href={`/products/${product.slug}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </CardTitle>
        <div className="flex items-center gap-1 text-sm text-amber-400 mb-2">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-current' : 'fill-muted stroke-muted-foreground'}`}
            />
          ))}
          <span className="text-muted-foreground ml-1">({product.rating})</span>
        </div>
        <p className="text-2xl font-headline font-bold text-primary">{formattedPrice}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <AddToCartButton 
            product={{
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: image?.imageUrl || '',
            }}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        >
            Adicionar ao Carrinho
        </AddToCartButton>
      </CardFooter>
    </Card>
  );
}
