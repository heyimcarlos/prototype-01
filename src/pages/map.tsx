import type { NextPage } from "next";
import Head from "next/head";
import Map from "@/components/Map";
import { useLocalStorage } from "usehooks-ts";
import { useJsApiLoader } from "@react-google-maps/api";
import { GetServerSidePropsContext } from "next";
import { env } from "@/env/client.mjs";
import { prisma } from "@/server/db/client";
import { inferSSRProps } from "@/lib/types/inferSSRProps";
import MapTopbar from "@/components/MapTopbar";
import TwTopbar from "@/components/TwTopbar";
import { useRef } from "react";
import { MapRef } from "react-map-gl";
import { GOOGLE_MAP_LIBRARIES } from "@/lib/google";
import { MapPreferenceKeys } from "@/lib/types/mapPreferences";
// Map Preferences
export type PreferenceValue = { address: string; lat: number; lng: number };
export type PreferenceObj = {
  [key in MapPreferenceKeys]: PreferenceValue;
};

const MapPage: NextPage<inferSSRProps<typeof getServerSideProps>> = ({ listings }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAP_LIBRARIES,
  });

  //   const a = useMapPreferences((state) => state.mapPreferences);
  //   console.log("a", a);

  const [pref] = useLocalStorage<PreferenceObj>("preferences", {} as PreferenceObj);

  const mapRef = useRef<MapRef>(null);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>ntornos.com map</title>
        <meta name="description" content="Real Estate User Facing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-[calc(100vh-90px)]">
        <TwTopbar />
        <div className="pl-5 py-1 bg-indigo-600">
          <MapTopbar mapRef={mapRef} />
        </div>
        <Map mapRef={mapRef} listings={listings} pref={pref} />
      </main>
    </>
  );
};
// @INFO: Server side fetching of listings
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getServerSideProps = async ({}: GetServerSidePropsContext) => {
  const listings = await prisma.place.findMany({
    include: {
      center: true,
      listing: {
        include: {
          location: true,
        },
      },
    },
  });

  if (!listings.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      listings,
    },
  };
};

export default MapPage;
