import { CalendarIcon, ClockIcon, MailIcon } from "lucide-react";

import { getUserEngagements } from "@/hooks/engagement";
import { getStreaksRanking, getUserStreaks } from "@/hooks/streaks";
import { formatLastStreaksDate, formatStreaksProgress } from "@/lib/utils";

import { EmptyDashboard } from "@/components/empty-dashboard";
import { HistoryCalendar } from "@/components/history-calendar";
import { MotivationalMessage } from "@/components/motivational-message";
import { MotivationalRankingMessage } from "@/components/motivational-ranking-message";
import { columns } from "@/components/streaks/columns";
import { DataTable } from "@/components/streaks/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const engagements = await getUserEngagements();
  const streaks = await getUserStreaks();

  const { ranking, myRanking } = await getStreaksRanking();

  if (!engagements.length && !engagements.length) return <EmptyDashboard />;

  return (
    <main className="max-w-7xl mx-auto p-4 py-16 space-y-8">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard do leitor</h1>

      <MotivationalMessage streaks={streaks} />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Streak Atual</CardTitle>
            <div className="size-6 rounded-full bg-[#FFCE04]/30 flex items-center justify-center">
              <CalendarIcon className="size-3 text-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatStreaksProgress(streaks)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Continue lendo diariamente!
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total de Aberturas
            </CardTitle>
            <div className="size-6 rounded-full bg-[#FFCE04]/30 flex items-center justify-center">
              <MailIcon className="size-3 text-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{engagements.length}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Newsletters lidas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Última Leitura
            </CardTitle>
            <div className="size-6 rounded-full bg-[#FFCE04]/30 flex items-center justify-center">
              <ClockIcon className="size-3 text-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatLastStreaksDate(streaks)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Leitura mais recente
            </p>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">
          Seu histórico de leituras diárias
        </h2>

        <HistoryCalendar streaks={streaks} />
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Classificação geral</h2>
        <p className="text-muted-foreground">
          Veja como você está se saindo em relação aos outros leitores. Continue
          lendo diariamente para subir no ranking!
        </p>

        <MotivationalRankingMessage streak={myRanking} />

        <DataTable columns={columns} data={ranking} />
      </section>
    </main>
  );
}
