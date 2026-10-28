"use client";

import { useState } from "react";
import { Armchair, Trees, Wallet } from "lucide-react";
import Panel from "./ui/Panel";
import { cn } from "@/utils/cn";
import { useSlider } from "@/hooks/useSlider";
import type { propertyDetailTable } from "@/db/schema";

type Feature = {
  category: string;
  value: string;
};

type Detail = Omit<typeof propertyDetailTable.$inferSelect, "rawData">;
type TabId = "interior" | "exterior" | "finance";
type Section = { title: string; items: string[] };

interface PropertyDetailsProps {
  detail: Detail | null;
  features: Feature[];
  price: number;
  pricePerSqft: number;
  hoaFee?: number | null;
}

const tabList = [
  { id: "interior", label: "Interior", icon: Armchair },
  { id: "exterior", label: "Exterior", icon: Trees },
  { id: "finance", label: "Finance", icon: Wallet },
] as const;

const yesNo = (v: boolean | null | undefined) =>
  v == null ? null : v ? "Yes" : "No";

const usd = (n: number | null | undefined) =>
  n == null ? null : `$${n.toLocaleString("en-US")}`;

const facts = (entities: [string, string | number | null | undefined][]) =>
  entities
    .filter(([, v]) => v !== null && v !== undefined && v !== "")
    .map(([label, v]) => `${label}: ${v}`);

const buildTabs = ({
  detail,
  features,
  price,
  pricePerSqft,
  hoaFee,
}: PropertyDetailsProps): Record<TabId, Section[]> => {
  const byCategory = (category: Feature["category"]) =>
    features.filter((f) => f.category === category).map((f) => f.value);

  return {
    interior: [
      { title: "Interior features", items: byCategory("interior") },
      {
        title: "Property details",
        items: facts([
          ["Style", detail?.style],
          ["Rooms", detail?.roomsTotal],
          ["Entry level", detail?.entryLevel],
          ["Basement", yesNo(detail?.basement)],
          ["Heating", detail?.heating],
          ["Cooling", detail?.cooling],
          ["Pets allowed", yesNo(detail?.petsAllowed)],
          ["Pet notes", detail?.petsNotes],
        ]),
      },
    ],
    exterior: [
      { title: "Exterior features", items: byCategory("exterior") },
      { title: "Views", items: byCategory("view") },
      {
        title: "Parking and lot",
        items: facts([
          ["Parking spaces", detail?.parkingTotal],
          ["Carport", yesNo(detail?.carport)],
          ["Waterfront", yesNo(detail?.waterfront)],
          ["Additional parcels", yesNo(detail?.additionalParcels)],
        ]),
      },
      {
        title: "Utilities",
        items: facts([
          ["Water", detail?.water],
          ["Sewer", detail?.sewer],
        ]),
      },
    ],
    finance: [
      {
        title: "Price details",
        items: facts([
          ["Price", usd(price)],
          ["Price per sqft", usd(pricePerSqft)],
          ["HOA fee", hoaFee ? `${usd(hoaFee)}/month` : null],
          ["APN", detail?.apn],
        ]),
      },
    ],
  };
};

const PropertyDetails: React.FC<PropertyDetailsProps> = (props) => {
  const [active, setActive] = useState<TabId>("interior");

  const activeIndex = tabList.findIndex((type) => type.id === (active ?? null));
  const { tabRef, buttonRefs, indicator } = useSlider(activeIndex);

  const sections = buildTabs(props)[active].filter((s) => s.items.length > 0);

  return (
    <Panel>
      <h2 className="text-2xl font-semibold">Property details</h2>
      <div
        className=" relative flex gap-8 items-center mt-6 overflow-x-auto no-scrollbar"
        ref={tabRef}
      >
        {tabList.map(({ icon: Icon, id, label }, index) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(id)}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-md text-base relative z-10 shrink-0 whitespace-nowrap px-4 py-2",
                isActive ? "text-text-default" : "text-text-secondary",
              )}
            >
              <Icon
                size={24}
                className={
                  isActive ? "text-icon-default" : "text-text-secondary"
                }
              />
              {label}
            </button>
          );
        })}
        <div
          className="pointer-events-none absolute top-0 bottom-0 left-0 z-0 rounded-md bg-bg-subtle transition-all duration-300 ease-out"
          style={{
            width: indicator.width,
            transform: `translateX(${indicator.left}px)`,
          }}
        />
      </div>
      <div role="tabpanel" className="mt-8 flex flex-wrap gap-x-32 gap-y-6">
        {sections.length === 0 && (
          <p className="text-base text-text-secondary">No details available.</p>
        )}
        {sections.map((section) => (
          <div key={section.title} className="flex items-start gap-2">
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold">{section.title}</h3>
              <ul className="mt-4 text-base text-text-secondary">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
};

export default PropertyDetails;
