import { Header } from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "the news ☕ - desafio full stack",
  description: "Acompanhe seu progresso de leituras diárias",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
