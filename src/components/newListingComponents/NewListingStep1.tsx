import React, {
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { env } from "@/env/client.mjs";
import { GOOGLE_MAP_LIBRARIES } from "@/lib/google";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxMap, {
  type MapRef,
  Marker,
  NavigationControl,
} from "react-map-gl";
import { useNewListing } from "@/stores/useNewListing";
import SectorSelect from "@/components/newListingComponents/formComponents/SectorSelect";
import HideAddressCheckbox from "@/components/newListingComponents/formComponents/HideAddressCheckbox";
import { useDefaultSectors } from "@/stores/useDefaultSectors";
import Link from "next/link";

type StepType = {
  setStep: Dispatch<SetStateAction<string>>;
};

const NewListingStep1 = ({ setStep }: StepType) => {
  const mapRef = useRef<MapRef>(null);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete>();
  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAP_LIBRARIES,
  });

  const defaultSectors = useDefaultSectors((state) => state.sectors);

  const setLat = useNewListing((state) => state.setLat);
  const lat = useNewListing((state) => state.lat);

  const setLng = useNewListing((state) => state.setLng);
  const lng = useNewListing((state) => state.lng);

  const setName = useNewListing((state) => state.setName);
  const setPlaceId = useNewListing((state) => state.setPlaceId);

  const setFullAddress = useNewListing((state) => state.setFullAddress);
  const fullAddress = useNewListing((state) => state.fullAddress);

  const setSector = useNewListing((state) => state.setSector);

  const onPlaceChanged = () => {
    if (autocomplete) {
      const data = autocomplete.getPlace();

      if (data.geometry?.location?.lat() && data.geometry?.location?.lng()) {
        setLat(data.geometry?.location?.lat());
        setLng(data.geometry?.location?.lng());
      }

      if (data.place_id) {
        setPlaceId(data.place_id);
      }

      if (data.name) {
        setName(data.name);
      }

      if (data.formatted_address) {
        setFullAddress(data.formatted_address);
      }

      if (data.vicinity) {
        const vicinity = data.vicinity;
        if (defaultSectors.indexOf(vicinity) !== -1) {
          setSector(vicinity);
        } else {
          setSector("");
        }
      }

      console.log("data", data);
      setAutocomplete(undefined);
    }
  };

  const initialViewport = {
    longitude: -69.94115,
    latitude: 18.45707,
    zoom: 11,
  };

  if (lat !== 0 && lng !== 0) {
    mapRef.current?.flyTo({ center: [lng, lat], zoom: 16.5 });
  }

  if (!isLoaded) return <div>loading...</div>;
  return (
    <>
      <div className="h-[calc(100vh-55.59px)] md:h-[calc(100vh-80.59px)] w-full flex flex-col items-center ">
        {/* <div>MAP for searching address</div> */}
        <div className="w-full flex flex-col flex-1 h-[15rem] max-h-[25rem] mt-0.5 md:max-h-[35rem] xl:max-w-[55rem] xl:mt-3 xl:overflow-hidden xl:rounded-tr-md xl:rounded-tl-md  xl:border-t-2 xl:border-l-2 xl:border-r-2 xl:border-black/20 xl:drop-shadow-2xl">
          <MapboxMap
            id="mapa"
            ref={mapRef}
            initialViewState={initialViewport}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
          >
            <NavigationControl
              position="top-left"
              style={{ marginBottom: "2rem" }}
            />
            {lat !== 0 && lng !== 0 && (
              <Marker
                latitude={lat}
                longitude={lng}
                anchor="bottom"
                draggable={true}
                color="rgb(79,70,229)"
                // onDragEnd={(e) => {
                //   console.log("event", e);
                // }}
              />
            )}
          </MapboxMap>
        </div>

        {/* -------------------------------------------------------------------------------------------------------------------------------------------------- */}

        <div className="w-full h-full flex flex-1 flex-col items-center justify-evenly bg-white pt-6 xl:max-w-[55rem] xl:pb-3 xl:rounded-br-md xl:rounded-bl-md xl:border-l-2 xl:border-r-2 xl:border-b-2 xl:border-black/20 xl:drop-shadow-xl">
          <div className="flex w-[95%] mx-[1rem] -mt-5 shadow-lg xl:shadow-none">
            <div className="min-w-0 flex-1 flex flex-col items-start justify-end ">
              <label htmlFor="search" className="sr-only">
                Initial search
              </label>

              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 md:text-xl"
              >
                Address
              </label>
              <Autocomplete
                restrictions={{ country: "do" }}
                className="w-full md:text-xl"
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
                  onChange={(e) => {
                    setFullAddress(e.target.value);
                  }}
                  placeholder={"Enter property address"}
                  value={fullAddress}
                  // value={fullAddress ? fullAddress : undefined}
                  className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-1 md:py-3 xl:py-2 pl-3 pr-10 text-left shadow-sm xl:shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm md:text-xl"
                />
              </Autocomplete>
            </div>
          </div>

          <div className="flex flex-col w-[95%] mx-[1rem]">
            <SectorSelect />
          </div>

          <div className="w-[95%] flex flex-col items-center pt-1">
            <HideAddressCheckbox />
          </div>
        </div>
        <div className="w-full flex justify-center space-x-6 mb-3 md:mb-6 text-md md:text-2xl xl:mt-3">
          {/* <div className="rounded-xl py-1 px-2 bg-indigo-600 text-white shadow-xl">
            Save & Exit
          </div> */}
          <Link
            href="/dashboard"
            className="rounded-lg py-1 md:py-2 px-2 md:px-4 bg-indigo-600 text-white shadow-lg"
          >
            Back
          </Link>
          <button
            className="rounded-lg py-1 md:py-2 px-2 md:px-4 bg-indigo-600 text-white shadow-lg"
            onClick={() => setStep("step 2")}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default NewListingStep1;
