import OpenHouseCard from "./OpenHouseCard";
import Panel from "./ui/Panel";

const openHouses = [
  {
    id: 1,
    date: "09/10/2026",
    time: "10:00 AM - 2:00 PM",
  },
  {
    id: 2,
    date: "09/12/2026",
    time: "11:00 AM - 3:00 PM",
  },
  {
    id: 3,
    date: "09/13/2026",
    time: "12:00 PM - 4:00 PM",
  },
];

type events = {
  id: string;
  type: "open_house" | "virtual_tour" | "in_person";
  createdAt: Date;
  updatedAt: Date;
  propertyId: string;
  startsAt: Date;
  endsAt: Date;
  meetingUrl: string | null;
  notes: string | null;
};

interface openHouseProps {
  events: events[] | undefined;
}

const PropertyOpenHouse: React.FC<openHouseProps> = ({ events }) => {
  const openHouseEvent = events?.filter((item) => item.type === "open_house");
  return (
    <Panel>
      <h2 className="text-2xl font-semibold">Open House</h2>
      <div className="flex overflow-x-scroll no-scrollbar gap-6">
        {openHouseEvent?.map((openHouse) => (
          <OpenHouseCard
            key={openHouse.id}
            startAt={openHouse.startsAt}
            endAt={openHouse.endsAt}
          />
        ))}
      </div>
    </Panel>
  );
};

export default PropertyOpenHouse;
