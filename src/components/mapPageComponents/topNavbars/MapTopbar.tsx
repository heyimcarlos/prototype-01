import { useNeighborhoods } from "@/stores/useNeighborhoods";
import SectorsSelected from "./SectorsSelected";
import FiltersFlyoutMenu from "./FiltersFlyoutMenu";
import { type Dispatch, type SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Popover from "@/components/Popover";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid";
import { ListingType, PropertyType } from "@prisma/client";
import {
  Form,
  NumberWithButtonsField,
  TextField,
} from "@/components/form/fields";

const FormSchema = z.object({
  // minPrice: z.string().min(0),
  // maxPrice: z.number().max(30000000),
  bedrooms: z.number(),
  fullBathrooms: z.number(),
  halfBathrooms: z.number(),
  // listingType: z.nativeEnum(ListingType),
  // propertyType: z.nativeEnum(PropertyType),
});
type FormValues = z.infer<typeof FormSchema>;

const MapFiltersForm = () => {
  const formMethods = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // minPrice: "",
      // maxPrice: 30000000,
      bedrooms: 0,
      fullBathrooms: 0,
      halfBathrooms: 0,
      // listingType: "RENT",
      // propertyType: "HOUSE",
    },
  });

  const {
    formState: { isSubmitting, isDirty },
  } = formMethods;

  const onSubmit = (data: FormValues) => {
    console.log("data", data);
  };

  // const [minPrice, setMinPrice] = useState(
  //   query.minPrice ? parseInt(query.minPrice as string) : 0
  // );
  // const [maxPrice, setMaxPrice] = useState(
  //   query.maxPrice ? parseInt(query.maxPrice as string) : 30000000
  // );
  // const [bedrooms, setBedrooms] = useState(
  //   query.bedrooms ? parseInt(query.bedrooms as string) : 0
  // );
  // const [fullBathrooms, setFullBathrooms] = useState(
  //   query.fullBathrooms ? parseInt(query.fullBathrooms as string) : 0
  // );
  // const [halfBathrooms, setHalfBathrooms] = useState(
  //   query.halfBathrooms ? parseInt(query.halfBathrooms as string) : 0
  // );
  // const [listingType, setListingType] = useState(
  //   query.listingType ? query.listingType : "For Sale & Rent"
  // );

  return (
    <>
      <Popover triggerIcon={<AdjustmentsHorizontalIcon className="h-6 w-6" />}>
        <div>
          <Form
            form={formMethods}
            handleSubmit={(values) => {
              console.log("firing", values);
            }}
          >
            <NumberWithButtonsField
              type="number"
              label="Bedrooms"
              labelProps={{ className: "mb-1" }}
              {...formMethods.register("bedrooms", {
                valueAsNumber: true,
              })}
            />
            <NumberWithButtonsField
              type="number"
              label="Full Bathrooms"
              labelProps={{ className: "mb-1" }}
              {...formMethods.register("fullBathrooms", {
                valueAsNumber: true,
              })}
            />
            <NumberWithButtonsField
              type="number"
              label="Half Bathrooms"
              labelProps={{ className: "mb-1" }}
              {...formMethods.register("halfBathrooms", {
                valueAsNumber: true,
              })}
            />
            {/* <TextField label="Name" {...formMethods.register("name")} /> */}
            <button type="submit">submit</button>
          </Form>
        </div>
      </Popover>
      {/* <FiltersFlyoutMenu
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
      /> */}
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
