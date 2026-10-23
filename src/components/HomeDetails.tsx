"use client";
import CallOut from "./ui/CallOut";
import { useFilters } from "@/hooks/useFilters";
import {
  garage,
  HOAFee,
  MaxAgeOptions,
  MaxLotSizeOptions,
  maxSqftOptions,
  MinAgeOptions,
  MinLotSizeOptions,
  minSqftOptions,
  stories,
} from "@/utils/filterOptions";
import FilterRange from "./common/FilterRange";
import Select from "./ui/Select";
import Selector from "./ui/Selector";

const HomeDetails = () => {
  const { filters, setFilter } = useFilters();

  return (
    <CallOut title="Home details" CallOutState={true}>
      <div className="flex flex-col gap-y-4">
        <FilterRange
          label="Square feet"
          minLabel="Min sqft"
          maxLabel="Max sqft"
          minOptions={minSqftOptions}
          maxOptions={maxSqftOptions}
          minValue={filters.min_sqft}
          maxValue={filters.max_sqft}
          onMinChange={(value) => setFilter({ min_sqft: value })}
          onMaxChange={(value) => setFilter({ max_sqft: value })}
          className="mt-2"
        />
        <FilterRange
          label="Lot size"
          minLabel="Min lot"
          maxLabel="Max lot"
          minOptions={MinLotSizeOptions}
          maxOptions={MaxLotSizeOptions}
          minValue={filters.min_lot}
          maxValue={filters.max_lot}
          onMinChange={(value) => setFilter({ min_lot: value })}
          onMaxChange={(value) => setFilter({ max_lot: value })}
        />
        <FilterRange
          label="Home age"
          minLabel="Min home age"
          maxLabel="Max home age"
          minOptions={MinAgeOptions}
          maxOptions={MaxAgeOptions}
          minValue={filters.min_age}
          maxValue={filters.max_age}
          onMinChange={(value) => setFilter({ min_age: value })}
          onMaxChange={(value) => setFilter({ max_age: value })}
        />

        <div className="flex gap-y-1 flex-col">
          <span>Max HOA fees per month</span>
          <Select
            label="Max HOA fees per month"
            value={filters.hoa_fee}
            options={HOAFee}
            onChange={(value) => {
              setFilter({ hoa_fee: value });
            }}
          />
        </div>

        <Selector
          label="Garage"
          value={filters.garage}
          options={garage}
          onChange={(value) => setFilter({ garage: value })}
        />
        <Selector
          label="Stories"
          value={filters.stories}
          options={stories}
          onChange={(value) => setFilter({ stories: value })}
        />
      </div>
    </CallOut>
  );
};

export default HomeDetails;
