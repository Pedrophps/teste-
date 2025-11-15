import { Logo } from './logo';
import { Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border/40">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Logo />
            <p className="mt-2 text-sm text-muted-foreground">
              Seu portal para o universo gamer.
            </p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors"><Github /></a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors"><Twitter /></a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors"><Instagram /></a>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Pixel Emporium. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
