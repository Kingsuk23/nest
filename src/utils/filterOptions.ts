import { tourType } from "./filterParsers";
import { statusType } from "./type";

export const priceData = [
  { price: 600000, home: 11 },
  { price: 650000, home: 19 },
  { price: 700000, home: 21 },
  { price: 750000, home: 9 },
  { price: 800000, home: 27 },
  { price: 850000, home: 16 },
  { price: 900000, home: 33 },
  { price: 950000, home: 25 },
  { price: 1000000, home: 41 },

  { price: 1750000, home: 121 },
  { price: 1800000, home: 86 },
  { price: 1850000, home: 132 },
  { price: 1900000, home: 95 },
  { price: 1950000, home: 140 },
  { price: 2000000, home: 112 },

  { price: 2650000, home: 121 },
  { price: 2700000, home: 156 },
  { price: 2750000, home: 127 },
  { price: 2800000, home: 138 },
  { price: 2850000, home: 101 },
  { price: 2900000, home: 142 },
  { price: 2950000, home: 115 },
  { price: 3000000, home: 97 },

  { price: 8000000, home: 123 },
  { price: 8500000, home: 78 },
  { price: 9000000, home: 121 },
  { price: 9500000, home: 200 },
  { price: 10000000, home: 231 },
];

export const MinPriceOptions = [
  { label: "No min", value: "" },
  { label: "$600k", value: "600000" },
  { label: "$1.2M", value: "1200000" },
  { label: "$1.8M", value: "1800000" },
  { label: "$2.4M", value: "2400000" },
];
export const MaxPriceOptions = [
  { label: "No max", value: "" },
  { label: "$600k", value: "600000" },
  { label: "$1.2M", value: "1200000" },
  { label: "$1.8M", value: "1800000" },
  { label: "$2.4M", value: "2400000" },
];

export const status = [
  {
    label: "Any",
    value: statusType.ANY,
  },
  {
    label: "Active",
    value: statusType.ACTIVE,
  },
  {
    label: "Pending",
    value: statusType.PENDING,
  },
];

export const houseTypes: {
  label: string;
  value: "auction" | "existing home" | "foreclosure" | "new construction";
}[] = [
  { label: "Existing homes", value: "existing home" },
  { label: "Foreclosures", value: "foreclosure" },
  { label: "New construction", value: "new construction" },
  { label: "Auction", value: "auction" },
];

export const tourTypes: {
  label: string;
  value: tourType;
}[] = [
  { label: "Open house", value: "open_house" },
  { label: "Virtual tour", value: "virtual_tour" },
  { label: "In person", value: "in_person" },
];

export const minSqftOptions = [
  { label: "No min", value: 0 },
  { label: "500 sqft", value: 500 },
  { label: "750 sqft", value: 750 },
  { label: "1,000 sqft", value: 1000 },
  { label: "1,250 sqft", value: 1250 },
  { label: "1,500 sqft", value: 1500 },
  { label: "1,750 sqft", value: 1750 },
  { label: "2,000 sqft", value: 2000 },
  { label: "2,250 sqft", value: 2250 },
  { label: "2,500 sqft", value: 2500 },
  { label: "2,750 sqft", value: 2750 },
];

export const maxSqftOptions = [
  { label: "No max", value: 0 },
  { label: "2,250 sqft", value: 2250 },
  { label: "2,500 sqft", value: 2500 },
  { label: "2,750 sqft", value: 2750 },
  { label: "3,000 sqft", value: 3000 },
  { label: "3,250 sqft", value: 3250 },
  { label: "3,500 sqft", value: 3500 },
  { label: "3,750 sqft", value: 3750 },
  { label: "5,000 sqft", value: 5000 },
  { label: "7,500 sqft", value: 7500 },
  { label: "10,000 sqft", value: 10000 },
];

export const MinLotSizeOptions = [
  { label: "No min", value: 0 },
  { label: "2,000 sqft", value: 2000 },
  { label: "3,000 sqft", value: 3000 },
  { label: "4,000 sqft", value: 4000 },
  { label: "5,000 sqft", value: 5000 },
  { label: "7,500 sqft", value: 7500 },
  { label: "0.25 acre", value: 10890 },
  { label: "0.50 acre", value: 21780 },
  { label: "1 acre", value: 43560 },
  { label: "2 acres", value: 87120 },
  { label: "5 acres", value: 217800 },
  { label: "10 acres", value: 435600 },
  { label: "15 acres", value: 653400 },
  { label: "20 acres", value: 871200 },
  { label: "50 acres", value: 2178000 },
  { label: "100 acres", value: 4356000 },
];

export const MaxLotSizeOptions = [
  { label: "No max", value: 0 },
  { label: "2,000 sqft", value: 2000 },
  { label: "3,000 sqft", value: 3000 },
  { label: "4,000 sqft", value: 4000 },
  { label: "5,000 sqft", value: 5000 },
  { label: "7,500 sqft", value: 7500 },
  { label: "0.25 acre", value: 0.25 },
  { label: "0.50 acre", value: 21780 },
  { label: "1 acre", value: 43560 },
  { label: "2 acres", value: 87120 },
  { label: "5 acres", value: 217800 },
  { label: "10 acres", value: 435600 },
  { label: "15 acres", value: 653400 },
  { label: "20 acres", value: 871200 },
  { label: "50 acres", value: 2178000 },
  { label: "100 acres", value: 4356000 },
];

