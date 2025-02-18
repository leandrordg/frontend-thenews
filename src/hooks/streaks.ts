import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "./user";

export const getUserStreaks = async () => {
  const user = await getCurrentUser();

  return await prisma.streak.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getStreaksRanking = async () => {
  const user = await getCurrentUser();

  const streaks = await prisma.streak.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
    take: 10,
  });

  const ranking = streaks.map((streak, index) => ({
    ...streak,
    position: index + 1,
  }));

  const myRanking = ranking.find((streak) => streak.user.id === user.id);

  return {
    ranking,
    myRanking,
  };
};
