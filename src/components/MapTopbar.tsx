import { Fragment, RefObject, useEffect, useMemo, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Autocomplete, StandaloneSearchBox } from "@react-google-maps/api";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import PreferenceInput from "@/components/PreferenceInput";
import Divider from "@/components/Divider";
import { availablePreferences, PreferenceKey, PreferenceObj } from "@/pages";
import { MapRef } from "react-map-gl";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
type MapTopbarProps = {
  mapRef: RefObject<MapRef>;
  pref: PreferenceObj;
  setPref: React.Dispatch<React.SetStateAction<PreferenceObj>>;
};

const MapTopbar = ({ setPref, pref, mapRef }: MapTopbarProps) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete>();
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox>();
  const [activePrefs, setActivePrefs] = useState<typeof availablePreferences[number][]>([]);

  useEffect(() => {
    const currentPrefKeys = Object.keys(pref) as (keyof typeof pref)[];
    setActivePrefs(currentPrefKeys);
  }, [pref]);

  const inactivePrefs = useMemo(() => {
    return availablePreferences.filter((pref) => !activePrefs?.includes(pref));
  }, [activePrefs]);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  useEffect(() => {
    console.log(mapRef.current?.getBounds());
    const bounds = mapRef.current?.getBounds();
    console.log("bounds", bounds);
    if (bounds && searchBox) {
      searchBox?.setBounds({
        east: bounds.getEast(),
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        west: bounds.getWest(),
      });
      console.log(searchBox?.getBounds());
    }
  }, [mapRef, searchBox]);

  const onPlacesChanged = () => {
    if (searchBox) {
      // if (mapRef) {
      //   const bounds = mapRef.current?.getBounds();
      //   if (bounds) {
      //     console.log(bounds.getSouthWest(), bounds.getNorthEast());
      //     const a = new google.maps.LatLngBounds(bounds.getSouthWest(), bounds.getNorthEast());
      //     console.log(a);
      //     // const googleBounds = new google.maps.LatLngBounds(
      //     //   new google.maps.LatLng(bounds.sw),
      //     //   new google.maps.LatLng(bounds.ne)
      //     // );
      //     searchBox.setBounds(a);
      //   }
      //   // console.log(googleBounds, "googleBounds");
      //   // console.log("gl:", bounds, "google:", googlebounds);
      //   // searchBox.setBounds(bounds);
      // }
      // const bounds = searchBox.getBounds();
      // console.log("searchbox bounds", bounds);
      // const bounds = searchBox.getBounds();
      // console.log("bounds", bounds);
      const places = searchBox.getPlaces();
      console.log("places", places);
    }
  };

  const onSearchBoxLoad = (searchBox: google.maps.places.SearchBox) => {
    setSearchBox(searchBox);
  };

  const onPlaceChanged = () => {
    console.log(autocomplete);
    if (autocomplete) {
      const place = autocomplete?.getPlace();
      console.log(autocomplete.getBounds());
      console.log(autocomplete.getFields());
      console.log(autocomplete);
      if (place?.name) {
        // setPref({
        //   ...pref,
        //   [name]: {
        //     address: place?.name,
        //     lat: place?.geometry?.location?.lat(),
        //     lng: place?.geometry?.location?.lng(),
        //   },
        // });
        setAutocomplete(undefined);
      }
    }
  };

  const removePref = (name: string) => {
    setPref({
      ...pref,
      [name]: undefined,
    });
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? "text-gray-900 " : "text-gray-500 ",
              "group border p-1 inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            )}
          >
            <span className="mx-2">Preferences</span>
            <ChevronDownIcon
              className={classNames(
                open ? "text-gray-600" : "text-gray-400",
                "ml-2 h-5 w-5 group-hover:text-gray-500"
              )}
              aria-hidden="true"
            />
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
            <Popover.Panel className="absolute left-40 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0">
              {/* @INFO: Card */}
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                {/* FORM */}
                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-6 sm:p-6">
                  {activePrefs.length > 0 && (
                    <>
                      {activePrefs.map((preference, idx) => (
                        <div key={`preferenceInput-${idx}`} className="mb-2 flex items-center">
                          <StandaloneSearchBox
                            onPlacesChanged={onPlacesChanged}
                            onLoad={onSearchBoxLoad}
                          >
                            <PreferenceInput
                              name={preference}
                              value={pref[preference]?.address || ""}
                            />
                          </StandaloneSearchBox>
                          {/* <Autocomplete
                            restrictions={{ country: "do" }}
                            // options={{fields: }}
                            className="w-full"
                            onLoad={onLoad}
                            onPlaceChanged={onPlaceChanged}
                          >
                            <PreferenceInput
                              name={preference}
                              value={pref[preference]?.address || ""}
                            />
                          </Autocomplete> */}
                          <div
                            className=""
                            onClick={() => {
                              // matrixQuery();
                              removePref(preference);
                            }}
                          >
                            <XMarkIcon className="text-gray-500 mt-6 h-8 w-8 group-hover:text-gray-500" />
                          </div>
                        </div>
                      ))}
                      {inactivePrefs.length > 0 && <Divider />}
                    </>
                  )}
                  <div className="mt-0" color="white">
                    {/* Map through non-active preferences, in this case the preferences that do not exist inside of active preferences */}
                    {inactivePrefs.map((preference, idx) => (
                      <button
                        onClick={() => {
                          setActivePrefs((prev) => [...prev, preference]);
                          setPref({
                            ...pref,
                            [preference]: "",
                          });
                        }}
                        className="text-white rounded-lg bg-indigo-600 cursor-pointer mx-1 py-1 px-2"
                        key={`preferenceOption-${idx}`}
                        color="inherit"
                      >
                        {preference}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default MapTopbar;
