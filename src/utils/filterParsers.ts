import {
  createParser,
  type inferParserType,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

import { propertyTypes, statusType, tourTypes, constructionType } from "./type";
import { createLoader } from "nuqs/server";

export const sortOptions = ["newest", "price_asc", "price_desc"] as const;
export type Area = { value: number; unit: "sqft" | "acre" };

export const parseAsArea = createParser<Area>({
  parse: (query) => {
    const match = query.trim().match(/^(\d+(?:\.\d+)?)\s*(sqft|acres?)$/i);
    if (!match) return null; // invalid input is treated as unset
    return {
      value: Number(match[1]),
      unit: match[2].toLowerCase().startsWith("acre") ? "acre" : "sqft",
    };
  },
  serialize: ({ value, unit }) => `${value}${unit}`,
  eq: (a, b) => a.value === b.value && a.unit === b.unit,
});

export const defaultPropertyFilters: filtersType = {
  property_type: null,
  sort: "newest",
  page: 1,
  beds: 0,
  baths: 0,
  listing_status: statusType.ANY,
  construction_type: [],
  tour_type: [],
  day_on_platform: 0,
  min_sqft: 0,
  max_sqft: 0,
  min_lot: 0,
  max_lot: 0,
  min_age: 0,
  max_age: 0,
  hoa_fee: 0,
  garage: 0,
  stories: 0,
  interiors: [],
  exteriors: [],
  views: [],
  min_price: 0,
  max_price: 10000000,
  is_price_drop: false,
};

export const filterParsers = {
  property_type: parseAsStringEnum([...propertyTypes]),
  sort: parseAsStringEnum([...sortOptions]).withDefault("newest"),
  page: parseAsInteger.withDefault(1),
  beds: parseAsInteger.withDefault(0),
  baths: parseAsInteger.withDefault(0),
  listing_status: parseAsStringEnum<statusType>(
    Object.values(statusType),
  ).withDefault(statusType.ANY),
  construction_type: parseAsArrayOf(
    parseAsStringEnum([...constructionType]),
  ).withDefault([]),
  tour_type: parseAsArrayOf(parseAsStringEnum([...tourTypes])).withDefault([]),
  day_on_platform: parseAsInteger.withDefault(0),

  min_sqft: parseAsInteger.withDefault(0),
  max_sqft: parseAsInteger.withDefault(0),
  min_lot: parseAsInteger.withDefault(0),
  max_lot: parseAsInteger.withDefault(0),
  min_age: parseAsInteger.withDefault(0),
  max_age: parseAsInteger.withDefault(0),
  hoa_fee: parseAsInteger.withDefault(0),

  garage: parseAsInteger.withDefault(0),
  stories: parseAsInteger.withDefault(0),
  interiors: parseAsArrayOf(parseAsString).withDefault([]),
  exteriors: parseAsArrayOf(parseAsString).withDefault([]),
  views: parseAsArrayOf(parseAsString).withDefault([]),
  min_price: parseAsInteger.withDefault(0),
  max_price: parseAsInteger.withDefault(10000000),
  is_price_drop: parseAsBoolean.withDefault(false),
};

export const loadFilters = createLoader(filterParsers);

export type filtersType = inferParserType<typeof filterParsers>;

export type tourType = filtersType["tour_type"][number];
