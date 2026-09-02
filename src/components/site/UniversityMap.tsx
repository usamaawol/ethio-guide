import { ExternalLink, Layers, Navigation } from "lucide-react";
import { useState } from "react";

import type { Coordinates } from "@/data/types";
import {
  directionsUrl,
  embedViewUrl,
  fallbackMapsUrl,
  hasMapsKey,
  type MapType,
} from "@/lib/maps";

const btn =
  "inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-primary";

export function UniversityMap({
  name,
  coordinates,
  googleMapsUrl,
  places,
}: {
  name: string;
  coordinates: Coordinates | null;
  googleMapsUrl?: string | null;
  places?: string[];
}) {
  const [mapType, setMapType] = useState<MapType>("roadmap");

  if (!coordinates) {
    return (
      <p className="text-sm italic text-muted-foreground">
        Map coordinates are not yet available for this location.
      </p>
    );
  }

  const openUrl = googleMapsUrl ?? fallbackMapsUrl(coordinates);

  return (
    <div className="space-y-3">
      {hasMapsKey() ? (
        <div className="overflow-hidden rounded-xl border border-border">
          <iframe
            title={`Map of ${name}`}
            src={embedViewUrl(coordinates, mapType)}
            className="h-[320px] w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border p-6 text-center">
          <p className="text-sm font-medium text-foreground">Unable to load the map.</p>
          <p className="mt-1 text-xs text-muted-foreground">
            The interactive map needs a Google Maps API key. You can still open the location
            directly.
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <a className={btn} href={openUrl} target="_blank" rel="noreferrer">
          <ExternalLink className="h-3.5 w-3.5" /> Open in Google Maps
        </a>
        <a className={btn} href={directionsUrl(coordinates)} target="_blank" rel="noreferrer">
          <Navigation className="h-3.5 w-3.5" /> Get Directions
        </a>
        <button
          type="button"
          className={btn}
          aria-pressed={mapType === "satellite"}
          onClick={() => setMapType((t) => (t === "satellite" ? "roadmap" : "satellite"))}
        >
          <Layers className="h-3.5 w-3.5" />
          {mapType === "satellite" ? "Road view" : "Satellite View"}
        </button>
      </div>

      <p className="text-xs text-muted-foreground">
        Coordinates: {coordinates.lat}, {coordinates.lng}
      </p>

      {places?.length ? (
        <div className="flex flex-wrap gap-1.5">
          {places.map((p) => (
            <span
              key={p}
              className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] text-secondary-foreground"
            >
              {p}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
