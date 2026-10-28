import {
  BadgePercent,
  CreditCardCheck,
  Eye,
  Info,
  type LucideProps,
  SquareText,
} from "lucide-react";

type HistoryKind = "listed" | "price_change" | "status_change" | "sold";

interface PropertyHistoryCardProps {
  id: string;
  price: number;
  createdAt: Date;
  kind: HistoryKind;
  per_sqft: number;
}

type LucideIcon = React.FC<LucideProps>;

const titles: Record<HistoryKind, string> = {
  listed: "Listed",
  price_change: "Price change",
  status_change: "Status change",
  sold: "Sold",
};

const icons: Record<HistoryKind, LucideIcon> = {
  listed: SquareText,
  price_change: BadgePercent,
  status_change: Info,
  sold: CreditCardCheck,
};

const PropertyHistoryCard: React.FC<PropertyHistoryCardProps> = ({
  createdAt,
  id,
  kind,
  per_sqft,
  price,
}) => {
  const Icon = icons[kind];

  const listedDate = new Date(createdAt);

  if (Number.isNaN(listedDate.getTime())) return null;

  const day = listedDate.toLocaleDateString();

  return (
    <div className="p-4 border border-border-mute rounded-xl flex gap-6 items-center">
      <Icon size={24} className="text-icon-default max-md:hidden" />
      <div className="flex justify-between items-center w-full flex-wrap gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-text-secondary text-base">{titles[kind]}</p>
          <p className=" text-base mt-1 max-w-48 text-nowrap truncate">{id}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-text-secondary text-base">Price</p>
          <p className=" text-base mt-1">${price.toLocaleString()}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-text-secondary text-base">Price per Sqft</p>
          <p className=" text-base mt-1"> ${per_sqft}/sqft</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-text-secondary text-base">Listed date</p>
          <p className=" text-base mt-1"> {day}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyHistoryCard;
