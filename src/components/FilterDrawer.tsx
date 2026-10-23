import { useFilters } from "@/hooks/useFilters";
import FilterFooter from "./FilterFooter";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import FilterContents from "./FilterContents";

interface filterDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterDrawer: React.FC<filterDrawerProps> = ({ open, setOpen }) => {
  const { resetFilters } = useFilters();

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(open));
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="filter-drawer-title"
      inert={!open}
      className={`fixed right-0 top-0 z-50 flex h-screen w-full flex-col bg-bg-default shadow-2xl transition-transform duration-300 ease-in-out md:w-140 ${
        visible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-border-mute p-4">
        <h2 className="text-xl font-semibold">Filters</h2>

        <button
          onClick={() => setOpen(false)}
          className="cursor-pointer rounded-md p-2 hover:bg-bg-subtle"
        >
          <X size={20} />
        </button>
      </div>

      <FilterContents />

      <FilterFooter onClear={resetFilters} />
    </div>
  );
};

export default FilterDrawer;
