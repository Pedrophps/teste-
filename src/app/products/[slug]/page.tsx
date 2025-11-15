import { products, categories } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, ShieldCheck } from 'lucide-react';
import { AddToCartButton } from '@/components/cart/add-to-cart-button';
import { FavoriteToggleButton } from '@/components/user/favorite-toggle-button';
import { ProductCard } from '@/components/products/product-card';

export async function generateStaticParams() {
  return products.map(product => ({
    slug: product.slug,
  }));
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const image = PlaceHolderImages.find(p => p.id === product.imagePlaceholderId);
  const category = categories.find(c => c.id === product.categoryId);
  const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price);
  const relatedProducts = products.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);

  return (
    <div className="space-y-16">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative">
          {image && (
            <div className="aspect-square relative rounded-lg overflow-hidden border">
              <Image
                src={image.imageUrl}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                data-ai-hint={image.imageHint}
              />
            </div>
          )}
           <div className="absolute top-4 right-4 z-10">
            <FavoriteToggleButton productId={product.id} />
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-medium text-primary">{category?.name}</p>
          <h1 className="text-3xl lg:text-4xl font-bold font-headline mt-1">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.round(product.rating) ? 'fill-current' : 'fill-muted stroke-muted-foreground'}`}
                />
              ))}
            </div>
            <span className="text-muted-foreground text-sm">({product.rating} de 5)</span>
          </div>

          <p className="text-4xl lg:text-5xl font-bold font-headline text-primary my-6">{formattedPrice}</p>
          
          <div className="text-sm text-muted-foreground space-y-4">
             <p>{product.description}</p>
          </div>

          <div className="mt-6 space-y-4">
            <div className={`text-sm font-semibold ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {product.stock > 0 ? `${product.stock} em estoque` : 'Fora de estoque'}
            </div>
            
            <AddToCartButton 
                product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    image: image?.imageUrl || '',
                }}
                disabled={product.stock === 0}
                className="w-full text-lg py-6 bg-accent hover:bg-accent/90 text-accent-foreground"
            />

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>Compra segura e garantida</span>
            </div>
          </div>
        </div>
      </div>
       <section>
        <h2 className="text-3xl font-headline font-bold mb-6 text-center">Produtos Relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map(relatedProduct => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </section>
    </div>
  );
}
