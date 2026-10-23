"use client";

import { X } from "lucide-react";

import CallOut from "./ui/CallOut";
import { cn } from "@/utils/cn";

import { useFilters } from "@/hooks/useFilters";
import { houseTypes, status, tourTypes } from "@/utils/filterOptions";
import { statusType } from "@/utils/type";
import FilterOptionGroup from "./common/FilterOptionGroup";
import DayOnPlatformSelect from "./DayOnPlatformSelect";

const ListingDetails = () => {
  const { filters, setFilter } = useFilters();

  const selectedHouseTypes = houseTypes
    .filter((type) => filters.construction_type.includes(type.value))
    .map((type) => type.label);

  const selectedTourTypes = tourTypes
    .filter((type) => filters.tour_type.includes(type.value))
    .map((type) => type.label);

  const selectedStatus = status.find(
    (item) => item.value === filters.listing_status,
  )?.label;

  const selectionParts: string[] = [];

  if (filters.listing_status !== statusType.ANY && selectedStatus) {
    selectionParts.push(selectedStatus);
  }

  if (selectedHouseTypes.length > 0) {
    selectionParts.push(selectedHouseTypes.join(", "));
  }

  if (selectedTourTypes.length > 0) {
    selectionParts.push(selectedTourTypes.join(", "));
  }

  const selectionStatusText =
    selectionParts.length > 0 ? selectionParts.join(" • ") : undefined;

  return (
    <CallOut
      title="Listing details"
      CallOutState={true}
      selectionStatus={selectionStatusText}
    >
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <h3 className="text-lg font-semibold text-text-default">Status</h3>

          <div className="flex gap-x-2">
            {status.map(({ value, label }) => (
              <button
                type="button"
                className={cn(
                  "px-3 py-2 border border-border-mute rounded-md text-base cursor-pointer flex gap-x-1 items-center",
                  filters.listing_status === value &&
                    "bg-bg-subtle border-black/50",
                )}
                key={value}
                onClick={() => setFilter({ listing_status: value })}
              >
                {label}

                <X
                  size={20}
                  className={
                    filters.listing_status !== "" &&
                    filters.listing_status === value
                      ? "block"
                      : "hidden"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    setFilter({ listing_status: statusType.ANY });
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <h3 className="text-lg font-semibold text-text-default">Type</h3>

          <FilterOptionGroup
            options={houseTypes}
            selectedValues={filters.construction_type}
            onChange={(value) => {
              setFilter({
                construction_type: value,
              });
            }}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <h3 className="text-lg font-semibold text-text-default">
            Open houses & tours
          </h3>

          <FilterOptionGroup
            onChange={(value) => {
              setFilter({ tour_type: value });
            }}
            options={tourTypes}
            selectedValues={filters.tour_type}
          />
        </div>

        <DayOnPlatformSelect
          value={filters.day_on_platform}
          onChange={(value) => {
            setFilter({ day_on_platform: value });
          }}
        />
      </div>
    </CallOut>
  );
};

export default ListingDetails;
