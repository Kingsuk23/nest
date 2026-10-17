import { cn } from "@/utils/cn";

const PropertyCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white",
        className,
      )}
    >
      <div className="aspect-4/3 w-full bg-gray-200" />

      <div className="space-y-3 p-4">
        <div className="h-7 w-2/5 rounded bg-gray-200" />

        <div className="flex items-center gap-3">
          <div className="h-4 w-12 rounded bg-gray-200" />
          <div className="h-4 w-12 rounded bg-gray-200" />
          <div className="h-4 w-20 rounded bg-gray-200" />
        </div>

        <div className="space-y-2 pt-1">
          <div className="h-4 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-1/2 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;
