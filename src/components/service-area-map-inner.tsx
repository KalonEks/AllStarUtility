"use client";

import { useEffect } from "react";
import { CircleMarker, MapContainer, Polygon, TileLayer, Tooltip, useMap } from "react-leaflet";
import { twinCitiesAnchors, twinCitiesMetroRing } from "@/lib/twin-cities-metro";
import "leaflet/dist/leaflet.css";

function FitMetro() {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(twinCitiesMetroRing, { padding: [36, 36], maxZoom: 10 });
  }, [map]);

  return null;
}

export default function ServiceAreaMapInner() {
  return (
    <MapContainer
      className="service-area-map__canvas"
      center={[44.98, -93.2]}
      zoom={9}
      scrollWheelZoom={false}
      attributionControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polygon
        positions={twinCitiesMetroRing}
        pathOptions={{
          color: "#ee6e73",
          weight: 10,
          opacity: 0.45,
          fill: false,
        }}
        interactive={false}
      />
      <Polygon
        positions={twinCitiesMetroRing}
        pathOptions={{
          color: "#d71920",
          weight: 3.5,
          opacity: 1,
          fillColor: "#d71920",
          fillOpacity: 0.16,
        }}
        interactive={false}
      />
      {twinCitiesAnchors.map((city) => (
        <CircleMarker
          key={city.name}
          center={city.position}
          radius={5}
          pathOptions={{ color: "#eef2f7", weight: 0, fillColor: "#eef2f7", fillOpacity: 1 }}
          interactive={false}
        >
          <Tooltip permanent direction="top" offset={[0, -8]} className="service-area-map__label">
            {city.name}
          </Tooltip>
        </CircleMarker>
      ))}
      <FitMetro />
    </MapContainer>
  );
}
