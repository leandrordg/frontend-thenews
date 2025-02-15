import Image from "next/image";

import { SignInForm } from "@/components/signin-form";

export default function SignInPage() {
  return (
    <main className="max-w-7xl mx-auto p-4 py-16 space-y-8">
      <section className="md:text-center space-y-8">
        <div className="size-16 md:size-20 lg:size-24 relative rounded-lg overflow-clip md:place-self-center">
          <Image src="/images/logo-square.png" alt="the news" fill />
        </div>

        <div>
          <h3 className="text-lg text-[#FFCE04] font-bold tracking-widest">
            the news
          </h3>

          <h1 className="text-2xl font-bold tracking-wide text-balance">
            faça login e veja as suas estatísticas de leitura
          </h1>
        </div>
      </section>

      <section className="max-w-xl mx-auto">
        <SignInForm />
      </section>
    </main>
  );
}
