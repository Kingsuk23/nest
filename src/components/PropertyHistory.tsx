import PropertyHistoryCard from "./PropertyHistoryCard";
import Panel from "./ui/Panel";

type history = {
  id: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  propertyId: string;
  kind: "listed" | "price_change" | "status_change" | "sold";
  per_sqft: number;
};

interface PropertyHistoryProps {
  history: history[] | undefined;
}

const PropertyHistory: React.FC<PropertyHistoryProps> = ({ history }) => {
  return (
    <Panel>
      <h2 className="text-2xl font-semibold">Property history</h2>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          {history?.map((item) => (
            <PropertyHistoryCard
              key={item.id}
              createdAt={item.createdAt}
              id={item.id}
              kind={item.kind}
              per_sqft={item.per_sqft}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </Panel>
  );
};

export default PropertyHistory;
