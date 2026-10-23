interface PriceDropCheckboxProps {
  checked: boolean;
  onChange: (v: boolean) => void;
}

const PriceDropCheckbox: React.FC<PriceDropCheckboxProps> = ({
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-2 mt-2">
      <input
        type="checkbox"
        className="w-3.5 h-3.5 accent-neutral-900 cursor-pointer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label className="text-base text-neutral-900">Price reduced</label>
    </div>
  );
};

export default PriceDropCheckbox;
