import {
  constructionTypeEnum,
  listingStatusEnum,
  propertyTypeEnum,
  tourTypeEnum,
} from "@/db/schema";
import { z } from "zod";

export const areaUnits = ["sqft", "acre"] as const;

const textArray = z.array(z.string().trim().min(1)).default([]);

const csv = <T extends z.ZodType>(item: T) =>
  z.preprocess(
    (v) => (typeof v === "string" ? v.split(",").filter(Boolean) : v),
    z.array(item),
  );

const boolQuery = z.enum(["true", "false"]).transform((v) => v === "true");

const isoDate = z.iso.datetime({ offset: true }).transform((s) => new Date(s));

export const propertyAreaSchema = z.object({
  value: z.number().positive(),
  unit: z.enum(areaUnits),
});

export const propertyFilters = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(18),
    sort: z.enum(["newest", "price_asc", "price_desc"]).default("newest"),

    property_type: z.enum(propertyTypeEnum.enumValues).optional(),
    construction_type: z.enum(constructionTypeEnum.enumValues).optional(),
    listing_status: z.enum(listingStatusEnum.enumValues).optional(),
    min_price: z.coerce.number().min(0).optional(),
    max_price: z.coerce.number().min(0).optional(),
    beds: z.coerce.number().int().min(0).optional(),
    baths: z.coerce.number().min(0).optional(),
    garage: z.coerce.number().int().min(0).optional(),
    stories: z.coerce.number().int().min(0).optional(),
    hoa_fee: z.coerce.number().min(0).optional(),
    min_sqft: z.coerce.number().min(0).optional(),
    max_sqft: z.coerce.number().min(0).optional(),
    min_age: z.coerce.number().int().min(0).optional(),
    max_age: z.coerce.number().int().min(0).optional(),
    day_on_platform: z.coerce.number().int().min(1).optional(),

    price: z.number().optional(),
    priceDroppedAt: z.boolean().default(false).optional(),
    hoaFee: z.number().optional(),

    is_price_drop: boolQuery.optional(),
    tour_type: csv(z.enum(tourTypeEnum.enumValues)).optional(),
    interiors: csv(z.string()).optional(),
    exteriors: csv(z.string()).optional(),
    views: csv(z.string()).optional(),
  })
  .refine(
    (q) =>
      q.min_price === undefined ||
      q.max_price === undefined ||
      q.min_price <= q.max_price,
    {
      message: "min_price must be less than or equal to max_price",
      path: ["min_price"],
    },
  );

export type PropertyArea = z.infer<typeof propertyAreaSchema>;
export type PropertyFilterType = z.infer<typeof propertyFilters>;
