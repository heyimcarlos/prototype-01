import type { Listing, ListingLocation } from "@prisma/client";
import create from "zustand";

// export type ListingWithLocation = Listing & {
//   location: Coordinate;
// };

export type SelectedListingState = {
  listing: Listing | null;
  setListing: (listing: Listing | null) => void;
  listings: Listing[];
  setListings: (listings: Listing[]) => void;
  neighborhood: string;
  setNeighborhood: (neighborhood: string) => void;
  leftListing: Listing | null;
  setLeftListing: (listing: Listing | null) => void;
};

export const useSelectedListing = create<SelectedListingState>((set) => ({
  listing: null,
  leftListing: null,
  listings: [],
  setListings: (param) => set(() => ({ listings: param })),
  neighborhood: "",
  setNeighborhood: (param) => set(() => ({ neighborhood: param })),
  setListing: (param) => set(() => ({ listing: param })),
  setLeftListing: (param) => set(() => ({ leftListing: param })),
}));
