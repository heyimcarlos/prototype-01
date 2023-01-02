import { Prisma } from "@prisma/client";
import create from "zustand";

const listingWithListingDetail = Prisma.validator<Prisma.ListingArgs>()({
  include: { listingDetail: true },
});

export type ListingWithListingDetail = Prisma.ListingGetPayload<
  typeof listingWithListingDetail
>;

export type SelectedListingState = {
  listing: ListingWithListingDetail | null;
  setListing: (listing: ListingWithListingDetail | null) => void;
  listings: ListingWithListingDetail[];
  setListings: (listings: ListingWithListingDetail[]) => void;
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
