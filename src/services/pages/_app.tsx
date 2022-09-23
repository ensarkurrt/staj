import type { AppRouter } from "@/backend/routers";
import { AuthContextManager } from "@/context/AuthContext";
import { getBaseUrl } from "@/utils/trpc";

/* import { loggerLink } from "@trpc/client/links/loggerLink"; */
import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import { Toaster } from "react-hot-toast";
import superjson from "superjson";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  //trTimeZoneInit();

  return (
    <AuthContextManager>
      <Toaster position={"top-right"} />

      <Component {...pageProps} />
    </AuthContextManager>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    /* const url = "/api/trpc"; */

    return {
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
      headers() {
        return {
          cookie: ctx?.req?.headers.cookie,
        };
      },
      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },

  ssr: false,
})(MyApp);
