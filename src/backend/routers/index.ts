import superjson from "superjson";
import { createRouter } from "../utils/router";
import { authRouter } from "./auth";

export const appRouter = createRouter().transformer(superjson).merge("auth.", authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
