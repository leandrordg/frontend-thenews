import Image from "next/image";

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto p-4">
      <div className="w-44 h-10 relative">
        <Image src="/images/logo.png" alt="the news" fill />
      </div>
    </main>
  );
}
