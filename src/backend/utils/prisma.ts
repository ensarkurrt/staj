/* add prisma client to global */
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

export const prisma =
  global.prisma ||
  new PrismaClient({ log: process.env.node_env === "development" ? ["query", "warn", "error"] : ["error"] });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
