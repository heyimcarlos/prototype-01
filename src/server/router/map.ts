import { createRouter } from "./context";
import { z } from "zod";
import { inferMutationOutput } from "@/utils/trpc";
import * as trpc from "@trpc/server";
import * as turf from "@turf/turf";
import { env } from "@/env/client.mjs";

const mapboxApiUrl = "https://api.mapbox.com/directions/v5/mapbox";
const PreferenceObjectValidator = z.object({
  address: z.string(),
  lat: z.number(),
  lng: z.number(),
  key: z.union([z.literal("work"), z.literal("pharmacy"), z.literal("market")]),
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
