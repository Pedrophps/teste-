
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFirebase } from '@/firebase';
import { useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z.string().min(1, { message: 'A senha é obrigatória.' }),
});

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/profile';
  const { auth, user, isUserLoading } = useFirebase();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (user) {
      router.push(redirectUrl);
    }
  }, [user, router, redirectUrl]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        toast({
            title: "Login bem-sucedido!",
            description: "Você será redirecionado em breve.",
        });
        // O onAuthStateChanged no provider cuidará do redirecionamento
    } catch (error: any) {
        if (error.code === 'auth/invalid-credential') {
             toast({
                title: 'Erro de Login',
                description: "Credenciais inválidas. Verifique seu e-mail e senha.",
                variant: 'destructive',
            });
        } else {
             toast({
                title: 'Erro Inesperado',
                description: "Ocorreu um erro durante o login. Tente novamente.",
                variant: 'destructive',
            });
        }
        console.error("Login Error:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="seu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-right">
          <Button variant="link" asChild className="p-0 h-auto text-muted-foreground">
            <Link href="#">Esqueceu sua senha?</Link>
          </Button>
        </div>
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={form.formState.isSubmitting || isUserLoading}>
          {form.formState.isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
        <div className="text-center text-sm text-muted-foreground">
          Não tem uma conta?{' '}
          <Button variant="link" asChild className="p-0 h-auto text-primary">
            <Link href="/register">Cadastre-se</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
