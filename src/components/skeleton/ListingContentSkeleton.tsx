import LocationSearchSkeleton from "./LoctionSearchSkeleton";
import PropertyCardSkeleton from "./PropertyCardSkeleton";

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
        </div>
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
