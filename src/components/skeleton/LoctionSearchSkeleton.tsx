import { cn } from "@/utils/cn";

const LocationSearchSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      aria-hidden="true"
      className={cn("relative w-full animate-pulse md:w-80", className)}
    >
      <div className="h-10 w-full rounded-md bg-gray-200" />
      <div className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-gray-300" />
    </div>
  );
};

export default LocationSearchSkeleton;
