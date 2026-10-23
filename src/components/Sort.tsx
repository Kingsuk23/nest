"use client";

import { useFilters } from "@/hooks/useFilters";
import { cn } from "@/utils/cn";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ArrowDownWideNarrow, ChevronDown } from "lucide-react";
import { useState } from "react";
import Dropdown from "./ui/Dropdown";

type sortOptionType = "newest" | "price_asc" | "price_desc";

const sortOption: { label: string; value: sortOptionType }[] = [
  { label: "Newest to oldest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

const Sort = ({ className }: { className?: string }) => {
  const { setFilter } = useFilters();
  const [sort, setSort] = useState("Newest to oldest");

  return (
    <Dropdown
      triggerLabel={sort}
      contentClassName="w-[var(--radix-dropdown-menu-trigger-width)]"
      rightIcon={<ChevronDown size={20} className="text-text-secondary" />}
      leftIcon={
        <ArrowDownWideNarrow size={20} className="text-text-secondary" />
      }
      className={className}
    >
      <ul className="flex flex-col">
        {sortOption.map(({ label, value }) => (
          <DropdownMenu.Item
            className={cn(
              "p-2 text-base text-text-secondary rounded-md cursor-pointer outline-none hover:bg-bg-minimal",
              sort === label && "bg-bg-subtle text-text-default",
            )}
            key={value}
            onSelect={() => {
              setFilter({ sort: value });
              setSort(label);
            }}
          >
            {label}
          </DropdownMenu.Item>
        ))}
      </ul>
    </Dropdown>
  );
};

export default Sort;
