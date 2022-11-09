import type { Coordinate, Listing } from "@prisma/client";

import create from "zustand";

type SidebarState = {
  isOpen: boolean;
  listings: (Listing & {
    location: Coordinate;
  })[];
  selectedListing: Listing | null;
  toggle: () => void;
  setListings: (
    listings: (Listing & {
      location: Coordinate;
    })[]
  ) => void;
  setSelectedListing: (
    listing:
      | (Listing & {
          location: Coordinate;
        })
      | null
  ) => void;
};

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: true,
  listings: [],
  selectedListing: null,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setListings: (
    listings: (Listing & {
      location: Coordinate;
    })[]
  ) => set(() => ({ listings })),
  setSelectedListing: (
    listing:
      | (Listing & {
          location: Coordinate;
        })
      | null
  ) => set(() => ({ selectedListing: listing })),
}));
