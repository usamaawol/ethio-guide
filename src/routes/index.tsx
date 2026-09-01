import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Compass, MessageSquare, ShieldCheck } from "lucide-react";

import { SiteLayout } from "@/components/site/SiteLayout";
import { UniversityCard } from "@/components/site/UniversityCard";
import {
  availableProgramFields,
  getAllRecords,
  getRegions,
  unverifiedGenerationCount,
} from "@/lib/repository";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "University Guide for Ethiopian Students | Explore & Compare" },
      {
        name: "description",
        content:
          "Discover, compare and understand Ethiopian universities: verified academic units, regions, generations and an AI advisor grounded in sourced data.",
      },
      { property: "og:title", content: "University Guide for Ethiopian Students" },
      {
        property: "og:description",
        content:
          "Explore Ethiopian universities by program, region and generation — with clearly labelled verification status.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const records = getAllRecords();
  const fields = availableProgramFields();
  const regions = getRegions();

  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-3 py-1 text-xs font-medium">
              🇪🇹 Ethiopian higher education, verified
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              Find the right Ethiopian university — with evidence, not guesswork.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/85">
              Search by field of study, region or generation, compare institutions side by side, and
              ask the advisor questions in plain language. Anything we can't trace to an official
              source is labelled as unverified instead of invented.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/universities"
                className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground transition-opacity hover:opacity-90"
              >
                Explore universities <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/ai-advisor"
                className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/30 px-5 py-3 text-sm font-semibold transition-colors hover:bg-primary-foreground/10"
              >
                Ask the AI advisor
              </Link>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-4 self-center">
            {[
              { label: "Universities on record", value: String(records.length) },
              { label: "Study fields covered", value: String(fields.length) },
              { label: "Regions in taxonomy", value: String(regions.length) },
              { label: "Awaiting generation data", value: String(unverifiedGenerationCount()) },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 p-4"
              >
                <dt className="text-xs text-primary-foreground/75">{stat.label}</dt>
                <dd className="mt-1 text-2xl font-bold">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Compass,
              title: "Program-first discovery",
              body: "Start from what you want to study. We map your field to verified colleges, schools and institutes.",
            },
            {
              icon: MessageSquare,
              title: "Retrieval-grounded advisor",
              body: "The advisor answers only from records in the database and cites the source behind every answer.",
            },
            {
              icon: ShieldCheck,
              title: "Honest data labelling",
              body: "Every record carries a verification status and a last-verified date. Gaps are shown, not filled.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-card p-6">
              <item.icon className="h-6 w-6 text-primary" />
              <h2 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Popular fields of study</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Fields with at least one verified academic unit in the database.
              </p>
            </div>
            <Link to="/programs" className="text-sm font-semibold text-primary hover:underline">
              View all programs
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {fields.map((f) => (
              <Link
                key={f.key}
                to="/programs"
                search={{ field: f.key }}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {f.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-foreground">
              <Building2 className="h-5 w-5 text-primary" /> Universities in the guide
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Seeded with detailed, source-backed records. More institutions are added as they are
              verified.
            </p>
          </div>
          <Link to="/universities" className="text-sm font-semibold text-primary hover:underline">
            Browse all
          </Link>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {records.map((record) => (
            <UniversityCard key={record.university.id} record={record} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
