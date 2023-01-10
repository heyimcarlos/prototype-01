import { useNeighborhoods } from "@/stores/useNeighborhoods";
import SectorsSelected from "./SectorsSelected";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Popover from "@/components/Popover";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid";
import { ListingType, PropertyType } from "@prisma/client";
import {
  Form,
  Label,
  NumberWithButtonsField,
  TextField,
} from "@/components/ui/form/fields";
import Slider from "@/components/ui/Slider";
import MultiSelectCheckboxes from "@/components/ui/form/MultiSelectCheckboxes";
import { useMemo } from "react";
import Button from "@/components/ui/Button";
import _ from "lodash";

const FormSchema = z.object({
  minPrice: z.string(),
  maxPrice: z.string(),
  bedrooms: z.number(),
  fullBathrooms: z.number(),
  halfBathrooms: z.number(),
  listingType: z.array(z.nativeEnum(ListingType)),
  propertyType: z.array(z.nativeEnum(PropertyType)),
});
type FormValues = z.infer<typeof FormSchema>;

export const MultiValue = ({
  index,
  getValue,
}: {
  index: number;
  getValue: any;
}) => {
  return <>{!index && <div>Type ({getValue().length})</div>}</>;
};

const sliderRange = [1, 3000000] as const;

const currencyStrAsNum = (str: string) => {
  return parseFloat(str.replace(/,/g, ""));
};

const MapFiltersForm = () => {
  const formMethods = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      minPrice: sliderRange[0].toLocaleString(),
      maxPrice: sliderRange[1].toLocaleString(),
      bedrooms: 0,
      fullBathrooms: 0,
      halfBathrooms: 0,
      listingType: [],
      propertyType: [],
    },
  });

  const listingTypes = useMemo(() => {
    return Object.keys(ListingType).map((key) => ({
      value: key,
      label: _.capitalize(key),
    }));
  }, []);

  const {
    formState: { isSubmitting, isDirty },
  } = formMethods;

  const onSubmit = (data: FormValues) => {
    console.log("data", data);

    // if (data.listingType.length > 0) {
    //   data.listingType = data.listingType.map((item) => item.value);
    // }
  };

  return (
    <>
      <Popover triggerIcon={<AdjustmentsHorizontalIcon className="h-6 w-6" />}>
        <div>
          <Form
            form={formMethods}
            handleSubmit={(values) => {
              onSubmit(values);
            }}
          >
            <>
              <div className="mb-2 flex w-full items-center justify-center">
                <TextField
                  className="w-32"
                  label="Min"
                  {...formMethods.register("minPrice")}
                />
                <span className="mx-2" />
                <TextField
                  className="w-32"
                  label="Max"
                  {...formMethods.register("maxPrice")}
                />
              </div>
              <Label>Price Range</Label>
              <Slider
                onValueChange={(value) => {
                  const [min, max] = value;
                  if (min) {
                    const minPrice = (min - 1).toLocaleString();
                    formMethods.setValue("minPrice", minPrice);
                  }
                  if (max) {
                    const maxPrice = (max - 1).toLocaleString();
                    formMethods.setValue("maxPrice", maxPrice);
                  }
                  if (max === sliderRange[1])
                    formMethods.setValue(
                      "maxPrice",
                      sliderRange[1].toLocaleString()
                    );
                }}
                defaultValue={[
                  currencyStrAsNum(formMethods.getValues("minPrice")),
                  currencyStrAsNum(formMethods.getValues("maxPrice")),
                ]}
                label="label"
                minStepsBetweenThumbs={1}
                step={10000}
                min={sliderRange[0]}
                max={sliderRange[1]}
              />
            </>
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
            <Controller
              name="listingType"
              control={formMethods.control}
              render={({ field: { value } }) => {
                return (
                  <MultiSelectCheckboxes
                    className="my-4 w-fit min-w-[7.185rem]"
                    placeholder="Type"
                    options={listingTypes}
                    components={{ MultiValue }}
                    selected={value.map((item) => ({
                      value: item,
                      label: _.capitalize(item),
                    }))}
                    setValue={(value) => {
                      formMethods.setValue(
                        "listingType",
                        value.map((item) => item.value) as ListingType[]
                      );
                    }}
                  />
                );
              }}
            />
            <Button type="submit">submit</Button>
          </Form>
        </div>
      </Popover>
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
