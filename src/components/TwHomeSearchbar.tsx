import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useRouter } from "next/router";
import { env } from "@/env/client.mjs";
import { GOOGLE_MAP_LIBRARIES } from "@/lib/google";

const TwHomeSearchbar = () => {
  const router = useRouter();
  const [searchType, setSearchType] = useState("buy");

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete>();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAP_LIBRARIES,
  });

  if (!isLoaded) return <div>loading...</div>;

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
    // return 123;
  };

  return (
    <div className="relative z-10 w-full h-[600px] flex flex-col justify-center items-center">
      <div className="mx-auto w-5/6 max-w-7xl">
        <h1 className="text-4xl font-bold text-center tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
          <span className="text-indigo-500">Know the area.</span>
          <br />
          <span className="">Find your place.</span>
        </h1>

        <div className="my-8 mx-auto max-w-lg">
          <form className="">
            <div className="flex">
              <label
                htmlFor="search"
                className={`${searchType === "buy"
                    ? "bg-white text-black"
                    : "bg-indigo-600 text-white"
                  } px-5 py-1 rounded-tl-md text-sm`}
                onClick={() => setSearchType("buy")}
              >
                Buy
              </label>
              <label
                htmlFor="search"
                className={`${searchType === "rent"
                    ? "bg-white text-black"
                    : "bg-indigo-600 text-white"
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
                // onClick={onPlaceChanged}
                >
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </div>
                <Autocomplete
                  restrictions={{ country: "do" }}
                  // types={["regions"]}
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
  );
};

export default TwHomeSearchbar;
