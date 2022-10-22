import superjson from "superjson";
import { createRouter } from "../utils/router";
import { accountRouter } from "./account";
import { authRouter } from "./auth";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", authRouter)
  .merge("account.", accountRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
