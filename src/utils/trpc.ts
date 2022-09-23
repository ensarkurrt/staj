import { AppRouter } from "@/backend/routers/index";
import { createReactQueryHooks } from "@trpc/react";
import { inferProcedureOutput } from "@trpc/server";

export const trpc = createReactQueryHooks<AppRouter>();

export type inferQueryOutput<TRouteKey extends keyof AppRouter["_def"]["queries"]> = inferProcedureOutput<
  AppRouter["_def"]["queries"][TRouteKey]
>;

export const getBaseUrl = () => {
  if (process.browser) return "";
  if (process.env.NEXT_PUBLIC_VERCEL_URL) return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

  return `http://localhost:${process.env.PORT ?? 3000}`;
};
