import { createRouter } from "./context";
import { z } from "zod";
import { inferMutationOutput } from "@/utils/trpc";
import * as trpc from "@trpc/server";
import { env } from "@/env/client.mjs";

const mapboxApiUrl = "https://api.mapbox.com/directions/v5/mapbox";
const PreferenceObjectValidator = z.object({
  address: z.string(),
  lat: z.number(),
  lng: z.number(),
});

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
      destinations: z.array(z.string()).optional(),
      dest: z.object({
        work: PreferenceObjectValidator.optional(),
        pharmacy: PreferenceObjectValidator.optional(),
        market: PreferenceObjectValidator.optional(),
      }),
    }),
    async resolve({ input }) {
      const destKeys = Object.keys(input.dest) as (keyof typeof input.dest)[];

      if (destKeys.length < 1) {
        throw new trpc.TRPCError({
          code: "BAD_REQUEST",
          message: "destination-not-provided",
        });
      }

      if (!input.origin) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "place-not-found-motherfucker",
        });
      }

      const array: string[] = [];
      destKeys.forEach((key) => {
        const value = input.dest[key];
        if (value) {
          array.push(`${value.lng},${value.lat}`);
        }
      });

      // calculate matrix in parallel.
      const matrix = await Promise.all(
        array.map(async (destination) => {
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
