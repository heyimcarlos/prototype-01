import { Coordinate, Listing } from "@prisma/client";
import create from "zustand";

type SelectedListingState = {
  listing:
    | (Listing & {
        location: Coordinate;
      })
    | string;
  setListing: (
    listing: Listing & {
      location: Coordinate;
    }
  ) => void;
  leftListing:
    | (Listing & {
        location: Coordinate;
      })
    | string;
  setLeftListing: (
    listing: Listing & {
      location: Coordinate;
    }
  ) => void;
};

export const useSelectedListing = create<SelectedListingState>((set) => ({
  listing: "",
  leftListing: "",
  setListing: (param) => set(() => ({ listing: param })),
  setLeftListing: (param) => set(() => ({ leftListing: param })),
}));
