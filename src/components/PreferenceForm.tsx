import { Autocomplete } from "@react-google-maps/api";
import React, { useMemo, useState } from "react";
import PreferenceInput from "./PreferenceInput";
import _ from "lodash";
import { MapPreferenceKeys, mapPreferenceKeysArray } from "@/lib/types/mapPreferences";
import { z } from "zod";
import { useMapPreferences } from "@/stores/useMapPreferences";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Button from "./Button";
import Divider from "./Divider";

type FormKeysSchema = {
  [key in Exclude<MapPreferenceKeys, "work">]: z.ZodOptional<z.ZodString>;
};

const createObjSchema = () => {
  const obj = {} as FormKeysSchema;

  for (const key of mapPreferenceKeysArray) {
    if (key === "work") continue;
    obj[key] = z.string().optional();
  }
  return obj;
};
const FormSchema = z.object(createObjSchema());
type FormValues = z.infer<typeof FormSchema>;
type FormKeys = keyof FormValues;

const PreferenceForm = () => {
  const inactive = useMapPreferences((state) => state.inactive);
  const active = useMapPreferences((state) => state.active);
  const activatePreference = useMapPreferences((state) => state.activate);
  const deactivatePreference = useMapPreferences((state) => state.deactivate);
  const updatePreference = useMapPreferences((state) => state.update);

  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete>();

  const { register, handleSubmit, watch, unregister } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });
  const formValues = watch();
  console.log("formValues2", formValues);
  const isDisabled = useMemo(() => {
    // is disabled if localstorage state and form state are the same
    const a = active.every((preference) => {
      console.log("preference", preference, "formValues", formValues);
      if (preference.key === "work") return true;
      if (!formValues[preference.key] && !preference.value) return true;
      return formValues[preference.key] === preference.value;
    });
    console.log(a);
    return a;
  }, [formValues, active]);

  const canSubmit = useMemo(() => {
    return active.some((pref) => pref.key !== "work");
  }, [active]);

  const onSubmit = (data: FormValues) => {
    const keys = Object.keys(data) as FormKeys[];

    keys.forEach((key) => {
      const value = data[key];
      if (value) {
        updatePreference({ key, value });
      }
    });
  };

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = (name: MapPreferenceKeys) => {
    if (autocomplete) {
      const place = autocomplete?.getPlace();
      if (place?.name && place.geometry?.location) {
        updatePreference({
          key: name,
          value: place.name,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        });

        setAutocomplete(undefined);
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative grid gap-6 bg-white px-5 py-6 sm:gap-6 sm:p-6"
      >
        {active.length > 0 &&
          active.map((preference, idx) => (
            <div key={`preferenceInput-${idx}`} className="mb-2 flex items-center">
              {preference.key === "work" ? (
                <>
                  <Autocomplete
                    restrictions={{ country: "do" }}
                    className="w-full"
                    onLoad={onLoad}
                    onPlaceChanged={() => onPlaceChanged(preference.key)}
                  >
                    <PreferenceInput name={preference.key} value={preference.value || ""} />
                  </Autocomplete>
                  <div
                    onClick={() => {
                      deactivatePreference(preference);
                    }}
                  >
                    <XMarkIcon className="text-gray-500 mt-6 h-8 w-8 group-hover:text-gray-500" />
                  </div>
                </>
              ) : (
                <div className="w-full">
                  <label
                    htmlFor={preference.key}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {_.capitalize(preference.key)}
                  </label>
                  <div className="mt-1 flex items-center justify-between">
                    <input
                      {...register(preference.key)}
                      name={preference.key}
                      defaultValue={preference.value}
                      type="text"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder={`Enter your ${preference.key} address`}
                    />
                    <XMarkIcon
                      onClick={() => {
                        deactivatePreference(preference);
                        unregister(preference.key as FormKeys);
                      }}
                      className="text-gray-500  h-8 w-8 group-hover:text-gray-500"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}

        {canSubmit && (
          <div className="w-full flex justify-end">
            <Button type="submit" disabled={isDisabled}>
              Save
            </Button>
          </div>
        )}

        {inactive.length > 0 && !!active.length && <Divider />}

        <div className="flex flex-wrap" color="white">
          {/* Map through non-active preferences, in this case the preferences that do not exist inside of active preferences */}
          {inactive.map((preference, idx) => (
            <div key={`preferenceOption-${idx}`} className="m-1">
              <Button
                type="button"
                onClick={() => {
                  activatePreference(preference);
                }}
                color="inherit"
              >
                {preference.key}
              </Button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default PreferenceForm;
