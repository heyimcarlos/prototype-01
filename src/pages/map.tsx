import Head from "next/head";
import Map from "@/components/mapPageComponents/Map";
import type { GetServerSidePropsContext } from "next";
import { prisma } from "@/server/db/client";
import type { inferSSRProps } from "@/lib/types/inferSSRProps";
import { useRef, useState } from "react";
import type { MapRef } from "react-map-gl";
import type { NextPageWithLayout } from "./_app";
import MapLayout from "@/components/layouts/MapLayout";
import { useSidebar } from "@/stores/useSidebar";
import ListingCard from "@/components/mapPageComponents/sidebars/ListingCard";
import { useNeighborhoods } from "@/stores/useNeighborhoods";
import { useSelectedListing } from "@/stores/useSelectedListing";
import SlideOver from "@/components/singleViewListing/SlideOver";
import type { Listing, ListingLocation, Neighborhood } from "@prisma/client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperCore, { Pagination } from "swiper";
import MultiMobilePreviewListing from "@/components/mapPageComponents/MultiMobilePreviewListing";
import SingleMobilePreviewListing from "@/components/mapPageComponents/SingleMobilePreviewListing";
import useWindowSize from "@/hooks/useWindowSize";

import { env } from "@/env/client.mjs";
import { useJsApiLoader } from "@react-google-maps/api";
import { GOOGLE_MAP_LIBRARIES } from "@/lib/google";

const MapPage: NextPageWithLayout<inferSSRProps<typeof getServerSideProps>> = ({
  neighborhoods,
  initialViewport,
}) => {
  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  //   libraries: GOOGLE_MAP_LIBRARIES,
  // });

  const mapRef = useRef<MapRef>(null);

  const listingLocations = useSidebar((state) => state.listingLocations);
  const neighborhoodsState = useNeighborhoods((state) => state.neighborhoods);

  const [open, setOpen] = useState(false);

  const listing = useSelectedListing((state) => state.listing);
  const setListing = useSelectedListing((state) => state.setListing);
  const setDirection = useSelectedListing((state) => state.setDirection);

  const listings = useSelectedListing((state) => state.listings);
  const setListingAddress = useSelectedListing(
    (state) => state.setListingAddress
  );
  const setNeighborhood = useSelectedListing((state) => state.setNeighborhood);

  SwiperCore.use([Pagination]);

  const totalListings = () => {
    let total = 0;
    if (neighborhoodsState.length > 0) {
      neighborhoodsState.forEach((sector) => {
        sector.listingLocations.forEach((location) => {
          total += location.listings.length;
        });
      });

      return total;
    } else {
      listingLocations.forEach((location) => {
        total += location.listings.length;
      });
      return total;
    }
  };

  let doesFit;
  const width = useWindowSize();
  if (width) doesFit = width > 768;

  // if (!isLoaded) return <div>Loading...</div>;

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
            setOpen={setOpen}
          />
        </div>

        {/* One for all SlideOver : Mobile, Tablet, and Desktop */}
        {listing && (
          <SlideOver open={open} setOpen={setOpen} listing={listing} />
        )}

        {/* Single Mobile Preview */}
        {listing && listings.length < 2 && !doesFit && (
          <SingleMobilePreviewListing
            listing={listing as Listing}
            setOpen={setOpen}
          />
        )}

        {/* Multiple Mobile Preview */}
        {listings.length > 0 && !doesFit && (
          <div className="h-[10rem] w-[90%] rounded-xl fixed bottom-0 mb-[3rem] flex overflow-hidden">
            <Swiper pagination spaceBetween={0} slidesPerView={1}>
              {listings.map((listing) => (
                <SwiperSlide key={listing.id}>
                  <MultiMobilePreviewListing
                    listing={listing as Listing}
                    setOpen={setOpen}
                  />
                  .
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Desktop Sidebar with Listings */}
        {doesFit && (
          <div className="min-w-[300px] max-w-[300px] lg:min-w-[575px] lg:max-w-[575px] lg:space-x-1 h-full overflow-y-auto bg-white flex flex-wrap justify-center content-start md:after:justify-start lg:after:mr-[18rem]">
            {listingLocations.length < 1 && neighborhoodsState.length < 1 && (
              <div>No listing to show move the map</div>
            )}

            {listingLocations.length > 0 && (
              <div className="">
                <span>{totalListings()} Homes in this area</span>
              </div>
            )}

            <div className="min-w-[300px] max-w-[300px] lg:min-w-[575px] lg:max-w-[575px] lg:space-x-1 h-full overflow-y-auto bg-white flex flex-wrap justify-center content-start md:after:justify-start lg:after:mr-[18rem]">
              {neighborhoodsState.map((sector) =>
                sector.listingLocations.map((location) => {
                  return location.listings.map((listing) => (
                    <div
                      key={listing.id}
                      onClick={() => {
                        setDirection("left");
                        setListing(listing);
                        setOpen(true);
                        setListingAddress(location.name);
                        setNeighborhood(sector.name);
                      }}
                    >
                      <ListingCard
                        price={listing.price}
                        location={location.name}
                        beds={listing.bedrooms}
                        fullBaths={listing.fullBathrooms}
                        halfBaths={listing.halfBathrooms}
                        meters={listing.squareFeet}
                        neighborhood={sector.name}
                      />
                    </div>
                  ));
                })
              )}
              {neighborhoodsState.length < 1 &&
                listingLocations.map((location) => {
                  return location.listings.map((listing) => (
                    <div
                      key={listing.id}
                      onClick={() => {
                        setDirection("left");
                        setListing(listing);
                        setListingAddress(location.name);
                        setNeighborhood("");
                        setOpen(true);
                      }}
                    >
                      <ListingCard
                        price={listing.price}
                        location={location.name}
                        beds={listing.bedrooms}
                        fullBaths={listing.fullBathrooms}
                        halfBaths={listing.halfBathrooms}
                        meters={listing.squareFeet}
                      />
                    </div>
                  ));
                })}
            </div>
          </div>
        )}
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
