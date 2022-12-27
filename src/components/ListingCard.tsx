import Image from "next/image";
import { transformIntToMoney } from "@/lib/transformInt";
import type { Listing, ListingLocation } from "@prisma/client";

type ListingCardTypes = {
  price: number;
  location: string;
  beds: number;
  fullBaths: number;
  halfBaths: number;
  meters: number;
  neighborhood?: string;
};

const ListingCard = ({
  price,
  location,
  beds,
  fullBaths,
  halfBaths,
  meters,
  neighborhood,
}: ListingCardTypes) => {
  return (
    <div className="card w-[17.5rem] h-auto shadow-md rounded mb-2 border-black/[.1] border-[1px] ">
      {/* <div className="card w-[17.5rem] h-[14.5rem] shadow-md rounded mb-2 border-black/[.1] border-[1px] "> */}
      <div className="">
        <Image
          src="https://placeimg.com/400/225/arch"
          width={300}
          height={200}
          alt="listing"
        />
      </div>
      <div className="ml-1">
        <h2 className="text-lg font-semibold text-black">
          {transformIntToMoney(price)}
        </h2>
        <h3 className="text-sm flex md:text-[16px]">
          <b>{beds}</b>bd | <b className="ml-1">{fullBaths}</b>fba |
          {halfBaths > 0 && (
            <span>
              <b className="ml-1">{halfBaths}</b>hba |
            </span>
          )}
          <b className="mx-1">{meters}</b>
          metros
          <sup className="mt-2.5">2</sup>
        </h3>
        <p className="mt-2">{location}</p>
        <span>{neighborhood}</span>
      </div>
    </div>
  );
};

export default ListingCard;
