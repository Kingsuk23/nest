"use client";

import { filterParsers } from "@/utils/filterParsers";
import { useQueryStates } from "nuqs";

export const useFilters = () => {
  const [filters, setFilters] = useQueryStates(filterParsers, {
    shallow: false,
    history: "push",
    clearOnDefault: true,
  });

  return {
    filters,
    setFilters,

    setFilter: (values: Parameters<typeof setFilters>[0]) =>
      typeof values === "object" && values !== null && !("page" in values)
        ? setFilters({ ...values, page: 1 })
        : setFilters(values),

    resetFilters: () => setFilters(null),
  };
};
