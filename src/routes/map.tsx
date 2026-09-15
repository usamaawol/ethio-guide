import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { LoginRequired } from "@/components/site/LoginRequired";
import { PageHeader } from "@/components/site/PageHeader";
import { SiteLayout } from "@/components/site/SiteLayout";
import { UniversityMap } from "@/components/site/UniversityMap";
import { VerificationBadge } from "@/components/site/VerificationBadge";
import { getAllRecords, getGenerations, getRegions } from "@/lib/repository";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "University Map | ETHIO UNIVERSITY GUIDE 🇪🇹" },
      {
        name: "description",
        content:
          "Explore Ethiopian universities geographically: search, filter by region and generation, and open an interactive map for every university with verified coordinates.",
      },
      { property: "og:title", content: "Map of Ethiopian universities" },
      {
        property: "og:description",
        content:
          "A geographic explorer of Ethiopian universities with verified coordinates, satellite view and directions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const records = getAllRecords();
  const regions = getRegions();
  const generations = getGenerations();

  const [q, setQ] = useState("");
  const [regionId, setRegionId] = useState("");
  const [generationId, setGenerationId] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return records.filter((r) => {
      const u = r.university;
      if (regionId && u.regionId !== regionId) return false;
      if (generationId && u.generationId !== generationId) return false;
      if (!needle) return true;
      return [u.name, u.shortName, u.city ?? "", ...(u.alternateNames ?? [])]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [records, q, regionId, generationId]);

  const mapped = filtered.filter((r) => r.university.coordinates);
  const unmapped = filtered.filter((r) => !r.university.coordinates);

  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = mapped.find((r) => r.university.slug === activeSlug) ?? mapped[0] ?? null;

  const select =
    "rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground";

  return (
    <SiteLayout>
      <LoginRequired>
      <PageHeader
        eyebrow="Geographic explorer"
        title="University map"
        description="Universities with verified coordinates are shown on a real interactive map. Where coordinates have not been verified, the university is listed separately instead of being placed at a guessed location."
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search universities…"
            aria-label="Search universities"
            className={`${select} min-w-[220px] flex-1`}
          />
          <select
            aria-label="Filter by region"
            className={select}
            value={regionId}
            onChange={(e) => setRegionId(e.target.value)}
          >
            <option value="">All regions</option>
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
          <select
            aria-label="Filter by generation"
            className={select}
            value={generationId}
            onChange={(e) => setGenerationId(e.target.value)}
          >
            <option value="">All generations</option>
            {generations.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-foreground">
              On the map ({mapped.length})
            </h2>
            {mapped.length === 0 ? (
              <p className="text-sm italic text-muted-foreground">
                No university in this selection has verified coordinates yet.
              </p>
            ) : (
              <ul className="space-y-2">
                {mapped.map((r) => {
                  const u = r.university;
                  const isActive = active?.university.slug === u.slug;
                  return (
                    <li key={u.id}>
                      <button
                        type="button"
                        onClick={() => setActiveSlug(u.slug)}
                        aria-pressed={isActive}
                        className={`w-full rounded-lg border p-3 text-left transition-colors ${
                          isActive
                            ? "border-primary bg-secondary"
                            : "border-border bg-card hover:bg-secondary"
                        }`}
                      >
                        <span className="block text-sm font-medium text-foreground">{u.name}</span>
                        <span className="block text-xs text-muted-foreground">
                          {r.region?.name ?? "Region not yet verified"}
                          {u.city ? ` · ${u.city}` : ""}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            {unmapped.length ? (
              <div className="rounded-lg border border-dashed border-border p-3">
                <p className="text-xs font-semibold text-foreground">
                  Exact coordinates are not yet verified
                </p>
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                  {unmapped.map((r) => (
                    <li key={r.university.id}>
                      <Link
                        to="/universities/$slug"
                        params={{ slug: r.university.slug }}
                        className="hover:text-foreground hover:underline"
                      >
                        {r.university.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div>
            {active ? (
              <div className="space-y-4 rounded-xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-base font-semibold text-foreground">
                      {active.university.name}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {active.region?.name ?? "Region not yet verified"}
                      {active.university.city ? ` · ${active.university.city}` : ""}
                    </p>
                  </div>
                  <VerificationBadge status={active.university.verificationStatus} />
                </div>

                <UniversityMap
                  name={active.university.name}
                  coordinates={active.university.coordinates}
                  googleMapsUrl={active.university.googleMapsUrl}
                  places={active.campuses.map((c) => c.name)}
                />

                <div className="flex flex-wrap gap-2">
                  <Link
                    to="/universities/$slug"
                    params={{ slug: active.university.slug }}
                    className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
                  >
                    Explore university
                  </Link>
                  <Link
                    to="/compare"
                    className="rounded-lg border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-secondary"
                  >
                    Compare
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-sm italic text-muted-foreground">
                Select a university to view its map.
              </p>
            )}
          </div>
        </div>
      </div>
      </LoginRequired>
    </SiteLayout>
  );
}
