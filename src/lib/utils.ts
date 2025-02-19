import { Engagement, Streak } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatStreaksProgress(streaks: Streak[]) {
  const streak = streaks.find((streak) => streak.count);

  if (!streak) return `0 dias`;

  return `${streak.count} dia${streak.count > 1 ? "s" : ""}`;
}

export function formatLastStreakDate(date: Date) {
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
    locale: ptBR,
  });
}

export function formatLastEngagementDate(engagements: Engagement[]) {
  const lastEngagement = engagements.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  )[0];

  if (!lastEngagement) return `Nunca`;

  return formatDistance(new Date(lastEngagement.createdAt), new Date(), {
    addSuffix: true,
    locale: ptBR,
  });
}

export function formatLastStreaks(streaks: Streak[]) {
  const now = new Date();
  const last30DaysMap = new Map<
    string,
    { date: Date; count: number; isSunday: boolean }
  >();

  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    date.setHours(0, 0, 0, 0);
    last30DaysMap.set(date.toISOString().split("T")[0], {
      date,
      count: 0,
      isSunday: date.getDay() === 0,
    });
  }

  streaks.forEach(({ startDate, lastDate, count }) => {
    const start = new Date(startDate);
    const end = new Date(lastDate);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().split("T")[0];
      if (last30DaysMap.has(key) && !last30DaysMap.get(key)!.isSunday) {
        last30DaysMap.get(key)!.count += count;
      }
    }
  });

  return Array.from(last30DaysMap.values()).reverse();
}

export function getMotivationalMessage(streak: number) {
  switch (true) {
    case streak === 0:
      return "Comece sua jornada! Abra sua primeira newsletter e dê o primeiro passo!";
    case streak === 1:
      return "Incrível! Você começou com o pé direito! Volte amanhã para continuar!";
    case streak < 5:
      return "Você está mandando bem! Continue assim, você está no caminho certo!";
    case streak < 10:
      return "Que ótimo! Você está indo super bem, continue firme!";
    case streak < 20:
      return "Uau! Progresso impressionante, continue com esse ritmo!";
    case streak < 30:
      return "Sensacional! Você está mostrando consistência e determinação!";
    case streak < 50:
      return "Incrível! Você está se mantendo super regular, continue assim!";
    default:
      return "Espetacular! Você está arrasando com essa consistência!";
  }
}

export function getMotivationalRankingMessage(position: number) {
  switch (true) {
    case position === 1:
      return "TOP 1! Você está no topo do ranking! Continue dominando!";
    case position === 2:
      return "TOP 2! Você está muito próximo do topo! Continue subindo!";
    case position === 3:
      return "TOP 3! Você está no pódio! Continue se esforçando!";
    case position <= 5:
      return "Incrível! Você está entre os melhores! Continue assim!";
    case position <= 10:
      return "Você está no Top 10! Só mais um pouco para alcançar o topo!";
    case position <= 20:
      return "Ótimo trabalho! Continue subindo no ranking!";
    case position <= 50:
      return "Você está indo muito bem! Mantenha o ritmo!";
    case position <= 100:
      return "Boa performance! Continue se esforçando para subir mais!";
    default:
      return "Cada passo conta! Continue se dedicando e logo estará no topo!";
  }
}
