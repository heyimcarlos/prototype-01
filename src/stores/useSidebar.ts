import type { Listing, ListingLocation } from "@prisma/client";

import create from "zustand";
import { type ListingWithListingDetail } from "./useSelectedListing";

type SidebarState = {
  isOpen: boolean;

  listingLocations: (ListingLocation & {
    listings: ListingWithListingDetail[];
  })[];
  selectedListing: (ListingLocation & { listings: Listing[] })[] | null;
  toggle: () => void;
  // setListings: (listings: Listing[]) => void;
  setListings: (
    listings: (ListingLocation & { listings: ListingWithListingDetail[] })[]
  ) => void;
  setSelectedListing: (
    listing:
      | (ListingLocation & { listings: ListingWithListingDetail[] })[]
      | null
  ) => void;
};

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: true,
  listingLocations: [],
  selectedListing: null,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  // setListings: (listings: Listing[]) => set(() => ({ listings })),
  setListings: (
    listingLocations: (ListingLocation & {
      listings: ListingWithListingDetail[];
    })[]
  ) => set(() => ({ listingLocations })),
  setSelectedListing: (
    listing:
      | (ListingLocation & { listings: ListingWithListingDetail[] })[]
      | null
  ) => set(() => ({ selectedListing: listing })),
}));
