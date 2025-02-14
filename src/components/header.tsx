import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex items-center gap-4 h-16 px-4 border-b">
      <div className="max-w-7xl mx-auto p-4">
        <Link href="/">
          <div className="w-44 h-10 relative">
            <Image src="/images/logo.png" alt="the news" fill />
          </div>
        </Link>
      </div>
    </header>
  );
}
