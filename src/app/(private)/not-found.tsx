import Link from "next/link";

import { HomeIcon, LogInIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <main className="max-w-4xl mx-auto p-4 py-16 space-y-4 md:text-center">
      <h1 className="text-2xl font-bold tracking-wide">
        Parece que você se perdeu! 🧭
      </h1>

      <p className="text-base text-muted-foreground">
        A página que você está procurando não existe. Que tal fazer login e
        tentar novamente?
      </p>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mt-8">
        <Button size="lg" className="w-full" asChild>
          <Link href="/login">
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
