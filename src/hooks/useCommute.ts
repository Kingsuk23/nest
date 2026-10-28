import { useCallback, useState } from "react";

export type Profile = "driving-car" | "cycling-regular" | "foot-walking";

export interface CommuteResult {
  distanceMeters: number;
  durationSeconds: number;
  geometry: { type: "LineString"; coordinates: [number, number][] };
}

interface Point {
  lat: number;
  lng: number;
}

export function useCommute() {
  const [data, setData] = useState<CommuteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback(
    async (from: Point, to: Point, profile: Profile = "driving-car") => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/openstreet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ from, to, profile }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Failed");
        setData(json);
        return json as CommuteResult;
      } catch (e) {
        setError((e as Error).message);
        setData(null);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { data, loading, error, calculate };
}

export const formatDuration = (s: number) => {
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min`;
  return `${Math.floor(m / 60)} h ${m % 60} min`;
};

export const formatDistance = (meters: number) =>
  meters < 1000
    ? `${Math.round(meters)} m`
    : `${(meters / 1000).toFixed(1)} km`;
