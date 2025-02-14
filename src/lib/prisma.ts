import { PrismaClient } from "@prisma/client";

declare const globalThis: {
  prismaGlobal: PrismaClient | undefined;
} & typeof global;

export const prisma = globalThis.prismaGlobal || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
