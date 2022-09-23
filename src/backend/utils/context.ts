import SessionService from "@/services/auth/SessionService";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { prisma } from "./prisma";

export const createContext = async (opts?: trpcNext.CreateNextContextOptions) => {
  const user = await new SessionService().getUserFromCookie(opts?.req!);
  return { req: opts?.req, res: opts?.req, prisma, user };
};

export type MyContext = trpc.inferAsyncReturnType<typeof createContext>;
