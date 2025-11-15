"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, ShoppingBag, Heart, LogOut } from "lucide-react";
import { useUser } from "@/firebase";
import { Button } from "../ui/button";
import { getAuth, signOut } from "firebase/auth";

const navItems = [
    { href: "/profile", label: "Meus Dados", icon: User },
    { href: "/profile/orders", label: "Meus Pedidos", icon: ShoppingBag },
    { href: "/profile/favorites", label: "Favoritos", icon: Heart },
];

export function ProfileNav() {
    const pathname = usePathname();
    const { user } = useUser();

    const handleLogout = async () => {
        const auth = getAuth();
        await signOut(auth);
    }

    return (
        <nav className="flex flex-col gap-4 sticky top-24">
            <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-bold font-headline text-lg truncate">{user?.displayName}</h3>
                <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
            </div>
            <div className="space-y-1">
                {navItems.map((item) => (
                    <Link href={item.href} key={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10",
                            pathname === item.href && "bg-primary/10 text-primary font-semibold"
                        )}>
                        <item.icon className="h-4 w-4" />
                        {item.label}
                    </Link>
                ))}
                <Button onClick={handleLogout} variant="ghost" className="w-full justify-start flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-destructive hover:bg-destructive/10">
                     <LogOut className="h-4 w-4" />
                     Sair
                </Button>
            </div>
        </nav>
    );
}
