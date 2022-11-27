import React from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSidebar } from "@/stores/useSidebar";
import { useNeighborhoods } from "@/stores/useNeighborhoods";
import MobileListingCard from "./MobileListingCard";
import { useSelectedListing } from "@/stores/useSelectedListing";
import type { Listing } from "@prisma/client";
// import { sector } from "@turf/turf";
import type { NeighborhoodsType } from "@/pages/map";
import { MapIcon } from "@heroicons/react/20/solid";
// import { divide } from "lodash";

type MobileListingSlideOverTypes = {
  listSlide: boolean;
  setListSlide: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  neighborhoods: NeighborhoodsType;
};

const MobileListingsSlideOver = ({
  listSlide,
  setListSlide,
  setOpen,
  neighborhoods,
}: MobileListingSlideOverTypes) => {
  const listingLocations = useSidebar((state) => state.listingLocations);
  const neighborhoodsState = useNeighborhoods((state) => state.neighborhoods);
  const setListing = useSelectedListing((state) => state.setListing);
  const setNeighborhood = useSelectedListing((state) => state.setNeighborhood);

  let noNeighborhoodsNum = 0;
  let neighborhoodsNum = 0;

  neighborhoodsState.forEach((neighborhood) => {
    neighborhood.listingLocations.forEach((listingLocation) => {
      neighborhoodsNum += listingLocation.listings.length;
    });
  });

  listingLocations.forEach((listingLocation) => {
    noNeighborhoodsNum += listingLocation.listings.length;
  });

  // console.log("listings", listingLocations);

  return (
    <Transition.Root show={listSlide} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        onClose={() => {
          return;
        }}
      >
        <div className="fixed" />
        <div className="fixed overflow-hidden">
          <div className="absolute overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pt-[5.1rem]">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
              >
                <Dialog.Panel
                  className="pointer-events-auto w-screen"
                  draggable={true}
                >
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-2 shadow-xl items-center">
                    <div className="px-4 sm:px-6 -mb-4">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-md font-medium text-gray-900 mt-[0.1rem]">
                          {`${
                            listingLocations.length > 0 &&
                            neighborhoodsState.length < 1
                              ? noNeighborhoodsNum
                              : neighborhoodsNum
                          } Homes in this area`}
                        </Dialog.Title>
                        {/* <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setListSlide(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div> */}
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {listingLocations.length < 1 &&
                        neighborhoodsState.length < 1 && (
                          <div>No listing to show move the map</div>
                        )}

                      {neighborhoodsState.map((neighborhood) =>
                        neighborhood.listingLocations.map((listingLocation) => {
                          if (listingLocation.listings.length === 1) {
                            let listing: Listing | null;

                            if (listingLocation.listings[0])
                              listing = listingLocation.listings[0];
                            else listing = null;

                            if (!listing) return;

                            const neighborhoodName = neighborhoods.filter(
                              (neighborhood) =>
                                neighborhood.id ===
                                listingLocation.neighborhoodId
                            )[0]?.name;
                            if (!neighborhoodName) return;

                            return (
                              <div
                                className="mb-2"
                                key={listing.id}
                                onClick={() => {
                                  setOpen(true);
                                  setListing(listing);
                                  setNeighborhood(
                                    neighborhood.name === "Custom Boundary"
                                      ? neighborhoodName
                                      : neighborhood.name
                                  );
                                  // setLeftListing(listing);
                                  // setLeftSlideOver(true);
                                }}
                              >
                                <MobileListingCard
                                  listing={listing}
                                  sectorName={
                                    neighborhood.name === "Custom Boundary"
                                      ? neighborhoodName
                                      : neighborhood.name
                                  }
                                />
                              </div>
                            );
                          } else {
                            return listingLocation.listings.map((property) => {
                              const neighborhoodName = neighborhoods.filter(
                                (neighborhood) =>
                                  neighborhood.id ===
                                  listingLocation.neighborhoodId
                              )[0]?.name;
                              if (!neighborhoodName) return;

                              return (
                                <div
                                  className="mb-2"
                                  key={property.id}
                                  onClick={() => {
                                    setOpen(true);
                                    setListing(property);
                                    setNeighborhood(
                                      neighborhood.name === "Custom Boundary"
                                        ? neighborhoodName
                                        : neighborhood.name
                                    );
                                    // setLeftListing(listing);
                                    // setLeftSlideOver(true);
                                  }}
                                >
                                  <MobileListingCard
                                    listing={property}
                                    sectorName={
                                      neighborhood.name === "Custom Boundary"
                                        ? neighborhoodName
                                        : neighborhood.name
                                    }
                                  />
                                </div>
                              );
                            });
                          }
                        })
                      )}

                      {/*SECOND CALL IF THERE ARE NO NEIGHBORHOODS SELECTED*/}

                      {neighborhoodsState.length < 1 &&
                        listingLocations.map((listingLocation) => {
                          const neighborhood = neighborhoods.filter(
                            (neighborhood) =>
                              neighborhood.id === listingLocation.neighborhoodId
                          );
                          const neighborhoodName = neighborhood[0]?.name;
                          if (!neighborhoodName) return;

                          return listingLocation.listings.map((listing) => {
                            return (
                              <div
                                className="flex justify-center mb-2"
                                key={listing.id}
                                onClick={() => {
                                  setOpen(true);
                                  setListing(listing);
                                  setNeighborhood(neighborhoodName);
                                  // setLeftListing(listing);
                                  // setLeftSlideOver(true);
                                }}
                              >
                                <MobileListingCard
                                  listing={listing}
                                  sectorName={neighborhoodName}
                                />
                              </div>
                            );
                          });
                        })}
                    </div>
                    <div
                      onClick={() => setListSlide(false)}
                      className="fixed z-[51] h-10 w-[6rem] bg-black bottom-0 rounded-full mb-2 flex items-center justify-center text-white"
                    >
                      Map
                      <button
                        type="button"
                        className="ml-1"
                        onClick={() => setListSlide(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <MapIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MobileListingsSlideOver;
