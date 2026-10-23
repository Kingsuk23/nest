import { ArrowDownWideNarrow } from "lucide-react";
import { cn } from "@/utils/cn";

const SortSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 animate-pulse rounded-md border border-border-mute px-3 py-2",
        className,
      )}
      aria-hidden="true"
    >
      <ArrowDownWideNarrow
        size={20}
        className="shrink-0 text-text-secondary opacity-50"
      />

      <div className="h-4 w-32 animate-pulse rounded bg-bg-subtle" />

      <div className="ml-auto h-5 w-5 animate-pulse rounded bg-bg-subtle" />
    </div>
  );
};

export default SortSkeleton;
