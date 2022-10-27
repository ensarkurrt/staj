import type { AppRouter } from "@/backend/routers";
import { AuthContextManager } from "@/context/AuthContext";
import { getBaseUrl } from "@/utils/trpc";

/* import { loggerLink } from "@trpc/client/links/loggerLink"; */
import { withTRPC } from "@trpc/next";
import { Toaster } from "react-hot-toast";
import superjson from "superjson";
/*import "../styles/globals.css";*/

import { SidebarProvider } from "@/context/SidebarContext";
import { CacheProvider } from "@emotion/react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import "nprogress/nprogress.css";
import ThemeProvider from "src/theme/ThemeProvider";

import { AppProps } from "next/app";
import Router from "next/router";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import createEmotionCache from "src/createEmotionCache";

import { EmotionCache } from "@emotion/react";
import "nprogress/nprogress.css";

import type { ReactElement, ReactNode } from "react";

import { AnalyticsWrapper } from "@/components/Analytics/analytics";
import LoadingLayout from "@/layouts/BaseLayout/LoadingLayout";
import type { NextPage } from "next";
import "nprogress/nprogress.css";

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface TokyoAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

function MyApp(props: TokyoAppProps) {
  //trTimeZoneInit();

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);
  nProgress.configure({ showSpinner: false });

  Router.events.on("routeChangeStart", nProgress.start);
  Router.events.on("routeChangeError", nProgress.done);
  Router.events.on("routeChangeComplete", nProgress.done);

  return (
    <AuthContextManager>
      <LoadingLayout>
        <CacheProvider value={emotionCache}>
          <Toaster position={"top-right"} />
          <Head>
            <title>Banka Simülasyonu</title>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          </Head>
          <SidebarProvider>
            <ThemeProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CssBaseline />
                {getLayout(<Component {...pageProps} />)}
                <AnalyticsWrapper />
              </LocalizationProvider>
            </ThemeProvider>
          </SidebarProvider>
        </CacheProvider>
      </LoadingLayout>
    </AuthContextManager>
  );
}

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
      queryClientConfig: { defaultOptions: { queries: { staleTime: Infinity } } },
    };
  },

  ssr: true,
})(MyApp);
function getLayout(arg0: JSX.Element): import("react").ReactNode {
  throw new Error("Function not implemented.");
}
