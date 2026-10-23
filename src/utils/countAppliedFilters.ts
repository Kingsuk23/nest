import { defaultPropertyFilters, filtersType } from "./filterParsers";

const FILTER_COUNT_EXCLUDED = [
  "sort",
  "page",
  "property_type",
  "location",
] as const;

export const countAppliedFilters = (filters: filtersType) => {
  return Object.entries(filters).filter(([key, value]) => {
    if (
      FILTER_COUNT_EXCLUDED.includes(
        key as (typeof FILTER_COUNT_EXCLUDED)[number],
      )
    ) {
      return false;
    }

    const defaultValue = defaultPropertyFilters[key as keyof filtersType];

    if (Array.isArray(value)) {
      return value.length > 0;
    }

    return value !== defaultValue;
  }).length;
};
