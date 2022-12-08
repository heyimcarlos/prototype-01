import create from "zustand";

export type NewListingState = {
  placeId: string;
  name: string;
  lat: number;
  lng: number;
  hide: boolean;
  sector: string;
  setPlaceId: (param: string) => void;
  setName: (param: string) => void;
  setLat: (param: number) => void;
  setLng: (param: number) => void;
  setHide: (param: boolean) => void;
  setSector: (param: string) => void;
};

export const useNewListing = create<NewListingState>((set) => ({
  placeId: "",
  name: "",
  lat: 0,
  lng: 0,
  hide: false,
  sector: "",
  setPlaceId: (param) => set(() => ({ placeId: param })),
  setName: (param) => set(() => ({ name: param })),
  setLat: (param) => set(() => ({ lat: param })),
  setLng: (param) => set(() => ({ lng: param })),
  setHide: (param) => set(() => ({ hide: param })),
  setSector: (param) => set(() => ({ sector: param })),
}));
