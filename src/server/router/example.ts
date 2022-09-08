import { createRouter } from "./context";
import { z } from "zod";
import { inferMutationOutput } from "@/utils/trpc";
import * as trpc from "@trpc/server";
// import { transformToFeatureCollection } from "@/pages/test-map";

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
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.example.findMany();
    },
  });

export type GetPlaceAsGeoJson = inferMutationOutput<"example.getPlaceAsGeoJson">;
export type GetPlaceOutput = inferMutationOutput<"example.getPlace">;
