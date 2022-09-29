import Head from "next/head";
import Map from "@/components/Map";
import { useJsApiLoader } from "@react-google-maps/api";
import { GetServerSidePropsContext } from "next";
import { env } from "@/env/client.mjs";
import { prisma } from "@/server/db/client";
import { inferSSRProps } from "@/lib/types/inferSSRProps";
import { useRef } from "react";
import { MapRef } from "react-map-gl";
import { GOOGLE_MAP_LIBRARIES } from "@/lib/google";
import { NextPageWithLayout } from "./_app";
import MapLayout from "@/components/layouts/MapLayout";
import { useSidebar } from "@/stores/useSidebar";
import { Listing } from "@prisma/client";
import Divider from "@/components/Divider";
import { transformIntToMoney } from "@/lib/transformInt";
import Image from "next/image";

const ListingCard = ({ name, description, price }: Listing) => {
  return (
    <div className="card w-[17.5rem] h-[17rem] shadow-md rounded mt-2 border-black/[.1] border-[1px] ">
      <div className="">
        <Image
          src="https://placeimg.com/400/225/arch"
          width={300}
          height={200}
          alt="listing"
        />
      </div>
      <div className="ml-1">
        <h2 className="text-lg font-semibold text-black">
          {transformIntToMoney(price)}
        </h2>
        <p>{description}</p>
        <p>{name}</p>
      </div>
    </div>
  );
};

const MapPage: NextPageWithLayout<inferSSRProps<typeof getServerSideProps>> = ({
  places,
  initialViewport,
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAP_LIBRARIES,
  });

  const mapRef = useRef<MapRef>(null);

  const listings = useSidebar((state) => state.listings);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>ntornos.com map</title>
        <meta name="description" content="Real Estate User Facing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-[calc(100vh-90px)] flex">
        <div className="w-[60%] h-full">
          <Map
            mapRef={mapRef}
            places={places}
            initialViewport={initialViewport}
          />
        </div>
        <div className=" w-[400px]  h-full overflow-y-auto bg-white flex flex-wrap justify-evenly content-start">
          {listings.map((listing) => (
            <div key={listing.id}>
              <ListingCard {...listing} />
              <Divider />
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

MapPage.layout = MapLayout;

// @INFO: Server side fetching of places
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const places = await prisma.place.findMany({
    include: {
      center: true,
      listing: {
        include: {
          location: true,
        },
      },
    },
  });

  const initialViewport = {
    longitude: -69.94115,
    latitude: 18.45707,
    zoom: 14,
  };

  if (query.lat && query.lng) {
    initialViewport.latitude = Number(query.lat);
    initialViewport.longitude = Number(query.lng);
  }

  if (!places.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      places,
      initialViewport,
    },
  };
};

export default MapPage;
