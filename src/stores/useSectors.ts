import { Coordinate, Listing } from "@prisma/client";
import { JSONValue } from "superjson/dist/types";
import create from "zustand";

type SectorsState = {
  sectors: {
    name: string;
    bounds: JSONValue;
    listings: (Listing & { location: Coordinate })[];
  }[];
  addSector: (sector: {
    name: string;
    bounds: JSONValue;
    listings: (Listing & { location: Coordinate })[];
  }) => void;
  deleteAllSectors: () => void;
  deleteThisSector: (
    sectors:
      | {
          name: string;
          bounds: JSONValue;
          listings: (Listing & { location: Coordinate })[];
        }
      | undefined
  ) => void;
};

export const useSectors = create<SectorsState>((set) => ({
  sectors: [],
  addSector: (sector) =>
    set((state) => ({ sectors: [...state.sectors, sector] })),
  deleteAllSectors: () => set(() => ({ sectors: [] })),
  deleteThisSector: (sector) =>
    set((state) => ({
      sectors: state.sectors.filter((sec) => sec !== sector),
    })),
}));
