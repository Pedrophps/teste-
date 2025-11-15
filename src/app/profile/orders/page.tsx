"use client"

import { orders } from "@/lib/data";
import { useUser } from "@/firebase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function OrdersPage() {
    const { user } = useUser();
    // In a real app, you'd fetch this from your backend against the user.uid
    const userOrders = user ? orders.filter(o => o.userId === user.uid) : [];
    
    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Entregue': return 'default';
            case 'Enviado': return 'secondary';
            case 'Processando': return 'outline';
            default: return 'destructive';
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold font-headline mb-6">Meus Pedidos</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Histórico de Pedidos</CardTitle>
                    <CardDescription>Veja todos os pedidos que você já fez.</CardDescription>
                </CardHeader>
                <CardContent>
                    {userOrders.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Pedido</TableHead>
                                    <TableHead>Data</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {userOrders.map(order => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell>{new Date(order.date).toLocaleDateString('pt-BR')}</TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusVariant(order.status) as any}>{order.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.total)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="text-muted-foreground text-center py-8">Você ainda não fez nenhum pedido.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
