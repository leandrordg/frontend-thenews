"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRightIcon } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    router.push(`/dashboard?email=${email}`);
  };

  return (
    <main className="max-w-7xl mx-auto p-4 py-16 flex items-center justify-center">
      <section className="md:text-center space-y-8">
        <div className="size-20 relative rounded-lg overflow-clip md:place-self-center">
          <Image src="/images/logo-square.png" alt="the news" fill />
        </div>

        <div>
          <h3 className="text-lg text-amber-300 font-bold tracking-widest">
            the news
          </h3>

          <h1 className="text-2xl font-bold tracking-wide text-balance">
            faça login e veja as suas estatísticas de leitura
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Digite o seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button type="submit" size="lg" className="w-full">
            Entrar
          </Button>
        </form>

        <Button variant="link" asChild>
          <Link href="https://thenewscc.beehiiv.com/">
            quero voltar a ler mais notícias
            <ChevronRightIcon />
          </Link>
        </Button>
      </section>
    </main>
  );
}
