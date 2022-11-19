import Image from "next/image";
import { transformIntToMoney } from "@/lib/transformInt";
import type { Listing, ListingLocation } from "@prisma/client";

const MobileListingCard = (listing: Listing) => {
  console.log("listing from mobileListingCard", listing);
  return (
    <div className="card w-full h-auto shadow-md rounded border-black/[.1] border-[1px]">
      <div className="">
        <Image
          src="https://placeimg.com/400/225/arch"
          width={400}
          height={200}
          alt="listing"
        />
      </div>
      <div className="ml-1">
        <h2 className="text-lg font-semibold text-black">
          {transformIntToMoney(listing.price ? listing.price : 0)}
        </h2>
        <p>{listing.bio}</p>
        <p>{listing.name}</p>
      </div>
    </div>
  );
};

export default MobileListingCard;
