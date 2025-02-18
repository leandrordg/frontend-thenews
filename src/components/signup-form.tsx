"use client";

import Link from "next/link";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { ChevronRightIcon, EllipsisIcon, LogInIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SignUpForm() {
  return (
    <SignUp.Root>
      <SignUp.Step name="start" className="flex flex-col gap-4">
        <Clerk.GlobalError className="block text-sm text-red-400" />

        <Clerk.Loading scope="provider:google">
          {(isLoading) => (
            <Clerk.Connection name="google" disabled={isLoading} asChild>
              <Button variant="outline">
                {isLoading ? (
                  <EllipsisIcon className="animate-pulse" />
                ) : (
                  <>
                    <Clerk.Icon />
                    Continuar com Google
                  </>
                )}
              </Button>
            </Clerk.Connection>
          )}
        </Clerk.Loading>

        <Clerk.Field name="identifier" className="flex flex-col gap-2">
          <Clerk.Label className="text-sm font-medium">Email</Clerk.Label>

          <Clerk.Input type="text" required asChild>
            <Input type="email" placeholder="Digite o seu e-mail" />
          </Clerk.Input>

          <Clerk.FieldError className="block text-sm text-red-400" />
        </Clerk.Field>

        <SignUp.Action submit asChild>
          <Button type="submit" size="lg" className="w-full">
            <Clerk.Loading>
              {(isLoading) =>
                isLoading ? (
                  <EllipsisIcon className="animate-spin" />
                ) : (
                  "avançar"
                )
              }
            </Clerk.Loading>
          </Button>
        </SignUp.Action>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Button type="button" variant="link" asChild>
            <Link href="https://thenewscc.beehiiv.com/">
              quero ler mais notícias
              <ChevronRightIcon />
            </Link>
          </Button>

          <Button type="button" variant="link" asChild>
            <Link href="/sign-in">
              já tenho uma conta
              <LogInIcon />
            </Link>
          </Button>
        </div>

        <SignUp.Captcha className="empty:hidden" />
      </SignUp.Step>

      <SignUp.Step name="verifications" className="flex flex-col gap-4">
        <Clerk.Field name="code" className="flex flex-col gap-2">
          <Clerk.Label className="text-sm font-medium">
            Digite o código
          </Clerk.Label>

          <Clerk.Input type="otp" required asChild>
            <Input placeholder="Digite aqui..." />
          </Clerk.Input>

          <Clerk.FieldError className="block text-sm text-red-400" />
        </Clerk.Field>

        <SignUp.Action submit asChild>
          <Button type="submit" size="lg" className="w-full">
            <Clerk.Loading>
              {(isLoading) =>
                isLoading ? (
                  <EllipsisIcon className="animate-spin" />
                ) : (
                  "verificar"
                )
              }
            </Clerk.Loading>
          </Button>
        </SignUp.Action>
      </SignUp.Step>
    </SignUp.Root>
  );
}
