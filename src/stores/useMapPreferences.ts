import { MapPreference } from "@/lib/types/mapPreferences";
import create from "zustand";

type MapPreferencesState = {
  mapPreferences: MapPreference[];
  // on: MapPreference[];
  // off: MapPreference[];
};

export const useMapPreferences = create<MapPreferencesState>((set, get) => ({}));
