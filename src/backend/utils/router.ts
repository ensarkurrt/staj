import * as trpc from "@trpc/server";
import { ZodError } from "zod";
import { MyContext } from "./context";

export function createRouter() {
  return trpc.router<MyContext>().formatError(({ shape, error }) => {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.code === "BAD_REQUEST" && error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  });
}
