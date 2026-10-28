"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { cn } from "@/utils/cn";

interface MapComponentProps {
  lat: number;
  lng: number;
  price: number;
  address?: string;
  className?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  lat,
  lng,
  price,
  address,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative z-0 h-full w-full overflow-hidden rounded-lg",
        className,
      )}
    >
      <MapContainer
        key={`${lat},${lng}`}
        center={[lat, lng]}
        zoom={14}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>
            <strong>${price.toLocaleString("en-US")}</strong>
            {address && (
              <>
                <br />
                {address}
              </>
            )}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
