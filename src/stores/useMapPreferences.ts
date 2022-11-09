import {
  type MapPreference,
  type MapPreferenceKeys,
  mapPreferenceKeysArray,
} from "@/lib/types/mapPreferences";
import create from "zustand";
import { persist } from "zustand/middleware";

type MapPreferencesState = {
  active: MapPreference[];
  inactive: MapPreference[];
  activate: (preference: MapPreference) => void;
  deactivate: (preference: MapPreference) => void;
  update: (preference: MapPreference) => void;
};

const initState = (
  preferenceKeysArray: MapPreferenceKeys[]
): MapPreference[] => {
  return preferenceKeysArray.map((key) => ({
    key,
  }));
};

export const useMapPreferences = create<MapPreferencesState>()(
  persist(
    (set) => ({
      active: [],
      inactive: initState(mapPreferenceKeysArray),
      activate: (preference: MapPreference) => {
        set((state) => ({
          active: [...state.active, preference],
          inactive: state.inactive.filter((p) => p.key !== preference.key),
        }));
      },
      deactivate: (preference: MapPreference) => {
        set((state) => ({
          active: state.active.filter((p) => p.key !== preference.key),
          inactive: [
            ...state.inactive,
            {
              ...preference,
              value: "",
              latitude: undefined,
              longitude: undefined,
            },
          ],
        }));
      },
      update: (preference: MapPreference) => {
        set((state) => ({
          active: state.active.map((p) =>
            p.key === preference.key ? preference : p
          ),
          inactive: state.inactive.map((p) =>
            p.key === preference.key ? preference : p
          ),
        }));
      },
    }),
    { name: "map-preferences" }
  )
);
