import { createFileRoute, Link } from "@tanstack/react-router";

import { LoginRequired } from "@/components/site/LoginRequired";
import { PageHeader } from "@/components/site/PageHeader";
import { SiteLayout } from "@/components/site/SiteLayout";
import { UniversityCard } from "@/components/site/UniversityCard";
import { getAllRecords, getGenerations } from "@/lib/repository";

export const Route = createFileRoute("/generations")({
  head: () => ({
    meta: [
      { title: "University Generations | ETHIO UNIVERSITY GUIDE" },
      {
        name: "description",
        content:
          "Browse Ethiopian universities by expansion generation. Universities without a verified generation are clearly labelled instead of guessed.",
      },
      { property: "og:title", content: "University Generations in Ethiopia | ETHIO UNIVERSITY GUIDE" },
      {
        property: "og:description",
        content: "Ethiopian universities grouped by generation, with unverified links labelled.",
      },
    ],
  }),
  component: GenerationsPage,
});

function GenerationsPage() {
  const records = getAllRecords();
  const generations = getGenerations();
  const unassigned = records.filter((r) => !r.university.generationId);

  return (
    <SiteLayout>
      <LoginRequired>
      <PageHeader
        eyebrow="Ethio University Guide"
        title="Browse by generation"
        description="Ethiopian public universities are often described in generations of expansion. A university is only placed in a generation when the link is verified in the source data."
      />

      <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
        {generations.map((g) => {
          const list = records.filter((r) => r.university.generationId === g.id);
          return (
            <section key={g.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-xl font-bold text-foreground">{g.name}</h2>
                <span className="text-xs text-muted-foreground">
                  {list.length} {list.length === 1 ? "university" : "universities"}
                </span>
              </div>
              {list.length === 0 ? (
                <p className="mt-3 text-sm italic text-muted-foreground">
                  No university in the database has a verified link to this generation yet.
                </p>
              ) : (
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((r) => (
                    <UniversityCard key={r.university.id} record={r} />
                  ))}
                </div>
              )}
            </section>
          );
        })}

        <section>
          <h2 className="text-xl font-bold text-foreground">Generation not yet verified</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            These universities are in the guide, but their generation has not been confirmed from an
            official source.
          </p>
          {unassigned.length === 0 ? (
            <p className="mt-3 text-sm italic text-muted-foreground">
              Every university currently has a verified generation.
            </p>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {unassigned.map((r) => (
                <UniversityCard key={r.university.id} record={r} />
              ))}
            </div>
          )}
        </section>

        <Link to="/universities" className="inline-block text-sm font-semibold text-primary hover:underline">
          View the full directory →
        </Link>
      </div>
      </LoginRequired>
    </SiteLayout>
  );
}
