"use server";

import { prisma } from "@/lib/prisma";

export async function verifyUserExists(email: string) {
  try {
    const user = await prisma.streak.findFirst({
      where: { email },
    });

    return !!user;
  } catch (error) {
    console.error("Erro ao verificar se o usuário existe:", error);
    return false;
  }
}
