"use client";

import { useFilters } from "@/hooks/useFilters";
import { useSlider } from "@/hooks/useSlider";
import { cn } from "@/utils/cn";

type PropertyType =
  | "single family"
  | "multi family"
  | "condo"
  | "townhome"
  | "land"
  | null;

const propertyTypes: {
  label: string;
  value: PropertyType;
}[] = [
  { label: "All Properties", value: null },
  { label: "Condo", value: "condo" },
  { label: "Home-Town", value: "townhome" },
  { label: "Land", value: "land" },
  { label: "Single-family", value: "single family" },
  { label: "Multi-family", value: "multi family" },
];

const PropertyTypeFilters = () => {
  const { filters, setFilter } = useFilters();

  const activeIndex = propertyTypes.findIndex(
    (type) => type.value === (filters.property_type ?? null),
  );
  const { tabRef, buttonRefs, indicator } = useSlider(activeIndex);

  return (
    <div
      ref={tabRef}
      className="relative flex w-full items-center gap-x-2 overflow-x-auto no-scrollbar text-base"
    >
      {propertyTypes.map((type, index) => {
        const isActive = (filters.property_type ?? null) === type.value;

        return (
          <button
            key={type.label}
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            type="button"
            onClick={() => setFilter({ property_type: type.value })}
            aria-pressed={isActive}
            className={cn(
              "relative z-10 shrink-0 cursor-pointer whitespace-nowrap px-4 py-2",
              "text-text-secondary",
              isActive && "text-text-default",
            )}
          >
            {type.label}
          </button>
        );
      })}

      <div
        className="pointer-events-none absolute top-0 bottom-0 left-0 z-0 rounded-full bg-bg-subtle transition-all duration-300 ease-out"
        style={{
          width: indicator.width,
          transform: `translateX(${indicator.left}px)`,
        }}
      />
    </div>
  );
};

export default PropertyTypeFilters;
