import type { Listing, ListingLocation } from "@prisma/client";
import type { JSONValue } from "superjson/dist/types";
import create from "zustand";

type SectorsState = {
  sectors: {
    name: string;
    bounds: JSONValue;
    listingLocations: (ListingLocation & { listings: Listing[] })[];
    // listings: (Listing & { location: Coordinate })[];
  }[];
  addSector: (sector: {
    name: string;
    bounds: JSONValue;
    listingLocations: (ListingLocation & { listings: Listing[] })[];
  }) => void;
  deleteAllSectors: () => void;
  deleteThisSector: (
    sectors:
      | {
          name: string;
          bounds: JSONValue;
          listings: (ListingLocation & { listings: Listing[] })[];
        }
      | undefined
  ) => void;
};

export const useSectors = create<SectorsState>((set) => ({
  sectors: [],
  addSector: (sector) =>
    set((state) => ({ sectors: [...state.sectors, sector] })),
  deleteAllSectors: () => set(() => ({ sectors: [] })),
  deleteThisSector: (sector) =>
    set((state) => ({
      sectors: state.sectors.filter((sec) => sec.name !== sector?.name),
    })),
}));
