import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/product-card';
import { products, categories } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Gamepad2, Headphones, Keyboard, Puzzle } from 'lucide-react';

const categoryIcons: { [key: string]: React.ReactNode } = {
  'Consoles': <Gamepad2 className="w-8 h-8" />,
  'Jogos': <Puzzle className="w-8 h-8" />,
  'Acessórios': <Headphones className="w-8 h-8" />,
  'Periféricos': <Keyboard className="w-8 h-8" />,
};

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-16">
      <section className="relative rounded-lg overflow-hidden h-[50vh] flex items-center justify-center text-center p-8">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-white max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter mb-4 text-shadow-lg">
            Seu Universo Gamer Começa Aqui
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
            Encontre os melhores consoles, jogos e acessórios para elevar sua experiência.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
            <Link href="/products">Explorar Produtos <ArrowRight className="ml-2" /></Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-headline font-bold mb-6 text-center">Produtos em Destaque</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-headline font-bold mb-6 text-center">Compre por Categoria</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <Link href={`/products?category=${encodeURIComponent(category.name)}`} key={category.id}>
              <div className="bg-card p-6 rounded-lg text-center group hover:bg-primary/20 border border-transparent hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex justify-center mb-4 text-primary group-hover:text-accent transition-colors duration-300">
                  {categoryIcons[category.name] || <Gamepad2 className="w-8 h-8" />}
                </div>
                <h3 className="text-xl font-headline font-semibold text-foreground group-hover:text-white">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
