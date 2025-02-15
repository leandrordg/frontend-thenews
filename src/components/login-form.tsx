"use client";

import Link from "next/link";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { ChevronRightIcon, LoaderIcon, SendIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  return (
    <SignIn.Root>
      <SignIn.Step name="start" className="flex flex-col gap-4">
        <Clerk.GlobalError className="block text-sm text-red-400" />

        <Clerk.Field name="identifier" className="space-y-2">
          <Clerk.Label className="text-sm font-medium">Email</Clerk.Label>

          <Clerk.Input type="text" required asChild>
            <Input type="email" placeholder="Digite o seu e-mail" />
          </Clerk.Input>

          <Clerk.FieldError className="block text-sm text-red-400" />
        </Clerk.Field>

        <SignIn.Action submit asChild>
          <Button type="submit" size="lg" className="w-full">
            <Clerk.Loading>
              {(isLoading) =>
                isLoading ? (
                  <LoaderIcon className="animate-spin" />
                ) : (
                  "fazer login"
                )
              }
            </Clerk.Loading>
          </Button>
        </SignIn.Action>

        <Button type="button" variant="link" className="w-full" asChild>
          <Link href="https://thenewscc.beehiiv.com/">
            quero ler mais notícias
            <ChevronRightIcon />
          </Link>
        </Button>
      </SignIn.Step>

      <SignIn.Step
        name="verifications"
        className="flex flex-col gap-2 border p-4 rounded-md"
      >
        <SignIn.Strategy name="email_code">
          <h1 className="text-lg font-medium">Verifique o seu e-mail</h1>

          <p className="text-muted-foreground">
            Nós enviamos um código para o email:{" "}
            <span className="font-medium">
              <SignIn.SafeIdentifier />
            </span>
            .
          </p>

          <Clerk.Field name="code" className="flex flex-col gap-2 mt-4">
            <Clerk.Label>Código de verificação</Clerk.Label>

            <Clerk.Input asChild>
              <Input type="text" placeholder="Digite o código" />
            </Clerk.Input>

            <Clerk.FieldError />
          </Clerk.Field>

          <SignIn.Action asChild submit>
            <Button type="submit" size="lg" className="w-full mt-4">
              <Clerk.Loading>
                {(isLoading) =>
                  isLoading ? (
                    <LoaderIcon className="animate-spin" />
                  ) : (
                    <>
                      <SendIcon /> verificar
                    </>
                  )
                }
              </Clerk.Loading>
            </Button>
          </SignIn.Action>
        </SignIn.Strategy>
      </SignIn.Step>
    </SignIn.Root>
  );
}
