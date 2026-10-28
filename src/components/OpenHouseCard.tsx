import { CalendarDays, Clock } from "lucide-react";

interface OpenHouseCardProps {
  startAt: Date;
  endAt: Date;
}

const OpenHouseCard: React.FC<OpenHouseCardProps> = ({ endAt, startAt }) => {
  const start = new Date(startAt);
  const end = new Date(endAt);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;

  const day = start.toLocaleDateString("en-US", {
    month: "short",
    weekday: "short",
    day: "numeric",
  });

  const time = (d: Date) => {
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-4 flex flex-col gap-4 border border-border-mute rounded-xl w-60 shrink-0">
      <div className="flex gap-2 items-center">
        <CalendarDays size={16} className="text-text-secondary" />
        <p className="text-base">{day}</p>
      </div>
      <div className="flex gap-2 items-center">
        <Clock size={16} className="text-text-secondary" />
        <p className="text-base">
          {time(start)} – {time(end)}
        </p>
      </div>
    </div>
  );
};

export default OpenHouseCard;
