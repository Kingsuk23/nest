import { cn } from "@/utils/cn";
import Select from "../ui/Select";

type FilterOption<T extends string | number> = {
  label: string;
  value: T;
};

interface FilterRangeProps<T extends string | number> {
  label: string;
  minLabel: string;
  maxLabel: string;
  minOptions: FilterOption<T>[];
  maxOptions: FilterOption<T>[];
  minValue: T;
  maxValue: T;
  onMinChange: (value: T) => void;
  onMaxChange: (value: T) => void;
  className?: string;
}

function FilterRange<T extends string | number>({
  label,
  maxLabel,
  maxOptions,
  maxValue,
  minLabel,
  minOptions,
  minValue,
  onMaxChange,
  onMinChange,
  className,
}: FilterRangeProps<T>) {
  return (
    <div className={cn("flex gap-y-1 flex-col", className)}>
      <span>{label}</span>
      <div className="flex gap-x-4 w-full">
        <Select
          label={minLabel}
          onChange={onMinChange}
          options={minOptions}
          value={minValue}
        />
        <Select
          label={maxLabel}
          onChange={onMaxChange}
          options={maxOptions}
          value={maxValue}
        />
      </div>
    </div>
  );
}

export default FilterRange;
