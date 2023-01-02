// import { resizeBase64Image } from "@/lib/resizeBase64Image";
import slugify from "@/lib/slugify";
// import { type RouterOutputs } from "@/utils/trpc";
import {
  Currency,
  ListingType,
  PropertyType,
  // type Prisma,
} from "@prisma/client";
import { z } from "zod";
import {
  // publicProcedure,
  protectedProcedure,
  router,
  mergeRouters,
} from "../trpc";

// @INFO: Things unauthenticated users can query about themselves.
const publicListingRouter = router({});

// @INFO: Things authenticated users can query about themselves.
const loggedInListingRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        bio: z.string(),
        price: z.number(),
        currency: z.nativeEnum(Currency),
        bedrooms: z.number(),
        fullBathrooms: z.number(),
        halfBathrooms: z.number(),
        squareFeet: z.number(),
        listingType: z.nativeEnum(ListingType),
        propertyType: z.nativeEnum(PropertyType),
        neighborhoodSlug: z.string(),
        listingLocation: z.object({
          name: z.string(),
          city: z.string(),
          state: z.string(),
          country: z.string(),
          lat: z.string(),
          lng: z.string(),
          formattedAddress: z.string(),
          googlePlaceId: z.string(),
        }),
        listingDetail: z.object({
          yearBuilt: z.number(),
          yearRemodeled: z.number(),
          lotSquareFeet: z.number(),
          interiorAmenities: z.array(z.string()),
          exteriorAmenities: z.array(z.string()),
          buildingAmenities: z.array(z.string()),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // const data: Prisma.ListingCreateWithoutUserInput = { ...input };
      // 1. validate listing location, if it exists attach the listing to that listing location.
      // 2. if listing location doesn't exist, create a new listing location.
      // bella-vista

      const listing = await ctx.prisma.listing.create({
        data: {
          name: input.name,
          propertyType: input.propertyType,
          currency: input.currency,
          price: input.price,
          squareFeet: input.squareFeet,
          bedrooms: input.bedrooms,
          fullBathrooms: input.fullBathrooms,
          halfBathrooms: input.halfBathrooms,
          bio: input.bio,
          slug: slugify(input.name),
          listingType: input.listingType,
          user: {
            connect: {
              id: ctx.user.id,
            },
          },
          listingDetail: {
            create: {
              ...input.listingDetail,
            },
          },
          listingLocation: {
            connectOrCreate: {
              where: {
                googlePlaceId: input.listingLocation.googlePlaceId,
              },
              create: {
                ...input.listingLocation,
                neighborhood: { connect: { slug: input.neighborhoodSlug } },
              },
            },
          },
        },
      });

      console.log("listing", listing);
      return listing;
    }),
});

export const listingRouter = mergeRouters(
  loggedInListingRouter,
  router({
    public: publicListingRouter,
  })
);

// export type ListingWithDetailsType = RouterOutputs;
