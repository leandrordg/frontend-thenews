import Link from "next/link";

import { HomeIcon, LogInIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <main className="min-h-dvh flex flex-col md:items-center justify-center gap-8 p-4">
      <h1 className="text-2xl font-bold tracking-wide">
        Parece que você se perdeu! 🧭
      </h1>

      <p className="text-base text-muted-foreground">
        A página que você está procurando não existe. Que tal fazer login e
        tentar novamente?
      </p>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <Button size="lg" className="w-full" asChild>
          <Link href="/sign-in">
            fazer login <LogInIcon />
          </Link>
        </Button>

        <Button size="lg" variant="outline" className="w-full" asChild>
          <Link href="/">
            voltar para a página inicial <HomeIcon />
          </Link>
        </Button>
      </div>
    </main>
  );
}
