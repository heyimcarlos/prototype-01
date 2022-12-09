import create from "zustand";

export type NewListingState = {
  placeId: string;
  name: string;
  lat: number;
  lng: number;
  hide: boolean;
  sector: string;
  buildingAmenities: string[];
  setBuildingAmenities: (param: string[]) => void;
  selectedBuildingAmenities: string[];
  setSelectedBuildingAmenities: (param: string[]) => void;
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
  buildingAmenities: [
    "Año de construcción ",
    "Parqueos ",
    "Ascensor",
    "Proyecto cerrado",
    "Porton Electrico",
    "Planta Electrica",
    "Gas Comun",
    "Seguridad 24/7",
    "Camara de seguridad",
    "Sistema contra incendios",
    "Escaleras de emergencia",
    "Lobby",
    "Intercom",
    "Terraza",
    "Casa club",
    "Gazebo",
    "Area Social",
    "Salon de eventos",
    "Area infantil",
    "Patio",
    "Piscina",
    "Jacuzzi",
    "Gimnasio",
    "Sauna",
    "BBQ",
    "Cisterna",
    "Tinaco",
    "Airbnb friendly",
  ],
  setBuildingAmenities: (param) => set(() => ({ buildingAmenities: param })),
  selectedBuildingAmenities: [],
  setSelectedBuildingAmenities: (param) =>
    set(() => ({ selectedBuildingAmenities: param })),
  setPlaceId: (param) => set(() => ({ placeId: param })),
  setName: (param) => set(() => ({ name: param })),
  setLat: (param) => set(() => ({ lat: param })),
  setLng: (param) => set(() => ({ lng: param })),
  setHide: (param) => set(() => ({ hide: param })),
  setSector: (param) => set(() => ({ sector: param })),
}));
