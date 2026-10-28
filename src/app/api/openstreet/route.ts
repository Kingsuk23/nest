import { NextResponse } from "next/server";

const PROFILES = ["driving-car", "cycling-regular", "foot-walking"] as const;
type Profile = (typeof PROFILES)[number];

interface Point {
  lat: number;
  lng: number;
}

const isPoint = (p: any): p is Point =>
  p &&
  typeof p.lat === "number" &&
  typeof p.lng === "number" &&
  Math.abs(p.lat) <= 90 &&
  Math.abs(p.lng) <= 180;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const { from, to, profile = "driving-car" } = body ?? {};

  if (!isPoint(from) || !isPoint(to) || !PROFILES.includes(profile)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.openrouteservice.org/v2/directions/${profile as Profile}/geojson`,
    {
      method: "POST",
      headers: {
        Authorization: process.env.ORS_API_KEY!,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        coordinates: [
          [from.lng, from.lat],
          [to.lng, to.lat],
        ],
      }),
    },
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Routing failed" },
      { status: res.status === 404 ? 404 : 502 },
    );
  }

  const data = await res.json();
  const feature = data.features?.[0];
  if (!feature) {
    return NextResponse.json({ error: "No route found" }, { status: 404 });
  }

  return NextResponse.json({
    distanceMeters: feature.properties.summary.distance,
    durationSeconds: feature.properties.summary.duration,
    geometry: feature.geometry,
  });
}
