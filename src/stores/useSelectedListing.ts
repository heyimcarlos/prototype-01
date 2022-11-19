import type { Listing, ListingLocation } from "@prisma/client";
import create from "zustand";

// export type ListingWithLocation = Listing & {
//   location: Coordinate;
// };

export type SelectedListingState = {
  listing: Listing | null;
  setListing: (listing: Listing | null) => void;
  leftListing: Listing | null;
  setLeftListing: (listing: Listing | null) => void;
};

export const useSelectedListing = create<SelectedListingState>((set) => ({
  listing: null,
  leftListing: null,
  setListing: (param) => set(() => ({ listing: param })),
  setLeftListing: (param) => set(() => ({ leftListing: param })),
}));
