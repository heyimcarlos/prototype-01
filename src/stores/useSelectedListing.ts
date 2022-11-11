import type { Coordinate, Listing } from "@prisma/client";
import create from "zustand";

export type ListingWithLocation = Listing & {
  location: Coordinate;
};

export type SelectedListingState = {
  listing: ListingWithLocation | null;
  setListing: (listing: ListingWithLocation) => void;
  leftListing: ListingWithLocation | null;
  setLeftListing: (listing: ListingWithLocation) => void;
};

export const useSelectedListing = create<SelectedListingState>((set) => ({
  listing: null,
  leftListing: null,
  setListing: (param) => set(() => ({ listing: param })),
  setLeftListing: (param) => set(() => ({ leftListing: param })),
}));
