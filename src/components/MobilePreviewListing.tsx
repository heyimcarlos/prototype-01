import Image from "next/image";
import React from "react";
import house from "../../public/assets/images/house1.jpeg";
import { HeartIcon } from "@heroicons/react/24/outline";
import type { Listing, ListingLocation } from "@prisma/client";

type MobilePreviewTypes = {
  listing: ListingLocation & { listings: Listing[] };
  setOpen: (arg: boolean) => void;
};

const MobilePreviewListing = ({ listing, setOpen }: MobilePreviewTypes) => {
  const property = listing.listings[0];

  // let ba = null;
  // if (property) ba = property.fullBathrooms + property.halfBathrooms;
  // console.log("listing", listing);
  // console.log("property", property);
  console.log("listingLocation", listing);
  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="h-[8rem] w-[90%] rounded-xl bg-white fixed bottom-0 mb-[4rem] flex overflow-hidden shadow-2xl"
      >
        <div className="h-[8.5rem] w-[40%] flex">
          <Image src={house} alt="" />
        </div>
        <div className="h-full w-[60%] ml-2 mt-2 flex">
          <div className="h-auto w-[85%]">
            <span className="">Bella Vista</span>
            <span className="block text-xs">{listing.name}</span>
          </div>
          <div className="h-auto w-[15%] flex justify-end">
            <HeartIcon className="h-5 w-5 mr-2" />
          </div>
          <div className="absolute bottom-0  mb-2 text-black leading-5 text-[15px]">
            <span className="block">
              <b>{property?.bedrooms}</b> bd |{" "}
              <b>
                {property
                  ? property.fullBathrooms + property.halfBathrooms
                  : null}
              </b>{" "}
              ba | <b>{property?.squareFeet}</b> sqft
            </span>

            <span className="block">${property?.price.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobilePreviewListing;
