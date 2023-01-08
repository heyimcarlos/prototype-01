import React, { type Dispatch, type SetStateAction } from "react";
import PropertyTypeSelect from "@/components/newListingComponents/formComponents/PropertyTypeSelect";
import PropertyConditionSelect from "@/components/newListingComponents/formComponents/PropertyConditionSelect";
import { useNewListing } from "@/stores/useNewListing";

type StepType = {
  setStep: Dispatch<SetStateAction<string>>;
};

const NewListingStep2 = ({ setStep }: StepType) => {
  const setRecordName = useNewListing((state) => state.setRecordName);
  const recordName = useNewListing((state) => state.recordName);

  const setBedrooms = useNewListing((state) => state.setBedrooms);
  const bedrooms = useNewListing((state) => state.bedrooms);

  const setFullBathrooms = useNewListing((state) => state.setFullBathrooms);
  const fullBathrooms = useNewListing((state) => state.fullBathrooms);

  const setHalfBathrooms = useNewListing((state) => state.setHalfBathrooms);
  const halfBathrooms = useNewListing((state) => state.halfBathrooms);

  const setMeters = useNewListing((state) => state.setMeters);
  const meters = useNewListing((state) => state.meters);

  const setMaintenance = useNewListing((state) => state.setMaintenance);
  const maintenance = useNewListing((state) => state.maintenance);

  const setPrice = useNewListing((state) => state.setPrice);
  const price = useNewListing((state) => state.price);

  return (
    <>
      <div className="flex h-[calc(100vh-55.59px)] w-full flex-col pt-2 md:h-[calc(100vh-80.59px)]">
        <div className="flex h-full w-full flex-col justify-evenly xl:ml-3 xl:flex-row xl:flex-wrap xl:items-center xl:justify-start xl:px-[18rem] xl:after:justify-start">
          <div className="flex w-full flex-col items-center justify-center xl:w-[49%]">
            <div className="w-[80%]">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 md:text-xl"
              >
                Name
                <span className="ml-3 text-xs text-gray-400 md:text-lg">
                  *For your records only
                </span>
              </label>
              <input
                id="name"
                type="text"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  setRecordName(e.target.value);
                }}
                placeholder={"Name of listing"}
                value={recordName ? recordName : undefined}
                className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left text-sm shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 md:py-3 md:text-xl"
              />
            </div>
          </div>

          <div className="flex w-full items-center justify-center xl:w-[49%] ">
            <PropertyTypeSelect />
          </div>

          <div className="flex w-full items-center justify-center xl:w-[49%] ">
            <PropertyConditionSelect />
          </div>

          <div className="flex w-full justify-center xl:w-[49%]">
            <div className="relative w-[80%]">
              <label
                htmlFor="name"
                className=" text-sm font-medium text-gray-700 md:text-xl"
              >
                Price
              </label>
              <input
                id="name"
                type="text"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  if (parseInt(e.target.value) >= 0) {
                    setPrice(parseInt(e.target.value.split(",").join("")));
                  } else {
                    setPrice(0);
                  }
                }}
                value={price.toLocaleString()}
                placeholder="0"
                className=" relative inline w-full cursor-default rounded-md border border-gray-300 bg-white py-0.5 text-left text-sm shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 md:py-3 md:text-xl"
              />
            </div>
          </div>

          <div className="flex w-full justify-center xl:w-[49%]">
            <div className="relative w-[80%] ">
              <label
                htmlFor="name"
                className=" text-sm font-medium text-gray-700 md:text-xl"
              >
                Mantenimiento
              </label>
              <input
                id="name"
                type="text"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  if (parseInt(e.target.value) >= 0) {
                    setMaintenance(
                      parseInt(e.target.value.split(",").join(""))
                    );
                  } else {
                    setMaintenance(0);
                  }
                }}
                value={maintenance.toLocaleString()}
                placeholder="0"
                className=" relative inline w-full cursor-default rounded-md border border-gray-300 bg-white py-0.5 text-left text-sm shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 md:py-3 md:text-xl"
              />
            </div>
          </div>

          <div className="flex w-full justify-center xl:w-[49%]">
            <div className="relative w-[80%] ">
              <label
                htmlFor="name"
                className=" text-sm font-medium text-gray-700 md:text-xl"
              >
                Meters<sup>2</sup>
              </label>
              <input
                id="name"
                type="text"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  if (parseInt(e.target.value) >= 0) {
                    setMeters(parseInt(e.target.value.split(",").join("")));
                  } else {
                    setMeters(0);
                  }
                }}
                value={meters.toLocaleString()}
                placeholder="0"
                className=" relative inline w-full cursor-default rounded-md border border-gray-300 bg-white py-0.5 text-left text-sm shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 md:py-3 md:text-xl"
              />
            </div>
          </div>

          <div className="flex w-full justify-center xl:w-[49%]">
            <div className="relative w-[80%] ">
              <label
                htmlFor="name"
                className=" text-sm font-medium text-gray-700 md:text-xl"
              >
                Bedrooms
              </label>
              <div className=" relative inline flex w-full cursor-default rounded-md border border-gray-300 bg-white py-0.5 text-left text-sm shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 md:py-3 md:text-xl">
                <button
                  className="flex w-[33%] items-center justify-center border-r border-gray-300"
                  onClick={() => {
                    if (bedrooms >= 1) {
                      setBedrooms(bedrooms - 1);
                    }
                  }}
                >
                  -
                </button>
                <div className="flex w-[33%] justify-center">{bedrooms}</div>
                <button
                  className="flex w-[33%] items-center justify-center border-l border-gray-300"
                  onClick={() => setBedrooms(bedrooms + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-center xl:w-[49%]">
            <div className="relative w-[80%] ">
              <label
                htmlFor="name"
                className=" text-sm font-medium text-gray-700 md:text-xl"
              >
                Full Bathrooms
              </label>
              <div className=" relative inline flex w-full cursor-default rounded-md border border-gray-300 bg-white py-0.5 text-left text-sm shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 md:py-3 md:text-xl">
                <button
                  className="flex w-[33%] items-center justify-center border-r border-gray-300"
                  onClick={() => {
                    if (fullBathrooms >= 1) {
                      setFullBathrooms(fullBathrooms - 1);
                    }
                  }}
                >
                  -
                </button>
                <div className="flex w-[33%] justify-center">
                  {fullBathrooms}
                </div>
                <button
                  className="flex w-[33%] items-center justify-center border-l border-gray-300"
                  onClick={() => setFullBathrooms(fullBathrooms + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-center xl:w-[49%]">
            <div className="relative w-[80%] ">
              <label
                htmlFor="name"
                className=" text-sm font-medium text-gray-700 md:text-xl"
              >
                Half Bathrooms
              </label>
              <div className=" relative inline flex w-full cursor-default rounded-md border border-gray-300 bg-white py-0.5 text-left text-sm shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 md:py-3 md:text-xl">
                <button
                  className="flex w-[33%] items-center justify-center border-r border-gray-300"
                  onClick={() => {
                    if (halfBathrooms >= 1) {
                      setHalfBathrooms(halfBathrooms - 1);
                    }
                  }}
                >
                  -
                </button>
                <div className="flex w-[33%] justify-center">
                  {halfBathrooms}
                </div>
                <button
                  className="flex w-[33%] items-center justify-center border-l border-gray-300"
                  onClick={() => setHalfBathrooms(halfBathrooms + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-md mb-3 flex h-auto w-full items-center justify-center space-x-6 md:mb-3 md:text-xl">
          {/* <div className="rounded-lg py-1 px-2 bg-indigo-600 text-white shadow-xl">
            Save & Exit
          </div> */}
          <button
            className="rounded-lg bg-indigo-600 py-1 px-2 text-white shadow-xl md:py-2 md:px-4"
            onClick={() => setStep("step 1")}
          >
            Back
          </button>
          <button
            className="rounded-lg bg-indigo-600 py-1 px-2 text-white shadow-xl md:py-2 md:px-4"
            onClick={() => setStep("step 2.5")}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default NewListingStep2;
