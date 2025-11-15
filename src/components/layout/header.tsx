"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/layout/logo';
import { CartIcon } from '@/components/cart/cart-icon';
import { useUser } from '@/firebase';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from 'react';
import { signOut, getAuth } from 'firebase/auth';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Produtos' },
  { href: '/about', label: 'Sobre' },
];

export default function Header() {
  const pathname = usePathname();
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setIsMobileMenuOpen(false);
  }

  const NavContent = () => (
    <>
      {navLinks.map((link) => (
        <Button asChild variant="link" key={link.href}>
          <Link
            href={link.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-accent",
              pathname === link.href ? "text-accent" : "text-primary-foreground/80",
              "text-lg md:text-sm"
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.label}
          </Link>
        </Button>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden md:flex items-center gap-4">
          <NavContent />
        </nav>
        <div className="flex items-center gap-4">
          <CartIcon />
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <Button asChild variant="ghost" size="icon">
                <Link href="/profile" aria-label="User Profile">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Logout">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button asChild variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/register">Cadastre-se</Link>
              </Button>
            </div>
          )}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full bg-background pt-12">
                <nav className="flex flex-col items-center gap-6">
                  <NavContent />
                  <div className="border-t border-border w-full my-4"></div>
                   {user ? (
                    <div className="flex flex-col items-center gap-4">
                      <Button asChild variant="ghost" className="w-full text-lg">
                        <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>Perfil</Link>
                      </Button>
                      <Button variant="ghost" onClick={handleLogout} className="w-full text-lg">
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4 w-full px-8">
                       <Button asChild variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                      </Button>
                      <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>Cadastre-se</Link>
                      </Button>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
