import Panel from "./ui/Panel";
import MapLoader from "./MapLoader";
import CommuteButton from "./CommuteButton";

interface PropertyNeighborhoodProps {
  lat: number;
  lng: number;
  price: number;
  address: string;
  destination: { lat: number; lng: number };
  fromPlace: string;
}
const PropertyNeighborhood: React.FC<PropertyNeighborhoodProps> = ({
  lat,
  lng,
  price,
  address,
  destination,
  fromPlace,
}) => {
  return (
    <Panel>
      <h2 className="text-2xl font-semibold">Around this home</h2>
      <div
        className="
    w-full
    aspect-338/225
    md:aspect-727/385
    overflow-hidden
    rounded-xl bg-amber-300
  "
      >
        <MapLoader lat={lat} lng={lng} price={price} address={address} />
      </div>
      <CommuteButton destination={destination} fromPlace={fromPlace} />
    </Panel>
  );
};

export default PropertyNeighborhood;
