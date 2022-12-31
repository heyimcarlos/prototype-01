import { useRouter } from "next/router";
import create from "zustand";

type FiltersState = {
  minPrice: number;
  setMinPrice: (param: number) => void;
  maxPrice: number;
  setMaxPrice: (param: number) => void;
};

export const useFilters = create<FiltersState>((set) => ({
  minPrice: 0,
  setMinPrice: (param) => set((state) => ({ minPrice: param })),
  maxPrice: 30000000,
  setMaxPrice: (param) => set(() => ({ maxPrice: param })),
}));
