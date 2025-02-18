import { Metadata } from "next";

export const metadata: Metadata = {
  title: "the news ☕ - autenticação",
  description: "Faça login para ver as suas estatísticas de leitura",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
