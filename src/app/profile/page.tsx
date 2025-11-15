"use client"

import { useUser } from "@/firebase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";

export default function ProfilePage() {
    const { user } = useUser();

    if (!user) return null;

    return (
        <div>
            <h1 className="text-3xl font-bold font-headline mb-6">Meus Dados</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                    <CardDescription>Aqui estão os seus dados cadastrados na plataforma.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-semibold text-muted-foreground">Nome Completo</p>
                            <p>{user.displayName}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-muted-foreground">E-mail</p>
                            <p>{user.email}</p>
                        </div>
                    </div>
                     <div className="pt-4">
                        <Button variant="outline">
                            <PenSquare className="mr-2 h-4 w-4" /> Editar Dados
                        </Button>
                     </div>
                </CardContent>
            </Card>
        </div>
    )
}
