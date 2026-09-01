import type { VerificationStatus } from "@/data/types";
import { cn } from "@/lib/utils";

const map: Record<VerificationStatus, { label: string; className: string }> = {
  verified: { label: "Verified", className: "bg-success/15 text-success border-success/30" },
  partially_verified: {
    label: "Partially verified",
    className: "bg-warning/15 text-warning border-warning/30",
  },
  needs_verification: {
    label: "Needs verification",
    className: "bg-muted text-muted-foreground border-border",
  },
};

export function VerificationBadge({
  status,
  lastVerified,
  className,
}: {
  status: VerificationStatus;
  lastVerified?: string | null;
  className?: string;
}) {
  const item = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        item.className,
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {item.label}
      {lastVerified ? <span className="opacity-70">· {lastVerified}</span> : null}
    </span>
  );
}
