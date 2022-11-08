import Image from "next/image";
import { transformIntToMoney } from "@/lib/transformInt";
import type { Listing } from "@prisma/client";

const ListingCard = ({ name, description, price }: Listing) => {
  return (
    <div className="card w-[17.5rem] h-[17rem] shadow-md rounded mt-2 border-black/[.1] border-[1px] ">
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
        <p>{description}</p>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default ListingCard;
