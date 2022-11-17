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
      <div className="h-[8.5rem] w-[40%] flex">
        <Image src={house} alt="" />
      </div>
      <div className="h-full w-[60%] ml-2 mt-2 flex">
        <div className="h-auto w-[85%]">
          <span className="">Bella Vista</span>
          <span className="block">Santo Domingo</span>
        </div>
        <div className="h-auto w-[15%] flex justify-end">
          <HeartIcon className="h-5 w-5 mr-2" />
        </div>
        <div className="absolute bottom-0  mb-2 text-black leading-5 text-[15px]">
          <span className="block">
            <b>4</b> bd | <b>3.5</b> ba | <b>1600</b> sqft
          </span>

          <span className="block">${listing.price}</span>
        </div>
      </div>
    </div>
  );
};

export default MobilePreviewListing;
