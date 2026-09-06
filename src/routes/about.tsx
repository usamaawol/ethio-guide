import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/site/PageHeader";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ETHIO UNIVERSITY GUIDE 🇪🇹" },
      {
        name: "description",
        content:
          "Why ETHIO UNIVERSITY GUIDE exists, what students can do with it, how university data is sourced and verified, and what is coming next.",
      },
      { property: "og:title", content: "About ETHIO UNIVERSITY GUIDE" },
      {
        property: "og:description",
        content:
          "A discovery platform for Ethiopian universities built on sourced data with honest verification labels.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

const capabilities = [
  {
    title: "University discovery",
    text: "Browse every university in the guide by name, acronym, region, city, type and generation.",
  },
  {
    title: "Academic discovery",
    text: "Search colleges, schools, institutes and fields of study across all universities at once.",
  },
  {
    title: "Campus exploration",
    text: "Open a campus explorer with satellite view, Street View where it exists, and any supplied campus photos.",
  },
  {
    title: "Interactive maps",
    text: "Real, zoomable Google Maps inside university pages — plus a country-wide map of universities with verified coordinates.",
  },
  {
    title: "University comparison",
    text: "Put up to four universities side by side and see exactly where data is missing.",
  },
  {
    title: "AI University Advisor",
    text: "Ask questions in plain language and get answers grounded in the guide's own records, with links to the sources.",
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHeader
        title="About ETHIO UNIVERSITY GUIDE 🇪🇹"
        description="University Guide for Ethiopian Students — Discover. Explore. Compare. Choose."
      />

      <div className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <Block title="What is ETHIO UNIVERSITY GUIDE?">
          <p>
            ETHIO UNIVERSITY GUIDE is a discovery and exploration platform for Ethiopian students.
            It brings university profiles, academic structures, campuses, maps, history, contacts
            and sources together in one place, so a student can understand an institution without
            hunting across a dozen websites.
          </p>
        </Block>

        <Block title="Why we built it">
          <p>
            Choosing a university is one of the biggest decisions a student makes, yet reliable
            Ethiopian university information is scattered, inconsistent and often out of date. This
            guide collects what can be traced to a real source and says plainly when something is
            not yet known — instead of filling gaps with guesses.
          </p>
        </Block>

        <Block title="What students can do">
          <ul className="grid gap-3 sm:grid-cols-2">
            {capabilities.map((c) => (
              <li key={c.title} className="rounded-lg border border-border p-3">
                <p className="text-sm font-medium text-foreground">{c.title}</p>
                <p className="mt-1 text-xs">{c.text}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Data sources and verification">
          <p>
            Every university page lists the sources behind its content, and each record carries a
            status: verified, partially verified, or needs verification. Third-party information is
            labelled as reported rather than confirmed, conflicting establishment years are shown
            side by side rather than merged, and generation classifications display the
            classification source and its status.
          </p>
          <p>
            Rankings taken from a supplied 2025 reference image are shown only as a reported
            ranking, never as an official ranking or a quality score.
          </p>
        </Block>

        <Block title="Continuous expansion">
          <p>
            University information in this guide is continuously expanded and verified. Records are
            added and improved over time; nothing already published is removed when new data
            arrives.
          </p>
        </Block>

        <Block title="Future development">
          <ul className="list-disc space-y-1 pl-5">
            <li>More universities, departments and program listings as official data is confirmed.</li>
            <li>Richer campus and building maps with official photography.</li>
            <li>News, events, admission and tuition data where institutions publish it.</li>
            <li>Deeper AI guidance, still grounded strictly in the guide's own records.</li>
          </ul>
        </Block>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/universities"
            className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Explore universities
          </Link>
          <Link
            to="/ai-advisor"
            className="inline-flex items-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
          >
            Ask the AI advisor
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
