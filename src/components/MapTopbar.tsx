import React, { Fragment, RefObject, useEffect, useMemo, useRef, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Autocomplete, StandaloneSearchBox } from "@react-google-maps/api";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { DocumentIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";
import PreferenceInput from "@/components/PreferenceInput";
import Divider from "@/components/Divider";
import { availablePreferences, PreferenceKey, PreferenceObj } from "@/pages";
import { MapRef } from "react-map-gl";
import _ from "lodash";
import { useRouter } from "next/router";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
type MapTopbarProps = {
  mapRef: RefObject<MapRef>;
  pref: PreferenceObj;
  setPref: React.Dispatch<React.SetStateAction<PreferenceObj>>;
};

type PreferenceKeys = typeof availablePreferences[number];

const MapTopbar = ({ setPref, pref, mapRef }: MapTopbarProps) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete>();
  const [activePrefs, setActivePrefs] = useState<PreferenceKeys[]>([]);
  const [value, setValue] = useState<{ [key in Exclude<PreferenceKey, "work">]: string }>(
    {} as { [key in Exclude<PreferenceKey, "work">]: string }
  );
  const router = useRouter();
  useEffect(() => {
    const currentPrefKeys = Object.keys(pref) as (keyof typeof pref)[];
    setActivePrefs(currentPrefKeys);
  }, [pref]);

  const inactivePrefs = useMemo(() => {
    return availablePreferences.filter((pref) => !activePrefs?.includes(pref));
  }, [activePrefs]);

  useEffect(() => {
    console.log(router.query);
    if (_.isEmpty(router.query)) return;
    for (const key of Object.keys(router.query) as Exclude<PreferenceKey, "work">[]) {
      setValue((prev) => ({ ...prev, [key]: router.query[key] as string }));
    }
  }, [router.query]);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = (name: PreferenceKeys) => {
    console.log(autocomplete);
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

  const handlePrefChange = (preference: PreferenceKey, e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(preference, e.target.value);
    const resultStr = pref[preference] + e.target.value;
    console.log("resultStr: ", resultStr);
    setPref({ ...pref, [preference]: resultStr });
  };
  console.log(value);
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
                  {activePrefs.length > 0 &&
                    activePrefs.map((preference, idx) => (
                      <div key={`preferenceInput-${idx}`} className="mb-2 flex items-center">
                        {preference === "work" ? (
                          <>
                            <Autocomplete
                              restrictions={{ country: "do" }}
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
                              onClick={() => {
                                removePref(preference);
                              }}
                            >
                              <XMarkIcon className="text-gray-500 mt-6 h-8 w-8 group-hover:text-gray-500" />
                            </div>
                          </>
                        ) : (
                          <div className="w-full">
                            <label
                              htmlFor={preference}
                              className="block text-sm font-medium text-gray-700"
                            >
                              {_.capitalize(preference)}
                            </label>
                            <div className="mt-1 flex items-center justify-between">
                              <input
                                value={value?.[preference] || ""}
                                onChange={(e) => {
                                  setValue({ ...value, [preference]: e.target.value });
                                }}
                                type="text"
                                name={preference}
                                id="email"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder={`Enter your ${preference} address`}
                              />
                              <div className="flex items-center mx-4">
                                {router.query[preference] === value[preference] ? (
                                  <DocumentCheckIcon className="h-6 w-6" />
                                ) : (
                                  <DocumentIcon
                                    onClick={(e) => {
                                      router.query[preference] = value[preference];
                                      router.push(router);
                                    }}
                                    className="h-6 w-6"
                                  />
                                )}
                                <XMarkIcon
                                  onClick={() => {
                                    delete router.query[preference];
                                    router.push(router);
                                    removePref(preference);
                                  }}
                                  className="text-gray-500  h-8 w-8 group-hover:text-gray-500"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  {inactivePrefs.length > 0 && <Divider />}

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
