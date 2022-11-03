import create from "zustand";

type ShowCustomSearchState = {
  showCustomSearch: boolean;
  setShowCustomSearchFalse: () => void;
  setShowCustomSearchTrue: () => void;
};

export const useShowCustomSearch = create<ShowCustomSearchState>((set) => ({
  showCustomSearch: false,
  setShowCustomSearchFalse: () => set(() => ({ showCustomSearch: false })),
  setShowCustomSearchTrue: () => set(() => ({ showCustomSearch: true })),
}));
