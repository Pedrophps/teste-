import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-xl font-bold font-headline text-primary-foreground">
      <Gamepad2 className="h-7 w-7 text-accent" />
      <span>Pixel Emporium</span>
    </Link>
  );
}
