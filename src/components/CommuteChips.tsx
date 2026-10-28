import { Profile } from "@/hooks/useCommute";
import { Bike, Car, Footprints, LucideIcon, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export type SelectPlace = {
  id: string;
  distance: number;
  duration: string;
  fromPlace: string;
  toPlace: string;
  profile: Profile;
};

interface CommuteChipsProps {
  setSelectPlace: Dispatch<SetStateAction<SelectPlace[]>>;
  selectPlace: SelectPlace[];
}

const PROFILE_ICONS: Record<Profile, LucideIcon> = {
  "driving-car": Car,
  "cycling-regular": Bike,
  "foot-walking": Footprints,
};

const CommuteChips: React.FC<CommuteChipsProps> = ({
  selectPlace,
  setSelectPlace,
}) => {
  const removeSelectPlace = (id: string) => {
    setSelectPlace((prev) => prev.filter((p) => p.id !== id));
  };
  return (
    <div className="flex items-center gap-2 mt-2 overflow-x-auto no-scrollbar">
      {selectPlace.map((place) => {
        const Icon = PROFILE_ICONS[place.profile];
        return (
          <div
            className="shrink-0 border border-border-mute rounded-full px-3 py-2 "
            key={place.id}
          >
            <div className="flex gap-3 items-center">
              <div className="bg-bg-inverted text-text-inverted rounded-full size-8  flex justify-center items-center">
                <Icon size={16} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm">{`${place.fromPlace} - ${place.toPlace}`}</span>
                <span className="text-xs text-text-secondary">
                  {place.distance} Km &#x25CF; {place.duration}
                </span>
              </div>
              <button
                className=" cursor-pointer size-8 flex justify-center items-center"
                onClick={() => removeSelectPlace(place.id)}
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommuteChips;
