import { createRouter } from "./context";
import { z } from "zod";
import { inferMutationOutput } from "@/utils/trpc";
import * as trpc from "@trpc/server";
import * as turf from "@turf/turf";
import { env } from "@/env/client.mjs";
import { mapPreference } from "@/lib/types/mapPreferences";

const mapboxApiUrl = "https://api.mapbox.com/directions/v5/mapbox";
const PreferenceObjectValidator = z.object({
  value: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  key: z.union([z.literal("work"), z.literal("pharmacy"), z.literal("supermarket")]),
});

const nearbySearchValidator = z.object({
  name: z.string(),
  geometry: z.object({
    location: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
  icon: z.string(),
  vicinity: z.string(),
  opening_hours: z
    .object({
      open_now: z.boolean(),
    })
    .optional(),
  place_id: z.string(),
  types: z.array(z.string()),
  user_ratings_total: z.number().optional(),
  rating: z.number().optional(),
});

const directionsResponseValidator = z.object({
  routes: z.array(
    z.object({
      legs: z.array(z.object({})),
      country_crossed: z.boolean(),
      weight_name: z.string(),
      duration: z.number(),
      distance: z.number(),
      weight: z.number(),
      geometry: z.object({
        coordinates: z.array(z.array(z.number())),
        type: z.string(),
      }),
    })
  ),
  code: z.string(),
  uuid: z.string(),
  waypoints: z.array(
    z.object({ distance: z.number(), name: z.string(), location: z.array(z.number()) })
  ),
});

export const mapRouter = createRouter()
  .mutation("placeAsGeoJson", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ ctx, input }) {
      const place = await ctx.prisma.place.findFirst({
        where: {
          slug: input.slug,
        },
        include: {
          // borderCoords: true,
          listing: true,
        },
      });

      if (!place) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "place-not-found-motherfucker",
        });
      }
    },
  })
  .mutation("place", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ ctx, input }) {
      const place = await ctx.prisma.place.findFirst({
        where: {
          slug: input.slug,
        },
        include: {
          center: true,
          listing: {
            include: {
              location: true,
            },
          },
        },
      });

      if (!place) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "place-not-found-motherfucker",
        });
      }

      return place;
    },
  })
  .mutation("nearby", {
    input: z.object({
      preferences: z.array(mapPreference),
      origin: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
      rankBy: z.union([z.literal("distance"), z.literal("prominence")]),
    }),
    async resolve({ input }) {
      const { preferences, rankBy, origin } = input;

      if (!preferences.length) {
        throw new trpc.TRPCError({
          code: "BAD_REQUEST",
          message: "no-preferences",
        });
      }

      try {
        const nearbyResults = await Promise.all(
          preferences.map(async (preference) => {
            const { key: type, value: keyword } = preference;
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${keyword}&location=${origin.lat},${origin.lng}&rankby=${rankBy}&type=${type}&key=${env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
            const res = await fetch(url);
            const json = await res.json();
            const result = nearbySearchValidator.parse(json.results[0]);

            return {
              ...preference,
              latitude: result.geometry.location.lat,
              longitude: result.geometry.location.lng,
            };
          })
        );

        // make a directions request using with each of the preferences places picked.
        const directionsResults = await Promise.all(
          nearbyResults.map(async (nearbyResult) => {
            const { latitude, longitude } = nearbyResult;
            const url = `${mapboxApiUrl}/driving/${origin.lng},${origin.lat};${longitude},${latitude}?geometries=geojson&access_token=${env.NEXT_PUBLIC_MAPBOX_TOKEN}`;
            const res = await fetch(url);
            const json = await res.json();
            const result = directionsResponseValidator.parse(json);
            return turf.feature(result.routes[0]?.geometry, {
              preference: nearbyResult,
              distance: result.routes[0]?.distance,
            });
          })
        );
        return directionsResults;
      } catch (error) {
        console.log(error);
      }
    },
  })
  .query("matrix", {
    input: z.object({
      origin: z.string(),
      destinations: z.array(PreferenceObjectValidator),
    }),
    async resolve({ input }) {
      // calculate matrix in parallel.
      const matrix = await Promise.all(
        input.destinations.map(async (destination) => {
          const str = `${destination.lng},${destination.lat}`;
          console.log(str);
          const res = await fetch(
            `${mapboxApiUrl}/driving/${input.origin};${destination.lng},${destination.lat}?geometries=geojson&access_token=${env.NEXT_PUBLIC_MAPBOX_TOKEN}`
          );

          const json: {
            routes: {
              country_crossed: boolean;
              weight_name: string;
              weight: number;
              duration: number;
              distance: number;
              legs: { distance: number; name: string; location: number[] }[];
              geometry: turf.Feature<turf.LineString>;
            }[];
            waypoints: { distance: number; name: string; location: number[] }[];
            code: string;
            uuid: string;
          } = await res.json();
          return json;
        })
      );

      if (matrix.length < 1) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "place-not-found-motherfucker",
        });
      }

      const featureList: turf.helpers.Feature<turf.helpers.LineString, turf.helpers.Properties>[] =
        [];

      for (const key in matrix) {
        const route = matrix[key]?.routes[0];
        if (!route) continue;

        const feature: turf.helpers.Feature<turf.helpers.LineString, turf.helpers.Properties> = {
          ...route.geometry,
          properties: {
            duration: matrix[key]?.routes[0]?.duration,
            distance: matrix[key]?.routes[0]?.distance,
          },
        };

        featureList.push(feature);
      }

      return turf.featureCollection(featureList);
    },
  });

export type GetPlaceAsGeoJson = inferMutationOutput<"map.placeAsGeoJson">;
export type GetPlaceOutput = inferMutationOutput<"map.place">;
