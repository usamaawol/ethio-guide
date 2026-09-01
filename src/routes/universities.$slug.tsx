import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ExternalLink, Globe, Mail, MapPin, Phone } from "lucide-react";

import { SiteLayout } from "@/components/site/SiteLayout";
import { VerificationBadge } from "@/components/site/VerificationBadge";
import { fieldLabel, getRecordBySlug } from "@/lib/repository";

export const Route = createFileRoute("/universities/$slug")({
  loader: ({ params }) => {
    const record = getRecordBySlug(params.slug);
    if (!record) throw notFound();
    return record;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "University not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const u = loaderData.university;
    const description =
      u.overview ?? `Verified profile of ${u.name} in the Ethiopian university guide.`;
    return {
      meta: [
        { title: `${u.name} | University Guide for Ethiopian Students` },
        { name: "description", content: description.slice(0, 155) },
        { property: "og:title", content: u.name },
        { property: "og:description", content: description.slice(0, 155) },
      ],
    };
  },
  component: UniversityDetail,
});

function Section({
  title,
  children,
  note,
}: {
  title: string;
  children: React.ReactNode;
  note?: string;
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {note ? <p className="mt-1 text-xs text-muted-foreground">{note}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

const Empty = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm italic text-muted-foreground">{children}</p>
);

function UniversityDetail() {
  const record = Route.useLoaderData();
  const u = record.university;

  return (
    <SiteLayout>
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <Link to="/universities" className="text-xs text-primary-foreground/75 hover:underline">
            ← All universities
          </Link>
          <div className="mt-4 flex flex-wrap items-start gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-foreground/15 text-lg font-bold">
              {u.logoText}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl font-bold sm:text-4xl">{u.name}</h1>
              <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-primary-foreground/85">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {record.region?.name ?? "Region not yet verified"}
                  {u.city ? ` · ${u.city}` : ""}
                </span>
                <span>· {u.type}</span>
                <span>· Established {u.yearEstablished ?? "not yet verified"}</span>
                <span>· {record.generation?.name ?? "Generation not yet verified"}</span>
              </p>
              <div className="mt-3">
                <VerificationBadge
                  status={u.verificationStatus}
                  lastVerified={u.lastVerified}
                  className="bg-primary-foreground/15 text-primary-foreground border-primary-foreground/25"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-6 lg:col-span-2">
          <Section title="Overview">
            {u.overview ? (
              <p className="text-sm leading-relaxed text-muted-foreground">{u.overview}</p>
            ) : (
              <Empty>Overview not yet available.</Empty>
            )}
          </Section>

          <Section
            title="Academic units"
            note="Colleges, schools, institutes and centres taken from official sources."
          >
            {record.units.length === 0 ? (
              <Empty>Academic units have not been verified for this university yet.</Empty>
            ) : (
              <ul className="grid gap-3 sm:grid-cols-2">
                {record.units.map((unit) => (
                  <li key={unit.id} className="rounded-lg border border-border p-3">
                    <p className="text-sm font-medium text-foreground">{unit.name}</p>
                    <p className="mt-1 text-xs capitalize text-muted-foreground">
                      {unit.kind.replace("_", " ")}
                    </p>
                    {unit.fieldKeys.length ? (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {unit.fieldKeys.map((key) => (
                          <span
                            key={key}
                            className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground"
                          >
                            {fieldLabel(key)}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </Section>

          <Section title="Campuses">
            {record.campuses.length === 0 ? (
              <Empty>Campus information has not been verified yet.</Empty>
            ) : (
              <ul className="space-y-3">
                {record.campuses.map((c) => (
                  <li key={c.id} className="rounded-lg border border-border p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium text-foreground">{c.name}</p>
                      <VerificationBadge status={c.verificationStatus} />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {c.city ?? "City not yet verified"}
                      {c.description ? ` · ${c.description}` : ""}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {c.coordinates
                        ? `Coordinates: ${c.coordinates.lat}, ${c.coordinates.lng}`
                        : "Map coordinates not yet verified — map view will appear once available."}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Section>

          <Section title="History">
            {record.history.length === 0 ? (
              <Empty>No verified historical milestones recorded yet.</Empty>
            ) : (
              <ol className="space-y-4 border-l border-border pl-5">
                {record.history.map((h) => (
                  <li key={h.id} className="relative">
                    <span className="absolute -left-[1.4rem] top-1.5 h-2 w-2 rounded-full bg-primary" />
                    <p className="text-sm font-semibold text-foreground">
                      {h.year} — {h.title}
                    </p>
                    {h.description ? (
                      <p className="mt-1 text-sm text-muted-foreground">{h.description}</p>
                    ) : null}
                  </li>
                ))}
              </ol>
            )}
          </Section>

          <Section title="Facilities & services">
            {record.facilities.length === 0 ? (
              <Empty>Facility information has not been verified yet.</Empty>
            ) : (
              <ul className="grid gap-2 sm:grid-cols-2">
                {record.facilities.map((f) => (
                  <li key={f.id} className="rounded-lg border border-border p-3 text-sm">
                    <span className="font-medium text-foreground">{f.name}</span>
                    {f.description ? (
                      <span className="block text-xs text-muted-foreground">{f.description}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </Section>
        </div>

        <aside className="space-y-6">
          <Section title="Key facts">
            <dl className="space-y-3 text-sm">
              {[
                { k: "Institution type", v: u.type },
                { k: "Region", v: record.region?.name ?? "Not yet verified" },
                { k: "City", v: u.city ?? "Not yet verified" },
                { k: "Established", v: u.yearEstablished ?? "Not yet verified" },
                { k: "Generation", v: record.generation?.name ?? "Not yet verified" },
                { k: "Motto", v: u.motto ?? "Not yet verified" },
              ].map((row) => (
                <div key={row.k} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{row.k}</dt>
                  <dd className="text-right font-medium text-foreground">{row.v}</dd>
                </div>
              ))}
            </dl>
          </Section>

          {record.statistics.length ? (
            <Section title="Statistics">
              <ul className="space-y-2 text-sm">
                {record.statistics.map((s) => (
                  <li key={s.id} className="flex justify-between gap-4">
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className="font-medium text-foreground">{s.value}</span>
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          <Section title="Contact">
            {record.contact ? (
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {record.contact.website ? (
                    <a
                      href={record.contact.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:underline"
                    >
                      {record.contact.website}
                    </a>
                  ) : (
                    "Website not yet verified"
                  )}
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {record.contact.email ?? "Email not yet verified"}
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {record.contact.phone ?? "Phone not yet verified"}
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {record.contact.address ?? "Address not yet verified"}
                </li>
              </ul>
            ) : (
              <Empty>Contact details have not been verified yet.</Empty>
            )}
          </Section>

          <Section title="Sources">
            {record.sources.length === 0 ? (
              <Empty>No sources recorded yet.</Empty>
            ) : (
              <ul className="space-y-3 text-sm">
                {record.sources.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                    >
                      {s.sourceName} <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Last verified: {s.lastVerified ?? "unknown"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        </aside>
      </div>
    </SiteLayout>
  );
}
