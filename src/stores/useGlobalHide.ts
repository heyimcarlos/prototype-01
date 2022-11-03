import create from "zustand";

type GlobalHideState = {
  globalHide: boolean;
  setGlobalHideFalse: () => void;
  setGlobalHideTrue: () => void;
};

export const useGlobalHide = create<GlobalHideState>((set) => ({
  globalHide: false,
  setGlobalHideFalse: () => set(() => ({ globalHide: false })),
  setGlobalHideTrue: () => set(() => ({ globalHide: true })),
}));
