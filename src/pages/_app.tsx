import { type NextPage } from "next";
import { type Session } from "next-auth";
import { type AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Fragment } from "react";

import { trpc } from "@/utils/trpc";

import "../styles/globals.css";

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  layout: React.FC<{ children: React.ReactNode }>;
};

type AppPropsWithLayout = AppProps<{ session: Session }> & {
  Component: NextPageWithLayout;
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const Layout = Component.layout ?? Fragment;

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
