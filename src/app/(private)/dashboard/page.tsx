import { getUserStats } from "@/hooks/user";
import { formatDate, formatStreaks } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { CalendarIcon, ClockIcon, MailIcon } from "lucide-react";

import { EmptyDashboard } from "@/components/empty-dashboard";
import { HistoryCalendar } from "@/components/history-calendar";
import { MotivationalMessage } from "@/components/motivational-message";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const user = await currentUser();

  const userStats = await getUserStats(user?.primaryEmailAddress?.emailAddress);

  if (!userStats) return <EmptyDashboard />;

  return (
    <main className="max-w-7xl mx-auto p-4 py-16 space-y-8">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard do leitor</h1>

      <MotivationalMessage streak={userStats.streak} />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Streak Atual</CardTitle>
            <div className="size-7 rounded-full bg-[#FFCE04] flex items-center justify-center">
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
            <div className="size-7 rounded-full bg-[#FFCE04] flex items-center justify-center">
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
            <div className="size-7 rounded-full bg-[#FFCE04] flex items-center justify-center">
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
    </main>
  );
}
