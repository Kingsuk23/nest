import db from "@/db";
import { propertiesTable } from "@/db/schema";
import { filtersType } from "@/utils/filterParsers";
import { sql } from "drizzle-orm";
import z from "zod";

type Category = "interior" | "exterior" | "view";
type Table = typeof propertiesTable;

const PAGE_SIZE = 18;
const SQFT_PER_ACRE = 43_560;

export const year = new Date().getFullYear();

const sortMap = {
  newest: { listedAt: "desc", id: "asc" },
  price_asc: { price: "asc", id: "asc" },
  price_desc: { price: "desc", id: "asc" },
} as const;

const featureFilters = (
  category: Category,
  values: string[],
  mode: "all" | "any" = "all",
) => {
  if (!values.length) return [];
  if (mode === "any") return [{ feature: { category, value: { in: values } } }];
  return values.map((value) => ({ feature: { category, value } }));
};

const range = (min?: number | null, max?: number | null) =>
  min == null && max == null
    ? undefined
    : {
        ...(min != null && { gte: min }),
        ...(max != null && { lte: max }),
      };

const areaSqft = (t: Table) => sql`(
  case when ${t.area}->>'unit' = 'acre'
    then (${t.area}->>'value')::numeric * ${SQFT_PER_ACRE}
    else (${t.area}->>'value')::numeric
  end
)`;

const idSchema = z.uuid();

export const getListings = async (location: string, filters: filtersType) => {
  const term = location.trim();

  const areaConditions = [
    filters.min_sqft > 0 && {
      RAW: (t: Table) => sql`${areaSqft(t)} >= ${filters.min_sqft}`,
    },
    filters.max_sqft > 0 && {
      RAW: (t: Table) => sql`${areaSqft(t)} <= ${filters.max_sqft}`,
    },

    filters.min_lot > 0 && {
      RAW: (t: Table) => sql`${areaSqft(t)} >= ${filters.min_lot}`,
    },
    filters.max_lot > 0 && {
      RAW: (t: Table) => sql`${areaSqft(t)} <= ${filters.max_lot}`,
    },
  ].filter(Boolean) as { RAW: (t: Table) => ReturnType<typeof sql> }[];

  const timeConditions =
    filters.day_on_platform > 0
      ? [
          {
            RAW: (t: Table) =>
              sql`${t.listedAt} >= now() - ${filters.day_on_platform}::int * interval '1 day'`,
          },
        ]
      : [];

  const andConditions = [
    ...featureFilters("interior", filters.interiors),
    ...featureFilters("exterior", filters.exteriors),
    ...featureFilters("view", filters.views),
    ...areaConditions,
    ...timeConditions,
  ];

  const where = {
    propertyType: filters.property_type ?? undefined,
    listingStatus: filters.listing_status ? filters.listing_status : undefined,

    price: range(filters.min_price, filters.max_price),
    buildYear: range(
      filters.max_age > 0 ? year - filters.max_age : null,
      filters.min_age > 0 ? year - filters.min_age : null,
    ),
    bedrooms: filters.beds ? { gte: filters.beds } : undefined,
    bathrooms: filters.baths ? { gte: filters.baths } : undefined,
    garage: filters.garage ? { gte: filters.garage } : undefined,
    stories: filters.stories ? { gte: filters.stories } : undefined,
    hoaFee: filters.hoa_fee ? { lte: filters.hoa_fee } : undefined,

    tourTypes: filters.tour_type.length
      ? { arrayOverlaps: filters.tour_type }
      : undefined,

    constructionType: filters.construction_type.length
      ? { in: filters.construction_type }
      : undefined,

    priceDropped: filters.is_price_drop,

    AND: andConditions.length ? andConditions : undefined,

    OR: term
      ? [
          { city: { ilike: `%${term}%` } },
          { country: { ilike: `%${term}%` } },
          { RAW: (t: Table) => sql`${t.state}::text ilike ${`%${term}%`}` },
          { RAW: (t: Table) => sql`${t.zipCode}::text ilike ${`%${term}%`}` },
        ]
      : undefined,
  };

  const rows = await db.query.propertiesTable.findMany({
    where,
    orderBy: sortMap[filters.sort],
    limit: PAGE_SIZE,
    offset: (Math.max(1, filters.page) - 1) * PAGE_SIZE,
    with: {
      media: {
        where: { type: "image" },
        orderBy: { isCover: "desc", position: "asc" },
        limit: 1,
        columns: { url: true, alt: true },
      },
    },
    columns: {
      id: true,
      area: true,
      bathrooms: true,
      bedrooms: true,
      city: true,
      zipCode: true,
      street: true,
      country: true,
      price: true,
    },
    extras: {
      total: sql<number>`count(*) over()`.mapWith(Number),
    },
  });

  const total = rows[0]?.total ?? 0;

  return {
    data: rows,
    meta: {
      page: filters.page,
      limit: PAGE_SIZE,
      total,
      totalPages: Math.ceil(total / PAGE_SIZE),
    },
  };
};

export const getListingById = async (id: string) => {
  if (!idSchema.safeParse(id).success) return null;

  const property = await db.query.propertiesTable.findFirst({
    where: { id },
    with: {
      detail: true,
      feature: true,
      event: true,
      history: true,
      media: {
        orderBy: { isCover: "desc", position: "asc" },
      },
    },
  });

  return property ?? null;
};
