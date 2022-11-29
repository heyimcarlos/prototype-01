import Image from "next/image";
import React from "react";
import house from "../../public/assets/images/house1.jpeg";
import { HeartIcon } from "@heroicons/react/24/outline";
import type { Listing } from "@prisma/client";
import { useSelectedListing } from "@/stores/useSelectedListing";

type MobilePreviewTypes = {
  listing: Listing;
  setOpen: (arg: boolean) => void;
};

const MultiMobilePreviewListing = ({
  listing,
  setOpen,
}: MobilePreviewTypes) => {
  const neighborhood = useSelectedListing((state) => state.neighborhood);
  const setListing = useSelectedListing((state) => state.setListing);
  // console.log(listing, "listing from mobile preview");

  return (
    <>
      <div
        onClick={() => {
          setTimeout(() => {
            setListing(listing);
            setOpen(true);
          }, 100);
        }}
        className="h-[8rem] rounded-xl bg-white fixed bottom-0 mb-8 flex overflow-hidden shadow-lg z-[50]"
      >
        <div className="h-[8.5rem] w-[40%] flex">
          <Image src={house} alt="" />
        </div>
        <div className="h-full w-[60%] ml-2 mt-2 flex">
          <div className="h-auto w-[85%]">
            <span className="">{neighborhood}</span>
            <span className="block text-xs">{listing.name}</span>
          </div>
          <div className="h-auto w-[15%] flex justify-end">
            <HeartIcon className="h-5 w-5 mr-2" />
          </div>
          <div className="absolute bottom-0  mb-2 text-black leading-5 text-[15px]">
            <span className="block">
              <b>{listing.bedrooms}</b> bd |{" "}
              <b>
                {listing ? listing.fullBathrooms + listing.halfBathrooms : null}
              </b>{" "}
              ba | <b>{listing?.squareFeet}</b> sqft
            </span>

            <span className="block">${listing?.price.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MultiMobilePreviewListing;
