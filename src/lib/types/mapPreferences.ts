import { z } from "zod";

export const mapPreferenceKeys = z.union([
  z.literal("work"),
  z.literal("pharmacy"),
  z.literal("supermarket"),
]);

const mapPreference = z.object({
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  key: mapPreferenceKeys,
  active: z.boolean(),
});

export type MapPreferenceKeys = z.infer<typeof mapPreferenceKeys>;
export type MapPreference = z.infer<typeof mapPreference>;
