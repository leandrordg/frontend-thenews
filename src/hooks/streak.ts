import { prisma } from "@/lib/prisma";
import { isConsecutive } from "@/lib/utils";

export const updateStreak = async (email: string) => {
  // Verificar se o usuário já tem um streak ativo
  const activeStreak = await prisma.streak.findFirst({
    where: {
      email,
      status: "ativo",
    },
  });

  if (activeStreak) {
    // Caso o streak seja ativo, verificamos se o usuário está quebrando o streak
    const lastInteractionDate = activeStreak.updatedAt;
    const currentDate = new Date();

    // Verificar se o dia atual não é domingo
    const isSunday = currentDate.getDay() === 0;

    if (isSunday) {
      console.log("Não contabilizando streak no domingo");
      return;
    }

    // Se o streak não foi interrompido, incrementamos os dias
    if (isConsecutive(lastInteractionDate, currentDate)) {
      await prisma.streak.update({
        where: {
          id: activeStreak.id,
        },
        data: {
          streakDays: activeStreak.streakDays + 1, // Incrementa o streak
          updatedAt: currentDate, // Atualiza a data de modificação
        },
      });
    } else {
      // Se o streak foi interrompido, finalizamos o streak anterior e criamos um novo
      await prisma.streak.update({
        where: {
          id: activeStreak.id,
        },
        data: {
          streakEnd: lastInteractionDate, // Finaliza o streak anterior
          status: "inativo", // Marca o streak como inativo
        },
      });

      // Criamos um novo streak
      await prisma.streak.create({
        data: {
          email,
          streakStart: currentDate, // Início do novo streak
          streakDays: 1, // Começa com 1 dia
          status: "ativo", // Status ativo
        },
      });
    }
  } else {
    // Caso não haja streak ativo, criamos um novo streak (exceto no domingo)
    const currentDate = new Date();
    if (currentDate.getDay() !== 0) {
      await prisma.streak.create({
        data: {
          email,
          streakStart: currentDate, // Data de início do streak
          streakDays: 1, // Inicia com 1 dia
          status: "ativo", // Status ativo
        },
      });
    }
  }
};
