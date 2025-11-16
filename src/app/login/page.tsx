
import { LoginForm } from '@/components/auth/login-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Suspense } from 'react';

function LoginContent() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold font-headline">Bem-vindo de volta!</CardTitle>
        <CardDescription>Faça login para acessar sua conta.</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}


export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <Suspense fallback={<div>Carregando...</div>}>
        <LoginContent />
      </Suspense>
    </div>
  );
}
