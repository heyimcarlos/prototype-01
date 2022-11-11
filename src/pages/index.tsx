import Head from "next/head";
import type { NextPageWithLayout } from "@/pages/_app";
import Section1 from "@/components/home/section-1";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/Footer";

export default function Home({}: NextPageWithLayout) {
  // const [searchType, setSearchType] = useState("buy");

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
      <main className="bg-custom-white lg:overflow-x-hidden">
        <div className="z-20 absolute inset-0 h-20">
          <Navbar />
        </div>
        <>
          <Section1 />
          <div>Check this cool houses</div>
        </>
        <Footer />
      </main>
    </>
  );
}
