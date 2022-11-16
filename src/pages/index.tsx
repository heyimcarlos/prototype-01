import Head from "next/head";
import type { NextPageWithLayout } from "@/pages/_app";
import Section1 from "@/components/home/section-1";
import AppLayout from "@/components/layouts/AppLayout";

const Home: NextPageWithLayout = () => {

  return (
    <>
      <Head>
        <title>ntornos.com map</title>
        <meta name="description" content="Real Estate User Facing" />
        <link rel="icon" href="/favicon.ico" />

        <link key="4" rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          key="3"
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap"
          rel="stylesheet"
        />
      </Head>
      <>
          <Section1 />
          <div>Check this cool houses</div>
        </>
    </>
  );
}

Home.layout = AppLayout;

export default Home;
