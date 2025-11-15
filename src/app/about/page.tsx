import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Gamepad2, Rocket, Target } from 'lucide-react';

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us-banner');

  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary tracking-tighter">Sobre a Pixel Emporium</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Nascemos da paixão por jogos e da vontade de criar um espaço onde gamers pudessem encontrar tudo que precisam.
        </p>
      </header>

      {aboutImage && (
        <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
          <Image
            src={aboutImage.imageUrl}
            alt={aboutImage.description}
            fill
            className="object-cover"
            data-ai-hint={aboutImage.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-card p-6 rounded-lg">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Gamepad2 className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold font-headline mb-2">Nossa Paixão</h2>
          <p className="text-muted-foreground">
            Somos gamers, assim como você. Entendemos a emoção de um novo lançamento e a busca pelo setup perfeito.
          </p>
        </div>
        <div className="bg-card p-6 rounded-lg">
          <div className="flex justify-center mb-4">
            <div className="bg-accent/10 p-3 rounded-full">
              <Rocket className="h-8 w-8 text-accent" />
            </div>
          </div>
          <h2 className="text-2xl font-bold font-headline mb-2">Nossa Missão</h2>
          <p className="text-muted-foreground">
            Oferecer os melhores produtos, com o melhor serviço, para que sua única preocupação seja vencer a próxima partida.
          </p>
        </div>
        <div className="bg-card p-6 rounded-lg">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Target className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold font-headline mb-2">Nossa Visão</h2>
          <p className="text-muted-foreground">
            Ser o destino número um para a comunidade gamer, construindo um ecossistema que vai além de uma simples loja.
          </p>
        </div>
      </div>
    </div>
  );
}
