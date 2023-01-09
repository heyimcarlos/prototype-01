import create from "zustand";
import { type PropertyType, type ListingType } from "@prisma/client";

export type NewListingState = {
  name: string;
  lat: number;
  lng: number;
  fullAddress: string;
  placeId: string;
  sector: string;
  hide: boolean;

  recordName: string;
  price: number;
  bedrooms: number;
  fullBathrooms: number;
  halfBathrooms: number;
  meters: number;
  listingType: ListingType;
  propertyType: PropertyType;
  bio: string;
  selectedBuildingAmenities: string[];
  selectedInteriorAmenities: string[];
  selectedExteriorAmenities: string[];

  condition: string;
  maintenance: number;

  setName: (param: string) => void;
  setLat: (param: number) => void;
  setLng: (param: number) => void;
  setFullAddress: (param: string) => void;
  setPlaceId: (param: string) => void;
  setSector: (param: string) => void;
  setHide: (param: boolean) => void;

  setRecordName: (param: string) => void;
  setPrice: (param: number) => void;
  setBedrooms: (param: number) => void;
  setFullBathrooms: (param: number) => void;
  setHalfBathrooms: (param: number) => void;
  setMeters: (param: number) => void;
  setListingType: (param: ListingType) => void;
  setPropertyType: (param: PropertyType) => void;
  setBio: (param: string) => void;
  setSelectedBuildingAmenities: (param: string[]) => void;
  setSelectedInteriorAmenities: (param: string[]) => void;
  setSelectedExteriorAmenities: (param: string[]) => void;

  setCondition: (param: string) => void;
  setMaintenance: (param: number) => void;

  buildingAmenities: string[];
  setBuildingAmenities: (param: string[]) => void;
  interiorAmenities: string[];
  setInteriorAmenities: (param: string[]) => void;
  exteriorAmenities: string[];
  setExteriorAmenities: (param: string[]) => void;
};

export const useNewListing = create<NewListingState>((set) => ({
  name: "",
  lat: 0,
  lng: 0,
  fullAddress: "",
  placeId: "",
  sector: "",
  hide: false,

  recordName: "",
  price: 0,
  bedrooms: 0,
  fullBathrooms: 0,
  halfBathrooms: 0,
  meters: 0,
  listingType: "Type of listing" as unknown as ListingType,
  propertyType: "Type of property" as unknown as PropertyType,
  bio: "",
  selectedBuildingAmenities: [],
  selectedInteriorAmenities: [],
  selectedExteriorAmenities: [],

  setName: (param) => set(() => ({ name: param })),
  setLat: (param) => set(() => ({ lat: param })),
  setLng: (param) => set(() => ({ lng: param })),
  setFullAddress: (param) => set(() => ({ fullAddress: param })),
  setPlaceId: (param) => set(() => ({ placeId: param })),
  setSector: (param) => set(() => ({ sector: param })),
  setHide: (param) => set(() => ({ hide: param })),

  setRecordName: (param) => set(() => ({ recordName: param })),
  setPrice: (param) => set(() => ({ price: param })),
  setBedrooms: (param) => set(() => ({ bedrooms: param })),
  setFullBathrooms: (param) => set(() => ({ fullBathrooms: param })),
  setHalfBathrooms: (param) => set(() => ({ halfBathrooms: param })),
  setMeters: (param) => set(() => ({ meters: param })),
  setListingType: (param) => set(() => ({ listingType: param })),
  setPropertyType: (param: PropertyType) =>
    set(() => ({ propertyType: param })),
  setBio: (param) => set(() => ({ bio: param })),
  setSelectedBuildingAmenities: (param) =>
    set(() => ({ selectedBuildingAmenities: param })),
  setSelectedInteriorAmenities: (param) =>
    set(() => ({ selectedInteriorAmenities: param })),
  setSelectedExteriorAmenities: (param) =>
    set(() => ({ selectedExteriorAmenities: param })),

  condition: "",
  maintenance: 0,
  setCondition: (param) => set(() => ({ condition: param })),
  setMaintenance: (param) => set(() => ({ maintenance: param })),

  buildingAmenities: [
    "Año de constr. ",
    "Piso ",
    "Parqueos ",
    "Ascensor",
    "Proyecto cerrado",
    "Porton electrico",
    "Planta electrica",
    "Gas Comun",
    "Seguridad 24/7",
    "Camara de seguridad",
    "Sis. contra incendios",
    "Esc. de emergencia",
    "Lobby",
    "Intercom",
    "Terraza",
    "Casa club",
    "Gazebo",
    "Area social",
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
  exteriorAmenities: [
    "Parqueo rotonda",
    "Ventanas rodantes",
    "Jardin",
    "Palmas en la entrada",
  ],
  setExteriorAmenities: (param) => set(() => ({ exteriorAmenities: param })),
}));
