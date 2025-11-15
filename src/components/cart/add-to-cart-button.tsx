"use client"

import { Button, type ButtonProps } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/cart-provider";
import type { CartItem } from "@/lib/types";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps extends ButtonProps {
    product: CartItem
}

export function AddToCartButton({ product, children, ...props }: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const { toast } = useToast();

    const handleAddToCart = () => {
        addToCart(product);
        toast({
            title: "Produto adicionado!",
            description: `${product.name} foi adicionado ao seu carrinho.`,
            variant: "default",
        });
    }

    return (
        <Button onClick={handleAddToCart} {...props}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            {children || 'Adicionar ao Carrinho'}
        </Button>
    )
}
