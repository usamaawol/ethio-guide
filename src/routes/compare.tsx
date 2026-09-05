import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { PageHeader } from "@/components/site/PageHeader";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getAllRecords } from "@/lib/repository";
import type { UniversityRecord } from "@/data/types";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Ethiopian universities | Ethio University Guide" },
      {
        name: "description",
        content:
          "Compare Ethiopian universities side by side: region, establishment, academic units, campuses, contacts and verification status.",
      },
      { property: "og:title", content: "Compare Ethiopian universities" },
      {
        property: "og:description",
        content: "Side-by-side comparison of Ethiopian universities using verified data only.",
      },
    ],
  }),
  component: ComparePage,
});

const na = "Not yet verified";

const rows: Array<{ label: string; get: (r: UniversityRecord) => string }> = [
  { label: "Short name", get: (r) => r.university.shortName },
  { label: "Type", get: (r) => r.university.type },
  { label: "Region", get: (r) => r.region?.name ?? na },
  { label: "City", get: (r) => r.university.city ?? na },
  { label: "Established", get: (r) => r.university.yearEstablished ?? na },
  { label: "Generation", get: (r) => r.generation?.name ?? "Generation not yet verified" },
  { label: "Motto", get: (r) => r.university.motto ?? "Not available" },
  {
    label: "Academic units",
    get: (r) => (r.units.length ? String(r.units.length) : "Not yet available"),
  },
  {
    label: "Campuses",
    get: (r) => (r.campuses.length ? r.campuses.map((c) => c.name).join(", ") : "Not yet available"),
  },
  {
    label: "Academic fields",
    get: (r) => r.academicFields?.join(", ") ?? "Not yet available",
  },
  {
    label: "Degree levels",
    get: (r) => r.degreeLevels?.join(", ") ?? "Not yet available",
  },
  { label: "Website", get: (r) => r.contact?.website ?? na },
  { label: "Verification", get: (r) => r.university.verificationStatus.replace(/_/g, " ") },
  { label: "Last verified", get: (r) => r.university.lastVerified ?? "unknown" },
];

function ComparePage() {
  const records = getAllRecords();
  const [selected, setSelected] = useState<string[]>(
    records.slice(0, 2).map((r) => r.university.id),
  );

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length >= 4 ? prev : [...prev, id],
    );

  const chosen = records.filter((r) => selected.includes(r.university.id));

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Ethio University Guide"
        title="Compare universities"
        description="Pick up to four universities and compare them side by side. Empty cells mean the data has not been verified yet — never that the answer is 'no'."
      />

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {records.map((r) => {
            const active = selected.includes(r.university.id);
            return (
              <button
                key={r.university.id}
                type="button"
                aria-pressed={active}
                onClick={() => toggle(r.university.id)}
                className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:bg-secondary"
                }`}
              >
                {r.university.shortName} — {r.university.name}
              </button>
            );
          })}
        </div>

        {chosen.length === 0 ? (
          <p className="text-sm italic text-muted-foreground">
            Select at least one university to start comparing.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="bg-secondary/60">
                  <th className="p-3 text-left font-semibold text-foreground">Field</th>
                  {chosen.map((r) => (
                    <th key={r.university.id} className="p-3 text-left font-semibold text-foreground">
                      <Link
                        to="/universities/$slug"
                        params={{ slug: r.university.slug }}
                        className="text-primary hover:underline"
                      >
                        {r.university.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-t border-border align-top">
                    <th className="p-3 text-left font-medium text-muted-foreground">{row.label}</th>
                    {chosen.map((r) => (
                      <td key={r.university.id} className="p-3 text-foreground">
                        {row.get(r)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
