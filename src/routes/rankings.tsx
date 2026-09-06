import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/site/PageHeader";
import { SiteLayout } from "@/components/site/SiteLayout";
import { VerificationBadge } from "@/components/site/VerificationBadge";
import { getAllRecords, reportedRankings2025 } from "@/lib/repository";

export const Route = createFileRoute("/rankings")({
  head: () => ({
    meta: [
      { title: "Reported 2025 Ranking | ETHIO UNIVERSITY GUIDE 🇪🇹" },
      {
        name: "description",
        content:
          "The 2025 Ethiopian university ranking reported in a supplied reference image, shown as unverified reported data rather than an official ranking.",
      },
      { property: "og:title", content: "Reported 2025 ranking of Ethiopian universities" },
      {
        property: "og:description",
        content:
          "A reported ranking list kept clearly labelled as unverified, with no quality scores attached.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RankingsPage,
});

function RankingsPage() {
  const records = getAllRecords();
  const slugFor = (name: string) => {
    const simple = (s: string) =>
      s
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/\bsci\b/g, "science")
        .replace(/\btech\b/g, "technology")
        .replace(/[^a-z0-9]/g, "");
    const target = simple(name);
    return (
      records.find(
        (r) =>
          simple(r.university.name) === target ||
          (r.university.alternateNames ?? []).some((a) => simple(a) === target),
      )?.university.slug ?? null
    );
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Reported data"
        title="Reported 2025 Ranking"
        description="Reported ranking shown in a supplied 2025 reference image, credited to UNIRANKS / UniRank. This is not an official Ethiopian university ranking and it is not a quality score."
      />

      <div className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-warning/30 bg-warning/10 p-5">
          <p className="text-sm font-semibold text-foreground">Why this list is unverified</p>
          <p className="mt-2 text-sm text-muted-foreground">
            The supplied reference image contains visible numbering inconsistencies, so the exact
            positions cannot be treated as accurate. The list is stored with its source and a
            "needs verification" status, and no university in this guide is described as best,
            worst or top on the basis of it.
          </p>
          <div className="mt-3">
            <VerificationBadge status="needs_verification" />
          </div>
        </div>

        <ol className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {reportedRankings2025.map((r) => {
            const slug = slugFor(r.universityName);
            return (
              <li key={r.rank} className="flex items-center gap-4 px-4 py-3">
                <span className="w-8 shrink-0 text-sm font-semibold text-muted-foreground">
                  {r.rank}
                </span>
                <span className="min-w-0 flex-1 text-sm text-foreground">
                  {slug ? (
                    <Link
                      to="/universities/$slug"
                      params={{ slug }}
                      className="font-medium text-primary hover:underline"
                    >
                      {r.universityName}
                    </Link>
                  ) : (
                    r.universityName
                  )}
                </span>
                <span className="shrink-0 text-[11px] text-muted-foreground">
                  {slug ? "In this guide" : "Profile not yet added"}
                </span>
              </li>
            );
          })}
        </ol>

        <p className="text-xs text-muted-foreground">
          Source: UNIRANKS / UniRank, as displayed in the supplied 2025 reference image. Reported
          position only — last reviewed as unverified.
        </p>
      </div>
    </SiteLayout>
  );
}
