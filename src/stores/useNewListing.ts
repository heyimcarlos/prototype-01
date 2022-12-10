import create from "zustand";

export type NewListingState = {
  placeId: string;
  setPlaceId: (param: string) => void;
  fullAddress: string;
  setFullAddress: (param: string) => void;
  name: string;
  setName: (param: string) => void;
  lat: number;
  setLat: (param: number) => void;
  lng: number;
  setLng: (param: number) => void;
  hide: boolean;
  setHide: (param: boolean) => void;
  sector: string;
  setSector: (param: string) => void;
  recordName: string;
  setRecordName: (param: string) => void;
  propertyType: string;
  setPropertyType: (param: string) => void;
  condition: string;
  setCondition: (param: string) => void;
  bedrooms: number;
  setBedrooms: (param: number) => void;
  fullBathrooms: number;
  setFullBathrooms: (param: number) => void;
  halfBathrooms: number;
  setHalfBathrooms: (param: number) => void;
  meters: number;
  setMeters: (param: number) => void;
  maintenance: number;
  setMaintenance: (param: number) => void;
  price: number;
  setPrice: (param: number) => void;
  buildingAmenities: string[];
  setBuildingAmenities: (param: string[]) => void;
  selectedBuildingAmenities: string[];
  setSelectedBuildingAmenities: (param: string[]) => void;
  interiorAmenities: string[];
  setInteriorAmenities: (param: string[]) => void;
  selectedInteriorAmenities: string[];
  setSelectedInteriorAmenities: (param: string[]) => void;
  exteriorAmenities: string[];
  setExteriorAmenities: (param: string[]) => void;
  selectedExteriorAmenities: string[];
  setSelectedExteriorAmenities: (param: string[]) => void;
};

export const useNewListing = create<NewListingState>((set) => ({
  placeId: "",
  setPlaceId: (param) => set(() => ({ placeId: param })),
  fullAddress: "",
  setFullAddress: (param) => set(() => ({ fullAddress: param })),
  name: "",
  setName: (param) => set(() => ({ name: param })),
  lat: 0,
  setLat: (param) => set(() => ({ lat: param })),
  lng: 0,
  setLng: (param) => set(() => ({ lng: param })),
  hide: false,
  setHide: (param) => set(() => ({ hide: param })),
  sector: "",
  setSector: (param) => set(() => ({ sector: param })),
  recordName: "",
  setRecordName: (param) => set(() => ({ recordName: param })),
  propertyType: "",
  setPropertyType: (param) => set(() => ({ propertyType: param })),
  condition: "",
  setCondition: (param) => set(() => ({ condition: param })),
  bedrooms: 0,
  setBedrooms: (param) => set(() => ({ bedrooms: param })),
  fullBathrooms: 0,
  setFullBathrooms: (param) => set(() => ({ fullBathrooms: param })),
  halfBathrooms: 0,
  setHalfBathrooms: (param) => set(() => ({ halfBathrooms: param })),
  meters: 0,
  setMeters: (param) => set(() => ({ meters: param })),
  maintenance: 0,
  setMaintenance: (param) => set(() => ({ maintenance: param })),
  price: 0,
  setPrice: (param) => set(() => ({ price: param })),
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
  interiorAmenities: [
    "Linea blanca",
    "Calentador",
    "Balcon",
    "Area de lavado",
    "Cuarto de servicio con baño",
    "A/C",
    "Desayunador",
    "Vestidor",
    "Sala",
    "Comedor",
  ],
  setInteriorAmenities: (param) => set(() => ({ interiorAmenities: param })),
  selectedInteriorAmenities: [],
  setSelectedInteriorAmenities: (param) =>
    set(() => ({ selectedInteriorAmenities: param })),
  exteriorAmenities: [
    "Parqueo rotonda",
    "Ventanas rodantes",
    "Jardin",
    "Palmas en la entrada",
  ],
  setExteriorAmenities: (param) => set(() => ({ exteriorAmenities: param })),
  selectedExteriorAmenities: [],
  setSelectedExteriorAmenities: (param) =>
    set(() => ({ selectedExteriorAmenities: param })),
}));
