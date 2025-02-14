import Link from "next/link";

import { LogInIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto p-4 py-16 space-y-4 md:text-center">
      <h1 className="text-2xl font-bold tracking-wide">Bem-vindo ao the news ☕</h1>
      <p className="text-base text-muted-foreground">
        Acompanhe seu progresso de leituras diárias
      </p>

      <Button size="lg" className="w-full" asChild>
        <Link href="/login">fazer login <LogInIcon /></Link>
      </Button>
    </main>
  );
}
