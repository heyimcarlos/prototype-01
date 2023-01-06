import { useNeighborhoods } from "@/stores/useNeighborhoods";
import SectorsSelected from "./SectorsSelected";
import FiltersFlyoutMenu from "./FiltersFlyoutMenu";
import { type Dispatch, type SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FlyoutMenu from "@/components/FlyoutMenu";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid";
import { ListingType, PropertyType } from "@prisma/client";

const FormSchema = z.object({
  name: z.string().min(1, "required"),
  minPrice: z.number().min(0),
  maxPrice: z.number().max(30000000),
  bedrooms: z.number(),
  bathrooms: z.number(),
  halfBathrooms: z.number(),
  listingType: z.nativeEnum(ListingType),
  propertyType: z.nativeEnum(PropertyType)
});
type FormValues = z.infer<typeof FormSchema>;

const MapFiltersForm = () => {
  const {
    register,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log('data', data)
  }

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

  return (
    <>
      <FlyoutMenu triggerIcon={<AdjustmentsHorizontalIcon className="h-6 w-6" />}>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Name
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                {...register("name")}
                type="text"
                placeholder="Maria"
                name="name"
                id="name"
                autoComplete="given-name"
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
              />
              {/*
                      {errors.name?.message && (
                        <ErrorMessage message={errors.name.message} />
                      )}
                      */}
            </div>
          </div>
          <button type="submit">apply</button>
        </form>
      </FlyoutMenu>
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
    </>
  );
};

const MapTopbar = () => {
  const neighborhoods = useNeighborhoods((state) => state.neighborhoods);

  return (
    <div className="h-[2.1rem] w-full bg-indigo-600">
      <div className="ml-2 flex w-full justify-start">
        {neighborhoods.length > 0 && <SectorsSelected />}
      </div>

      <div className="fixed right-0 z-[51] mr-1.5 pt-[0.2rem]">
        <MapFiltersForm />
      </div>
    </div>
  );
};

export default MapTopbar;
