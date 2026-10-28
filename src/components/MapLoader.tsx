"use client";

import dynamic from "next/dynamic";

const MapLoader = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse rounded-lg bg-gray-200" />
  ),
});

export default MapLoader;
