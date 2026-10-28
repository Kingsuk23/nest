"use client";

import { Fragment, useState } from "react";
import { PlusCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { Profile } from "@/hooks/useCommute";
import CommuteChips, { SelectPlace } from "./CommuteChips";

const CommuteDrawer = dynamic(() => import("./CommuteDrawer"), {
  ssr: false,
  loading: () => null,
});

interface CommuteButtonProps {
  destination: { lat: number; lng: number };
  fromPlace: string;
}

const CommuteButton: React.FC<CommuteButtonProps> = ({
  destination,
  fromPlace,
}) => {
  const [open, setOpen] = useState(false);
  const [selectPlace, setSelectPlace] = useState<SelectPlace[]>([]);

  return (
    <Fragment>
      <button
        onClick={() => setOpen(true)}
        type="button"
        onMouseEnter={() => import("./CommuteDrawer")}
        onFocus={() => import("./CommuteDrawer")}
        className="flex items-center gap-4 rounded-md border border-border-mute p-4 hover:bg-bg-minimal transition-colors cursor-pointer"
      >
        <PlusCircle size={24} className="text-icon-default" />
        <h4 className="text-xl font-semibold">Add a commute</h4>
      </button>

      {selectPlace.length > 0 && (
        <CommuteChips
          selectPlace={selectPlace}
          setSelectPlace={setSelectPlace}
        />
      )}

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => setOpen(false)}
        />
      )}

      {open && (
        <CommuteDrawer
          open={open}
          setOpen={setOpen}
          destination={destination}
          fromPlace={fromPlace}
          selectPlace={selectPlace}
          setSelectPlace={setSelectPlace}
        />
      )}
    </Fragment>
  );
};

export default CommuteButton;
