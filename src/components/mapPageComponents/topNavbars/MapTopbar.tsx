// import PreferenceForm from "./PreferenceForm";
import { useNeighborhoods } from "@/stores/useNeighborhoods";
import SectorsSelected from "./SectorsSelected";
import useWindowSize from "@/hooks/useWindowSize";
import FiltersFlyoutMenu from "./FiltersFlyoutMenu";
import { type Dispatch, type SetStateAction, useState } from "react";
import { useRouter } from "next/router";

const MapTopbar = () => {
  const neighborhoods = useNeighborhoods((state) => state.neighborhoods);
  const width = useWindowSize();

  const { query } = useRouter();

  const [minPrice, setMinPrice] = useState(
    query.minPrice ? parseInt(query.minPrice as string) : 0
  );
  const [maxPrice, setMaxPrice] = useState(
    query.maxPrice ? parseInt(query.maxPrice as string) : 30000000
  );
  const [bedrooms, setBedrooms] = useState(
    query.bedrooms ? parseInt(query.bedrooms as string) : 0
  );
  const [fullBathrooms, setFullBathrooms] = useState(
    query.fullBathrooms ? parseInt(query.fullBathrooms as string) : 0
  );
  const [halfBathrooms, setHalfBathrooms] = useState(
    query.halfBathrooms ? parseInt(query.halfBathrooms as string) : 0
  );
  const [listingType, setListingType] = useState(
    query.listingType ? query.listingType : "For Sale & Rent"
  );

  // const neighborhoods = await prisma.neighborhood.findMany({
  //   include: {
  //     listingLocations: { include: { listings: {}, neighborhood: {} } },
  //   },
  // });

  // const getFilteredListings = async () => {
  //   const getFilteredListings = await prisma?.listing.findMany({
  //     where: { price: { gte: minValue, lte: maxValue } },
  //   });
  // };

  return (
    <div className="bg-indigo-600 h-[2.1rem] w-full">
      <div className="w-full flex justify-start ml-2">
        {neighborhoods.length > 0 && <SectorsSelected />}
      </div>

      <div className="pt-[0.2rem] fixed z-[51] right-0 mr-1.5">
        <FiltersFlyoutMenu
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          bedrooms={bedrooms}
          setBedrooms={setBedrooms}
          fullBathrooms={fullBathrooms}
          setFullBathrooms={setFullBathrooms}
          halfBathrooms={halfBathrooms}
          setHalfBathrooms={setHalfBathrooms}
          listingType={listingType as string}
          setListingType={setListingType as Dispatch<SetStateAction<string>>}
        />
      </div>
    </div>
  );
};

export default MapTopbar;
