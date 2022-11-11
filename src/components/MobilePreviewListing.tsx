import Image from "next/image";
import React from "react";
import house from "../../public/assets/images/house1.jpeg";
import { HeartIcon } from "@heroicons/react/24/outline";

const MobilePreviewListing = ({ listing, setOpen }) => {
  // console.log("listing", listing);
  return (
    <div
      onClick={() => {
        setOpen(true);
      }}
      className="h-[8rem] w-[90%] rounded-xl bg-white fixed bottom-0 mb-[4rem] flex overflow-hidden shadow-2xl"
    >
      <div className="h-[8.5rem] w-[8rem] absolute">
        <Image src={house} alt="" layout="fill" />
      </div>
      <div className="absolute right-0 mr-[1.4rem] mt-3 text-black leading-5 text-[15px]">
        <span className="">Santo Domingo</span>
        <HeartIcon className="h-5 w-5 inline ml-12" />
        <span className="block">Dominican Republic</span>
      </div>
      <div className="absolute right-0 bottom-0 mr-[1.8rem] mb-[1rem] text-black leading-5 text-[15px]">
        <span className="block">
          <b>4</b> bd | <b>3.5</b> ba | <b>1600</b> sqft
        </span>

        <span className="block">${listing.price}</span>
      </div>
    </div>
  );
};

export default MobilePreviewListing;
