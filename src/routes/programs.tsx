import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { LoginRequired } from "@/components/site/LoginRequired";
import { PageHeader } from "@/components/site/PageHeader";
import { SiteLayout } from "@/components/site/SiteLayout";
import { availableProgramFields, fieldLabel, findByProgramField } from "@/lib/repository";

export const Route = createFileRoute("/programs")({
  validateSearch: (search: Record<string, unknown>): { field?: string } =>
    typeof search["field"] === "string" ? { field: search["field"] } : {},
  head: () => ({
    meta: [
      { title: "Find Universities by Program | ETHIO UNIVERSITY GUIDE" },
      {
        name: "description",
        content:
          "Pick a field of study and see which Ethiopian universities have verified colleges, schools or institutes covering it.",
      },
      { property: "og:title", content: "Find Ethiopian Universities by Program | ETHIO UNIVERSITY GUIDE" },
      {
        property: "og:description",
        content: "Match your field of study to verified academic units across Ethiopian universities.",
      },
    ],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  const { field } = Route.useSearch();
  const navigate = useNavigate({ from: "/programs" });
  const fields = availableProgramFields();
  const active = field ?? fields[0]?.key ?? null;
  const matches = active ? findByProgramField(active) : [];

  return (
    <SiteLayout>
      <LoginRequired>
      <PageHeader
        eyebrow="Program search"
        title="Which universities offer what you want to study?"
        description="Fields are matched against verified academic units. Where a source does not list departments or degree levels, we say so instead of assuming."
      />

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
        <aside>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Fields of study
          </p>
          <ul className="mt-3 space-y-1">
            {fields.map((f) => (
              <li key={f.key}>
                <button
                  type="button"
                  onClick={() => navigate({ search: { field: f.key } })}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    active === f.key
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div>
          <h2 className="text-xl font-bold text-foreground">
            {active ? fieldLabel(active) : "Select a field"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {matches.length} verified academic {matches.length === 1 ? "unit" : "units"} across the
            database.
          </p>

          <div className="mt-5 space-y-4">
            {matches.map((m, i) => (
              <div
                key={`${m.university.id}-${m.unit.id}-${i}`}
                className="rounded-xl border border-border bg-card p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Link
                    to="/universities/$slug"
                    params={{ slug: m.university.slug }}
                    className="text-base font-semibold text-foreground hover:text-primary"
                  >
                    {m.university.name}
                  </Link>
                  <span className="text-xs text-muted-foreground">
                    {m.region?.name ?? "Region not yet verified"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{m.unit.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Department:{" "}
                  {m.departmentName ?? "specific departments not yet verified"} · Degree level:{" "}
                  {m.degreeLevel === "Unknown" ? "not yet verified" : m.degreeLevel}
                </p>
                {m.sourceUrl ? (
                  <a
                    href={m.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-xs font-medium text-primary hover:underline"
                  >
                    Source · last verified {m.lastVerified ?? "unknown"}
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
      </LoginRequired>
    </SiteLayout>
  );
}
