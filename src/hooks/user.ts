import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function getUserStats() {
  const user = await currentUser();

  const email = user?.primaryEmailAddress?.emailAddress;

  try {
    const streaks = await prisma.streak.findMany({
      where: { email },
      orderBy: { streakStart: "desc" },
    });

    const openedNews = await prisma.webhookData.findMany({
      where: {
        email,
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30)), // últimos 30 dias
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      streaks,
      openedNews,
    };
  } catch (error) {
    console.error("Erro ao buscar estatísticas do usuário: ", error);
    throw new Error("Erro ao buscar estatísticas do usuário");
  }
}
