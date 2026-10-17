import { getListings } from "@/actions/listings";
import PropertyCard from "./PropertyCard";
import { Fragment } from "react";
import LocationSearch from "./LocationSearch";
import { loadFilters } from "@/utils/filterParsers";
import type { SearchParams } from "nuqs/server";

interface ListingContentProps {
  params: Promise<{ location: string }>;
  searchParams: Promise<SearchParams>;
}

const ListingContent: React.FC<ListingContentProps> = async ({
  params,
  searchParams,
}) => {
  const [{ location }, parsed] = await Promise.all([
    params,
    loadFilters(searchParams),
  ]);
  const data = await getListings(location, parsed);

  return (
    <Fragment>
      <div className="md:mt-10 mt-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold md:block hidden">
          Homes for Sale in {location}
        </h1>
        <div className="flex items-center gap-3  max-md:w-full">
          <LocationSearch />
          {/* <FilterButton /> */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
        {data.data.map(
          (
            {
              area,
              bathrooms,
              bedrooms,
              city,
              country,
              id,
              media,
              price,
              street,
              zipCode,
            },
            i,
          ) => (
            <PropertyCard
              key={id}
              area={area}
              bathrooms={bathrooms}
              bedrooms={bedrooms}
              city={city}
              country={country}
              id={id}
              media={media}
              price={price}
              street={street}
              zipCode={zipCode}
              priority={i < 6}
            />
          ),
        )}
      </div>
    </Fragment>
  );
};

export default ListingContent;
