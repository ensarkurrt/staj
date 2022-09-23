import * as trpc from "@trpc/server";
import { MyContext } from "./context";

export function createRouter() {
  return trpc.router<MyContext>();
}
