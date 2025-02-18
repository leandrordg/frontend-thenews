import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function getCurrentUser() {
  const authUser = await currentUser();

  const email = authUser?.primaryEmailAddress?.emailAddress;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("Usuário não encontrado");

  return user;
}
