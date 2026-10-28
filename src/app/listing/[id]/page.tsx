import ListingDetailsContent from "@/components/ListingDetailsContect";
import { Suspense } from "react";

const ListingDetails = ({ params }: PageProps<"/listing/[id]">) => {
  return (
    <main className="relative mx-auto flex flex-col justify-between px-4 md:px-9">
      <Suspense fallback={<p>Loading</p>}>
        <ListingDetailsContent params={params} />
      </Suspense>
    </main>
  );
};

export default ListingDetails;
