import Link from "next/link";

import { ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function EmptyDashboard() {
  return (
    <main className="max-w-7xl mx-auto p-4 py-16 space-y-8">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard do leitor</h1>

      <p className="text-lg text-muted-foreground leading-relaxed">
        Parece que você ainda não leu nenhuma newsletter nossa. Veja o que está
        esperando e comece a ler hoje mesmo!
      </p>

      {/* <MotivationalMessage streak={0} /> */}

      <Button asChild>
        <Link href="https://thenewscc.beehiiv.com/">
          começar agora <ChevronRightIcon />
        </Link>
      </Button>
    </main>
  );
}
