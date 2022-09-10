import { createRouter } from "./context";
import { z } from "zod";
import { inferMutationOutput } from "@/utils/trpc";
import * as trpc from "@trpc/server";
import { env } from "@/env/client.mjs";
// import { transformToFeatureCollection } from "@/pages/test-map";

const mapboxApiUrl = "https://api.mapbox.com/directions/v5/mapbox";

export const exampleRouter = createRouter()
  .mutation("getPlaceAsGeoJson", {
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

      // console.log("listings", place.listing);
      // const geojsonPlace = transformToFeatureCollection(place);

      // return geojsonPlace;
    },
  })
  .mutation("getPlace", {
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
  .query("initial", {
    async resolve({ ctx }) {
      return await ctx.prisma.place.findMany({
        include: {
          center: true,
          listing: {
            include: {
              location: true,
            },
          },
        },
      });
    },
  })
  .query("matrix", {
    input: z.object({
      origin: z.string(),
      destinations: z.array(z.string()),
    }),
    async resolve({ ctx, input }) {
      console.log("input", input);
      // build the matrix. done.
      if (!input.origin || input.destinations.length <= 0) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "place-not-found-motherfucker",
        });
      }

      // calculate matrix in parallel.
      const matrix = await Promise.all(
        input.destinations.map(async (destination) => {
          const res = await fetch(
            `${mapboxApiUrl}/driving/${input.origin};${destination}?geometries=geojson&access_token=${env.NEXT_PUBLIC_MAPBOX_TOKEN}`
          );

          const json = await res.json();
          return json;
        })
      );
      return matrix;
    },
  });

export type GetPlaceAsGeoJson = inferMutationOutput<"example.getPlaceAsGeoJson">;
export type GetPlaceOutput = inferMutationOutput<"example.getPlace">;
