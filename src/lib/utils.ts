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

export const getMotivationalMessage = (streak?: number) => {
  if (!streak)
    return "Comece sua jornada! Abra sua primeira newsletter e dê o primeiro passo!";

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

export const getMotivationalRankingMessage = (position?: number) => {
  if (!position)
    return "Cada passo conta! Continue se dedicando e logo estará no topo!";

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
};
