"use client";
import CallOut from "./ui/CallOut";
import { useFilters } from "@/hooks/useFilters";
import Selector from "./ui/Selector";

const roomNum = [
  { label: "Any", value: 0 },
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
];

const Rooms = () => {
  const { filters, setFilter } = useFilters();

  const selectionStatusText =
    filters.beds !== 0 && filters.baths !== 0
      ? `${filters.beds} beds & ${filters.baths} baths`
      : filters.beds !== 0
        ? `${filters.beds} beds`
        : filters.baths !== 0
          ? `${filters.baths} baths`
          : undefined;

  return (
    <CallOut
      title="Rooms"
      selectionStatus={selectionStatusText}
      CallOutState={true}
    >
      <div className="flex flex-col gap-y-6">
        <Selector
          label="Bedrooms"
          value={filters.beds}
          options={roomNum}
          onChange={(value) => setFilter({ beds: value })}
        />
        <Selector
          label="Bathrooms"
          value={filters.baths}
          options={roomNum}
          onChange={(value) => setFilter({ baths: value })}
        />
      </div>
    </CallOut>
  );
};

export default Rooms;
