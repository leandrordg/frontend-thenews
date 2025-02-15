import Image from "next/image";
import Link from "next/link";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { LogInIcon } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b z-10">
      <div className="max-w-7xl mx-auto p-4 flex items-center gap-4">
        <Link href="/">
          <div className="w-44 h-10 relative">
            <Image src="/images/logo.png" alt="the news" fill />
          </div>
        </Link>

        <div className="flex items-center gap-4 ml-auto">
          <ThemeToggle />
          <SignedOut>
            <SignInButton mode="modal">
              <Button>
                fazer login <LogInIcon />
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
