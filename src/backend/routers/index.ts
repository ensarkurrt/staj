import { currencyRouter } from './currency';
import superjson from "superjson";
import {createRouter} from "../utils/router";
import {accountRouter} from "./account";
import {authRouter} from "./auth";
import {transactionRouter} from "@/backend/routers/transaction";

export const appRouter = createRouter()
    .transformer(superjson)
    .merge("auth.", authRouter)
    .merge("account.", accountRouter)
    .merge("currency.", currencyRouter)
    .merge("transaction.", transactionRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
