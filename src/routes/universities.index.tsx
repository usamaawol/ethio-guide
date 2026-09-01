import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";

import { PageHeader } from "@/components/site/PageHeader";
import { SiteLayout } from "@/components/site/SiteLayout";
import { UniversityCard } from "@/components/site/UniversityCard";
import {
  availableProgramFields,
  getGenerations,
  getRegions,
  getUniversityTypes,
  queryUniversities,
} from "@/lib/repository";

interface Filters {
  q?: string;
  region?: string;
  generation?: string;
  type?: string;
  field?: string;
  sort?: "name" | "location" | "generation" | "verified";
}

export const Route = createFileRoute("/universities/")({
  validateSearch: (search: Record<string, unknown>): Filters => ({
    q: typeof search["q"] === "string" ? search["q"] : undefined,
    region: typeof search["region"] === "string" ? search["region"] : undefined,
    generation: typeof search["generation"] === "string" ? search["generation"] : undefined,
    type: typeof search["type"] === "string" ? search["type"] : undefined,
    field: typeof search["field"] === "string" ? search["field"] : undefined,
    sort: ["name", "location", "generation", "verified"].includes(String(search["sort"]))
      ? (search["sort"] as Filters["sort"])
      : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Browse Ethiopian Universities | University Guide" },
      {
        name: "description",
        content:
          "Search and filter Ethiopian universities by region, generation, institution type and field of study.",
      },
      { property: "og:title", content: "Browse Ethiopian Universities" },
      {
        property: "og:description",
        content: "Filter Ethiopian universities by region, generation, type and field of study.",
      },
    ],
  }),
  component: UniversitiesPage,
});

const selectClass =
  "w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary";

function UniversitiesPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/universities" });

  const set = (patch: Partial<Filters>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) });

  const results = queryUniversities({
    ...(search.q ? { q: search.q } : {}),
    ...(search.region ? { regionId: search.region } : {}),
    ...(search.generation ? { generationId: search.generation } : {}),
    ...(search.type ? { type: search.type } : {}),
    ...(search.field ? { fieldKey: search.field } : {}),
    sort: search.sort ?? "name",
  });

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Directory"
        title="Ethiopian universities"
        description="Every record below is built from official sources. Fields that have not been verified are labelled rather than estimated."
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-border bg-card p-4">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search.q ?? ""}
              onChange={(e) => set({ q: e.target.value || undefined })}
              placeholder="Search universities, colleges or fields (e.g. software, law, Jimma)"
              className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary"
            />
          </label>

          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <select
              className={selectClass}
              value={search.region ?? ""}
              onChange={(e) => set({ region: e.target.value || undefined })}
            >
              <option value="">All regions</option>
              {getRegions().map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
            <select
              className={selectClass}
              value={search.generation ?? ""}
              onChange={(e) => set({ generation: e.target.value || undefined })}
            >
              <option value="">All generations</option>
              {getGenerations().map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
            <select
              className={selectClass}
              value={search.type ?? ""}
              onChange={(e) => set({ type: e.target.value || undefined })}
            >
              <option value="">All types</option>
              {getUniversityTypes().map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <select
              className={selectClass}
              value={search.field ?? ""}
              onChange={(e) => set({ field: e.target.value || undefined })}
            >
              <option value="">All fields</option>
              {availableProgramFields().map((f) => (
                <option key={f.key} value={f.key}>
                  {f.label}
                </option>
              ))}
            </select>
            <select
              className={selectClass}
              value={search.sort ?? "name"}
              onChange={(e) => set({ sort: e.target.value as Filters["sort"] })}
            >
              <option value="name">Sort: Name</option>
              <option value="location">Sort: Location</option>
              <option value="generation">Sort: Generation</option>
              <option value="verified">Sort: Recently verified</option>
            </select>
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? "university" : "universities"} found
        </p>

        {results.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-border p-10 text-center">
            <p className="text-sm text-muted-foreground">
              No university in the database matches those filters yet.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {results.map((record) => (
              <UniversityCard key={record.university.id} record={record} />
            ))}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
