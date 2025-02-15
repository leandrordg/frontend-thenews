import Link from "next/link";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ChevronRightIcon, LogInIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="relative min-h-screen max-w-7xl mx-auto p-4 py-16">
      <h1 className="text-2xl font-bold tracking-wide">
        bem-vindo ao the news ☕️
      </h1>
      <p className="text-base text-muted-foreground">
        o melhor lugar para se manter informado sobre tudo que acontece no
        mundo.
      </p>

      <SignedIn>
        <Button size="lg" className="w-full mt-6" asChild>
          <Link href="/dashboard">
            ir para o dashboard <ChevronRightIcon />
          </Link>
        </Button>
      </SignedIn>
      <SignedOut>
        <Button size="lg" className="w-full mt-6" asChild>
          <Link href="/sign-in">
            fazer login <LogInIcon />
          </Link>
        </Button>
      </SignedOut>
    </main>
  );
}
