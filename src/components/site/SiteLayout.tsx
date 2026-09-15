import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { AuthProvider } from "@/lib/auth-context";
import { UserMenu } from "./UserMenu";
import { Toaster } from "@/components/ui/sonner";

const nav = [
  { to: "/universities", label: "Universities" },
  { to: "/programs", label: "Programs" },
  { to: "/regions", label: "Regions" },
  { to: "/generations", label: "Generations" },
  { to: "/map", label: "Map" },
  { to: "/rankings", label: "Rankings" },
  { to: "/compare", label: "Compare" },
  { to: "/ai-advisor", label: "AI Advisor" },
  { to: "/about", label: "About" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <AuthProvider>
      <Toaster />
      <div className="flex min-h-screen flex-col bg-background">
        <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="/favicon.ico"
                alt="ETHIO UNIVERSITY GUIDE logo"
                className="h-10 w-10 rounded-lg object-contain"
              />
              <span className="leading-tight">
                <span className="block text-sm font-bold text-foreground">
                  ETHIO UNIVERSITY GUIDE 🇪🇹
                </span>
                <span className="block text-[11px] text-muted-foreground">
                  University Guide for Ethiopian Students
                </span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  activeProps={{ className: "bg-secondary text-foreground" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side: user menu + mobile toggle */}
            <div className="flex items-center gap-2">
              <UserMenu />
              <button
                type="button"
                aria-label="Toggle navigation"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Mobile nav drawer */}
          {open ? (
            <nav
              className="border-t border-border bg-background px-4 pb-4 lg:hidden"
              aria-label="Mobile navigation"
            >
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                  activeProps={{ className: "bg-secondary text-foreground" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-border bg-secondary/40">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <div className="flex items-center gap-2">
                <img
                  src="/favicon.ico"
                  alt="ETHIO UNIVERSITY GUIDE"
                  className="h-8 w-8 rounded object-contain"
                />
                <p className="text-sm font-bold text-foreground">ETHIO UNIVERSITY GUIDE 🇪🇹</p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                An independent discovery platform for Ethiopian higher education. Information is
                shown only when it can be traced to an official source.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Explore</p>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {nav.slice(0, 5).map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="hover:text-foreground">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Data policy</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Unverified fields are labelled rather than guessed. Every university page lists the
                sources behind its data.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="italic">Discover. Explore. Compare. Choose.</span>
              </p>
            </div>
          </div>
          <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} ETHIO UNIVERSITY GUIDE — University Guide for Ethiopian
            Students
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}
