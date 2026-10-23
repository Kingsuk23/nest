import { Button } from "./ui/Button";

type FilterFooterProps = {
  onClear: () => void;
};

const FilterFooter = ({ onClear }: FilterFooterProps) => {
  return (
    <div className="flex shrink-0 gap-3 border-t border-border-mute bg-bg-default p-4">
      <button
        type="button"
        className="flex-1 rounded-md border border-border-mute px-4 py-3 font-medium transition-colors hover:bg-bg-subtle cursor-pointer"
        onClick={onClear}
      >
        Clear All
      </button>

      <Button className="flex-1">Search</Button>
    </div>
  );
};

export default FilterFooter;
