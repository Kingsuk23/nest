import { getListingById } from "@/actions/listings";
import { Fragment } from "react";
import PropertyGallery from "./PropertyGallery";
import Panel from "./ui/Panel";
import PropertySummary from "./PropertySummary";
import PropertyAbout from "./PropertyAbout";
import PropertyKeyDetails from "./PropertyKeyDetails";
import PropertyOpenHouse from "./PropertyOpenHouse";
import PropertyHistory from "./PropertyHistory";
import PropertyDetails from "./PropertyDetails";
import PropertyNeighborhood from "./PropertyNeighborhood";

interface ListingDetailsContentProps {
  params: Promise<{ id: string }>;
}

const SQFT_PER_ACRE = 43_560;
const ListingDetailsContent: React.FC<ListingDetailsContentProps> = async ({
  params,
}) => {
  const { id } = await params;

  const data = await getListingById(id);

  const areaSqft = data
    ? data.area.unit === "acre"
      ? data.area.value * SQFT_PER_ACRE
      : data.area.value
    : 0;

  const pricePerSqft =
    data && areaSqft > 0 ? Math.round(data.price / areaSqft) : 0;

  return (
    <Fragment>
      <PropertyGallery medias={data?.media} />
      <div className="flex gap-6 mt-6 w-full">
        <div className="flex flex-col gap-y-6 w-full lg:max-w-198.75 min-w-0">
          <PropertySummary
            address={`${data?.street}, ${data?.city}, ${data?.state}, ${data?.zipCode}`}
            area={data?.area as { unit: "acre" | "sqft"; value: number }}
            bath={data?.bathrooms as number}
            bed={data?.bedrooms as number}
            price={data?.price as number}
            status={data?.listingStatus as "active" | "pending"}
          />
          <PropertyAbout description={data?.description as string} />
          <PropertyKeyDetails
            area={data?.area as { unit: "acre" | "sqft"; value: number }}
            bath={data?.bathrooms as number}
            bed={data?.bedrooms as number}
            lot={
              data?.lotSize as { unit: "acre" | "sqft"; value: number } | null
            }
            pricePerSqft={pricePerSqft}
          />
          <PropertyOpenHouse events={data?.event} />
          {/* <MobileRequestShowing /> */}
          <PropertyHistory history={data?.history} />
          <PropertyDetails
            detail={data?.detail ?? null}
            features={data?.feature ?? []}
            price={data?.price as number}
            pricePerSqft={pricePerSqft}
            hoaFee={data?.hoaFee}
          />
          <PropertyNeighborhood
            lat={data?.latitude as number}
            lng={data?.longitude as number}
            price={data?.price as number}
            address={`${data?.street}, ${data?.city}, ${data?.state}, ${data?.zipCode}`}
            destination={{
              lat: data?.latitude as number,
              lng: data?.longitude as number,
            }}
            fromPlace={data?.state as string}
          />
        </div>

        {/* <Panel className="max-w-97.5 h-fit min-w-0 hidden lg:flex flex-col">
          <RequestShowingForm />
        </Panel> */}
      </div>
    </Fragment>
  );
};

export default ListingDetailsContent;
