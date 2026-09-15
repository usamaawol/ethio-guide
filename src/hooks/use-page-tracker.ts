/**
 * Tracks page views to Firestore on every route change.
 * Uses the current authenticated user's UID when available.
 */
import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { trackPageView } from "@/lib/analytics";
import { useAuth } from "@/lib/auth-context";

export function usePageTracker() {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    void trackPageView(location.pathname, user?.uid);
  }, [location.pathname, user?.uid]);
}
