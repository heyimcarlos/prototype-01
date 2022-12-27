import type { Listing } from "@prisma/client";
import create from "zustand";

export type SelectedListingState = {
  listing: Listing | null;
  setListing: (listing: Listing | null) => void;
  listings: Listing[];
  setListings: (listings: Listing[]) => void;
  neighborhood: string;
  setNeighborhood: (neighborhood: string) => void;
  listingAddress: string;
  setListingAddress: (param: string) => void;
  direction: string;
  setDirection: (param: string) => void;
};

export const useSelectedListing = create<SelectedListingState>((set) => ({
  listing: null,
  setListing: (param) => set(() => ({ listing: param })),
  listings: [],
  setListings: (param) => set(() => ({ listings: param })),
  neighborhood: "",
  setNeighborhood: (param) => set(() => ({ neighborhood: param })),
  listingAddress: "",
  setListingAddress: (param) => set(() => ({ listingAddress: param })),
  direction: "",
  setDirection: (param) => set(() => ({ direction: param })),
}));
