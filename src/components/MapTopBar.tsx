import { Popover, Transition } from "@headlessui/react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import {
  availablePreferences,
  GOOGLE_MAP_LIBRARIES,
  MapProps,
  Preference,
} from "./Map";
import { env } from "../env/client.mjs";
import { Fragment, useEffect, useMemo, useState } from "react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import PreferenceInput from "./PreferenceInput";
import Divider from "./Divider";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const MapTopBar = ({ setPref, pref }: MapProps) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAP_LIBRARIES,
  });

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete>();
  const [activePrefs, setActivePrefs] = useState<
    typeof availablePreferences[number][]
  >([]);

  useEffect(() => {
    const currentPrefKeys = Object.keys(pref) as (keyof typeof pref)[];
    console.log(currentPrefKeys, "currentPrefKeys");
    setActivePrefs(currentPrefKeys);
  }, [pref]);

  const inactivePrefs = useMemo(() => {
    return availablePreferences.filter((pref) => !activePrefs?.includes(pref));
  }, [activePrefs]);

  if (!isLoaded) return <div>Loading...</div>;

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = (name: Preference) => {
    if (autocomplete) {
      const place = autocomplete?.getPlace();
      if (place?.name) {
        setPref({
          ...pref,
          [name]: {
            address: place?.name,
            lat: place?.geometry?.location?.lat(),
            lng: place?.geometry?.location?.lng(),
          },
        });
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
              open ? "text-gray-900" : "text-gray-500",
              "group border p-1 inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            )}
          >
            <span>Preferences</span>
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
                        <div
                          key={`preferenceInput-${idx}`}
                          className="mb-2 flex items-center"
                        >
                          <Autocomplete
                            className="w-full"
                            onLoad={onLoad}
                            onPlaceChanged={() => onPlaceChanged(preference)}
                          >
                            <PreferenceInput
                              name={preference}
                              value={pref[preference]?.address || ""}
                            />
                          </Autocomplete>
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
                  <div className="mt-0">
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
                        className="rounded-full bg-green-400 cursor-pointer mx-1 py-1 px-2"
                        key={`preferenceOption-${idx}`}
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

export default MapTopBar;