export const MinAgeOptions = [
  { label: "No min", value: 0 },
  { label: "1 year", value: 1 },
  { label: "3 years", value: 3 },
  { label: "5 years", value: 5 },
  { label: "10 years", value: 10 },
  { label: "15 years", value: 15 },
  { label: "20 years", value: 20 },
  { label: "25 years", value: 25 },
  { label: "30 years", value: 30 },
  { label: "50 years", value: 50 },
  { label: "75 years", value: 75 },
  { label: "100 years", value: 100 },
];

export const MaxAgeOptions = [
  { label: "No max", value: 0 },
  { label: "1 year", value: 1 },
  { label: "3 years", value: 3 },
  { label: "5 years", value: 5 },
  { label: "10 years", value: 10 },
  { label: "15 years", value: 15 },
  { label: "20 years", value: 20 },
  { label: "25 years", value: 25 },
  { label: "30 years", value: 30 },
  { label: "50 years", value: 50 },
  { label: "75 years", value: 75 },
  { label: "100 years", value: 100 },
];

export const HOAFee = [
  { label: "No max", value: 0 },
  { label: "$50/month", value: 50 },
  { label: "$100/month", value: 100 },
  { label: "$200/month", value: 200 },
  { label: "$300/month", value: 300 },
  { label: "$400/month", value: 400 },
  { label: "$500/month", value: 500 },
  { label: "$750/month", value: 750 },
  { label: "$1,000/month", value: 1000 },
  { label: "$1,500/month", value: 1500 },
  { label: "$2,000/month", value: 2000 },
  { label: "$2,500/month", value: 2500 },
  { label: "$3,000/month", value: 3000 },
];

export const garage = [
  {
    label: "Any",
    value: 0,
  },
  {
    label: "1+",
    value: 1,
  },
  {
    label: "2+",
    value: 2,
  },
  {
    label: "3+",
    value: 3,
  },
];

export const stories = [
  {
    label: "Any",
    value: 0,
  },
  {
    label: "Single",
    value: 1,
  },
  {
    label: "Multiple",
    value: 2,
  },
];

export const keywords = [
  { label: "Accessibility", value: "accessibility" },
  { label: "Basement", value: "basement" },
  { label: "Central Air", value: "central air" },
  { label: "Central Heat", value: "central heat" },
  { label: "Den / Office", value: "den / office" },
  { label: "Dining Room", value: "dining room" },
  { label: "Elevator", value: "elevator" },
  { label: "Energy Efficient", value: "energy efficient" },
  { label: "Family Room", value: "family room" },
  { label: "Fireplace", value: "fireplace" },
  { label: "Forced Air", value: "forced air" },
  { label: "Game Room", value: "game room" },
  { label: "Hardwood Floors", value: "hardwood floors" },
  { label: "In-Home Laundry", value: "in-home laundry" },
  { label: "Carport", value: "carport" },
  { label: "Corner Lot", value: "corner lot" },
  { label: "Cul-de-Sac", value: "cul-de-sac" },
  { label: "Golf Course Lot", value: "golf course lot" },
  { label: "Horse Facility", value: "horse facility" },
  { label: "Pool", value: "pool" },
  { label: "RV / Boat Parking", value: "rv / boat parking" },
  { label: "Spa / Hot Tub", value: "spa / hot tub" },
  { label: "City View", value: "city view" },
  { label: "Golf Course View", value: "golf course view" },
  { label: "Hill / Mtn View", value: "hill / mtn view" },
  { label: "Lake View", value: "lake view" },
  { label: "Ocean View", value: "ocean view" },
  { label: "River View", value: "river view" },
  { label: "Water Front", value: "water front" },
];

export const interiors = [
  { label: "Hardwood Floors", value: "Hardwood Floors" },
  { label: "Granite Counters", value: "Granite Counters" },
  { label: "Walk-In Closet", value: "Walk-In Closet" },
  { label: "Fireplace", value: "Fireplace" },
  { label: "Vaulted Ceilings", value: "Vaulted Ceilings" },
  { label: "Open Floor Plan", value: "Open Floor Plan" },
];

export const exteriors = [
  { label: "Patio", value: "Patio" },
  { label: "Fenced Yard", value: "Fenced Yard" },
  { label: "Deck", value: "Deck" },
  { label: "Covered Porch", value: "Covered Porch" },
  { label: "Sprinkler System", value: "Sprinkler System" },
  { label: "Pool", value: "Pool" },
];

export const views = [
  { label: "City View", value: "City View" },
  { label: "Mountain View", value: "Mountain View" },
  { label: "Water View", value: "Water View" },
  { label: "Garden View", value: "Garden View" },
  { label: "Park View", value: "Park View" },
];
