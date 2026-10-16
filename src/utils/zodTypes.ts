import { z } from "zod";

export const areaUnits = ["sqft", "acre"] as const;

export const propertyAreaSchema = z.object({
  value: z.number().positive(),
  unit: z.enum(areaUnits),
});

export type PropertyArea = z.infer<typeof propertyAreaSchema>;
