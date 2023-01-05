// import PreferenceForm from "./PreferenceForm";
import { useNeighborhoods } from "@/stores/useNeighborhoods";
import SectorsSelected from "./SectorsSelected";
// import useWindowSize from "@/hooks/useWindowSize";
import FiltersFlyoutMenu from "./FiltersFlyoutMenu";
import { type Dispatch, type SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import { type ListingType } from "@prisma/client";

const MapTopbar = () => {
  const neighborhoods = useNeighborhoods((state) => state.neighborhoods);
  // const width = useWindowSize();

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
  const [listingType, setListingType] = useState<ListingType>(
    query.listingType ? (query.listingType as ListingType) : "SALEANDRENT"
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
    <div className="h-[2.1rem] w-full bg-indigo-600">
      <div className="ml-2 flex w-full justify-start">
        {neighborhoods.length > 0 && <SectorsSelected />}
      </div>

      <div className="fixed right-0 z-[51] mr-1.5 pt-[0.2rem]">
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
          listingType={listingType}
          setListingType={setListingType as Dispatch<SetStateAction<string>>}
        />
      </div>
    </div>
  );
};

export default MapTopbar;
