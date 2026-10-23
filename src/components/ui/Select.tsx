import { useId } from "react";
import { ChevronDown } from "lucide-react";

type SelectOption<T extends string | number> = {
  label: string;
  value: T;
};

interface SelectProps<T extends string | number> extends Omit<
  React.ComponentProps<"select">,
  "value" | "onChange"
> {
  label: string;
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

function Select<T extends string | number>({
  label,
  options,
  value,
  onChange,
  ...props
}: SelectProps<T>) {
  const id = useId();
  return (
    <div className="relative w-full">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>

      <select
        {...props}
        id={id}
        value={value}
        onChange={(e) => {
          const selected = options.find(
            (o) => String(o.value) === e.target.value,
          );
          if (selected) onChange(selected.value);
        }}
        className="px-3 py-2 w-full text-base rounded-md outline-none border-2 border-border-mute appearance-none"
      >
        {options.map((option) => (
          <option value={String(option.value)} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={20}
        className="text-icon-default absolute top-1/2 -translate-y-1/2 right-4 pointer-events-none"
      />
    </div>
  );
}

export default Select;
