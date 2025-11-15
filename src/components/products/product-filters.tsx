"use client";

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { categories } from '@/lib/data';
import { X } from 'lucide-react';

export function ProductFilters({ brands }: { brands: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      params.set('page', '1');
      return params.toString();
    },
    [searchParams]
  );
  
  const handleMultiCheckbox = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.get(name)?.split(',') || [];
    if (currentValues.includes(value)) {
        const newValues = currentValues.filter(v => v !== value);
        if (newValues.length > 0) {
            params.set(name, newValues.join(','));
        } else {
            params.delete(name);
        }
    } else {
        params.set(name, [...currentValues, value].join(','));
    }
    params.set('page', '1');
    router.push(pathname + '?' + params.toString());
  }

  const clearFilters = () => {
    router.push(pathname);
  };
  
  const hasFilters = searchParams.toString().length > 0;

  return (
    <div className="space-y-6 sticky top-24">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold font-headline">Filtros</h3>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="w-4 h-4 mr-1"/> Limpar
          </Button>
        )}
      </div>

      <div>
        <Label htmlFor="search" className="font-semibold">Busca</Label>
        <Input
          id="search"
          placeholder="Nome do produto..."
          defaultValue={searchParams.get('search') || ''}
          onChange={(e) => router.push(pathname + '?' + createQueryString('search', e.target.value))}
          className="mt-2"
        />
      </div>

      <div>
        <h4 className="font-semibold mb-2">Categorias</h4>
        <RadioGroup
          defaultValue={searchParams.get('category') || ''}
          onValueChange={(value) => router.push(pathname + '?' + createQueryString('category', value))}
          className="space-y-1"
        >
          {categories.map(cat => (
            <div key={cat.id} className="flex items-center space-x-2">
              <RadioGroupItem value={cat.name} id={`cat-${cat.id}`} />
              <Label htmlFor={`cat-${cat.id}`}>{cat.name}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Marcas</h4>
        <div className="space-y-1">
          {brands.map(brand => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox 
                id={`brand-${brand}`}
                checked={searchParams.get('brand')?.split(',').includes(brand)}
                onCheckedChange={() => handleMultiCheckbox('brand', brand)}
              />
              <Label htmlFor={`brand-${brand}`}>{brand}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold mb-2">Avaliação</h4>
        <RadioGroup
          defaultValue={searchParams.get('rating') || ''}
          onValueChange={(value) => router.push(pathname + '?' + createQueryString('rating', value))}
          className="space-y-1"
        >
            {[4, 3, 2, 1].map(r => (
                 <div key={r} className="flex items-center space-x-2">
                    <RadioGroupItem value={String(r)} id={`rating-${r}`} />
                    <Label htmlFor={`rating-${r}`}>{r} estrelas ou mais</Label>
                </div>
            ))}
        </RadioGroup>
      </div>

    </div>
  );
}
