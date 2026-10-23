import { cn } from "@/utils/cn";

const FilterButtonSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex h-10 w-26 animate-pulse items-center gap-2 rounded-md border border-border-mute px-4 py-2",
        className,
      )}
    >
      <div className="h-5 w-5 shrink-0 rounded bg-gray-200" />

      <div className="h-4 w-10 rounded bg-gray-200" />
    </div>
  );
};

export default FilterButtonSkeleton;
