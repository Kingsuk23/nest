import PropertyDetailItem from "./common/PropertyDetailItem";
import Panel from "./ui/Panel";

type Area = { unit: "acre" | "sqft"; value: number };

interface PropertyKeyDetailsProps {
  pricePerSqft: number;
  bath: number;
  bed: number;
  area: Area;
  lot: Area | null;
}

const formatArea = ({ value, unit }: Area) =>
  unit === "acre"
    ? `${value.toLocaleString("en-US")} ${value === 1 ? "acre" : "acres"}`
    : `${value.toLocaleString("en-US")} sqft`;

const PropertyKeyDetails: React.FC<PropertyKeyDetailsProps> = ({
  bath,
  bed,
  pricePerSqft,
  area,
  lot,
}) => {
  const details = [
    {
      label: "Price per Sqft",
      value: pricePerSqft,
    },
    {
      label: "Bedrooms",
      value: bed,
    },
    {
      label: "Bathrooms",
      value: bath,
    },
    {
      label: "Area size",
      value: formatArea(area),
    },
    ...(lot ? [{ label: "Lot size", value: formatArea(lot) }] : []),
  ];
  return (
    <Panel>
      <h2 className="text-2xl font-semibold">Key Details</h2>
      <div className="flex flex-wrap gap-6">
        {details.map((detail) => (
          <PropertyDetailItem
            key={detail.label}
            label={detail.label}
            value={detail.value}
          />
        ))}
      </div>
    </Panel>
  );
};

export default PropertyKeyDetails;
