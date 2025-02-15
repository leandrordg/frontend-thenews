import Image from "next/image";
import Link from "next/link";

import { SignedIn, SignedOut } from "@clerk/nextjs";

import { SignInDialog } from "@/components/signin-dialog";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";

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
            <SignInDialog />
          </SignedOut>
          <SignedIn>
            <UserMenu />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
