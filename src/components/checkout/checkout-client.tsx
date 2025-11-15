"use client";

import { useState } from 'react';
import { useCart } from '@/contexts/cart-provider';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '../ui/separator';

type CheckoutStep = 'review' | 'address' | 'payment' | 'summary';

export function CheckoutClient() {
  const [step, setStep] = useState<CheckoutStep>('review');
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useUser();
  const router = useRouter();
  const [shippingAddress, setShippingAddress] = useState(''); // User address from firestore would go here

  const handleConfirmOrder = () => {
    // Mock order creation
    const orderId = `PX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    console.log("Order created:", { orderId, user, items: cartItems, total: cartTotal, address: shippingAddress });
    clearCart();
    router.push(`/order-confirmation/${orderId}`);
  };

  const steps = [
    { id: 'review', title: 'Revisão dos Itens' },
    { id: 'address', title: 'Endereço de Entrega' },
    { id: 'payment', title: 'Pagamento' },
    { id: 'summary', title: 'Resumo Final' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === step);

  return (
    <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            {steps.map((s, index) => (
                <div key={s.id} className="flex-1 text-center">
                    <div className={`text-sm font-bold ${index <= currentStepIndex ? 'text-primary' : 'text-muted-foreground'}`}>{s.title}</div>
                     <div className={`mt-2 h-1 w-full ${index <= currentStepIndex ? 'bg-primary' : 'bg-border'}`}></div>
                </div>
            ))}
        </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">{steps[currentStepIndex].title}</CardTitle>
          <CardDescription>
            {
                step === 'review' ? 'Confira os itens no seu carrinho.' :
                step === 'address' ? 'Confirme ou edite seu endereço de entrega.' :
                step === 'payment' ? 'Escolha sua forma de pagamento.' :
                'Confirme todos os detalhes antes de finalizar.'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'review' && (
            <div>
              {cartItems.map(item => {
                const image = PlaceHolderImages.find(p => p.imageUrl === item.image);
                return (
                  <div key={item.id} className="flex items-center justify-between py-4 border-b">
                    <div className="flex items-center gap-4">
                      <Image src={image?.imageUrl || ''} alt={item.name} width={64} height={64} className="rounded-md" />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}</p>
                  </div>
                );
              })}
              <div className="text-right font-bold text-lg mt-4">
                Total Parcial: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal)}
              </div>
              <Button onClick={() => setStep('address')} className="w-full mt-6">Confirmar Itens e Continuar</Button>
            </div>
          )}
          {step === 'address' && (
            <div className="space-y-4">
              <Label htmlFor="address">Endereço de Entrega</Label>
              <Input id="address" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} />
              <Button onClick={() => setStep('payment')} className="w-full mt-4">Confirmar Endereço e Continuar</Button>
            </div>
          )}
          {step === 'payment' && (
            <div className="space-y-6">
                <RadioGroup defaultValue="credit-card" className="space-y-4">
                    <Label className="flex items-center space-x-3 p-4 border rounded-md has-[:checked]:border-primary">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <span>Cartão de Crédito</span>
                    </Label>
                    <Label className="flex items-center space-x-3 p-4 border rounded-md has-[:checked]:border-primary">
                        <RadioGroupItem value="pix" id="pix" />
                        <span>PIX</span>
                    </Label>
                    <Label className="flex items-center space-x-3 p-4 border rounded-md has-[:checked]:border-primary">
                        <RadioGroupItem value="boleto" id="boleto" />
                        <span>Boleto Bancário</span>
                    </Label>
                </RadioGroup>
                <Separator />
                {/* Mock credit card form */}
                 <div className="space-y-4">
                    <Input placeholder="Número do Cartão" />
                    <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="Validade (MM/AA)" />
                        <Input placeholder="CVC" />
                    </div>
                    <Input placeholder="Nome no Cartão" />
                </div>
              <Button onClick={() => setStep('summary')} className="w-full mt-4">Revisar Pedido</Button>
            </div>
          )}
          {step === 'summary' && (
            <div className="space-y-6">
                <div>
                    <h4 className="font-bold">Cliente</h4>
                    <p className="text-muted-foreground">{user?.displayName}</p>
                </div>
                <div>
                    <h4 className="font-bold">Endereço de Entrega</h4>
                    <p className="text-muted-foreground">{shippingAddress}</p>
                </div>
                 <div>
                    <h4 className="font-bold">Itens do Pedido</h4>
                    {cartItems.map(item => <p key={item.id} className="text-muted-foreground">{item.quantity}x {item.name}</p>)}
                </div>
                 <div className="text-right font-bold text-2xl mt-4 text-primary">
                    Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal)}
                </div>
              <Button onClick={handleConfirmOrder} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6">Confirmar Pedido</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
