import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function OrderConfirmationPage({ params }: { params: { orderId: string } }) {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
        <Card className="w-full max-w-2xl text-center">
             <CardHeader className="items-center">
                <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                <CardTitle className="text-3xl font-bold font-headline">Pedido Realizado com Sucesso!</CardTitle>
                <CardDescription>Obrigado por comprar na Pixel Emporium.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="bg-muted p-4 rounded-md">
                    <p className="text-sm text-muted-foreground">Número do seu pedido</p>
                    <p className="text-xl font-mono font-bold text-primary">{params.orderId}</p>
                </div>
                <p className="text-muted-foreground">
                    Você receberá uma confirmação por e-mail em breve. Você pode acompanhar o status do seu pedido na sua área de perfil.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Link href="/profile/orders">Ver Meus Pedidos</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/products">Continuar Comprando</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
