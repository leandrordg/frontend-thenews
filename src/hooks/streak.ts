import { prisma } from "@/lib/prisma";

export const getReaderStats = async (email: string) => {
  const streak = await prisma.streak.findUnique({
    where: { email },
  });

  if (!streak) {
    return { streak: 0, history: [] };
  }

  const history = await prisma.webhookData.findMany({
    where: { email },
    orderBy: { createdAt: "asc" },
  });

  return { streak: streak.streak, history };
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
