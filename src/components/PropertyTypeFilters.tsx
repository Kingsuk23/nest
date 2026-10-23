"use client";

import { useFilters } from "@/hooks/useFilters";
import { cn } from "@/utils/cn";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const tabRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [indicator, setIndicator] = useState({
    width: 0,
    left: 0,
  });

  const { filters, setFilter } = useFilters();

  const updateIndicator = useCallback(() => {
    const activeIndex = propertyTypes.findIndex(
      (type) => type.value === (filters.property_type ?? null),
    );

    const activeButton = buttonRefs.current[activeIndex];

    if (!activeButton) return;

    setIndicator({
      width: activeButton.offsetWidth,
      left: activeButton.offsetLeft,
    });
  }, [filters.property_type]);

  useEffect(() => {
    updateIndicator();

    const container = tabRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(updateIndicator);

    resizeObserver.observe(container);

    buttonRefs.current.forEach((button) => {
      if (button) resizeObserver.observe(button);
    });

    window.addEventListener("resize", updateIndicator);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

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
