/**
 * Navbar user avatar / sign-in button.
 * Shows Google sign-in button when logged out, avatar + menu when signed in.
 */
import { Link } from "@tanstack/react-router";
import { LogOut, LayoutDashboard, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { signInWithGoogle, signOut } from "@/lib/auth";
import { useAuth } from "@/lib/auth-context";

export function UserMenu() {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSignIn = async () => {
    const result = await signInWithGoogle();
    if (result.status === "error") {
      toast.error("Couldn't sign in with Google", { description: result.message });
    } else if (result.status === "redirecting") {
      toast.info("Redirecting to Google…");
    }
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (loading) {
    return <div className="h-8 w-8 animate-pulse rounded-full bg-secondary" />;
  }

  if (!user) {
    return (
      <button
        type="button"
        onClick={() => void handleSignIn()}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
      >
        {/* Google icon */}
        <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
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
        Sign in
      </button>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg border border-border px-2 py-1.5 text-xs transition-colors hover:bg-secondary"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName ?? "User"}
            className="h-6 w-6 rounded-full"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {(user.displayName ?? user.email ?? "U")[0]?.toUpperCase()}
          </div>
        )}
        <span className="hidden max-w-[100px] truncate text-foreground sm:block">
          {user.displayName ?? user.email ?? "User"}
        </span>
        {user.isAdmin && (
          <span className="rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold text-primary-foreground">
            ADMIN
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-52 rounded-xl border border-border bg-card shadow-lg">
          <div className="border-b border-border px-4 py-3">
            <p className="truncate text-sm font-medium text-foreground">
              {user.displayName ?? "User"}
            </p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            <p className="mt-1 font-mono text-[10px] text-muted-foreground">
              UID: {user.uid.slice(0, 16)}…
            </p>
          </div>
          <ul className="py-1">
            {user.isAdmin && (
              <li>
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-secondary"
                >
                  <LayoutDashboard className="h-4 w-4" /> Admin Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-secondary"
              >
                <User className="h-4 w-4" /> My Profile
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  void signOut();
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-secondary"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
