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
import FlyoutMenu from "./FlyoutMenu";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import Button from "./Button";

type MapTopbarProps = {
  mapRef: RefObject<MapRef>;
  pref: PreferenceObj;
  setPref: React.Dispatch<React.SetStateAction<PreferenceObj>>;
};

type PreferenceKeys = typeof availablePreferences[number];

const MapTopbar = ({ setPref, pref }: MapTopbarProps) => {
  const FormSchema = z.object({
    [availablePreferences[1]]: z.string().optional(),
    [availablePreferences[2]]: z.string().optional(),
  });
  type FormValues = z.infer<typeof FormSchema>;

  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete>();
  const [activePrefs, setActivePrefs] = useState<PreferenceKeys[]>([]);

  const router = useRouter();

  const { register, handleSubmit, watch, unregister, resetField } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    const localStoragePrefKeys = Object.keys(pref) as (keyof typeof pref)[];
    const paramsKeys = Object.keys(router.query) as (keyof typeof pref)[];
    const keys = _.uniq([...localStoragePrefKeys, ...paramsKeys]);
    setActivePrefs(keys);
  }, [pref, router.query]);

  const keys = useMemo(() => {
    const localStoragePrefKeys = Object.keys(pref) as (keyof typeof pref)[];
    const paramsKeys = Object.keys(router.query) as (keyof typeof pref)[];
    const keys = _.uniq([...localStoragePrefKeys, ...paramsKeys]);
    return keys;
  }, [pref, router.query]);

  const isDisabled = useMemo(() => {
    const keys = watch();
    const keysArr = Object.keys(keys) as (keyof typeof keys)[];
    keysArr.forEach((key) => !keys[key] && delete keys[key]);
    console.log(keys, "keys");
    return keys;
  }, [watch]);

  const inactivePrefs = useMemo(() => {
    return availablePreferences.filter((pref) => !keys?.includes(pref));
  }, [keys]);

  const onSubmit = (data: FormValues) => {
    console.log(data);
    router.push({ query: { ...router.query, ...data } });
  };

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = (name: PreferenceKeys) => {
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

  console.log("_.isEqual(router.query, watch()): ", router.query, watch());

  return (
    <FlyoutMenu>
      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative grid gap-6 bg-white px-5 py-6 sm:gap-6 sm:p-6"
        >
          {keys.length > 0 &&
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
                      <PreferenceInput name={preference} value={pref[preference]?.address || ""} />
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
                    <label htmlFor={preference} className="block text-sm font-medium text-gray-700">
                      {_.capitalize(preference)}
                    </label>
                    <div className="mt-1 flex items-center justify-between">
                      <input
                        {...register(preference)}
                        name={preference}
                        defaultValue={router.query[preference]}
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder={`Enter your ${preference} address`}
                      />
                      {keys.length > 0 && (
                        <XMarkIcon
                          onClick={() => {
                            resetField(preference);
                            // removePref(preference);
                            delete router.query[preference];
                            router.push(router);
                            setActivePrefs(activePrefs.filter((pref) => pref !== preference));
                          }}
                          className="text-gray-500  h-8 w-8 group-hover:text-gray-500"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          {activePrefs.length > 1 && (
            <div className="w-full flex justify-end">
              <Button type="submit" disabled={isDisabled}>
                Save
              </Button>
            </div>
          )}
          {inactivePrefs.length > 0 && <Divider />}

          <div className="flex flex-wrap" color="white">
            {/* Map through non-active preferences, in this case the preferences that do not exist inside of active preferences */}
            {inactivePrefs.map((preference, idx) => (
              <div key={`preferenceOption-${idx}`} className="m-1">
                <Button
                  type="button"
                  onClick={(e) => {
                    // e.preventDefault();

                    setActivePrefs((prev) => [...prev, preference]);
                    // if (preference !== "work") {
                    //   router.push({ query: { ...router.query, [preference]: "" } });
                    // }
                    // setPref({
                    //   ...pref,
                    //   [preference]: "",
                    // });
                  }}
                  color="inherit"
                >
                  {preference}
                </Button>
              </div>
            ))}
          </div>
        </form>
      </div>
    </FlyoutMenu>
  );
};

export default MapTopbar;
