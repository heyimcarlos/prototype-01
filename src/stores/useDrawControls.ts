import create from "zustand";

type GlobalShowState = {
  redraw: boolean;
  drawDefault: string;
  setRedrawFalse: () => void;
  setRedrawTrue: () => void;
  setDrawDefaultSimple: () => void;
  setDrawDefaultPoly: () => void;
};

export const useDrawControls = create<GlobalShowState>((set) => ({
  redraw: false,
  drawDefault: "simple_select",
  setRedrawFalse: () => set(() => ({ redraw: false })),
  setRedrawTrue: () => set(() => ({ redraw: true })),
  setDrawDefaultSimple: () => set(() => ({ drawDefault: "simple_select" })),
  setDrawDefaultPoly: () => set(() => ({ drawDefault: "draw_polygon" })),
}));
