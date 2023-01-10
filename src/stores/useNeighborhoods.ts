import { type GetNeighborhoodOutput } from "@/server/trpc/router/map";

import type { Listing, ListingLocation } from "@prisma/client";
import { type Position } from "@turf/turf";
import type { JSONValue } from "superjson/dist/types";
import create from "zustand";

export type CustomNeighborhoodType = {
  name: string;
  bounds: Position[];
  listingLocations: GetNeighborhoodOutput["listingLocations"];
};

type NeighborhoodsState = {
  neighborhoods: CustomNeighborhoodType[];
  addNeighborhood: (neighborhood: CustomNeighborhoodType) => void;
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
