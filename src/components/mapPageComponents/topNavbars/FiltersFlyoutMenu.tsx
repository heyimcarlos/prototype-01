import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  Fragment,
  useEffect,
  useRef,
} from "react";
import { Popover, Transition } from "@headlessui/react";
import useWindowSize from "@/hooks/useWindowSize";
import {
  AdjustmentsHorizontalIcon,
  // XCircleIcon,
  // XMarkIcon,
} from "@heroicons/react/20/solid";
import router from "next/router";
import ListingTypeSelect from "@/components/newListingComponents/formComponents/ListingTypeSelect";

type FiltersFlyoutMenuTypes = {
  minPrice: number;
  setMinPrice: Dispatch<SetStateAction<number>>;
  maxPrice: number;
  setMaxPrice: Dispatch<SetStateAction<number>>;
  bedrooms: number;
  setBedrooms: Dispatch<SetStateAction<number>>;
  fullBathrooms: number;
  setFullBathrooms: Dispatch<SetStateAction<number>>;
  halfBathrooms: number;
  setHalfBathrooms: Dispatch<SetStateAction<number>>;
  listingType: string;
  setListingType: Dispatch<SetStateAction<string>>;
};

export default function FiltersFlyoutMenu({
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
}: FiltersFlyoutMenuTypes) {
  const width = useWindowSize();
  const progressRef = useRef<HTMLDivElement>(null);

  let isMobile;
  if (width) {
    isMobile = width < 425;
  }

  const handleMin = (e: ChangeEvent<HTMLInputElement>) => {
    if (minPrice + 2000000 < maxPrice) {
      setMinPrice(parseInt(e.target.value));
    } else {
      if (parseInt(e.target.value) < maxPrice - 2000000) {
        setMinPrice(parseInt(e.target.value));
      }
    }
  };

  const handleMax = (e: ChangeEvent<HTMLInputElement>) => {
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
    fullBathrooms: fullBathrooms,
    halfBathrooms: halfBathrooms,
  };

  useEffect(() => {
    if (progressRef.current) {
      if (progressRef.current.style) {
        progressRef.current.style.left = (minPrice / 30000000) * 100 + "%";
        progressRef.current.style.right =
          100 - (maxPrice / 30000000) * 100 + "%";
      }
    }
  }, [minPrice, maxPrice]);

  return (
    <>
      <Popover className={`${isMobile ? "inline" : "-ml-[0.5px]"} sm:ml-1`}>
        <>
          <Popover.Button
            className={`rounded-xl border-2 bg-white px-2 text-base font-medium text-gray-500 hover:text-gray-900`}
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
            <Popover.Panel className=" fixed right-0 z-[51] -mt-8 w-full max-w-[40rem] transform px-0.5 sm:px-1 ">
              <div className="max-h-[40rem] overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <form
                  className="h-wull flex w-full flex-wrap justify-center"
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
                  <div className="flex flex-col rounded-lg bg-white px-6 py-3">
                    {/* <div>PRICE RANGE SLIDER</div> */}

                    <h2 className="text-xl font-bold text-gray-800 ">
                      {" "}
                      Price Range
                    </h2>
                    <p className="text-md font-semibold text-gray-700">
                      Use slider or enter min and max price
                    </p>
                    <div className="my-1 mb-6 flex items-center justify-between ">
                      <div className="rounded-md">
                        <span className="p-2 font-semibold"> Min</span>
                        <input
                          className="w-[100%] rounded-md border border-gray-300 shadow-md"
                          onChange={(e) =>
                            setMinPrice(parseInt(e.target.value))
                          }
                          type="text"
                          value={minPrice.toLocaleString()}
                        />
                      </div>
                      <div className="mt-5 flex h-10 w-4 items-center justify-center px-3 font-semibold">
                        -
                      </div>
                      <div className=" ">
                        <span className="p-2 font-semibold"> Max</span>
                        <input
                          className="w-[100%] rounded-md border border-gray-300 shadow-md"
                          onChange={(e) =>
                            setMaxPrice(parseInt(e.target.value))
                          }
                          type="text"
                          value={maxPrice.toLocaleString()}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="slider relative h-1 rounded-md bg-gray-300">
                        <div
                          className="progress absolute h-1 rounded bg-indigo-400 "
                          ref={progressRef}
                        ></div>
                      </div>

                      <div className="range-input relative">
                        <input
                          className="range-min pointer-events-none absolute -top-1 h-1 w-full appearance-none bg-transparent"
                          onChange={handleMin}
                          type="range"
                          min={0}
                          step={100000}
                          max={30000000}
                          value={minPrice}
                        />

                        <input
                          className="range-max pointer-events-none absolute -top-1 h-1 w-full appearance-none bg-transparent"
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

                    <div className="mb-2 flex w-full justify-center xl:w-[49%]">
                      <div className="relative w-full ">
                        <label
                          htmlFor="name"
                          className="mb-1 text-xl font-bold text-gray-800"
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

                    <div className="mb-2 flex w-full justify-center xl:w-[49%]">
                      <div className="relative w-full ">
                        <label
                          htmlFor="name"
                          className="mb-1 text-xl font-bold text-gray-800"
                        >
                          Bedrooms
                        </label>
                        <div className=" relative inline flex w-full cursor-default rounded-md border border-gray-300 bg-white py-2 text-left text-sm shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 md:py-3 md:text-xl">
                          <button
                            type="button"
                            className="flex w-[33%] items-center justify-center border-r border-gray-300 font-bold"
                            onClick={() => {
                              if (bedrooms >= 1) {
                                setBedrooms(bedrooms - 1);
                              }
                            }}
                          >
                            -
                          </button>
                          <div className="flex w-[33%] justify-center">
                            {bedrooms}
                          </div>
                          <button
                            type="button"
                            className="flex w-[33%] items-center justify-center border-l border-gray-300 font-bold"
                            onClick={() => setBedrooms(bedrooms + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* <div>FULL BATHROOMS</div> */}

                    <div className="mb-2 flex w-full justify-center xl:w-[49%]">
                      <div className="relative w-full ">
                        <label
                          htmlFor="name"
                          className="mb-1 text-xl font-bold text-gray-800"
                        >
                          Full Bathrooms
                        </label>
                        <div className=" relative inline flex w-full cursor-default rounded-md border border-gray-300 bg-white py-2 text-left text-sm shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 md:py-3 md:text-xl">
                          <button
                            type="button"
                            className="flex w-[33%] items-center justify-center border-r border-gray-300 font-bold"
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
                            type="button"
                            className="flex w-[33%] items-center justify-center border-l border-gray-300 font-bold"
                            onClick={() => setFullBathrooms(fullBathrooms + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* <div>HALF BATHROOMS</div> */}

                    <div className="flex w-full justify-center xl:w-[49%]">
                      <div className="relative w-full ">
                        <label
                          htmlFor="name"
                          className="mb-1 text-xl font-bold text-gray-800"
                        >
                          Half Bathrooms
                        </label>
                        <div className=" relative inline flex w-full cursor-default rounded-md border border-gray-300 bg-white py-2 text-left text-sm shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 md:py-3 md:text-xl">
                          <button
                            type="button"
                            className="flex w-[33%] items-center justify-center border-r border-gray-300 font-bold"
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
                            type="button"
                            className="flex w-[33%] items-center justify-center border-l border-gray-300 font-bold"
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
                    className="ml-2 mb-2 inline h-10 rounded-lg border-2 border-black bg-white px-2"
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
