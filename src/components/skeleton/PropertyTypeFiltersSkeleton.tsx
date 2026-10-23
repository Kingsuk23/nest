import { cn } from "@/utils/cn";

const pillWidths = ["w-36", "w-20", "w-28", "w-20", "w-32", "w-32"];

const PropertyTypeFiltersSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex w-full animate-pulse items-center gap-x-2 overflow-x-auto no-scrollbar",
        className,
      )}
    >
      {pillWidths.map((width, i) => (
        <div
          key={i}
          className={cn(
            "h-10 shrink-0 rounded-full",
            width,
            i === 0 ? "bg-gray-300" : "bg-gray-200",
          )}
        />
      ))}
    </div>
  );
};

export default PropertyTypeFiltersSkeleton;
