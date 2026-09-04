import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";

import { PageHeader } from "@/components/site/PageHeader";
import { SiteLayout } from "@/components/site/SiteLayout";
import { UniversityCard } from "@/components/site/UniversityCard";
import { getAllRecords, getRegions } from "@/lib/repository";

export const Route = createFileRoute("/regions")({
  head: () => ({
    meta: [
      { title: "Universities by Region | Ethio University Guide" },
      {
        name: "description",
        content:
          "Browse Ethiopian universities by regional state and city administration, from Addis Ababa to Tigray and Oromia.",
      },
      { property: "og:title", content: "Universities by Region" },
      {
        property: "og:description",
        content: "Browse Ethiopian universities by regional state and city administration.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegionsPage,
});

function RegionsPage() {
  const records = getAllRecords();
  const regions = getRegions();

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Explore"
        title="Universities by region"
        description="Every regional state and city administration in Ethiopia is listed. Regions without a university in the database yet are shown honestly as empty."
      />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        {regions.map((region) => {
          const inRegion = records.filter((r) => r.university.regionId === region.id);
          return (
            <section key={region.id}>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  {region.name}
                </h2>
                <span className="text-xs text-muted-foreground">
                  {inRegion.length
                    ? `${inRegion.length} university${inRegion.length > 1 ? "ies" : ""}`
                    : "No universities in the database yet"}
                </span>
              </div>
              {inRegion.length ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {inRegion.map((r) => (
                    <UniversityCard key={r.university.id} record={r} />
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm italic text-muted-foreground">
                  No verified university records added for this region yet.
                </p>
              )}
            </section>
          );
        })}

        <p className="text-sm text-muted-foreground">
          Looking for something specific?{" "}
          <Link to="/universities" className="text-primary hover:underline">
            Search the full directory
          </Link>
          .
        </p>
      </div>
    </SiteLayout>
  );
}
