import { getBbox } from "@/utils/libs";
import { useEffect, useState } from "react";

export interface Place {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

interface PhotonFeature {
  geometry: { coordinates: [number, number] };
  properties: {
    osm_id: number;
    osm_type: string;
    name?: string;
    housenumber?: string;
    street?: string;
    city?: string;
    state?: string;
    country?: string;
  };
}

export const useLocationSearch = (
  query: string,
  center: { lat: number; lng: number },
  radiusKm = 100,
  delay = 300,
) => {
  const [results, setResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const q = query.trim();

    if (q.length < 3) {
      setResults([]);
      setLoading(false);
      setError(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    const timeout = setTimeout(async () => {
      try {
        const b = getBbox({ lat: center.lat, lng: center.lng }, radiusKm);

        const params = new URLSearchParams({
          q,
          limit: "5",
          lang: "en",
          lat: String(center.lat),
          lon: String(center.lng),
          bbox: `${b.minLng},${b.minLat},${b.maxLng},${b.maxLat}`,
        });
        const res = await fetch(`https://photon.komoot.io/api/?${params}`, {
          signal: controller.signal,
        });

        console.log(res);

        if (!res.ok) throw new Error("Request failed");

        const data: { features: PhotonFeature[] } = await res.json();

        setResults(
          data.features.map((f) => {
            const p = f.properties;
            const street = [p.street, p.housenumber].filter(Boolean).join(" ");
            return {
              id: `${p.osm_type}-${p.osm_id}`,
              name: p.name ?? street ?? "Unnamed place",
              address: [street, p.city, p.state, p.country]
                .filter(Boolean)
                .join(", "),
              lng: f.geometry.coordinates[0],
              lat: f.geometry.coordinates[1],
            };
          }),
        );

        setError(false);
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          setError(true);
          setResults([]);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, delay);
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query, delay]);

  return { results, loading, error };
};
