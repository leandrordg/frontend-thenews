import { prisma } from "@/lib/prisma";

export async function getUserStats(email: string | undefined) {
  try {
    // Buscando o streak do usuário
    const streakData = await prisma.streak.findUnique({
      where: { email },
    });

    // Buscando o histórico de aberturas de newsletter nos últimos 30 dias
    const openHistoryData = await prisma.webhookData.findMany({
      where: {
        email,
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30)), // Últimos 30 dias
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!streakData) return null;

    const lastOpen =
      openHistoryData.length > 0 ? openHistoryData[0].createdAt : null;

    const historyWithDays = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const dayStatus = openHistoryData.find(
        (entry) =>
          new Date(entry.createdAt).toDateString() === date.toDateString()
      );

      return {
        date,
        accessed: dayStatus ? true : false,
        isSunday: date.getDay() === 0, // Verifica se o dia é domingo
      };
    });

    return {
      streak: streakData.streak,
      openHistory: openHistoryData.map((entry) => ({
        email: entry.email,
        createdAt: entry.createdAt.toISOString(),
        status: entry.status,
      })),
      email,
      history: historyWithDays,
      lastOpen: lastOpen ? lastOpen.toISOString() : null,
    };
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    return null;
  }
}
