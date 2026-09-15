/**
 * React context that exposes the current Firebase user everywhere in the app.
 */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthChange, completeGoogleRedirectSignIn, type AuthUser } from "./auth";
import { upsertUserRecord } from "./analytics";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Finish any sign-in started via redirect (e.g. after a full-page Google
    // auth redirect and back). onAuthStateChanged below also picks the user up,
    // but completing the redirect clears the pending state properly.
    void completeGoogleRedirectSignIn();
    const unsub = onAuthChange((u) => {
      setUser(u);
      setLoading(false);
      if (u) {
        // Record user in Firestore so admin dashboard can list them
        void upsertUserRecord({
          uid: u.uid,
          email: u.email,
          displayName: u.displayName,
          photoURL: u.photoURL,
        });
      }
    });
    return unsub;
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
