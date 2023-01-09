import Image from "next/image";
import React from "react";
import house from "../../../public/assets/images/house1.jpeg";
import { HeartIcon } from "@heroicons/react/24/outline";

import {
  type ListingWithListingDetail,
  useSelectedListing,
} from "@/stores/useSelectedListing";

type MobilePreviewTypes = {
  listing: ListingWithListingDetail;
  setOpen: (arg: boolean) => void;
};

const MultiMobilePreviewListing = ({
  listing,
  setOpen,
}: MobilePreviewTypes) => {
  const neighborhood = useSelectedListing((state) => state.neighborhood);
  const setListing = useSelectedListing((state) => state.setListing);
  // console.log(listing, "listing from mobile preview");
  const listingAddress = useSelectedListing((state) => state.listingAddress);
  const setDirection = useSelectedListing((state) => state.setDirection);

  return (
    <>
      <div
        onClick={() => {
          setDirection("left");
          setTimeout(() => {
            setListing(listing);
            setOpen(true);
          }, 100);
        }}
        className="fixed bottom-0 z-[50] mb-8 flex h-[8rem] overflow-hidden rounded-xl bg-white shadow-md"
      >
        <div className="flex h-[8.5rem] w-[40%]">
          <Image src={house} alt="" />
        </div>
        <div className="ml-2 mt-2 flex h-full w-[60%]">
          <div className="h-auto w-[85%]">
            <span className="">{neighborhood}</span>
            <span className="block text-xs">{listingAddress}</span>
          </div>
          <div className="flex h-auto w-[15%] justify-end">
            <HeartIcon className="mr-2 h-5 w-5" />
          </div>
          <div className="absolute bottom-0  mb-2 text-[15px] leading-5 text-black">
            <span className="block">
              <b>{listing.bedrooms}</b> bd |{" "}
              <b>
                {listing ? listing.fullBathrooms + listing.halfBathrooms : null}
              </b>{" "}
              ba | <b>{listing?.meters}</b> sqft
            </span>

            <span className="block">${listing?.price.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MultiMobilePreviewListing;
