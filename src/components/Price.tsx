"use client";

import { useFilters } from "@/hooks/useFilters";
import InputOptions from "./ui/InputOptions";
import {
  MaxPriceOptions,
  MinPriceOptions,
  priceData,
} from "@/utils/filterOptions";
import PriceSlider from "./PriceSlider";
import PriceHistogram from "./PriceHistogram";
import { formatPrice } from "@/utils/libs";
import PriceDropCheckbox from "./PriceDropCheckbox";
import CallOut from "./ui/CallOut";

const Price = () => {
  const { filters, setFilter } = useFilters();

  const handlePriceValues = (value: number | number[]) => {
    if (!Array.isArray(value)) return;

    const [min, max] = value;

    setFilter({
      min_price: min,
      max_price: max,
    });
  };

  const handlePriceDrop = (checked: boolean) => {
    setFilter({
      is_price_drop: checked,
    });
  };

  const filterData = () => {
    return priceData.map((d) => ({
      ...d,
      active: d.price >= filters.min_price && d.price <= filters.max_price,
    }));
  };

  const priceSelection =
    filters.min_price !== 0 && filters.max_price !== 10000000
      ? `$${formatPrice(filters.min_price)} - $${formatPrice(filters.max_price)}`
      : filters.min_price !== 0
        ? `$${formatPrice(filters.min_price)}+`
        : filters.max_price !== 10000000
          ? `Up to $${formatPrice(filters.max_price)}`
          : undefined;

  const selectionStatus =
    [priceSelection, filters.is_price_drop ? "Price dropped" : undefined]
      .filter(Boolean)
      .join(" , ") || undefined;

  return (
    <CallOut
      title="Price"
      CallOutState={true}
      selectionStatus={selectionStatus}
    >
      <PriceHistogram data={filterData()} />
      <PriceSlider
        minPrice={filters.min_price}
        maxPrice={filters.max_price}
        onChange={handlePriceValues}
      />
      <div className="flex gap-3 items-center mt-2">
        <InputOptions
          data={MinPriceOptions}
          ignoreValue={0}
          placeholder="No min"
          queryKey="min_price"
          setValue={setFilter}
          type="tel"
          value={filters.min_price}
          symbol="$"
        />
        <InputOptions
          data={MaxPriceOptions}
          ignoreValue={10000000}
          placeholder="No max"
          queryKey="max_price"
          setValue={setFilter}
          type="tel"
          value={filters.max_price}
          symbol="$"
        />
      </div>

      <p className="mt-4 text-base font-bold text-neutral-900">
        More price options
      </p>
      <PriceDropCheckbox
        checked={filters.is_price_drop}
        onChange={handlePriceDrop}
      />
    </CallOut>
  );
};

export default Price;
