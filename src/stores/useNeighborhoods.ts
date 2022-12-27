import type { Listing, ListingLocation } from "@prisma/client";
import type { JSONValue } from "superjson/dist/types";
import create from "zustand";

type NeighborhoodsState = {
  neighborhoods: {
    name: string;
    bounds: JSONValue;
    listingLocations: (ListingLocation & { listings: Listing[] })[];
    // listings: (Listing & { location: Coordinate })[];
  }[];
  addNeighborhood: (neighborhoods: {
    name: string;
    bounds: JSONValue;
    listingLocations: (ListingLocation & { listings: Listing[] })[];
  }) => void;
  deleteAllNeighborhoods: () => void;
  deleteThisNeighborhood: (
    neighborhood:
      | {
          name: string;
          bounds: JSONValue;
          listingLocations: (ListingLocation & { listings: Listing[] })[];
        }
      | undefined
  ) => void;
};

export const useNeighborhoods = create<NeighborhoodsState>((set) => ({
  neighborhoods: [],
  addNeighborhood: (neighborhood) =>
    set((state) => ({ neighborhoods: [...state.neighborhoods, neighborhood] })),
  deleteAllNeighborhoods: () => set(() => ({ neighborhoods: [] })),
  deleteThisNeighborhood: (neighborhood) =>
    set((state) => ({
      neighborhoods: state.neighborhoods.filter(
        (hood) => hood.name !== neighborhood?.name
      ),
    })),
}));
