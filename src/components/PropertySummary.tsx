import { cn } from "@/utils/cn";
import { Fragment } from "react";
import Panel from "./ui/Panel";

interface PropertySummaryProps {
  price: number;
  bed: number;
  bath: number;
  area: { unit: "acre" | "sqft"; value: number };
  status: "pending" | "active";
  address: string;
}

const PropertySummary: React.FC<PropertySummaryProps> = ({
  price,
  bed,
  area,
  bath,
  status,
  address,
}) => {
  const stats = [
    `${bed} Beds`,
    `${bath} Baths`,
    `${area.value.toLocaleString("en-US")} ${area.unit}`,
  ];
  return (
    <Panel>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">
          ${price.toLocaleString("en-US")}
        </h1>
        <div
          className={cn(
            "px-4 py-2 text-base rounded-3xl",
            status === "active" ? "bg-[#94EB96]" : "bg-[#ebe294] ",
          )}
        >
          {status === "active" ? "Active" : "Pending"}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {stats.map((stat, index) => (
            <Fragment key={stat}>
              {index > 0 && (
                <span
                  className={cn(
                    "size-1 rounded-full bg-[#C0BFBF]",
                    index === 3 && "max-md:hidden",
                  )}
                />
              )}

              <p
                className={cn(
                  "text-base text-text-secondary",
                  index === 3 && "max-md:hidden",
                )}
              >
                {stat}
              </p>
            </Fragment>
          ))}
        </div>
        <p className="text-text-secondary text-base">{address}</p>
      </div>
    </Panel>
  );
};

export default PropertySummary;
