import { X } from "lucide-react";
import { cn } from "@/utils/cn";

type Option<T extends string> = {
  label: string;
  value: T;
};

interface FilterOptionGroupProps<T extends string> {
  options: Option<T>[];
  selectedValues: T[];
  onChange: (values: T[]) => void;
  className?: string;
}

function FilterOptionGroup<T extends string>({
  options,
  selectedValues,
  onChange,
  className,
}: FilterOptionGroupProps<T>) {
  const toggleValue = (value: T) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((item) => item !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className={cn("flex flex-wrap gap-x-2 gap-y-2", className)}>
      {options.map(({ value, label }) => {
        const selected = selectedValues.includes(value);

        return (
          <button
            key={value}
            type="button"
            className={cn(
              "flex shrink-0 items-center gap-x-1 rounded-md border border-border-mute px-3 py-2 text-base cursor-pointer",
              selected && "border-black/50 bg-bg-subtle",
            )}
            onClick={() => toggleValue(value)}
          >
            {label}

            {selected && (
              <X
                size={20}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(selectedValues.filter((item) => item !== value));
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default FilterOptionGroup;
