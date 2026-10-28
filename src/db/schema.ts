import { PropertyArea } from "@/utils/zodTypes";
import { defineRelations, sql } from "drizzle-orm";
import {
  boolean,
  doublePrecision,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/* -------------------------------------------------------------------------- */
/*                                      Enums                                 */
/* -------------------------------------------------------------------------- */

export const listingStatusEnum = pgEnum("listingStatus", ["active", "pending"]);

export const propertyTypeEnum = pgEnum("propertyType", [
  "single family",
  "multi family",
  "condo",
  "townhome",
  "land",
]);

export const constructionTypeEnum = pgEnum("constructionType", [
  "existing home",
  "foreclosure",
  "new construction",
  "auction",
]);

export const tourTypeEnum = pgEnum("tourType", [
  "open_house",
  "virtual_tour",
  "in_person",
]);

export const mediaTypeEnum = pgEnum("mediaType", [
  "image",
  "video",
  "floorplan",
]);

export const featureCategoryEnum = pgEnum("featureCategory", [
  "interior",
  "appliance",
  "exterior",
  "construction",
  "view",
  "parking",
  "utility",
  "community",
  "keyword",
]);

export const eventTypeEnum = pgEnum("event_type", [
  "open_house",
  "virtual_tour",
  "in_person",
]);

export const historyKindEnum = pgEnum("history_kind", [
  "listed",
  "price_change",
  "status_change",
  "sold",
]);

/* -------------------------------------------------------------------------- */
/*                              Reusable columns                              */
/* -------------------------------------------------------------------------- */

const addressColumns = {
  street: varchar("street", { length: 255 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  zipCode: varchar("zipCode", { length: 20 }).notNull(),
  country: varchar("country", { length: 2 }).notNull().default("US"),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
};

const timestampColumns = {
  createdAt: timestamp("createdAt", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
};

/* -------------------------------------------------------------------------- */
/*                                   Table                                    */
/* -------------------------------------------------------------------------- */

export const propertiesTable = pgTable(
  "properties",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    description: text("description").notNull(),
    propertyType: propertyTypeEnum("propertyType").notNull(),
    constructionType: constructionTypeEnum("constructionType").notNull(),

    price: integer("price").notNull(),
    priceDropped: boolean("priceDropped").default(false),
    hoaFee: integer("hoaFee").notNull().default(0),

    bedrooms: integer("bedrooms").notNull(),
    bathrooms: integer("bathrooms").notNull(),
    garage: integer("garage").notNull().default(0),
    stories: integer("stories").notNull().default(1),
    buildYear: integer("buildYear").notNull(),
    area: jsonb("area").$type<PropertyArea>().notNull(),
    lotSize: jsonb("lotSize").$type<PropertyArea>(),

    listingStatus: listingStatusEnum("listingStatus")
      .notNull()
      .default("pending"),
    listedAt: timestamp({ withTimezone: true }).defaultNow().notNull(),

    tourTypes: tourTypeEnum("tourTypes")
      .array()
      .notNull()
      .default(sql`'{}'::tourType[]`),

    ...addressColumns,

    ...timestampColumns,
  },
  (t) => [
    index("properties_price_idx").on(t.price),
    index("properties_listed_at_idx").on(t.listedAt),
    index("properties_build_year_idx").on(t.buildYear),

    index("properties_city_idx").on(t.city),
    index("properties_zip_idx").on(t.zipCode),
  ],
);

export const propertiesMediaTable = pgTable("propertiesMedia", {
  id: uuid("id").primaryKey().defaultRandom(),
  propertyId: uuid("propertyId")
    .notNull()
    .references(() => propertiesTable.id, { onDelete: "cascade" }),

  type: mediaTypeEnum("type").notNull().default("image"),
  url: text("url").notNull(),
  alt: text("alt"),

  position: integer("position").notNull().default(0),
  isCover: boolean("isCover").notNull().default(false),

  ...timestampColumns,
});

export const propertyFeatureTable = pgTable(
  "propertyFeatures",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    propertyId: uuid("propertyId")
      .notNull()
      .references(() => propertiesTable.id, { onDelete: "cascade" }),
    category: featureCategoryEnum("category").notNull(),
    value: text("value").notNull(),

    ...timestampColumns,
  },
  (t) => [
    uniqueIndex("property_features_unique_idx").on(
      t.propertyId,
      t.category,
      t.value,
    ),
    index("property_features_lookup_idx").on(t.category, t.value),
  ],
);

export const propertyDetailTable = pgTable("propertyDetails", {
  propertyId: uuid("id")
    .primaryKey()
    .references(() => propertiesTable.id, { onDelete: "cascade" }),

  carport: boolean("carport"),
  parkingTotal: integer("parkingTotal"),

  cooling: text("cooling"),
  heating: text("heating"),

  entryLevel: integer("entryLevel"),
  roomsTotal: integer("roomsTotal"),
  basement: boolean("basement"),
  petsAllowed: boolean("petsAllowed"),
  petsNotes: text("petsNotes"),

  waterfront: boolean("waterfront"),
  additionalParcels: boolean("additionalParcels"),

  sewer: text("sewer"),
  water: text("water"),

  locationDescription: text("locationDescription"),
  directions: text("directions"),

  apn: text("apn"),
  style: text("style"),
  livingAreaSource: text("livingAreaSource"),

  rawData: jsonb("rawData"),

  ...timestampColumns,
});

export const propertyEventTable = pgTable(
  "propertyEvent",
  {
    id: uuid().primaryKey().defaultRandom(),
    propertyId: uuid()
      .notNull()
      .references(() => propertiesTable.id, { onDelete: "cascade" }),

    type: eventTypeEnum("type").notNull(),
    startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
    endsAt: timestamp("ends_at", { withTimezone: true }).notNull(),
    meetingUrl: text("meeting_url"),
    notes: text("notes"),

    ...timestampColumns,
  },
  (t) => [index("event_property_starts_idx").on(t.propertyId, t.startsAt)],
);

export const propertyHistoryTable = pgTable("propertyHistory", {
  id: uuid().primaryKey().defaultRandom(),
  propertyId: uuid()
    .notNull()
    .references(() => propertiesTable.id, { onDelete: "cascade" }),

  kind: historyKindEnum().notNull(),
  price: integer().notNull(),
  per_sqft: integer().notNull(),

  ...timestampColumns,
});

/* -------------------------------------------------------------------------- */
/*                                Relation                                    */
/* -------------------------------------------------------------------------- */

export const relations = defineRelations(
  {
    propertiesTable,
    propertiesMediaTable,
    propertyFeatureTable,
    propertyDetailTable,
    propertyEventTable,
    propertyHistoryTable,
  },
  (r) => ({
    propertiesTable: {
      media: r.many.propertiesMediaTable(),
      event: r.many.propertyEventTable(),
      history: r.many.propertyHistoryTable(),
      detail: r.one.propertyDetailTable({
        from: r.propertiesTable.id,
        to: r.propertyDetailTable.propertyId,
      }),
      feature: r.many.propertyFeatureTable(),
    },

    propertiesMediaTable: {
      property: r.one.propertiesTable({
        from: r.propertiesMediaTable.propertyId,
        to: r.propertiesTable.id,
      }),
    },

    propertyFeatureTable: {
      property: r.one.propertiesTable({
        from: r.propertyFeatureTable.propertyId,
        to: r.propertiesTable.id,
      }),
    },

    propertyEventTable: {
      property: r.one.propertiesTable({
        from: r.propertyEventTable.propertyId,
        to: r.propertiesTable.id,
      }),
    },

    propertyHistoryTable: {
      property: r.one.propertiesTable({
        from: r.propertyHistoryTable.propertyId,
        to: r.propertiesTable.id,
      }),
    },

    propertyDetailTable: {
      property: r.one.propertiesTable({
        from: r.propertyDetailTable.propertyId,
        to: r.propertiesTable.id,
      }),
    },
  }),
);
