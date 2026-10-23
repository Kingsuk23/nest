import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "./Input";
import { cn } from "@/utils/cn";

interface InputOptionsProps {
  symbol?: string;
  className?: string;
  queryKey: string;
  data: {
    label: string;
    value: string;
  }[];
  setValue: (value: Record<string, number>) => void;
  value: number;
  type: string;
  placeholder: string;
  ignoreValue: number;
}

const InputOptions: React.FC<InputOptionsProps> = ({
  data,
  className,
  setValue,
  symbol,
  value,
  placeholder,
  type,
  queryKey,
  ignoreValue,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [openOptions, setOpenOptions] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        inputRef.current?.blur();
        setOpenOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full relative" ref={wrapperRef}>
      <div className="relative">
        <div
          className={`absolute left-2 top-1/2 -translate-y-1/2 text-text-secondary ${symbol ? "visible" : "invisible"}`}
        >
          {symbol}
        </div>

        <Input
          ref={inputRef}
          value={value === ignoreValue ? "" : value}
          onChange={(e) => {
            const val = e.target.value;

            if (val === "") {
              setValue({ [queryKey]: ignoreValue });
              return;
            }

            const num = Number(val);
            if (isNaN(num)) return;

            setValue({ [queryKey]: num });
          }}
          type={type}
          placeholder={placeholder}
          className={cn("bg-white w-full pl-6", className)}
          onFocus={() => setOpenOptions(true)}
        />

        <div className="absolute right-1 top-1/2 -translate-y-1/2">
          {openOptions ? (
            <ChevronUp
              className="text-neutral-900 cursor-pointer"
              width={20}
              height={20}
              onClick={() => setOpenOptions(false)}
            />
          ) : (
            <ChevronDown
              className="text-neutral-900 cursor-pointer"
              width={20}
              height={20}
              onClick={() => setOpenOptions(true)}
            />
          )}
        </div>
      </div>

      {openOptions && (
        <ul className="absolute w-full top-12 z-10 rounded-md bg-white flex flex-col gap-2 shadow-large border border-neutral-300 max-h-50 overflow-y-auto no-scrollbar">
          {data.map(({ value, label }, idx) => (
            <li
              className="px-4 py-2 hover:bg-token-bg-primary-subtle cursor-pointer"
              key={idx}
              onClick={() => {
                if (value === "") {
                  setValue({ [queryKey]: ignoreValue });
                } else {
                  const num = Number(value);
                  if (!isNaN(num)) {
                    setValue({ [queryKey]: num });
                  }
                }

                setOpenOptions(false);
              }}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputOptions;
