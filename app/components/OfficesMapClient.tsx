"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import { offices } from "@/app/lib/site";

const BRAND = "#f29322";

// Vlastní pin (SVG) – vyhýbá se problému s chybějícími výchozími ikonami Leafletu
// při bundlování a rovnou ho barevně sladíme s brandem.
const pinIcon = L.divIcon({
  className: "fscs-map-pin",
  html: `<svg width="28" height="38" viewBox="0 0 28 38" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M14 0C6.268 0 0 6.268 0 14c0 9.94 12.03 22.71 12.542 23.246a2 2 0 0 0 2.916 0C15.97 36.71 28 23.94 28 14 28 6.268 21.732 0 14 0Z" fill="${BRAND}"/><circle cx="14" cy="14" r="5" fill="#fff"/></svg>`,
  iconSize: [28, 38],
  iconAnchor: [14, 38],
  popupAnchor: [0, -34],
  tooltipAnchor: [0, -32],
});

const points = offices.map((o) => [o.lat, o.lng] as [number, number]);
const bounds = L.latLngBounds(points);

function mapsHref(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function OfficesMapClient() {
  return (
    <div className="isolate h-72 w-full overflow-hidden rounded-card border border-white/10 md:h-80">
      <MapContainer
        bounds={bounds}
        boundsOptions={{ padding: [48, 48] }}
        scrollWheelZoom={false}
        className="h-full w-full bg-navy"
        aria-label="Mapa s pobočkami Praha a Plzeň"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          maxZoom={19}
        />

        <Polyline
          positions={points}
          pathOptions={{ color: BRAND, weight: 2, opacity: 0.9, dashArray: "6 8" }}
        />

        {offices.map((o) => (
          <Marker key={o.city} position={[o.lat, o.lng]} icon={pinIcon}>
            <Tooltip
              direction="top"
              offset={[0, -6]}
              opacity={1}
              permanent
              className="fscs-map-tooltip"
            >
              {o.label}
            </Tooltip>
            <Popup>
              <strong>{o.label}</strong>
              <br />
              {o.street}, {o.zip}
              <br />
              <a href={mapsHref(o.mapsQuery)} target="_blank" rel="noreferrer">
                Otevřít v mapách
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
