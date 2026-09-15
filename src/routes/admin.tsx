import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Users,
  Eye,
  TrendingUp,
  Calendar,
  BarChart3,
  Shield,
  Globe,
  RefreshCw,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { useAuth } from "@/lib/auth-context";
import {
  getPageViewStats,
  getRecentPageViews,
  getAllUsers,
  type PageViewRecord,
  type UserRecord,
} from "@/lib/analytics";
import { getAllRecords } from "@/lib/repository";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | ETHIO UNIVERSITY GUIDE" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <SiteLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </SiteLayout>
    );
  }

  if (!user) {
    return (
      <SiteLayout>
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="max-w-sm text-center">
            <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
            <h1 className="mt-4 text-xl font-bold text-foreground">Sign in required</h1>
            <p className="mt-2 text-sm text-muted-foreground">You must be signed in to access the admin dashboard.</p>
          </div>
        </div>
      </SiteLayout>
    );
  }

  if (!user.isAdmin) {
    return (
      <SiteLayout>
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="max-w-md text-center">
            <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
            <h1 className="mt-4 text-xl font-bold text-foreground">Admin access required</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Your account does not have admin privileges. To get access, copy your User ID and add
              it to the <code className="rounded bg-secondary px-1 font-mono text-xs">ADMIN_UIDS</code> list in{" "}
              <code className="rounded bg-secondary px-1 font-mono text-xs">src/lib/auth.ts</code>.
            </p>
            <div className="mt-4 rounded-lg border border-border bg-secondary/40 p-3">
              <p className="text-xs text-muted-foreground">Your UID:</p>
              <p className="mt-1 break-all font-mono text-sm font-bold text-foreground">{user.uid}</p>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Admin"
        title="Dashboard"
        description="Monitor visitors, registered users, and platform activity in real time."
      />
      <AdminDashboard />
    </SiteLayout>
  );
}

// ── Types ──────────────────────────────────────────────────────────────────────

interface Stats {
  total: number;
  byPath: Record<string, number>;
  today: number;
  thisWeek: number;
}

// ── Dashboard ──────────────────────────────────────────────────────────────────

