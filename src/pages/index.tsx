/* eslint-disable @next/next/no-page-custom-font */

import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import cityScape from "../../public/assets/images/2nd.jpg";
import TwHomeNavbar from "@/components/TwHomeNavbar";
import TwHomeSearchbar from "@/components/TwHomeSearchbar";
import { useJsApiLoader } from "@react-google-maps/api";
import { env } from "@/env/client.mjs";
import { GOOGLE_MAP_LIBRARIES } from "@/lib/google";

const Home = () => {
  const [searchType, setSearchType] = useState("buy");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAP_LIBRARIES,
  });

  if (!isLoaded) return <div>Loading...</div>;

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
        <div className="w-full h-[20rem] sm:h-[30rem] lg:h-[45rem] xl:h-[49rem]">
          <TwHomeNavbar />
          <TwHomeSearchbar />
          <div
            id="BackgroundImage"
            className="absolute z-0 top-0 w-full h-80 sm:h-[30rem] lg:h-[45rem] xl:h-[49rem]"
          >
            <Image src={cityScape} alt="cityScape" layout="fill" />
          </div>
        </div>
        <div className=""></div>
      </main>
    </>
  );
};

export default Home;
