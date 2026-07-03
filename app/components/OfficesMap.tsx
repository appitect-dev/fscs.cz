"use client";

import dynamic from "next/dynamic";

// Leaflet potřebuje `window`, proto ho načítáme jen na klientu (ssr: false).
// Placeholder má stejnou výšku jako mapa, aby nedocházelo k posunu layoutu (CLS).
const Map = dynamic(
  () => import("./OfficesMapClient").then((m) => m.OfficesMapClient),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-72 w-full animate-pulse rounded-card border border-white/10 bg-white/5 md:h-80"
        aria-hidden="true"
      />
    ),
  },
);

export function OfficesMap() {
  return <Map />;
}
