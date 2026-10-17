import Link from "next/link";
import Image from "next/image";
import { Home } from "lucide-react";
import { cn } from "@/utils/cn";
import FavoriteButton from "./FavoriteButton";

interface PropertyCardProps {
  className?: string;
  id: string;
  area: { unit: "sqft" | "acre"; value: number };
  bathrooms: number;
  bedrooms: number;
  city: string;
  zipCode: string;
  street: string;
  country: string;
  price: number;
  media: { url: string; alt: string | null }[];
  badge?: string;
  priority?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  className,
  id,
  area,
  bathrooms,
  bedrooms,
  city,
  zipCode,
  street,
  price,
  media,
  badge,
  priority,
}) => {
  const cover = media[0];

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border-mute bg-bg-default",
        "transition-shadow duration-200 hover:shadow-lg",
        className,
      )}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-bg-minimal">
        {cover ? (
          <Image
            fill
            src={cover.url}
            alt={cover.alt ?? `${street}, ${city}`}
            sizes="(min-width: 1280px) 264px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            loading={priority ? "eager" : "lazy"}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-text-disable">
            <Home size={40} />
          </div>
        )}

        {badge && (
          <span className="absolute left-3 top-3 rounded bg-blue-600 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-text-inverted">
            {badge}
          </span>
        )}

        <FavoriteButton className="absolute right-3 top-3 z-10" />
      </div>

      <div className="space-y-1 p-4">
        <p className="text-2xl font-bold text-text-default">
          ${price.toLocaleString("en-US")}
        </p>

        <div className="flex items-center text-sm text-text-secondary">
          <span>
            <strong className="font-semibold">{bedrooms}</strong> bd
          </span>
          <span className="mx-2 h-3 w-px bg-gray-300" />
          <span>
            <strong className="font-semibold">{bathrooms}</strong> ba
          </span>
          <span className="mx-2 h-3 w-px bg-gray-300" />
          <span>
            <strong className="font-semibold">{area.value}</strong> {area.unit}
          </span>
        </div>

        <Link
          href={`/listing/${id}`}
          className="block pt-1 text-sm text-gray-600 after:absolute after:inset-0 after:content-['']"
        >
          <span className="block truncate font-medium text-text-default group-hover:underline">
            {street}
          </span>
          <span className="block truncate">
            {city}, {zipCode}
          </span>
        </Link>
      </div>
    </article>
  );
};

export default PropertyCard;
