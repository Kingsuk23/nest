"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/utils/cn";

const FavoriteButton = ({ className }: { className?: string }) => {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      aria-label={saved ? "Remove from saved homes" : "Save home"}
      aria-pressed={saved}
      onClick={() => setSaved((v) => !v)}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow transition hover:bg-white",
        className,
      )}
    >
      <Heart
        size={18}
        className={cn(saved ? "fill-red-500 text-red-500" : "text-gray-700")}
      />
    </button>
  );
};

export default FavoriteButton;
