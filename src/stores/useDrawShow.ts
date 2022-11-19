import create from "zustand";

type DrawShowState = {
  drawShow: boolean;
  setDrawShowFalse: () => void;
  setDrawShowTrue: () => void;
};

export const useDrawShow = create<DrawShowState>((set) => ({
  drawShow: false,
  setDrawShowFalse: () => set(() => ({ drawShow: false })),
  setDrawShowTrue: () => set(() => ({ drawShow: true })),
}));
