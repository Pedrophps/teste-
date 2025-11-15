import { products, categories } from '@/lib/data';
import type { Product } from '@/lib/types';
import { ProductCard } from '@/components/products/product-card';
import { ProductFilters } from '@/components/products/product-filters';
import PaginationControls from '@/components/shared/pagination-controls';
import { Suspense } from 'react';

type SearchParams = {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  brand?: string;
  rating?: string;
  page?: string;
};

export default function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const { search, category, minPrice, maxPrice, brand, rating, page } = searchParams;

  let filteredProducts: Product[] = [...products];

  if (search) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    const categoryId = categories.find(c => c.name === category)?.id;
    if (categoryId) {
      filteredProducts = filteredProducts.filter(p => p.categoryId === categoryId);
    }
  }
  
  if (minPrice) {
    filteredProducts = filteredProducts.filter(p => p.price >= Number(minPrice));
  }
  
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= Number(maxPrice));
  }
  
  if (brand) {
    const brands = brand.split(',');
    filteredProducts = filteredProducts.filter(p => brands.includes(p.brand));
  }

  if (rating) {
    filteredProducts = filteredProducts.filter(p => p.rating >= Number(rating));
  }
  
  const currentPage = Number(page) || 1;
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-1/4 lg:w-1/5">
        <Suspense fallback={<div>Loading filters...</div>}>
          <ProductFilters brands={[...new Set(products.map(p => p.brand))]} />
        </Suspense>
      </aside>
      <main className="w-full md:w-3/4 lg:w-4/5">
        <h1 className="text-3xl font-bold font-headline mb-6">Todos os Produtos</h1>
        {paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              className="mt-8"
            />
          </>
        ) : (
          <div className="text-center py-16 bg-card rounded-lg">
            <h2 className="text-2xl font-bold font-headline">Nenhum produto encontrado</h2>
            <p className="text-muted-foreground mt-2">Tente ajustar seus filtros de busca.</p>
          </div>
        )}
      </main>
    </div>
  );
}
