import create from "zustand";

type GlobalShowState = {
  search: boolean;
  setSearchFalse: () => void;
  setSearchTrue: () => void;
  drawDefault: string;
  setDrawDefaultSimple: () => void;
  setDrawDefaultPoly: () => void;
};

export const useDrawControls = create<GlobalShowState>((set) => ({
  search: false,
  setSearchFalse: () => set(() => ({ search: false })),
  setSearchTrue: () => set(() => ({ search: true })),
  drawDefault: "simple_select",
  setDrawDefaultSimple: () => set(() => ({ drawDefault: "simple_select" })),
  setDrawDefaultPoly: () => set(() => ({ drawDefault: "draw_polygon" })),
}));
