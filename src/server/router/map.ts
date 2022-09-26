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
  opening_hours: z.object({
    open_now: z.boolean(),
  }),
  place_id: z.string(),
  types: z.array(z.string()),
  users_ratings_total: z.number(),
  rating: z.number(),
});

// {
//   "business_status": "OPERATIONAL",
//   "geometry": {
//       "location": {
//           "lat": 18.4570229,
//           "lng": -69.94083909999999
//       },
//       "viewport": {
//           "northeast": {
//               "lat": 18.45841302989272,
//               "lng": -69.93941442010728
//           },
//           "southwest": {
//               "lat": 18.45571337010728,
//               "lng": -69.94211407989272
//           }
//       }
//   },
//   "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
//   "icon_background_color": "#4B96F3",
//   "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shoppingcart_pinlet",
//   "more_opening_hours": [],
//   "name": "Supermercado Dragón de Oro",
//   "opening_hours": {
//       "open_now": true
//   },
//   "photos": [
//       {
//           "height": 4618,
//           "html_attributions": [
//               "<a href=\"https://maps.google.com/maps/contrib/104630441252654644005\">Hector Manuel Garcia Giraldo</a>"
//           ],
//           "photo_reference": "AcYSjRjzde5_5HPFkQb5QzVFNnwNAq2Ahp_9jaikttG5Q0vHX6ul6lWpi-yzoZD6oa4bLFzJbNF8_szU2Xx1ZzBTfbOlndpQQmQaP6SNSojdzugs8f8iwHk3WGw-ly45PQqqZbBExQFydIDQVpMxD1lJSS5ufxSxKx7map4AwxujVzYgq1Dy",
//           "width": 3464
//       }
//   ],
//   "place_id": "ChIJ-aP5GQ9ipY4RXqTQjxB4W5I",
//   "plus_code": {
//       "compound_code": "F345+RM Santo Domingo",
//       "global_code": "77CGF345+RM"
//   },
//   "rating": 4.4,
//   "reference": "ChIJ-aP5GQ9ipY4RXqTQjxB4W5I",
//   "scope": "GOOGLE",
//   "types": [
//       "supermarket",
//       "grocery_or_supermarket",
//       "food",
//       "store",
//       "point_of_interest",
//       "establishment"
//   ],
//   "user_ratings_total": 3594,
//   "vicinity": "Av. Rómulo Betancourt 1351, Santo Domingo"
// },

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
      preferences: z.array(
        z.object({
          lat: z.number(),
          lng: z.number(),
          type: z.string(),
          keyword: z.string(),
        })
      ),
      rankBy: z.union([z.literal("distance"), z.literal("prominence")]),
    }),
    async resolve({ ctx, input }) {
      const { lat, lng, type, rankBy, keyword } = input;

      const nearbySearchUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&type=${type}&rankby=${rankBy}&keyword=${keyword}&key=${env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

      const nearbySearchResponse = await fetch(nearbySearchUrl);
      const nearbySearchData = await nearbySearchResponse.json();
      const validatedResult = nearbySearchValidator.parse(nearbySearchData.results[0]);

      console.log(validatedResult, "validatedResult");
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
