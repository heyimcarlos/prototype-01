import Image from "next/image";
import { transformIntToMoney } from "@/lib/transformInt";
import { Listing } from "@prisma/client";

const MobileListingCard = ({ name, description, price }: Listing) => {
  return (
    <div className="card w-full h-[16.5rem] shadow-md rounded border-black/[.1] border-[1px] ">
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
          {transformIntToMoney(price)}
        </h2>
        <p>{description}</p>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default MobileListingCard;
