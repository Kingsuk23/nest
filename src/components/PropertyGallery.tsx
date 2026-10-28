import { Heart, Share } from "lucide-react";
import Image from "next/image";

type mediaType = {
  id: string;
  type: "image" | "video" | "floorplan";
  url: string;
  alt: string | null;
  position: number;
  isCover: boolean;
};

interface PropertyGalleryProps {
  medias: mediaType[] | undefined;
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ medias }) => {
  const images = (medias ?? [])
    .filter((m) => m.type === "image")
    .sort(
      (a, b) =>
        Number(b.isCover) - Number(a.isCover) || a.position - b.position,
    );

  const [cover, ...rest] = images;
  const thumbnails = rest.slice(0, 4);

  if (!cover) {
    return (
      <div className="mt-10 flex aspect-596/350 w-full items-center justify-center rounded-lg bg-gray-100 text-gray-400">
        No photos available
      </div>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
      <div className="relative w-full aspect-596/350">
        <Image
          src={cover.url}
          alt={cover.alt as string}
          fill
          className="rounded-lg object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
          priority
        />
      </div>
      {thumbnails.length > 0 && (
        <div className="hidden sm:grid grid-cols-2 gap-4">
          {thumbnails.map((image, index) => (
            <div key={image.id} className="relative w-full aspect-290/167">
              <Image
                src={image.url}
                alt={image.alt ?? ` photo ${index + 2}`}
                fill
                className="rounded-lg object-cover"
                sizes="25vw"
              />
            </div>
          ))}
        </div>
      )}

      <div className="py-2 px-3 rounded-full bg-black/80 text-text-inverted text-xs absolute right-2 bottom-2 hidden md:block">
        5/{images.length}
      </div>
      <div className="py-2 px-3 rounded-full bg-black/80 text-text-inverted text-xs absolute right-2 bottom-2 md:hidden ">
        1/{images.length}
      </div>

      <div className="absolute right-2 top-2 flex gap-x-2">
        <div className="bg-white p-2 rounded-full cursor-pointer">
          <Share className="text-text-default" size={16} />
        </div>
        <div className="bg-white p-2 rounded-full cursor-pointer">
          <Heart className="text-text-default" size={16} />
        </div>
      </div>
    </div>
  );
};

export default PropertyGallery;
