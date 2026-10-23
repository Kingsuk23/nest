import Price from "./Price";
import Rooms from "./Rooms";
import ListingDetails from "./ListingDetails";
import HomeDetails from "./HomeDetails";
import HomeFeatures from "./HomeFeatures";

const FilterContents = () => {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-y-4">
      <Price />
      <hr className="border-border-mute rounded-full -mx-4" />
      <Rooms />
      <hr className="border-border-mute rounded-full -mx-4" />
      <ListingDetails />
      <hr className="border-border-mute rounded-full -mx-4" />
      <HomeDetails />
      <hr className="border-border-mute rounded-full -mx-4" />
      <HomeFeatures />
      <div className="h-4" />
    </div>
  );
};

export default FilterContents;
