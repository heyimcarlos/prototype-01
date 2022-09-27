import { z } from "zod";

export const mapPreferenceKeys = z.union([
  z.literal("work"),
  z.literal("pharmacy"),
  z.literal("supermarket"),
]);

export const mapPreferenceKeysArray = mapPreferenceKeys
  .array()
  .parse(["work", "pharmacy", "supermarket"]);

export const mapPreference = z.object({
  value: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  key: mapPreferenceKeys,
});

export type MapPreferenceKeys = z.infer<typeof mapPreferenceKeys>;
export type MapPreference = z.infer<typeof mapPreference>;
