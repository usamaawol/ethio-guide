import type { Coordinates } from "@/data/types";

/** Browser Google Maps key. Never hardcode a key in a component. */
export const googleMapsApiKey = (): string =>
  (import.meta.env["VITE_GOOGLE_MAPS_API_KEY"] as string | undefined) ?? "";

export const hasMapsKey = (): boolean => googleMapsApiKey().length > 0;

export type MapType = "roadmap" | "satellite";

export const embedViewUrl = (c: Coordinates, mapType: MapType, zoom = 16): string =>
  `https://www.google.com/maps/embed/v1/view?key=${googleMapsApiKey()}&center=${c.lat},${c.lng}&zoom=${zoom}&maptype=${mapType}`;

export const embedStreetViewUrl = (c: Coordinates): string =>
  `https://www.google.com/maps/embed/v1/streetview?key=${googleMapsApiKey()}&location=${c.lat},${c.lng}&heading=0&pitch=0&fov=90`;

export const directionsUrl = (c: Coordinates): string =>
  `https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}`;

export const fallbackMapsUrl = (c: Coordinates): string =>
  `https://www.google.com/maps/search/?api=1&query=${c.lat},${c.lng}`;
