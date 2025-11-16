
"use client";

import Link from 'next/link';
import { SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/cart-provider';
import { useUser } from '@/firebase';
import { CartItemCard } from './cart-item-card';
import { ShoppingBag } from 'lucide-react';

export function CartSheet() {
  const { cartItems, cartTotal } = useCart();
  const { user, isUserLoading } = useUser();
  const isAuthenticated = !!user;
  const formattedTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal);

  return (
    <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
      <SheetHeader className="px-6">
        <SheetTitle className="font-headline text-2xl">Seu Carrinho</SheetTitle>
      </SheetHeader>
      <Separator />
      {cartItems.length > 0 ? (
        <>
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-4 p-6">
              {cartItems.map(item => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>
          </ScrollArea>
          <Separator />
          <SheetFooter className="p-6 sm:flex-col sm:items-stretch sm:gap-4">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Subtotal:</span>
              <span>{formattedTotal}</span>
            </div>
            <p className="text-xs text-muted-foreground text-center">Frete e impostos serão calculados no checkout.</p>
            <SheetClose asChild>
               <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isUserLoading}>
                <Link href={!isUserLoading && isAuthenticated ? "/checkout" : "/login?redirect=/checkout"}>
                  Finalizar Compra
                </Link>
              </Button>
            </SheetClose>
             <SheetClose asChild>
                <Button variant="outline" asChild>
                    <Link href="/products">Continuar Comprando</Link>
                </Button>
            </SheetClose>
          </SheetFooter>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          <h3 className="text-xl font-semibold">Seu carrinho está vazio</h3>
          <p className="text-muted-foreground">Parece que você ainda não adicionou nenhum item.</p>
          <SheetClose asChild>
            <Button asChild>
              <Link href="/products">Explorar Produtos</Link>
            </Button>
          </SheetClose>
        </div>
      )}
    </SheetContent>
  );
}
