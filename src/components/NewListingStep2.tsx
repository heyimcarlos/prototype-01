import React from "react";
import PropertyTypeSelect from "@/components/PropertyTypeSelect";
import PropertyConditionSelect from "@/components/PropertyConditionSelect";
import { useNewListing } from "@/stores/useNewListing";

const NewListingStep2 = ({ setStep }) => {
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
      <div className="h-[calc(100vh-55.59px)] md:h-[calc(100vh-80.59px)] w-full flex flex-col pt-2">
        <div className="flex h-full w-full lg:px-[18rem] flex-col justify-evenly lg:flex-row lg:justify-start lg:items-center lg:flex-wrap lg:after:justify-start lg:ml-3">
          <div className="w-full lg:w-[49%] flex flex-col justify-center items-center">
            <div className="w-[80%]">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 md:text-xl"
              >
                Name
                <span className="text-xs text-gray-400 ml-3 md:text-lg">
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
                className="relative cursor-default w-full rounded-md border border-gray-300 bg-white py-0.5 md:py-3 pl-3 pr-10 text-left shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm md:text-xl"
              />
            </div>
          </div>

          <div className="w-full lg:w-[49%] flex justify-center items-center ">
            <PropertyTypeSelect />
          </div>

          <div className="w-full lg:w-[49%] flex justify-center items-center ">
            <PropertyConditionSelect />
          </div>

          <div className="w-full lg:w-[49%] flex justify-center">
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
                className=" relative inline cursor-default w-full rounded-md border border-gray-300 bg-white py-0.5 md:py-3 text-left shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm md:text-xl"
              />
            </div>
          </div>

          <div className="w-full lg:w-[49%] flex justify-center">
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
                className=" relative inline cursor-default w-full rounded-md border border-gray-300 bg-white py-0.5 md:py-3 text-left shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm md:text-xl"
              />
            </div>
          </div>

          <div className="w-full lg:w-[49%] flex justify-center">
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
                className=" relative inline cursor-default w-full rounded-md border border-gray-300 bg-white py-0.5 md:py-3 text-left shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm md:text-xl"
              />
            </div>
          </div>

          <div className="w-full lg:w-[49%] flex justify-center">
            <div className="relative w-[80%] ">
              <label
                htmlFor="name"
                className=" text-sm font-medium text-gray-700 md:text-xl"
              >
                Bedrooms
              </label>
              <div className=" relative inline flex cursor-default w-full rounded-md border border-gray-300 bg-white py-0.5 md:py-3 text-left shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm md:text-xl">
                <button
                  className="w-[33%] flex justify-center items-center border-r border-gray-300"
                  onClick={() => {
                    if (bedrooms >= 1) {
                      setBedrooms(bedrooms - 1);
                    }
                  }}
                >
                  -
                </button>
                <div className="w-[33%] flex justify-center">{bedrooms}</div>
                <button
                  className="w-[33%] flex justify-center items-center border-l border-gray-300"
                  onClick={() => setBedrooms(bedrooms + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[49%] flex justify-center">
            <div className="relative w-[80%] ">
              <label
                htmlFor="name"
                className=" text-sm font-medium text-gray-700 md:text-xl"
              >
                Full Bathrooms
              </label>
              <div className=" relative inline flex cursor-default w-full rounded-md border border-gray-300 bg-white py-0.5 md:py-3 text-left shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm md:text-xl">
                <button
                  className="w-[33%] flex justify-center items-center border-r border-gray-300"
                  onClick={() => {
                    if (fullBathrooms >= 1) {
                      setFullBathrooms(fullBathrooms - 1);
                    }
                  }}
                >
                  -
                </button>
                <div className="w-[33%] flex justify-center">
                  {fullBathrooms}
                </div>
                <button
                  className="w-[33%] flex justify-center items-center border-l border-gray-300"
                  onClick={() => setFullBathrooms(fullBathrooms + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[49%] flex justify-center">
            <div className="relative w-[80%] ">
              <label
                htmlFor="name"
                className=" text-sm font-medium text-gray-700 md:text-xl"
              >
                Half Bathrooms
              </label>
              <div className=" relative inline flex cursor-default w-full rounded-md border border-gray-300 bg-white py-0.5 md:py-3 text-left shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm md:text-xl">
                <button
                  className="w-[33%] flex justify-center items-center border-r border-gray-300"
                  onClick={() => {
                    if (halfBathrooms >= 1) {
                      setHalfBathrooms(halfBathrooms - 1);
                    }
                  }}
                >
                  -
                </button>
                <div className="w-[33%] flex justify-center">
                  {halfBathrooms}
                </div>
                <button
                  className="w-[33%] flex justify-center items-center border-l border-gray-300"
                  onClick={() => setHalfBathrooms(halfBathrooms + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-auto w-full flex justify-center items-center space-x-6 mb-3 md:mb-6 md:text-2xl">
          {/* <div className="rounded-lg py-1 px-2 bg-indigo-600 text-white shadow-xl">
            Save & Exit
          </div> */}
          <button
            className="rounded-lg py-1 md:py-2 px-2 md:px-4 bg-indigo-600 text-white shadow-xl"
            onClick={() => setStep("step 1")}
          >
            Back
          </button>
          <button
            className="rounded-lg py-1 md:py-2 px-2 md:px-4 bg-indigo-600 text-white shadow-xl"
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
