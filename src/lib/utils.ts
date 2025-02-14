import { clsx, type ClassValue } from "clsx";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatStreaks(streak: number) {
  if (streak === 1) return "1 dia";

  return `${streak} dias`;
}

export function formatDate(date: string | null) {
  if (!date) return "Nunca";

  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
    locale: ptBR,
  });
}

export const getMessage = (streak: number) => {
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
    case streak >= 50:
      return "Espetacular! Você está arrasando com essa consistência!";
    default:
      return "Continue assim, cada dia é uma vitória!";
  }
};
