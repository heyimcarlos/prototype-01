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
import { useNeighborhoods } from "@/stores/useNeighborhoods";
import SingleViewSlideOver from "@/components/SingleViewSlideOver";
import LeftSlideOver from "@/components/LeftSlideOver";
import { useSelectedListing } from "@/stores/useSelectedListing";
import SectorsSelected from "@/components/SectorsSelected";
import MobilePreviewListing from "@/components/MobilePreviewListing";
import SlideOver from "@/components/SlideOver";
import { Listing, ListingLocation, Neighborhood } from "@prisma/client";
import { SwipeableDrawer } from "@material-ui/core";
import SwipeableSingleView from "@/components/SwipeableSingleView";

const MapPage: NextPageWithLayout<inferSSRProps<typeof getServerSideProps>> = ({
  // listingLocations,
  neighborhoods,
  initialViewport,
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAP_LIBRARIES,
  });

  const mapRef = useRef<MapRef>(null);

  const listingLocations = useSidebar((state) => state.listingLocations);
  const neighborhoodsState = useNeighborhoods((state) => state.neighborhoods);

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

      <main className="w-full h-[calc(100vh-48px-33.6px)] flex justify-center">
        <div className="w-full h-full">
          <Map
            mapRef={mapRef}
            neighborhoods={neighborhoods}
            initialViewport={initialViewport}
            open={open}
            setOpen={setOpen}
          />
        </div>

        {/* {listing && (
          <SwipeableDrawer
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => {
              // console.log("hi");
            }}
            disableBackdropTransition
            disableEnforceFocus
            style={{ height: "500px" }}
            anchor="left"
            hideBackdrop
            hysteresis={0.1}
          >
            <SwipeableSingleView listing={listing} />
          </SwipeableDrawer>
        )} */}

        {listing && (
          <SingleViewSlideOver
            open={open}
            setOpen={setOpen}
            listing={listing}
          />
        )}

        {/* {listing && (
          <SlideOver open={open} setOpen={setOpen} listing={listing} />
        )} */}

        {/* {leftListing && (
          <LeftSlideOver
            open={leftSlideOver}
            setOpen={setLeftSlideOver}
            listing={leftListing}
          />
        )} */}

        {/* {listing && (
          <SingleViewSlideOver
            open={open}
            setOpen={setOpen}
            listing={listing}
          />
        )} */}

        {listing && (
          <MobilePreviewListing
            listing={listing as Listing}
            setOpen={setOpen}
          />
        )}

        <div className="hidden min-w-[310px] max-w-[310px] lg:max-w-[600px] lg:max-w-[600px] h-full overflow-y-auto bg-white flex flex-wrap justify-evenly content-start md:after:justify-start md:after:mr-[17.5rem]">
          {/* {listings.length < 1 && sectors.length < 1 && (
            <div>No listing to show move the map</div>
          )} */}
          {/* {sectors.map((sector) =>
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
          )} */}

          {/* {sectors.length < 1 &&
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
            ))} */}
        </div>
      </main>
    </>
  );
};

MapPage.layout = MapLayout;

// @INFO: Server side fetching of neighborhoods
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export type NeighborhoodsType = (Neighborhood & {
  listingLocations: (ListingLocation & {
    listings: Listing[];
  })[];
})[];

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  //
  const neighborhoods = await prisma.neighborhood.findMany({
    include: {
      listingLocations: { include: { listings: {}, neighborhood: {} } },
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

  if (!neighborhoods.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      neighborhoods,
      initialViewport,
    },
  };
};

export default MapPage;
