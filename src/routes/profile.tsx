import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LoginRequired } from "@/components/site/LoginRequired";
import { PageHeader } from "@/components/site/PageHeader";
import { useAuth } from "@/lib/auth-context";
import { signOut } from "@/lib/auth";
import { LogOut, Mail, User } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Profile | ETHIO UNIVERSITY GUIDE" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <SiteLayout>
      <LoginRequired>
        <ProfileContent />
      </LoginRequired>
    </SiteLayout>
  );
}

function ProfileContent() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="My Profile"
        description="Your ETHIO UNIVERSITY GUIDE account details."
      />
      <div className="mx-auto max-w-xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-4">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName ?? "User"}
                referrerPolicy="no-referrer"
                className="h-16 w-16 rounded-full border border-border"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                {(user.displayName ?? user.email ?? "U")[0]?.toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-lg font-semibold text-foreground">
                {user.displayName ?? "Anonymous User"}
              </p>
              {user.isAdmin && (
                <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                  Administrator
                </span>
              )}
            </div>
          </div>

          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <dt className="text-muted-foreground">Email</dt>
              <dd className="ml-auto font-medium text-foreground">{user.email ?? "—"}</dd>
            </div>
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <dt className="text-muted-foreground">User ID</dt>
              <dd className="ml-auto font-mono text-xs text-muted-foreground">{user.uid}</dd>
            </div>
          </dl>

          <div className="mt-6 rounded-lg border border-dashed border-border bg-secondary/30 p-3 text-xs text-muted-foreground">
            <strong className="text-foreground">Admin setup:</strong> To grant yourself admin access, copy your User ID above and add it to the{" "}
            <code className="font-mono">ADMIN_UIDS</code> array in{" "}
            <code className="font-mono">src/lib/auth.ts</code>.
          </div>

          <button
            type="button"
            onClick={() => void signOut()}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>
    </>
  );
}
