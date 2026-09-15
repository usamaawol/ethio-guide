import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ExternalLink, Globe, Mail, MapPin, Phone, Building2, BookOpen, Users, Award, Newspaper, Printer } from "lucide-react";

import { CampusExplorer } from "@/components/site/CampusExplorer";
import { LoginRequired } from "@/components/site/LoginRequired";
import { SiteLayout } from "@/components/site/SiteLayout";
import { UniversityMap } from "@/components/site/UniversityMap";
import { VerificationBadge } from "@/components/site/VerificationBadge";
import { fieldLabel, getRecordBySlug, reportedGeneration, reportedRankingFor } from "@/lib/repository";

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
        { title: `${u.name} | ETHIO UNIVERSITY GUIDE` },
        { name: "description", content: description.slice(0, 155) },
        { property: "og:title", content: `${u.name} | ETHIO UNIVERSITY GUIDE` },
        { property: "og:description", content: description.slice(0, 155) },
      ],
    };
  },
  component: UniversityDetail,
});

function Section({
  title,
  id,
  children,
  note,
  icon,
}: {
  title: string;
  id?: string;
  children: React.ReactNode;
  note?: string;
  icon?: React.ReactNode;
}) {
  return (
    <section id={id} className="rounded-xl border border-border bg-card p-6">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
        {icon}
        {title}
      </h2>
      {note ? <p className="mt-1 text-xs text-muted-foreground">{note}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

const Empty = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm italic text-muted-foreground">{children}</p>
);

function GenerationBlock({
  generationName,
  universityName,
  shortName,
}: {
  generationName: string | null;
  universityName: string;
  shortName: string;
}) {
  const reported = reportedGeneration(universityName, shortName);

  return (
    <div className="rounded-lg border border-border bg-secondary/30 p-4 text-sm">
      <p className="font-medium text-foreground">
        Generation:{" "}
        <span className="text-primary">
          {generationName ?? "Not yet verified"}
        </span>
      </p>
      {reported ? (
        <div className="mt-2 space-y-1 text-xs text-muted-foreground">
          <p>
            Classification source:{" "}
            <span className="font-medium text-foreground">{reported.source}</span>
          </p>
          <p>
            Status:{" "}
            <span className="font-medium text-foreground">
              {reported.verificationStatus.replace(/_/g, " ")}
            </span>
          </p>
          {reported.notes ? (
            <p className="italic">{reported.notes}</p>
          ) : null}
        </div>
      ) : !generationName ? (
        <p className="mt-1 text-xs text-muted-foreground">
          Generation classification has not been verified from an official source.
        </p>
      ) : null}
    </div>
  );
}

function RankingBlock({ universityName, shortName }: { universityName: string; shortName: string }) {
  const ranking = reportedRankingFor(universityName, shortName);
  if (!ranking) return null;
  return (
    <div className="rounded-lg border border-border bg-secondary/30 p-4 text-sm">
      <p className="font-medium text-foreground">
        Reported 2025 Ranking:{" "}
        <span className="text-primary">#{ranking.rank}</span>
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Source: {ranking.rankingSource}
      </p>
      <p className="mt-0.5 text-xs italic text-muted-foreground">{ranking.notes}</p>
      <div className="mt-2">
        <VerificationBadge status={ranking.verificationStatus} />
      </div>
    </div>
  );
}

function UniversityDetail() {
  const record = Route.useLoaderData();
  const u = record.university;

  return (
    <SiteLayout>
      {/* HERO */}
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <Link to="/universities" className="text-xs text-primary-foreground/75 hover:underline">
            ← All universities
          </Link>
          <div className="mt-4 flex flex-wrap items-start gap-5">
            <div
              className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-primary-foreground/15 text-lg font-bold"
              aria-label={`${u.shortName} logo`}
            >
              {u.logoText}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl font-bold sm:text-4xl">{u.name}</h1>
              {u.amharicName ? (
                <p className="mt-1 text-lg text-primary-foreground/75">{u.amharicName}</p>
              ) : null}
              <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-primary-foreground/85">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {record.region?.name ?? "Region not yet verified"}
                  {u.city ? ` · ${u.city}` : ""}
                </span>
                <span>· {u.type}</span>
                <span>· Est. {u.yearEstablished ?? "year not yet verified"}</span>
                <span>· {record.generation?.name ?? "Generation not yet verified"}</span>
              </p>
              {u.motto ? (
                <p className="mt-2 text-sm italic text-primary-foreground/75">"{u.motto}"</p>
              ) : null}
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

      {/* QUICK NAVIGATION */}
      <LoginRequired>
      <nav
        aria-label="Profile sections"
        className="sticky top-[57px] z-30 hidden border-b border-border bg-background/90 backdrop-blur lg:block"
      >
        <div className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex gap-1 py-2 text-sm">
            {[
              { href: "#overview", label: "Overview" },
              { href: "#academics", label: "Academics" },
              { href: "#campuses", label: "Campuses & Map" },
              { href: "#history", label: "History" },
              { href: "#leadership", label: "Leadership" },
              { href: "#facilities", label: "Facilities" },
              { href: "#contact", label: "Contact" },
              { href: "#sources", label: "Sources" },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        {/* MAIN COLUMN */}
        <div className="space-y-6 lg:col-span-2">

          {/* OVERVIEW */}
          <Section id="overview" title="Overview" icon={<BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />}>
            {u.overview ? (
              <p className="text-sm leading-relaxed text-muted-foreground">{u.overview}</p>
            ) : (
              <Empty>Overview not yet available.</Empty>
            )}
            {u.mission ? (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-foreground">Mission</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{u.mission}</p>
              </div>
            ) : null}
            {u.vision ? (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-foreground">Vision</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{u.vision}</p>
              </div>
            ) : null}
            {u.values.length > 0 ? (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-foreground">Values</h3>
                <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                  {u.values.map((v) => (
                    <li key={v.name} className="rounded-lg border border-border p-3 text-sm">
                      <p className="font-medium text-foreground">{v.name}</p>
                      {v.description ? (
                        <p className="mt-1 text-xs text-muted-foreground">{v.description}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {u.goals.length > 0 ? (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-foreground">Goals</h3>
                <ol className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {u.goals.map((g, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="flex-shrink-0 text-xs font-bold text-primary">{i + 1}.</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </Section>

          {/* LEADERSHIP MESSAGE */}
          {record.leadership ? (
            <Section
              id="leadership"
              title={record.leadership.title}
              icon={<Users className="h-5 w-5 text-primary" aria-hidden="true" />}
            >
              {record.leadership.personName ? (
                <p className="mb-3 text-sm font-medium text-foreground">
                  {record.leadership.personName}
                  {record.leadership.personTitle ? (
                    <span className="font-normal text-muted-foreground">
                      {" · "}{record.leadership.personTitle}
                    </span>
                  ) : null}
                </p>
              ) : null}
              <div className="space-y-3">
                {record.leadership.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-3">
                <VerificationBadge status={record.leadership.verificationStatus} />
              </div>
            </Section>
          ) : null}

          {/* ACADEMIC UNITS */}
          <Section
            id="academics"
            title="Academic units"
            note="Colleges, schools, institutes and centres taken from official sources."
            icon={<Building2 className="h-5 w-5 text-primary" aria-hidden="true" />}
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
                    {unit.description ? (
                      <p className="mt-1 text-xs text-muted-foreground">{unit.description}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}

            {record.departments.length > 0 ? (
              <div className="mt-5">
                <h3 className="text-sm font-semibold text-foreground">Departments</h3>
                <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                  {record.departments.map((d) => (
                    <li key={d.id} className="rounded border border-border px-3 py-2 text-xs text-foreground">
                      {d.name}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {record.programs.length > 0 ? (
              <div className="mt-5">
                <h3 className="text-sm font-semibold text-foreground">Programs</h3>
                <ul className="mt-2 space-y-2">
                  {record.programs.map((p) => (
                    <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 rounded border border-border px-3 py-2 text-xs">
                      <span className="font-medium text-foreground">{p.name}</span>
                      <span className="text-muted-foreground">
                        {p.degreeLevel === "Unknown" ? "Degree level not yet verified" : p.degreeLevel}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {record.dataNotes?.length ? (
              <div className="mt-4 rounded-lg border border-dashed border-border p-3">
                {record.dataNotes.map((note, i) => (
                  <p key={i} className="text-xs italic text-muted-foreground">{note}</p>
                ))}
              </div>
            ) : null}

            {record.academicFields?.length ? (
              <div className="mt-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Academic fields
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {record.academicFields.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-border px-3 py-1 text-xs text-foreground"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {record.degreeLevels?.length ? (
              <div className="mt-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Degree levels
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {record.degreeLevels.map((d) => (
                    <span
                      key={d}
                      className="rounded-full border border-border px-3 py-1 text-xs text-foreground"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </Section>

          {/* ORGANIZATIONAL STRUCTURE */}
          {record.orgUnits.length > 0 ? (
            <Section title="Organizational structure" note="Administrative and governance structure — not classified as academic departments.">
              <ul className="space-y-1 text-sm text-muted-foreground">
                {record.orgUnits
                  .filter((o) => !o.parentId)
                  .map((root) => (
                    <OrgNode key={root.id} unit={root} allUnits={record.orgUnits} depth={0} />
                  ))}
              </ul>
            </Section>
          ) : null}

          {/* CAMPUSES & MAP */}
          <Section
            id="campuses"
            title="Campuses & Map"
            icon={<MapPin className="h-5 w-5 text-primary" aria-hidden="true" />}
          >
            {/* Interactive Google Map for university coordinates */}
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Interactive Map</h3>
              <UniversityMap
                name={u.name}
                coordinates={u.coordinates}
                googleMapsUrl={u.googleMapsUrl}
                places={record.campuses.map((c) => c.name)}
              />
            </div>

            {/* Campus Explorer */}
            {record.campuses.length > 0 ? (
              <div>
                <h3 className="mb-3 text-sm font-semibold text-foreground">Explore Campuses</h3>
                <CampusExplorer
                  universityName={u.name}
                  campuses={record.campuses}
                  buildings={record.buildings}
                  photos={record.photos}
                />
              </div>
            ) : (
              <Empty>Campus information has not been verified yet.</Empty>
            )}
          </Section>

          {/* HISTORY */}
          <Section id="history" title="History & Timeline">
            {/* Conflicting establishment claims */}
            {record.establishmentClaims && record.establishmentClaims.length > 1 ? (
              <div className="mb-4 rounded-lg border border-warning/30 bg-warning/10 p-4">
                <p className="text-sm font-semibold text-foreground">Conflicting establishment years</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Different sources report different establishment years. Both are shown rather than merged.
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  {record.establishmentClaims.map((ec, i) => (
                    <li key={i} className="flex items-baseline gap-2">
                      <span className="font-semibold text-foreground">{ec.year}</span>
                      <span className="text-xs text-muted-foreground">— {ec.sourceLabel}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {record.history.length === 0 ? (
              <Empty>No verified historical milestones recorded yet.</Empty>
            ) : (
              <ol className="space-y-4 border-l-2 border-primary/20 pl-5">
                {record.history.map((h) => (
                  <li key={h.id} className="relative">
                    <span className="absolute -left-[1.4rem] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
                    <p className="text-sm font-semibold text-foreground">
                      {h.year} — {h.title}
                    </p>
                    {h.description ? (
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {h.description}
                      </p>
                    ) : null}
                    {h.verificationStatus !== "verified" ? (
                      <div className="mt-1">
                        <VerificationBadge status={h.verificationStatus} />
                      </div>
                    ) : null}
                  </li>
                ))}
              </ol>
            )}
          </Section>

          {/* FACILITIES */}
          <Section id="facilities" title="Facilities & services">
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

            {/* Library */}
            {record.library ? (
              <div className="mt-5">
                <h3 className="text-sm font-semibold text-foreground">Library</h3>
                {record.library.description ? (
                  <p className="mt-1 text-sm text-muted-foreground">{record.library.description}</p>
                ) : null}
                {record.library.services.length > 0 ? (
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {record.library.services.map((s) => (
                      <li
                        key={s}
                        className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="mt-2">
                  <VerificationBadge status={record.library.verificationStatus} />
                </div>
              </div>
            ) : null}
          </Section>

          {/* NEWS */}
          {record.news && record.news.length > 0 ? (
            <Section
              title="Recent news & partnerships"
              icon={<Newspaper className="h-5 w-5 text-primary" aria-hidden="true" />}
            >
              <ul className="space-y-4">
                {record.news.map((item) => (
                  <li key={item.id} className="rounded-lg border border-border p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                    {item.summary ? (
                      <p className="mt-1 text-sm text-muted-foreground">{item.summary}</p>
                    ) : null}
                    {item.bullets.length > 0 ? (
                      <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                        {item.bullets.map((b, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-primary">·</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <p className="mt-2 text-xs text-muted-foreground">
                      Source:{" "}
                      {item.sourceUrl ? (
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline"
                        >
                          {item.sourceName}
                        </a>
                      ) : (
                        item.sourceName
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-6">

          {/* KEY FACTS */}
          <Section id="keyfacts" title="Key facts">
            <dl className="space-y-3 text-sm">
              {[
                { k: "Institution type", v: u.type },
                { k: "Region", v: record.region?.name ?? "Not yet verified" },
                { k: "City", v: u.city ?? "Not yet verified" },
                { k: "Established", v: u.yearEstablished ?? "Not yet verified" },
                { k: "Generation", v: record.generation?.name ?? "Not yet verified" },
                { k: "Motto", v: u.motto ?? "Not available" },
                ...(u.country ? [{ k: "Country", v: u.country }] : []),
              ].map((row) => (
                <div key={row.k} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{row.k}</dt>
                  <dd className="text-right font-medium text-foreground">{row.v}</dd>
                </div>
              ))}
            </dl>
          </Section>

          {/* GENERATION VERIFICATION */}
          <div>
            <h2 className="mb-2 text-sm font-semibold text-foreground">Generation classification</h2>
            <GenerationBlock
              generationName={record.generation?.name ?? null}
              universityName={u.name}
              shortName={u.shortName}
            />
          </div>

          {/* REPORTED RANKING */}
          <div>
            <h2 className="mb-2 text-sm font-semibold text-foreground">Reported ranking</h2>
            <RankingBlock universityName={u.name} shortName={u.shortName} />
          </div>

          {/* STATISTICS */}
          {record.statistics.length ? (
            <Section title="Statistics" note="Figures from official or third-party sources. Labelled accordingly.">
              <ul className="space-y-2 text-sm">
                {record.statistics.map((s) => (
                  <li key={s.id}>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">{s.label}</span>
                      <span className="font-medium text-foreground">{s.value}</span>
                    </div>
                    {s.note ? (
                      <p className="text-xs italic text-muted-foreground">{s.note}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {/* PROFILE FACTS (third-party) */}
          {record.profileFacts && record.profileFacts.length > 0 ? (
            <Section title="Institutional profile" note="Third-party reported information. 'Not reported' means unavailable in the source.">
              <dl className="space-y-2 text-xs">
                {record.profileFacts.map((row) => (
                  <div key={row.label} className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">{row.label}</dt>
                    <dd className="text-right font-medium text-foreground">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </Section>
          ) : null}

          {/* ADMISSION */}
          {record.admission && record.admission.length > 0 ? (
            <Section title="Admission" note="Verify current requirements directly with the university.">
              <dl className="space-y-2 text-xs">
                {record.admission.map((row) => (
                  <div key={row.label} className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">{row.label}</dt>
                    <dd className="text-right font-medium text-foreground">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </Section>
          ) : null}

          {/* TUITION */}
          {record.tuition && record.tuition.length > 0 ? (
            <Section title="Tuition (indicative)" note="Third-party indicative information. Confirm with the university.">
              <dl className="space-y-2 text-xs">
                {record.tuition.map((row) => (
                  <div key={row.label} className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">{row.label}</dt>
                    <dd className="text-right font-medium text-foreground">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </Section>
          ) : null}

          {/* CONTACT */}
          <Section id="contact" title="Contact" icon={<Globe className="h-4 w-4 text-primary" aria-hidden="true" />}>
            {record.contact ? (
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Globe className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  {record.contact.website ? (
                    <a
                      href={record.contact.website}
                      target="_blank"
                      rel="noreferrer"
                      className="break-all text-primary hover:underline"
                    >
                      {record.contact.website}
                    </a>
                  ) : (
                    "Website not yet verified"
                  )}
                </li>
                {record.contact.email ? (
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    <a href={`mailto:${record.contact.email}`} className="text-primary hover:underline">
                      {record.contact.email}
                    </a>
                  </li>
                ) : null}
                {record.contact.alternateEmail ? (
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    <a href={`mailto:${record.contact.alternateEmail}`} className="text-primary hover:underline">
                      {record.contact.alternateEmail}
                    </a>
                  </li>
                ) : null}
                {record.contact.phone ? (
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    <a href={`tel:${record.contact.phone}`} className="hover:text-foreground">
                      {record.contact.phone}
                    </a>
                  </li>
                ) : null}
                {record.contact.mobile ? (
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    <a href={`tel:${record.contact.mobile}`} className="hover:text-foreground">
                      {record.contact.mobile} (mobile)
                    </a>
                  </li>
                ) : null}
                {record.contact.fax ? (
                  <li className="flex items-center gap-2">
                    <Printer className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    {record.contact.fax} (fax)
                  </li>
                ) : null}
                {record.contact.address || record.contact.poBox ? (
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    <span>
                      {record.contact.address ?? ""}
                      {record.contact.poBox ? ` P.O. Box ${record.contact.poBox}` : ""}
                    </span>
                  </li>
                ) : null}
                {record.contact.contactPerson ? (
                  <li className="text-xs">
                    Contact: {record.contact.contactPerson}
                    {record.contact.contactPersonTitle
                      ? ` (${record.contact.contactPersonTitle})`
                      : ""}
                  </li>
                ) : null}
              </ul>
            ) : (
              <Empty>Contact details have not been verified yet.</Empty>
            )}
          </Section>

          {/* RESOURCES */}
          {record.resources && record.resources.length > 0 ? (
            <Section title="Resources">
              <ul className="space-y-1 text-sm">
                {record.resources.map((r, i) => (
                  <li key={i}>
                    {r.url ? (
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        {r.label} <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground">{r.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {/* SOURCES & VERIFICATION */}
          <Section
            id="sources"
            title="Sources & Verification"
            icon={<Award className="h-4 w-4 text-primary" aria-hidden="true" />}
          >
            {record.sources.length === 0 ? (
              <Empty>No sources recorded yet.</Empty>
            ) : (
              <ul className="space-y-4 text-sm">
                {record.sources.map((s) => (
                  <li key={s.id} className="rounded-lg border border-border p-3">
                    <a
                      href={s.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                    >
                      {s.sourceName} <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <p className="mt-1 text-xs capitalize text-muted-foreground">
                      {s.sourceType.replace(/_/g, " ")}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <VerificationBadge status={s.verificationStatus} />
                      {s.lastVerified ? (
                        <span className="text-xs text-muted-foreground">
                          Last verified: {s.lastVerified}
                        </span>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Section>

          {/* COMPARE & EXPLORE ACTIONS */}
          <div className="flex flex-col gap-2">
            <Link
              to="/compare"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Compare with other universities
            </Link>
            <Link
              to="/map"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              View on map
            </Link>
            <Link
              to="/ai-advisor"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Ask AI about this university
            </Link>
          </div>
        </aside>
      </div>
      </LoginRequired>
    </SiteLayout>
  );
}

function OrgNode({
  unit,
  allUnits,
  depth,
}: {
  unit: { id: string; name: string; parentId: string | null };
  allUnits: Array<{ id: string; name: string; parentId: string | null }>;
  depth: number;
}) {
  const children = allUnits.filter((u) => u.parentId === unit.id);
  return (
    <li style={{ paddingLeft: `${depth * 16}px` }}>
      <span className={depth === 0 ? "font-semibold text-foreground" : "text-muted-foreground"}>
        {depth > 0 ? "└ " : ""}{unit.name}
      </span>
      {children.length > 0 ? (
        <ul className="space-y-1 text-sm">
          {children.map((child) => (
            <OrgNode key={child.id} unit={child} allUnits={allUnits} depth={depth + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
