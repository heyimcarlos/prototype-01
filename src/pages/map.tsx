import Head from "next/head";
import Map from "@/components/Map";
import { useJsApiLoader } from "@react-google-maps/api";
import type { GetServerSidePropsContext } from "next";
import { env } from "@/env/client.mjs";
import { prisma } from "@/server/db/client";
import type { inferSSRProps } from "@/lib/types/inferSSRProps";
import { useRef, useState } from "react";
import type { MapRef } from "react-map-gl";
import { GOOGLE_MAP_LIBRARIES } from "@/lib/google";
import type { NextPageWithLayout } from "./_app";
import MapLayout from "@/components/layouts/MapLayout";
import { useSidebar } from "@/stores/useSidebar";
import ListingCard from "@/components/ListingCard";
import { useSectors } from "@/stores/useSectors";
import SlideOver from "@/components/SlideOver";
import LeftSlideOver from "@/components/LeftSlideOver";
import { useSelectedListing } from "@/stores/useSelectedListing";

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
  const sectors = useSectors((state) => state.sectors);

  const [open, setOpen] = useState(false);
  const [leftSlideOver, setLeftSlideOver] = useState(false);

  const listing = useSelectedListing((state) => state.listing);
  const leftListing = useSelectedListing((state) => state.leftListing);
  const setLeftListing = useSelectedListing((state) => state.setLeftListing);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>ntornos.com map</title>
        <meta name="description" content="Real Estate User Facing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full h-[calc(100vh-90px)] flex">
        <div className="w-full h-full">
          <Map
            mapRef={mapRef}
            places={places}
            initialViewport={initialViewport}
            open={open}
            setOpen={setOpen}
          />
        </div>
        {listing && (
          <SlideOver open={open} setOpen={setOpen} listing={listing} />
        )}

        {leftListing && (
          <LeftSlideOver
            open={leftSlideOver}
            setOpen={setLeftSlideOver}
            listing={leftListing}
          />
        )}

        <div className="min-w-[310px] max-w-[310px] lg:max-w-[600px] h-full overflow-y-auto bg-white flex flex-wrap justify-evenly content-start md:after:justify-start md:after:mr-[17.5rem]">
          {listings.length < 1 && sectors.length < 1 && (
            <div>No listing to show move the map</div>
          )}
          {sectors.map((sector) =>
            sector.listings.map((listing) => (
              <div
                key={listing.id}
                onClick={() => {
                  setLeftListing(listing);
                  setLeftSlideOver(true);
                }}
              >
                <ListingCard {...listing} />
              </div>
            ))
          )}

          {sectors.length < 1 &&
            listings.map((listing) => (
              <div
                key={listing.id}
                onClick={() => {
                  setLeftListing(listing);
                  setLeftSlideOver(true);
                }}
              >
                <ListingCard {...listing} />
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
