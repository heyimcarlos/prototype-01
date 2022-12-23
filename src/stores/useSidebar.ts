import type { Listing, ListingLocation } from "@prisma/client";

import create from "zustand";

type SidebarState = {
  isOpen: boolean;
  // listings: Listing[];
  listingLocations: (ListingLocation & { listings: Listing[] })[];
  selectedListing: (ListingLocation & { listings: Listing[] })[] | null;
  toggle: () => void;
  // setListings: (listings: Listing[]) => void;
  setListings: (
    listings: (ListingLocation & { listings: Listing[] })[]
  ) => void;
  setSelectedListing: (
    listing: (ListingLocation & { listings: Listing[] })[] | null
  ) => void;
};

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: true,
  listingLocations: [],
  selectedListing: null,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  // setListings: (listings: Listing[]) => set(() => ({ listings })),
  setListings: (
    listingLocations: (ListingLocation & { listings: Listing[] })[]
  ) => set(() => ({ listingLocations })),
  setSelectedListing: (
    listing: (ListingLocation & { listings: Listing[] })[] | null
  ) => set(() => ({ selectedListing: listing })),
}));
