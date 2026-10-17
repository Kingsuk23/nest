import {
  createParser,
  type inferParserType,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

import { SoldStatusType, StatusType } from "./type";
import { createLoader } from "nuqs/server";
import { propertyTypeEnum, tourTypeEnum } from "@/db/schema";

export const sortOptions = ["newest", "price_asc", "price_desc"] as const;
export type Area = { value: number; unit: "sqft" | "acre" };

const currentYear = new Date().getFullYear();

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

export const defaultPropertyFilters = {
  property_type: "",
  sort: "newest",
  page: 1,
  beds: 0,
  baths: 0,
  sold_status: SoldStatusType.SALE,
  status: StatusType.ANY,
  house_type: [] as string[],
  tour_type: [] as string[],
  day_on_platform: "",
  min_sqft: "",
  max_sqft: "",
  min_lot: "",
  max_lot: "",
  min_age: "",
  max_age: "",
  hoa_fee: "",
  garage: 0,
  stories: 0,
  interiors: [] as string[],
  exteriors: [] as string[],
  views: [] as string[],
  keywords: [] as string[],
  min_price: 0,
  max_price: 10000000,
  is_price_drop: false,
};

export const filterParsers = {
  property_type: parseAsStringEnum(propertyTypeEnum.enumValues),
  location: parseAsString.withDefault(""),
  sort: parseAsStringEnum([...sortOptions]).withDefault("newest"),
  page: parseAsInteger.withDefault(1),
  beds: parseAsInteger.withDefault(0),
  baths: parseAsInteger.withDefault(0),
  listing_status: parseAsStringEnum<StatusType>(
    Object.values(StatusType),
  ).withDefault(StatusType.ANY),
  construction_type: parseAsArrayOf(parseAsString).withDefault([]),
  tour_type: parseAsArrayOf(
    parseAsStringEnum(tourTypeEnum.enumValues),
  ).withDefault([]),
  day_on_platform: parseAsInteger.withDefault(0),
  min_sqft: parseAsArea,
  max_sqft: parseAsArea,
  min_lot: parseAsArea,
  max_lot: parseAsArea,
  min_age: parseAsInteger.withDefault(1860),
  max_age: parseAsInteger.withDefault(currentYear),
  hoa_fee: parseAsInteger.withDefault(0),
  garage: parseAsInteger.withDefault(0),
  stories: parseAsInteger.withDefault(0),
  interiors: parseAsArrayOf(parseAsString).withDefault([]),
  exteriors: parseAsArrayOf(parseAsString).withDefault([]),
  views: parseAsArrayOf(parseAsString).withDefault([]),
  min_price: parseAsInteger.withDefault(0),
  max_price: parseAsInteger.withDefault(10000000),
  is_price_drop: parseAsBoolean.withDefault(false),
  limit: parseAsInteger.withDefault(18),
};

export const loadFilters = createLoader(filterParsers);

export type filtersType = inferParserType<typeof filterParsers>;
