import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Autocomplete } from "@react-google-maps/api";
import { useRouter } from "next/router";

const TwHomeSearchbar = () => {
  const router = useRouter();
  const [searchType, setSearchType] = useState("buy");

  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete>();

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const { geometry } = autocomplete?.getPlace();

      if (geometry) {
        router.push(
          `/map?lat=${geometry.location?.lat()}&lng=${geometry.location?.lng()}&type=${searchType}`
        );
      }
      setAutocomplete(undefined);
    }
    return 123;
  };

  return (
    <div className="absolute z-10 w-full mt-[1.9rem] sm:mt-[2.5rem] md:mt-[2.4rem] lg:mt-[0.5rem] xl:mt-[2rem]">
      <div className="pt-10 sm:pt-16 lg:overflow-hidden lg:pt-20 pb-14">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center ">
            <div className="lg:py-24">
              <h1 className="mt-4 text-3xl font-bold text-center tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                <span className="absolute text-indigo-600 mr-2">Know the area.</span>
                <span className="text-black -ml-[0.15rem]">Know the area.</span>
                <br />
                <span className="absolute">Find your place.</span>
                <span className="text-black -ml-[0.15rem]">Find your place.</span>
              </h1>

              <div className="mt-5 sm:mt-12 lg:ml-6">
                <form action="#" className="sm:mx-auto sm:max-w-xl lg:mx-0 ">
                  <div className="flex">
                    <label
                      htmlFor="search"
                      className={`${
                        searchType === "buy" ? "bg-white text-black" : "bg-indigo-600 text-white"
                      } px-5 py-1 rounded-tl-md text-sm`}
                      onClick={() => setSearchType("buy")}
                    >
                      Buy
                    </label>
                    <label
                      htmlFor="search"
                      className={`${
                        searchType === "rent" ? "bg-white text-black" : "bg-indigo-600 text-white"
                      } px-5 py-1 rounded-tr-md text-sm`}
                      onClick={() => setSearchType("rent")}
                    >
                      Rent
                    </label>
                  </div>

                  <div className="sm:flex">
                    <div className="min-w-0 flex-1 flex items-center justify-end">
                      <label htmlFor="search" className="sr-only">
                        Initial search
                      </label>
                      <div
                        className="absolute flex items-center cursor-pointer px-3 py-2 bg-indigo-600 rounded-md mr-[0.4rem]"
                        onClick={onPlaceChanged}
                      >
                        <MagnifyingGlassIcon className="h-5 w-5 text-white" aria-hidden="true" />
                      </div>
                      <Autocomplete
                        restrictions={{ country: "do" }}
                        // types={["regions"]}
                        // ref={inputRef}
                        className="w-full"
                        onLoad={onLoad}
                        onPlaceChanged={() => onPlaceChanged()}
                      >
                        <input
                          id="search"
                          type="text"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                            }
                          }}
                          placeholder="City, Neighborhood"
                          className="block w-full rounded-bl-md rounded-r-md border-0 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                      </Autocomplete>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwHomeSearchbar;
