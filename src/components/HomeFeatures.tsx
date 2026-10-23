import CallOut from "./ui/CallOut";
import { useFilters } from "@/hooks/useFilters";
import FilterOptionGroup from "./common/FilterOptionGroup";
import { exteriors, interiors, views } from "@/utils/filterOptions";

const HomeFeatures = () => {
  const { filters, setFilter } = useFilters();

  return (
    <CallOut title="Home features">
      <div className="flex flex-col gap-y-4">
        <hr className="border-border-mute rounded-full -mx-4" />
        <CallOut title="Interior">
          <FilterOptionGroup
            onChange={(value) => setFilter({ interiors: value })}
            options={interiors}
            selectedValues={filters.interiors}
            className="mt-2"
          />
        </CallOut>
        <hr className="border-border-mute rounded-full -mx-4" />
        <CallOut title="Exterior">
          <FilterOptionGroup
            onChange={(value) => setFilter({ exteriors: value })}
            options={exteriors}
            selectedValues={filters.exteriors}
            className="mt-2"
          />
        </CallOut>
        <hr className="border-border-mute rounded-full -mx-4" />
        <CallOut title="Views">
          <FilterOptionGroup
            onChange={(value) => setFilter({ views: value })}
            options={views}
            selectedValues={filters.views}
            className="mt-2"
          />
        </CallOut>
      </div>
    </CallOut>
  );
};

export default HomeFeatures;
