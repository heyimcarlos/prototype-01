/* eslint-disable @next/next/no-page-custom-font */

import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import cityScape from "../../public/assets/images/2nd.jpg";
import HomeTopbar from "@/components/HomeTopbar";
import ScrollTest from "@/components/scrollTest";
import HomeSearchbar from "@/components/HomeSearchBar";
import LandingBG from "@/components/LandingBG";
import TwResNavbar from "@/components/TwResNavbar";
import Test from "@/components/Test";
import Test2 from "@/components/Test2";

const Home = () => {
  const [searchType, setSearchType] = useState("buy");
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
      <main className="">
        <div className="w-full h-[20rem] ">
          {/* <HomeTopbar /> */}

          <TwResNavbar />

          {/* <HomeSearchbar
            searchType={searchType}
            setSearchType={setSearchType}
          /> */}

          {/* <Test /> */}
          <Test2 />

          <div
            id="BackgroundImage"
            className="absolute z-0 top-0 w-full h-80 sm:h-[30rem] lg:h-[45rem] xl:h-[49rem]"
          >
            <Image src={cityScape} alt="cityScape" layout="fill" />
          </div>

          {/* <LandingBG /> */}
        </div>

        {/* <ScrollTest /> */}
      </main>
    </>
  );
};

export default Home;
