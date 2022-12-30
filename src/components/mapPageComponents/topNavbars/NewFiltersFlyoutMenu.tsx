import { Fragment, useEffect, useRef, useState } from "react";
import { Popover, Transition } from "@headlessui/react";

import useWindowSize from "@/hooks/useWindowSize";

import {
  AdjustmentsHorizontalIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
// import RangeSlider from "./Slider";
import NewRangeSlider from "./NewSlider";
import { Formik, Form, Field } from "formik";
import router, { useRouter } from "next/router";
import { useFilters } from "@/stores/useFilters";
import ListingTypeSelect from "@/components/newListingComponents/formComponents/ListingTypeSelect";

export default function NewFiltersFlyoutMenu({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  bedrooms,
  setBedrooms,
  fullBathrooms,
  setFullBathrooms,
  halfBathrooms,
  setHalfBathrooms,
  listingType,
  setListingType,
}) {
  const width = useWindowSize();
  const progressRef = useRef(null);

  let isMobile;
  if (width) {
    isMobile = width < 425;
  }

  const handleMin = (e) => {
    if (minPrice + 2000000 < maxPrice) {
      setMinPrice(parseInt(e.target.value));
    } else {
      if (parseInt(e.target.value) < maxPrice - 2000000) {
        setMinPrice(parseInt(e.target.value));
      }
    }
  };

  const handleMax = (e) => {
    if (maxPrice - 2000000 > minPrice) {
      setMaxPrice(parseInt(e.target.value));
    } else {
      if (parseInt(e.target.value) > maxPrice) {
        setMaxPrice(parseInt(e.target.value));
      }
    }
  };

  const values = {
    minPrice: minPrice,
    maxPrice: maxPrice,
    listingType: listingType,
    bedrooms: bedrooms,
    fullBathroom: fullBathrooms,
    halfBathroom: halfBathrooms,
  };

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.left = (minPrice / 30000000) * 100 + "%";
      progressRef.current.style.right = 100 - (maxPrice / 30000000) * 100 + "%";
    }
  }, [minPrice, maxPrice]);

  return (
    <>
      <Popover
        className={`${isMobile ? "inline" : "-ml-[0.5px]"} sm:ml-1`}
        //
      >
        <>
          <Popover.Button
            className={`text-gray-500 px-2 border-2 rounded-xl bg-white text-base font-medium hover:text-gray-900`}
          >
            <AdjustmentsHorizontalIcon className="h-6 w-6" />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className={`fixed z-[51] left-0 -mt-8 w-full transform px-0.5 sm:px-1`}
            >
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
                <form
                  className="w-full h-wull flex flex-wrap justify-center"
                  onSubmit={(e) => {
                    e.preventDefault();
                    router.replace(
                      {
                        pathname: "/map",
                        query: values,
                      },
                      undefined,
                      { shallow: true }
                    );
                  }}
                >
                  <div className="flex flex-col bg-white rounded-lg px-6 py-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-1">
                      {" "}
                      Price Range
                    </h2>
                    <p className="font-semibold text-md text-gray-700">
                      Use slider or enter min and max price
                    </p>
                    <div className="flex justify-between items-center my-1 mb-6 ">
                      <div className="rounded-md">
                        <span className="p-2 font-semibold"> Min</span>
                        <input
                          className="w-[100%] rounded-md border border-gray-300 shadow-md"
                          onChange={(e) => setMinPrice(e.target.value)}
                          type="text"
                          value={minPrice.toLocaleString()}
                        />
                      </div>
                      <div className="w-4 h-10 flex justify-center items-center mt-5 px-3 font-semibold">
                        -
                      </div>
                      <div className=" ">
                        <span className="p-2 font-semibold"> Max</span>
                        <input
                          className="w-[100%] rounded-md border border-gray-300 shadow-md"
                          onChange={(e) => setMaxPrice(e.target.value)}
                          type="text"
                          value={maxPrice.toLocaleString()}
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="slider relative h-1 rounded-md bg-gray-300">
                        <div
                          className="progress absolute h-1 bg-indigo-400 rounded "
                          ref={progressRef}
                        ></div>
                      </div>

                      <div className="range-input relative">
                        <input
                          className="range-min absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none"
                          onChange={handleMin}
                          type="range"
                          min={0}
                          step={100000}
                          max={30000000}
                          value={minPrice}
                        />

                        <input
                          className="range-max absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none"
                          onChange={handleMax}
                          type="range"
                          min={0}
                          step={100000}
                          max={30000000}
                          value={maxPrice}
                        />
                      </div>
                    </div>

                    {/* <div>LISTING TYPE</div> */}

                    <div className="w-full xl:w-[49%] flex justify-center mb-6">
                      <div className="relative w-full ">
                        <label
                          htmlFor="name"
                          className="text-xl font-bold text-gray-800 mb-1"
                        >
                          Listing Type
                        </label>
                        <ListingTypeSelect
                          listingType={listingType}
                          setListingType={setListingType}
                        />
                      </div>
                    </div>

                    {/* <div>BEDROOMS</div> */}

                    <div className="w-full xl:w-[49%] flex justify-center mb-6">
                      <div className="relative w-full ">
                        <label
                          htmlFor="name"
                          className="text-xl font-bold text-gray-800 mb-1"
                        >
                          Bedrooms
                        </label>
                        <div className=" relative inline flex cursor-default w-full rounded-md border border-gray-300 bg-white py-2 md:py-3 text-left shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm md:text-xl">
                          <button
                            type="button"
                            className="w-[33%] flex justify-center items-center border-r border-gray-300 font-bold"
                            onClick={() => {
                              if (bedrooms >= 1) {
                                setBedrooms(bedrooms - 1);
                              }
                            }}
                          >
                            -
                          </button>
                          <div className="w-[33%] flex justify-center">
                            {bedrooms}
                          </div>
                          <button
                            type="button"
                            className="w-[33%] flex justify-center items-center border-l border-gray-300 font-bold"
                            onClick={() => setBedrooms(bedrooms + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* <div>FULL BATHROOMS</div> */}

                    <div className="w-full xl:w-[49%] flex justify-center mb-6">
                      <div className="relative w-full ">
                        <label
                          htmlFor="name"
                          className="text-xl font-bold text-gray-800 mb-1"
                        >
                          Full Bathrooms
                        </label>
                        <div className=" relative inline flex cursor-default w-full rounded-md border border-gray-300 bg-white py-2 md:py-3 text-left shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm md:text-xl">
                          <button
                            type="button"
                            className="w-[33%] flex justify-center items-center border-r border-gray-300 font-bold"
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
                            type="button"
                            className="w-[33%] flex justify-center items-center border-l border-gray-300 font-bold"
                            onClick={() => setFullBathrooms(fullBathrooms + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* <div>HALF BATHROOMS</div> */}

                    <div className="w-full xl:w-[49%] flex justify-center">
                      <div className="relative w-full ">
                        <label
                          htmlFor="name"
                          className="text-xl font-bold text-gray-800 mb-1"
                        >
                          Half Bathrooms
                        </label>
                        <div className=" relative inline flex cursor-default w-full rounded-md border border-gray-300 bg-white py-2 md:py-3 text-left shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm md:text-xl">
                          <button
                            type="button"
                            className="w-[33%] flex justify-center items-center border-r border-gray-300 font-bold"
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
                            type="button"
                            className="w-[33%] flex justify-center items-center border-l border-gray-300 font-bold"
                            onClick={() => setHalfBathrooms(halfBathrooms + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="inline ml-2 border-2 border-black h-10 px-2 rounded-lg bg-white my-3"
                  >
                    Apply Filters
                  </button>
                </form>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      </Popover>
    </>
  );
}
