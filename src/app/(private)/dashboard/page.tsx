import { notFound } from "next/navigation";

import { getUserStats } from "@/hooks/user";
import { formatDate, formatStreaks } from "@/lib/utils";
import { CalendarIcon, ClockIcon, MailIcon } from "lucide-react";

import { HistoryCalendar } from "@/components/history-calendar";
import { MotivationalMessage } from "@/components/motivational-message";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ email: string }>;
}) {
  const { email } = await searchParams;

  const userStats = await getUserStats(email);

  if (!userStats) return notFound();

  return (
    <main className="max-w-7xl mx-auto p-4 py-16 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard do Leitor</h1>

      <MotivationalMessage streak={userStats.streak} />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              {/* Current Streak */}
              Streak Atual
            </CardTitle>
            <div className="size-6 rounded-full bg-amber-300 flex items-center justify-center">
              <CalendarIcon className="size-4 text-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatStreaks(userStats.streak)}
            </div>
            <p className="text-xs text-muted-foreground">
              Continue lendo diariamente!
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total de Aberturas
            </CardTitle>
            <div className="size-6 rounded-full bg-amber-300 flex items-center justify-center">
              <MailIcon className="size-4 text-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userStats.openHistory.length}
            </div>
            <p className="text-xs text-muted-foreground">Newsletters lidas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Última Leitura
            </CardTitle>
            <div className="size-6 rounded-full bg-amber-300 flex items-center justify-center">
              <ClockIcon className="size-4 text-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatDate(userStats.lastOpen)}
            </div>
            <p className="text-xs text-muted-foreground">
              Leitura mais recente
            </p>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Seu Streak de Leitura</h2>
        <HistoryCalendar history={userStats.history} />
      </section>

      <section>
        <h2 className="text-xl font-semibold">Estatísticas Gerais</h2>
        <div className="mt-4">
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Streak:</strong> {userStats.streak} dias consecutivos
          </p>
        </div>
      </section>
    </main>
  );
}
