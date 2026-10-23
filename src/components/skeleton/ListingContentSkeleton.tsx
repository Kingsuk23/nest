import FilterButtonSkeleton from "./FilterButtonSkeleton";
import LocationSearchSkeleton from "./LoctionSearchSkeleton";
import PropertyCardSkeleton from "./PropertyCardSkeleton";
import PropertyTypeFiltersSkeleton from "./PropertyTypeFiltersSkeleton";
import SortSkeleton from "./SortSkeleton";

const ListingContentSkeleton = () => {
  return (
    <div>
      <div
        aria-hidden="true"
        className="md:mt-10 mt-6 flex items-center justify-between animate-pulse"
      >
        <div className="hidden h-8 w-72 rounded-full bg-gray-200 md:block" />
        <div className="flex items-center gap-3  max-md:w-full">
          <LocationSearchSkeleton />
          <FilterButtonSkeleton />
        </div>
      </div>
      <div className="md:mt-8 mt-6 flex justify-between items-center gap-10">
        <PropertyTypeFiltersSkeleton />
        <SortSkeleton className="md:flex hidden" />
      </div>
      <div className="hidden h-8 w-72 rounded-full bg-gray-200 md:hidden" />

      <div className="flex justify-between items-center mt-4 md:hidden">
        <div className="hidden h-4 w-12 rounded-full bg-gray-200" />
        <SortSkeleton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
        {Array.from({ length: 18 }, (_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default ListingContentSkeleton;
