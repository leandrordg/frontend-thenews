import { Header } from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "the news ☕ - visualizando seu desenvolvimento",
  description: "Acompanhe o seu desenvolvimento na plataforma.",
};

export default function DashboardLayout({
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
