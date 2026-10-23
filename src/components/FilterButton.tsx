"use client";

import { Fragment, useState } from "react";
import { ListFilter } from "lucide-react";
import dynamic from "next/dynamic";

import { useFilters } from "@/hooks/useFilters";
import { countAppliedFilters } from "@/utils/countAppliedFilters";

const FilterDrawer = dynamic(() => import("./FilterDrawer"), {
  ssr: false,
  loading: () => null,
});

const FilterButton = () => {
  const [open, setOpen] = useState(false);

  const { filters } = useFilters();

  const count = countAppliedFilters(filters);
  return (
    <Fragment>
      <button
        onClick={() => setOpen(true)}
        type="button"
        onMouseEnter={() => import("./FilterDrawer")}
        onFocus={() => import("./FilterDrawer")}
        className="flex items-center gap-2 rounded-md border border-border-mute px-4 py-2 hover:bg-bg-minimal transition-colors cursor-pointer"
      >
        <ListFilter size={20} className="text-text-secondary" />
        <div className="flex gap-x-0.5 items-center">
          <span className="text-base text-text-default">Filter</span>
          {count !== 0 && <span>{`(${count})`}</span>}
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => setOpen(false)}
        />
      )}

      {open && <FilterDrawer open={open} setOpen={setOpen} />}
    </Fragment>
  );
};

export default FilterButton;
