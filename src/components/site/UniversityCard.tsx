import { Link } from "@tanstack/react-router";
import { MapPin, Building2 } from "lucide-react";

import { VerificationBadge } from "./VerificationBadge";
import type { UniversityRecord } from "@/data/types";

export function UniversityCard({ record }: { record: UniversityRecord }) {
  const u = record.university;
  return (
    <Link
      to="/universities/$slug"
      params={{ slug: u.slug }}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
          {u.logoText}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-foreground group-hover:text-primary">
            {u.name}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {record.region?.name ?? "Region not yet verified"}
            {u.city ? ` · ${u.city}` : ""}
          </p>
        </div>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {u.overview ?? "Overview not yet available."}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
        <VerificationBadge status={u.verificationStatus} lastVerified={u.lastVerified} />
        <span className="inline-flex items-center gap-1">
          <Building2 className="h-3.5 w-3.5" />
          {record.units.length ? `${record.units.length} academic units` : "Units not yet added"}
        </span>
        <span>· Est. {u.yearEstablished ?? "not yet verified"}</span>
      </div>
    </Link>
  );
}
