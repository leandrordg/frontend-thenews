import { getCurrentUser } from "@/hooks/user";
import { prisma } from "@/lib/prisma";

export const getUserEngagements = async () => {
  const user = await getCurrentUser();

  return await prisma.engagement.findMany({
    where: {
      userId: user.id,
    },
  });
};
