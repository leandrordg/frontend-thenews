import { getUserStats } from "@/hooks/user";
import { formatDate, formatStreaks } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { CalendarIcon, ClockIcon, MailIcon } from "lucide-react";

import { EmptyDashboard } from "@/components/empty-dashboard";
import { HistoryCalendar } from "@/components/history-calendar";
import { MotivationalMessage } from "@/components/motivational-message";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/streaks/data-table";
import { columns } from "@/components/streaks/columns";
import { getStreakRanking } from "@/hooks/streak";

export default async function DashboardPage() {
  const user = await currentUser();

  // usuário sempre vai existir, pois a rota é protegida pelo middleware
  const { streak, history, lastOpen, openHistory } = await getUserStats(
    user?.primaryEmailAddress?.emailAddress
  );

  const streakRanking = await getStreakRanking();

  if (!openHistory) return <EmptyDashboard />;

  return (
    <main className="max-w-7xl mx-auto p-4 py-16 space-y-8">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard do leitor</h1>

      <MotivationalMessage streak={streak} />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Streak Atual</CardTitle>
            <div className="size-7 rounded-full bg-[#FFCE04] flex items-center justify-center">
              <CalendarIcon className="size-4 text-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatStreaks(streak)}</p>
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
            <div className="size-7 rounded-full bg-[#FFCE04] flex items-center justify-center">
              <MailIcon className="size-4 text-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{openHistory.length}</p>
            <p className="text-xs text-muted-foreground">Newsletters lidas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Última Leitura
            </CardTitle>
            <div className="size-7 rounded-full bg-[#FFCE04] flex items-center justify-center">
              <ClockIcon className="size-4 text-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatDate(lastOpen)}</p>
            <p className="text-xs text-muted-foreground">
              Leitura mais recente
            </p>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">
          Seu histórico de leituras diárias
        </h2>
        <HistoryCalendar history={history} />
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Classificação geral</h2>
        <p className="text-muted-foreground">
          Compare sua streak com a de outros leitores. Em breve, teremos mais
          informações sobre isso.
        </p>

        <DataTable columns={columns} data={streakRanking} />
      </section>
    </main>
  );
}
