import ListingContent from "@/components/ListingContent";
import ListingContentSkeleton from "@/components/skeleton/ListingContentSkeleton";
import { Suspense } from "react";

const Listing = ({
  params,
  searchParams,
}: PageProps<"/listing/location/[location]">) => {
  return (
    <main className="relative mx-auto flex flex-col justify-between px-4 md:px-9">
      <Suspense fallback={<ListingContentSkeleton />}>
        <ListingContent params={params} searchParams={searchParams} />
      </Suspense>
    </main>
  );
};

export default Listing;
