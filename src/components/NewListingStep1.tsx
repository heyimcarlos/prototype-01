import React, { useRef, useState } from "react";
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
import SectorSelect from "@/components/SectorSelect";
import HideAddressCheckbox from "@/components/HideAddressCheckbox";

const NewListingStep1 = ({ setStep }) => {
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

  const setLat = useNewListing((state) => state.setLat);
  const setLng = useNewListing((state) => state.setLng);
  const lat = useNewListing((state) => state.lat);
  const lng = useNewListing((state) => state.lng);
  const setName = useNewListing((state) => state.setName);
  const setPlaceId = useNewListing((state) => state.setPlaceId);

  // console.log("lat", lat);
  // console.log("lng", lng);

  const onPlaceChanged = () => {
    if (autocomplete) {
      const data = autocomplete.getPlace();

      if (data.geometry?.location?.lat() && data.geometry?.location?.lng()) {
        setLat(data.geometry?.location?.lat());
        setLng(data.geometry?.location?.lng());
      }
      if (data.name) {
        setName(data.name);
      }
      if (data.place_id) {
        setPlaceId(data.place_id);
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
      <div className="h-[calc(100vh-68px)] w-full flex flex-col items-center">
        <div className="w-full  flex flex-col flex-1 h-[15rem] max-h-[25rem] mt-3">
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
                onDragEnd={(e) => {
                  console.log("event", e);
                }}
              />
            )}
          </MapboxMap>
        </div>

        {/* -------------------------------------------------------------------------------------------------------------------------------------------------- */}

        <div className="w-full h-full flex flex-1 flex-col items-center justify-evenly bg-white z-10 pt-5 shadow-inner">
          <div className="flex w-[95%] mx-[1rem] -mt-5 shadow-lg">
            <div className="min-w-0 flex-1 flex flex-col items-start justify-end ">
              <label htmlFor="search" className="sr-only">
                Initial search
              </label>

              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <Autocomplete
                restrictions={{ country: "do" }}
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
                  placeholder="Enter property address"
                  className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                />
              </Autocomplete>
            </div>
          </div>

          <div className="flex flex-col w-[95%] mx-[1rem] shadow-lg">
            <SectorSelect />
          </div>

          <div className="flex flex-col items-center">
            <HideAddressCheckbox />
          </div>

          <div className="w-full flex justify-center space-x-6 mt-3">
            <div className="rounded-lg py-1 px-2 bg-indigo-600 text-white shadow-xl">
              Save & Exit
            </div>
            <div
              className="rounded-lg py-1 px-2 bg-indigo-600 text-white shadow-xl"
              onClick={() => setStep("step 2")}
            >
              Continue
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewListingStep1;
