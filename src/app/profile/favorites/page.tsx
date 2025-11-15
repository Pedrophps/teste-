"use client"

import { useFavorites } from "@/contexts/favorites-provider";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/products/product-card";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
    const { favoriteIds } = useFavorites();
    const favoriteProducts = products.filter(p => favoriteIds.includes(p.id));

    return (
        <div>
            <h1 className="text-3xl font-bold font-headline mb-6">Meus Favoritos</h1>
            {favoriteProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-card rounded-lg border-dashed border-2">
                    <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h2 className="mt-4 text-2xl font-bold font-headline">Nenhum favorito encontrado</h2>
                    <p className="text-muted-foreground mt-2">Clique no coração dos produtos para adicioná-los aqui.</p>
                </div>
            )}
        </div>
    )
}
