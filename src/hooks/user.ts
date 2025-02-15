import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function getUserStats() {
  const user = await currentUser();

  if (!user) return {};

  const email = user.primaryEmailAddress?.emailAddress;

  try {
    const streakData = await prisma.streak.findUnique({
      where: { email },
    });

    if (!streakData) return {};

    const openHistoryData = await prisma.webhookData.findMany({
      where: {
        email,
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30)),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const lastOpen = openHistoryData[0]?.createdAt ?? null;
    const today = new Date();

    const history = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      return {
        date,
        accessed: openHistoryData.some(
          (entry) => entry.createdAt.toDateString() === date.toDateString()
        ),
        isSunday: date.getDay() === 0,
      };
    }).reverse();

    return {
      history,
      streak: streakData.streak,
      openHistory: openHistoryData,
      lastOpen: lastOpen ? lastOpen.toISOString() : null,
    };
  } catch (error) {
    console.error("Erro ao buscar estatísticas do usuário: ", error);
    throw new Error("Erro ao buscar estatísticas do usuário");
  }
}
