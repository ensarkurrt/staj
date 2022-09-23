import superjson from "superjson";
import { createRouter } from "../utils/router";
import { authRouter } from "./auth";
import { feedRouter } from "./feed";

export const appRouter = createRouter().transformer(superjson).merge("feed.", feedRouter).merge("auth.", authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
