export enum statusType {
  ANY = "",
  ACTIVE = "active",
  PENDING = "pending",
}

export const propertyTypes = [
  "single family",
  "multi family",
  "condo",
  "townhome",
  "land",
] as const;
export const tourTypes = ["open_house", "virtual_tour", "in_person"] as const;
export const sortOptions = ["newest", "price_asc", "price_desc"] as const;
export const constructionType = [
  "existing home",
  "foreclosure",
  "new construction",
  "auction",
] as const;
