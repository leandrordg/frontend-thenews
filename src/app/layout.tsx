import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "the news ☕ - desafio full stack",
  description: "Acompanhe seu progresso de leituras diárias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
