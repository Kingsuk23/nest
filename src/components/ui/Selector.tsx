import { cn } from "@/utils/cn";

interface SelectorProps {
  label: string;
  value: number;
  options: {
    label: string;
    value: number;
  }[];
  onChange: (value: number) => void;
}

const Selector: React.FC<SelectorProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-y-1">
      <span>{label}</span>

      <div className="flex w-full">
        {options.map(({ label, value: optionValue }, idx) => (
          <button
            key={optionValue}
            type="button"
            className={cn(
              "grow cursor-pointer border border-border-mute border-r-0 py-3",
              idx === 0 && "rounded-bl-md rounded-tl-md",
              idx === options.length - 1 &&
                "rounded-br-md rounded-tr-md border-r",
              value === optionValue && "border-r border-black/50 bg-bg-subtle",
            )}
            onClick={() => onChange(optionValue)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Selector;
