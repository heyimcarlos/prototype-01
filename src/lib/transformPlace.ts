// import type { GetPlaceOutput } from "@/server/trpc/router/map";
import { type Neighborhood } from "@prisma/client";
import type { Feature, Position, FeatureCollection } from "geojson";
import type { JSONArray } from "superjson/dist/types";

// export const transformPlaceToFeature = (place: GetPlaceOutput) => {
export const transformPlaceToFeature = (place: Neighborhood) => {
  const feature: Feature = {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [place.bounds] as Position[][],
    },
    id: place.id,
    properties: {
      id: place.id,
      neighborhood: place.name,
    },
  };
  return feature;
};

// export const transformPlaceToFeatureCollection = (place: GetPlaceOutput) => {
export const transformPlaceToFeatureCollection = (place: Neighborhood) => {
  const bounds = place.bounds as JSONArray;
  const coordsArr = bounds.map((bound) => bound as Position);

  const featureCollection: FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [coordsArr],
        },
        id: place.id,
        properties: {
          id: place.id,
          neighborhood: place.name,
        },
      },
    ],
  };

  return featureCollection;
};
