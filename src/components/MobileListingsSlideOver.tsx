import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSidebar } from "@/stores/useSidebar";
import { useSectors } from "@/stores/useSectors";
import MobileListingCard from "./MobileListingCard";
import { useSelectedListing } from "@/stores/useSelectedListing";
import { divide } from "lodash";
import { Listing } from "@prisma/client";
// import { getServerSideProps } from "@/pages/map";

const MobileListingsSlideOver = ({ listSlide, setListSlide, setOpen }) => {
  const listings = useSidebar((state) => state.listings);
  const sectors = useSectors((state) => state.sectors);
  const setListing = useSelectedListing((state) => state.setListing);

  let num = 0;
  sectors.forEach((sect) => {
    console.log("sect", sect);
    num += sect.listingLocations.length;
  });
  console.log("num", num);
  return (
    <Transition.Root show={listSlide} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        onClose={() => {
          return;
        }}
      >
        {/* <div className="fixed inset-0" /> */}
        <div className="fixed" />
        {/* <div className="fixed inset-0 overflow-hidden"> */}
        <div className="fixed overflow-hidden">
          {/* <div className="absolute inset-0 overflow-hidden"> */}
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
                <Dialog.Panel className="pointer-events-auto w-screen">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-2 shadow-xl">
                    <div className="px-4 sm:px-6 -mb-4">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-md font-medium text-gray-900 mt-[0.1rem]">
                          {`${
                            listings.length > 0 && sectors.length < 1
                              ? listings.length
                              : num
                          } Homes in this area`}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setListSlide(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* {listings.length < 1 && sectors.length < 1 && (
                        <div>No listing to show move the map</div>
                      )} */}

                      {sectors.map((sector) =>
                        sector.listingLocations.map((listingLocation) => {
                          if (listingLocation.listings.length === 1) {
                            let listing: Listing | null;

                            if (listingLocation.listings[0])
                              listing = listingLocation.listings[0];
                            else listing = null;

                            if (!listing) return;

                            return (
                              <div
                                className="mb-2"
                                key={listing.id}
                                onClick={() => {
                                  setOpen(true);
                                  setListing(listing);
                                  // setLeftListing(listing);
                                  // setLeftSlideOver(true);
                                }}
                              >
                                <MobileListingCard {...listing} />
                              </div>
                            );
                          } else {
                            return listingLocation.listings.map((property) => {
                              return (
                                <div key={property.id}>HELLO FORM NESTED</div>
                              );
                            });
                          }
                        })
                      )}

                      {/*PREVIOUS ONE BELOW*/}

                      {/* {sectors.map((sector) =>
                        sector.listingLocations.map((listing) => (
                          <div
                            className="mb-2"
                            key={listing.id}
                            onClick={() => {
                              setOpen(true);
                              setListing(listing);
                              // setLeftListing(listing);
                              // setLeftSlideOver(true);
                            }}
                          >
                            <MobileListingCard listing={listing} />
                          </div>
                        ))
                      )} */}

                      {/*SECOND CALL IF THERE ARE NOT NEIGHBORHOODS SELECTED*/}

                      {/* {sectors.length < 1 &&
                        listings.forEach((listing) => {
                          return listing.listings.map((property) => (
                            <div
                              className="flex justify-center mb-2"
                              key={listing.id}
                              onClick={() => {
                                setOpen(true);
                                setListing(property);
                                // setLeftListing(listing);
                                // setLeftSlideOver(true);
                              }}
                            >
                              <MobileListingCard {...property} />
                            </div>
                          ));
                        })} */}

                      {/*PREVIOUS ONE BELOW*/}

                      {/* {sectors.length < 1 &&
                        listings.map((listing) => (
                          <div
                            className="flex justify-center mb-2"
                            key={listing.id}
                            onClick={() => {
                              setOpen(true);
                              setListing(listing);
                              // setLeftListing(listing);
                              // setLeftSlideOver(true);
                            }}
                          >
                            <MobileListingCard listing={listing} />
                          </div>
                        ))} */}
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
