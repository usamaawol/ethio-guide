/**
 * Wraps any page that requires a signed-in user.
 *
 * - While auth is resolving   → spinner
 * - User is signed in         → renders children normally
 * - User is NOT signed in     → full-page Google sign-in gate
 *
 * The homepage (/) is never wrapped with this — it stays publicly accessible.
 */
import { useLocation } from "@tanstack/react-router";
import { toast } from "sonner";
import { signInWithGoogle } from "@/lib/auth";
import { useAuth } from "@/lib/auth-context";
import type { ReactNode } from "react";

// Human-readable page names for the gate headline
const PAGE_LABELS: Record<string, string> = {
  "/universities": "Browse Universities",
  "/programs": "Program Search",
  "/regions": "Universities by Region",
  "/generations": "University Generations",
  "/compare": "Compare Universities",
  "/map": "University Map",
  "/rankings": "2025 Rankings",
  "/ai-advisor": "AI University Advisor",
  "/about": "About",
  "/profile": "My Profile",
  "/admin": "Admin Dashboard",
};

function pageLabel(pathname: string): string {
  // exact match first
  if (PAGE_LABELS[pathname]) return PAGE_LABELS[pathname];
  // university profile
  if (pathname.startsWith("/universities/")) return "University Profile";
  return "this page";
}

// ── Loading spinner ──────────────────────────────────────────────────────────

function Spinner() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" aria-label="Loading">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    </div>
  );
}

// ── Sign-in gate ─────────────────────────────────────────────────────────────

function SignInGate({ pageName }: { pageName: string }) {
  const handleSignIn = async () => {
    const result = await signInWithGoogle();
    if (result.status === "error") {
      toast.error("Couldn't sign in with Google", { description: result.message });
    } else if (result.status === "redirecting") {
      toast.info("Redirecting to Google…");
    }
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <img
              src="/favicon.ico"
              alt="ETHIO UNIVERSITY GUIDE"
              className="h-14 w-14 rounded-xl object-contain"
            />
          </div>

          {/* Headline */}
          <h1 className="mt-5 text-center text-2xl font-bold text-foreground">
            Sign in to explore
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Create a free account or sign in with Google to access{" "}
            <span className="font-semibold text-foreground">{pageName}</span> and everything else on
            ETHIO UNIVERSITY GUIDE.
          </p>

          {/* What you get */}
          <ul className="mt-5 space-y-2 rounded-xl bg-secondary/40 px-4 py-3 text-sm text-muted-foreground">
            {[
              "Full university directory — all 39+ universities",
              "Department & program search",
              "Side-by-side university comparison",
              "Interactive maps & campus explorer",
              "AI University Advisor",
              "2025 rankings reference",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-primary" aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* Google sign-in button */}
          <button
            type="button"
            onClick={() => void handleSignIn()}
            className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-primary"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Disclaimer */}
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Free forever. No credit card. Your information is never sold.
          </p>
        </div>

        {/* Back link */}
        <p className="mt-4 text-center text-xs text-muted-foreground">
          <a href="/" className="text-primary hover:underline">
            ← Back to home page
          </a>
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

// ── Public export ────────────────────────────────────────────────────────────

export function LoginRequired({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Spinner />;
  if (!user) return <SignInGate pageName={pageLabel(location.pathname)} />;
  return <>{children}</>;
}
