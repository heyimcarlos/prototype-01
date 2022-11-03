import create from "zustand";

type GlobalShowState = {
  globalShow: boolean;
  setGlobalShowFalse: () => void;
  setGlobalShowTrue: () => void;
};

export const useGlobalShow = create<GlobalShowState>((set) => ({
  globalShow: false,
  setGlobalShowFalse: () => set(() => ({ globalShow: false })),
  setGlobalShowTrue: () => set(() => ({ globalShow: true })),
}));
