import { prisma } from "@/lib/prisma";
import { format, subDays } from "date-fns";

export const getStreakRanking = async () => {
  const ranking =  await prisma.streak.findMany({
    orderBy: { streak: "desc" },
    take: 10,
  });

  // order and return position
  return ranking.map((entry, index) => ({ ...entry, position: index + 1 }));
};

export const getDashboardStats = async () => {
  const totalSubscribers = await prisma.webhookData.count();

  const totalOpens = await prisma.webhookData.count({
    where: { status: "active" },
  });

  const topReaders = await prisma.streak.findMany({
    orderBy: { streak: "desc" },
    take: 5,
  });

  return {
    totalSubscribers,
    totalOpens,
    topReaders,
  };
};

export const updateStreak = async (email: string) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado

  // Se for domingo, não incrementamos o streak
  if (currentDay === 0) {
    console.log("Streak não incrementado - Domingo");
    return;
  }

  // Verifica o streak atual do leitor
  const streak = await prisma.streak.findUnique({
    where: { email },
  });

  if (streak) {
    const lastOpenedDate = streak.lastOpenedDate;
    const differenceInDays = Math.floor(
      (currentDate.getTime() - lastOpenedDate.getTime()) / (1000 * 3600 * 24)
    );

    // Se o dia anterior ao de abertura foi um domingo, não aumenta o streak
    const lastDay = lastOpenedDate.getDay();
    if (lastDay === 0) {
      console.log("Streak não incrementado - Abertura anterior foi no domingo");
      return;
    }

    // Se a diferença for 1 dia (abertura consecutiva), incrementa o streak
    if (differenceInDays === 1) {
      await prisma.streak.update({
        where: { email },
        data: { streak: streak.streak + 1, lastOpenedDate: currentDate },
      });
      console.log("Streak incrementado para: ", streak.streak + 1);
    } else if (differenceInDays > 1) {
      // Se não foi consecutivo, reseta o streak para 1
      await prisma.streak.update({
        where: { email },
        data: { streak: 1, lastOpenedDate: currentDate },
      });
      console.log("Streak resetado para 1");
    }
  } else {
    // Caso o leitor não tenha streak, cria um novo com 1
    await prisma.streak.create({
      data: { email, streak: 1, lastOpenedDate: currentDate },
    });
    console.log("Streak inicializado para 1");
  }
};

export async function getStreakData(email: string) {
  try {
    const thirtyDaysAgo = subDays(new Date(), 30);

    // Buscando o histórico de aberturas nos últimos 30 dias
    const openHistory = await prisma.webhookData.findMany({
      where: {
        email,
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const streakData = [];

    // Gerando dados para os últimos 30 dias
    for (let i = 0; i < 30; i++) {
      const currentDate = subDays(new Date(), i);
      const formattedDate = format(currentDate, "yyyy-MM-dd");
      const accessed = openHistory.some(
        (entry) => format(entry.createdAt, "yyyy-MM-dd") === formattedDate
      );

      const isSunday = currentDate.getDay() === 0; // Verificando se é domingo (0 = domingo)

      streakData.push({
        date: formattedDate,
        accessed,
        isSunday,
      });
    }

    return streakData;
  } catch (error) {
    console.error("Erro ao gerar o streak data: ", error);
    return [];
  }
}