function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentViews, setRecentViews] = useState<PageViewRecord[]>([]);
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"overview" | "pages" | "users" | "universities">("overview");

  const records = getAllRecords();

  const load = async () => {
    setLoading(true);
    const [s, rv, u] = await Promise.all([
      getPageViewStats(),
      getRecentPageViews(100),
      getAllUsers(),
    ]);
    setStats(s);
    setRecentViews(rv);
    setUsers(u);
    setLoading(false);
  };

  useEffect(() => { void load(); }, []);

  const statCards = [
    {
      icon: Eye,
      label: "Total page views",
      value: stats?.total ?? "—",
      sub: "Last 500 recorded",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: Calendar,
      label: "Views today",
      value: stats?.today ?? "—",
      sub: "Since midnight",
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      icon: TrendingUp,
      label: "Views this week",
      value: stats?.thisWeek ?? "—",
      sub: "Last 7 days",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      icon: Users,
      label: "Registered users",
      value: users.length,
      sub: "Google sign-in",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      icon: Globe,
      label: "Universities in guide",
      value: records.length,
      sub: "Active records",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: BarChart3,
      label: "Unique pages tracked",
      value: stats ? Object.keys(stats.byPath).length : "—",
      sub: "Distinct paths",
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
  ];

  const tabs = [
    { id: "overview" as const, label: "Overview" },
    { id: "pages" as const, label: "Page Views" },
    { id: "users" as const, label: "Users" },
    { id: "universities" as const, label: "Universities" },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      {/* Refresh */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {loading ? "Loading data…" : "Data loaded from Firestore"}
        </p>
        <button
          type="button"
          onClick={() => void load()}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-xl border border-border bg-card p-5">
            <div className={`inline-flex rounded-lg p-2 ${card.bg}`}>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
            <p className="mt-3 text-2xl font-bold text-foreground">{card.value}</p>
            <p className="text-sm font-medium text-foreground">{card.label}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-border bg-secondary/30 p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-colors ${
              tab === t.id
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "overview" && (
        <OverviewTab stats={stats} recentViews={recentViews} users={users} />
      )}
      {tab === "pages" && <PagesTab stats={stats} recentViews={recentViews} />}
      {tab === "users" && <UsersTab users={users} />}
      {tab === "universities" && <UniversitiesTab records={records} />}
    </div>
  );
}

// ── Overview tab ───────────────────────────────────────────────────────────────

function OverviewTab({
  stats,
  recentViews,
  users,
}: {
  stats: Stats | null;
  recentViews: PageViewRecord[];
  users: UserRecord[];
}) {
  // Top 10 pages
  const topPages = stats
    ? Object.entries(stats.byPath)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
    : [];

  const maxViews = topPages[0]?.[1] ?? 1;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Top pages */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">Top pages</h2>
        {topPages.length === 0 ? (
          <p className="mt-3 text-sm italic text-muted-foreground">No page view data yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {topPages.map(([path, count]) => (
              <li key={path}>
                <div className="flex items-center justify-between text-xs">
                  <span className="truncate font-mono text-foreground">{path}</span>
                  <span className="ml-2 flex-shrink-0 font-semibold text-foreground">{count}</span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${(count / maxViews) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recent activity */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">Recent activity</h2>
        <ul className="mt-3 divide-y divide-border">
          {recentViews.slice(0, 15).map((v) => (
            <li key={v.id} className="flex items-center justify-between gap-2 py-2 text-xs">
              <span className="truncate font-mono text-foreground">{v.path}</span>
              <span className="flex-shrink-0 text-muted-foreground">
                {v.timestamp
                  ? v.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                  : "—"}
              </span>
            </li>
          ))}
          {recentViews.length === 0 && (
            <li className="py-3 text-sm italic text-muted-foreground">No recent views yet.</li>
          )}
        </ul>
      </div>

      {/* Recent users */}
      <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
        <h2 className="text-sm font-semibold text-foreground">Recently active users ({users.length})</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[500px] text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-2 text-left font-semibold text-muted-foreground">User</th>
                <th className="pb-2 text-left font-semibold text-muted-foreground">Email</th>
                <th className="pb-2 text-left font-semibold text-muted-foreground">Last seen</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 20).map((u) => (
                <tr key={u.uid} className="border-b border-border/50">
                  <td className="py-2 pr-4">
                    <div className="flex items-center gap-2">
                      {u.photoURL ? (
                        <img src={u.photoURL} alt="" className="h-6 w-6 rounded-full" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                          {(u.displayName ?? u.email ?? "?")[0]?.toUpperCase()}
                        </div>
                      )}
                      <span className="font-medium text-foreground">{u.displayName ?? "—"}</span>
                    </div>
                  </td>
                  <td className="py-2 pr-4 text-muted-foreground">{u.email ?? "—"}</td>
                  <td className="py-2 text-muted-foreground">
                    {u.lastSeen ? u.lastSeen.toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-4 text-center italic text-muted-foreground">
                    No registered users yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Pages tab ──────────────────────────────────────────────────────────────────

function PagesTab({
  stats,
  recentViews,
}: {
  stats: Stats | null;
  recentViews: PageViewRecord[];
}) {
  const allPages = stats
    ? Object.entries(stats.byPath).sort((a, b) => b[1] - a[1])
    : [];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">All pages by views</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[400px] text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-2 text-left font-semibold text-muted-foreground">#</th>
                <th className="pb-2 text-left font-semibold text-muted-foreground">Path</th>
                <th className="pb-2 text-right font-semibold text-muted-foreground">Views</th>
              </tr>
            </thead>
            <tbody>
              {allPages.map(([path, count], i) => (
                <tr key={path} className="border-b border-border/40">
                  <td className="py-1.5 pr-3 text-muted-foreground">{i + 1}</td>
                  <td className="py-1.5 pr-4 font-mono text-foreground">{path}</td>
                  <td className="py-1.5 text-right font-semibold text-foreground">{count}</td>
                </tr>
              ))}
              {allPages.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-4 text-center italic text-muted-foreground">
                    No data yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">Recent page view log</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[500px] text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-2 text-left font-semibold text-muted-foreground">Path</th>
                <th className="pb-2 text-left font-semibold text-muted-foreground">User</th>
                <th className="pb-2 text-left font-semibold text-muted-foreground">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentViews.map((v) => (
                <tr key={v.id} className="border-b border-border/40">
                  <td className="py-1.5 pr-4 font-mono text-foreground">{v.path}</td>
                  <td className="py-1.5 pr-4 text-muted-foreground">
                    {v.userUid ? v.userUid.slice(0, 10) + "…" : "Guest"}
                  </td>
                  <td className="py-1.5 text-muted-foreground">
                    {v.timestamp
                      ? v.timestamp.toLocaleString([], {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"}
                  </td>
                </tr>
              ))}
              {recentViews.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-4 text-center italic text-muted-foreground">
                    No views recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Users tab ──────────────────────────────────────────────────────────────────

function UsersTab({ users }: { users: UserRecord[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">All registered users</h2>
        <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-foreground">
          {users.length} total
        </span>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[600px] text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-2 text-left font-semibold text-muted-foreground">Avatar</th>
              <th className="pb-2 text-left font-semibold text-muted-foreground">Name</th>
              <th className="pb-2 text-left font-semibold text-muted-foreground">Email</th>
              <th className="pb-2 text-left font-semibold text-muted-foreground">UID</th>
              <th className="pb-2 text-left font-semibold text-muted-foreground">Last seen</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.uid} className="border-b border-border/40">
                <td className="py-2 pr-3">
                  {u.photoURL ? (
                    <img src={u.photoURL} alt="" className="h-7 w-7 rounded-full" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {(u.displayName ?? u.email ?? "?")[0]?.toUpperCase()}
                    </div>
                  )}
                </td>
                <td className="py-2 pr-4 font-medium text-foreground">{u.displayName ?? "—"}</td>
                <td className="py-2 pr-4 text-muted-foreground">{u.email ?? "—"}</td>
                <td className="py-2 pr-4 font-mono text-muted-foreground">{u.uid.slice(0, 14)}…</td>
                <td className="py-2 text-muted-foreground">
                  {u.lastSeen
                    ? u.lastSeen.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })
                    : "—"}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center italic text-muted-foreground">
                  No users have signed in yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Universities tab ───────────────────────────────────────────────────────────

function UniversitiesTab({ records }: { records: ReturnType<typeof getAllRecords> }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Universities in the database</h2>
        <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-foreground">
          {records.length} records
        </span>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-2 text-left font-semibold text-muted-foreground">Name</th>
              <th className="pb-2 text-left font-semibold text-muted-foreground">Short</th>
              <th className="pb-2 text-left font-semibold text-muted-foreground">Region</th>
              <th className="pb-2 text-left font-semibold text-muted-foreground">Generation</th>
              <th className="pb-2 text-left font-semibold text-muted-foreground">Units</th>
              <th className="pb-2 text-left font-semibold text-muted-foreground">Depts</th>
              <th className="pb-2 text-left font-semibold text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.university.id} className="border-b border-border/40">
                <td className="py-1.5 pr-4 font-medium text-foreground">{r.university.name}</td>
                <td className="py-1.5 pr-4 text-muted-foreground">{r.university.shortName}</td>
                <td className="py-1.5 pr-4 text-muted-foreground">{r.region?.name ?? "—"}</td>
                <td className="py-1.5 pr-4 text-muted-foreground">{r.generation?.name ?? "—"}</td>
                <td className="py-1.5 pr-4 text-muted-foreground">{r.units.length}</td>
                <td className="py-1.5 pr-4 text-muted-foreground">{r.departments.length}</td>
                <td className="py-1.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      r.university.verificationStatus === "verified"
                        ? "bg-green-500/15 text-green-600"
                        : r.university.verificationStatus === "partially_verified"
                        ? "bg-amber-500/15 text-amber-600"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {r.university.verificationStatus.replace(/_/g, " ")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
