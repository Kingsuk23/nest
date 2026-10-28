import {
  Car,
  MapPin,
  X,
  Bike,
  Footprints,
  LucideIcon,
  AlertCircle,
} from "lucide-react";
import { Dispatch, SetStateAction, use, useEffect, useState } from "react";
import { Input } from "./ui/Input";
import { Place, useLocationSearch } from "@/hooks/useLocationSearch";
import { Profile, useCommute } from "@/hooks/useCommute";
import { cn } from "@/utils/cn";
import CommuteChips, { SelectPlace } from "./CommuteChips";

const toDuration = (totalSeconds: number) => {
  const s = Math.round(totalSeconds);

  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
  };
};

const profiles: { icon: LucideIcon; label: string; value: Profile }[] = [
  {
    icon: Car,
    label: "Driving",
    value: "driving-car",
  },
  {
    icon: Bike,
    label: "Cycling",
    value: "cycling-regular",
  },
  {
    icon: Footprints,
    label: "Walking",
    value: "foot-walking",
  },
];

interface commuteDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  destination: { lat: number; lng: number };
  fromPlace: string;
  setSelectPlace: Dispatch<SetStateAction<SelectPlace[]>>;
  selectPlace: SelectPlace[];
}

const CommuteDrawer: React.FC<commuteDrawerProps> = ({
  open,
  setOpen,
  destination,
  fromPlace,
  selectPlace,
  setSelectPlace,
}) => {
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [profile, setProfile] = useState<Profile>("driving-car");

  const { results, loading, error } = useLocationSearch(query, destination);
  const commute = useCommute();

  const handleSelect = async (place: Place) => {
    const result = await commute.calculate(
      { lat: place.lat, lng: place.lng },
      destination,
      profile,
    );
    const duration = toDuration(result?.durationSeconds as number);

    const formattedTime = [
      duration.days && `${duration.days} d`,
      duration.hours && `${duration.hours} h`,
      duration.minutes && `${duration.minutes} m`,
    ]
      .filter(Boolean)
      .join(" ");

    const distance = Math.floor((result?.distanceMeters as number) / 1000);
    setSelectPlace((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        distance,
        duration: formattedTime,
        fromPlace,
        profile,
        toPlace: place.name,
      },
    ]);
  };

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
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="commute-modal-title"
        onClick={(e) => e.stopPropagation()}
        className={`flex max-h-[90dvh] w-full flex-col overflow-hidden rounded-lg bg-bg-default shadow-2xl transition-all duration-200 ease-out md:w-140 p-4 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between">
          <h2 id="commute-modal-title" className="text-lg font-semibold">
            Add a commute
          </h2>

          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="cursor-pointer rounded-md p-2 hover:bg-bg-subtle"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto mt-4">
          <Input
            placeholder="Search you location"
            className="w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <div className="flex items-center gap-3">
            {profiles.map(({ icon: Icon, label, value }) => (
              <button
                className={cn(
                  "flex-1 flex flex-col items-center justify-center gap-2 border border-border-mute h-20 rounded-md mt-4 cursor-pointer ",
                  profile === value
                    ? "bg-bg-inverted  border border-black"
                    : " border border-border-mute bg-bg-default",
                )}
                onClick={() => setProfile(value)}
              >
                <Icon
                  className={cn(
                    profile === value
                      ? "text-text-inverted"
                      : "text-text-default",
                  )}
                />
                <span
                  className={cn(
                    profile === value
                      ? "text-text-inverted"
                      : "text-text-default",
                  )}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>

          {selectPlace.length > 0 && (
            <CommuteChips
              selectPlace={selectPlace}
              setSelectPlace={setSelectPlace}
            />
          )}

          <div className="mt-4 max-h-125 overflow-y-auto">
            {error ? (
              <div
                role="alert"
                className="flex flex-col items-center justify-center gap-3 px-4 py-12 text-center"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-red-50">
                  <AlertCircle size={24} className="text-red-600" />
                </div>

                <h3 className="text-base font-semibold">
                  Something went wrong
                </h3>

                <p className="max-w-xs text-sm text-text-subtle">
                  We couldn't load locations. Check your connection and try
                  again.
                </p>
              </div>
            ) : loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  aria-hidden="true"
                  className="flex w-full animate-pulse items-start gap-3 rounded-md p-3"
                >
                  <div className="mt-0.5 size-5 shrink-0 rounded-full bg-bg-subtle" />

                  <div className="flex flex-1 flex-col gap-2">
                    <div className="h-4 w-1/2 rounded bg-bg-subtle" />
                    <div className="h-3 w-3/4 rounded bg-bg-subtle" />
                  </div>
                </div>
              ))
            ) : results.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bg-subtle">
                  <MapPin size={24} className="text-icon-default" />
                </div>

                <h3 className="text-base font-semibold mt-2">
                  {query ? "No locations found" : "Search for a location"}
                </h3>

                <p className="text-sm text-text-subtle mt-1">
                  {query
                    ? `We couldn't find anything for "${query}". Try a different address or place name.`
                    : "Enter an address, city, or place to add your commute."}
                </p>
              </div>
            ) : (
              results.length > 0 && (
                <ul className="flex flex-col gap-1">
                  {results.map((place) => (
                    <li key={place.id}>
                      <button
                        type="button"
                        onClick={() => handleSelect(place)}
                        className="flex w-full items-center gap-3 rounded-md p-3 text-left hover:bg-bg-minimal cursor-pointer"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <MapPin
                            size={18}
                            className=" shrink-0 text-icon-default"
                          />
                          <span className="flex flex-col">
                            <span className="font-medium">{place.name}</span>
                            <span className="text-sm text-text-subtle">
                              {place.address}
                            </span>
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommuteDrawer;
