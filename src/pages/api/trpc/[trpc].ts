import { appRouter } from "@/backend/routers";
import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "../../../backend/utils/context";

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      /* TODO :: Sent to bug reporting  */
      console.error("Something went wrong", error);
    }
  },
  batching: { enabled: true },
});
