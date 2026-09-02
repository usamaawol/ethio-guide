import { useState } from "react";

import type { Campus, UniversityPhoto, Building } from "@/data/types";
import { embedStreetViewUrl, hasMapsKey } from "@/lib/maps";
import { UniversityMap } from "./UniversityMap";

export function CampusExplorer({
  universityName,
  campuses,
  buildings,
  photos,
}: {
  universityName: string;
  campuses: Campus[];
  buildings: Building[];
  photos: UniversityPhoto[];
}) {
  const [activeId, setActiveId] = useState<string | null>(campuses[0]?.id ?? null);
  const active = campuses.find((c) => c.id === activeId) ?? null;
  const [streetViewFailed, setStreetViewFailed] = useState(false);

  if (campuses.length === 0) {
    return (
      <p className="text-sm italic text-muted-foreground">
        Campus information is not yet available.
      </p>
    );
  }

  const campusBuildings = buildings.filter((b) => b.campusId === active?.id);
  const campusPhotos = photos.filter((p) => !p.campusId || p.campusId === active?.id);
  const canStreetView = hasMapsKey() && active?.coordinates && !streetViewFailed;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Campuses">
        {campuses.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={c.id === activeId}
            onClick={() => {
              setActiveId(c.id);
              setStreetViewFailed(false);
            }}
            className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
              c.id === activeId
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:bg-secondary"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {active ? (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {active.city ?? "City not yet available"}
            {active.description ? ` · ${active.description}` : ""}
          </p>

          {canStreetView && active.coordinates ? (
            <div className="overflow-hidden rounded-xl border border-border">
              <iframe
                title={`Street View of ${active.name}`}
                src={embedStreetViewUrl(active.coordinates)}
                className="h-[320px] w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                onError={() => setStreetViewFailed(true)}
              />
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border p-5 text-center">
              <p className="text-sm font-medium text-foreground">
                Street View is unavailable for this location.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Use the satellite view below and any available campus photos instead.
              </p>
            </div>
          )}

          <UniversityMap
            name={`${universityName} — ${active.name}`}
            coordinates={active.coordinates}
            places={[active.name]}
          />

          <div>
            <h3 className="text-sm font-semibold text-foreground">Buildings</h3>
            {campusBuildings.length === 0 ? (
              <p className="mt-1 text-sm italic text-muted-foreground">
                Building information not yet available.
              </p>
            ) : (
              <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                {campusBuildings.map((b) => (
                  <li key={b.id} className="rounded-lg border border-border p-3 text-sm">
                    <span className="font-medium text-foreground">{b.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {b.buildingType ?? "Type not yet available"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Photo gallery</h3>
            {campusPhotos.length === 0 ? (
              <div className="mt-2 flex h-32 items-center justify-center rounded-lg border border-dashed border-border text-sm italic text-muted-foreground">
                University image not yet available.
              </div>
            ) : (
              <div className="mt-2 grid gap-3 sm:grid-cols-3">
                {campusPhotos.map((p) =>
                  p.url ? (
                    <img
                      key={p.id}
                      src={p.url}
                      alt={p.caption}
                      loading="lazy"
                      className="h-32 w-full rounded-lg object-cover"
                    />
                  ) : (
                    <div
                      key={p.id}
                      className="flex h-32 items-center justify-center rounded-lg border border-dashed border-border text-xs italic text-muted-foreground"
                    >
                      University image not yet available.
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
