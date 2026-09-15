/**
 * Firebase Authentication helpers for ETHIO UNIVERSITY GUIDE.
 * Provides Google Sign-In, sign-out, and the admin UID allow-list.
 */
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { getFirebaseApp } from "./firebase";

export type AuthUser = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  isAdmin: boolean;
};

/**
 * Admin UIDs — add the Firebase UID of any administrator here.
 * The first login will show the UID in the admin welcome banner so you can
 * copy it and add it to this list.
 */
const ADMIN_UIDS: string[] = [
  // Add your Firebase UID here after first login, e.g.:
  // "abc123XYZyourFirebaseUID",
  "FwrIVU2w4Qemw4Ybq2ta06LW1oT2",
];

export const isAdmin = (uid: string): boolean => ADMIN_UIDS.includes(uid);

const getAuthInstance = () => {
  const app = getFirebaseApp();
  if (!app) throw new Error("Firebase app not initialised");
  return getAuth(app);
};

export type SignInResult =
  | { status: "signed-in"; user: AuthUser }
  | { status: "redirecting" }
  | { status: "cancelled" }
  | { status: "error"; message: string };

const friendlyAuthError = (err: unknown): string => {
  const code = (err as { code?: string } | null)?.code ?? "";
  switch (code) {
    case "auth/unauthorized-domain":
      return "This website's domain isn't authorised for Google sign-in yet. Add it in the Firebase console (Authentication → Sign-in method → Authorized domains).";
    case "auth/popup-blocked":
      return "Your browser blocked the sign-in pop-up. Click the button again and allow pop-ups, or try a different browser.";
    case "auth/network-request-failed":
    case "auth/timeout":
      return "A network problem prevented sign-in. Check your connection and try again.";
    case "auth/operation-not-supported-in-this-environment":
      return "Google sign-in isn't supported in this browser window. Open the site in a normal browser tab.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email but uses a different sign-in method. Sign in with that method instead.";
    case "auth/invalid-api-key":
      return "The Firebase API key is invalid. Check the project configuration.";
    default:
      return code ? `Google sign-in failed (${code}).` : "Google sign-in failed unexpectedly.";
  }
};

export const signInWithGoogle = async (): Promise<SignInResult> => {
  const auth = getAuthInstance();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  try {
    const result = await signInWithPopup(auth, provider);
    return { status: "signed-in", user: toAuthUser(result.user) };
  } catch (err) {
    const code = (err as { code?: string } | null)?.code ?? "";

    // Pop-up flows break where pop-ups are blocked or unsupported (mobile
    // browsers, embedded previews, strict pop-up blockers). The full-page
    // redirect flow works reliably there as a fallback.
    if (
      code === "auth/popup-blocked" ||
      code === "auth/operation-not-supported-in-this-environment"
    ) {
      try {
        await signInWithRedirect(auth, provider);
        return { status: "redirecting" };
      } catch (redirectErr) {
        console.error("Google redirect sign-in failed", redirectErr);
        return { status: "error", message: friendlyAuthError(redirectErr) };
      }
    }

    // User closed the pop-up / cancelled — not an error, just carry on.
    if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
      return { status: "cancelled" };
    }

    console.error("Google sign-in failed", err);
    return { status: "error", message: friendlyAuthError(err) };
  }
};

/**
 * Completes a sign-in started with signInWithRedirect. Call this on app start
 * (and after page reloads following a redirect sign-in) so the session is
 * picked up and the pop-up-free flow finishes cleanly.
 */
export const completeGoogleRedirectSignIn = async (): Promise<AuthUser | null> => {
  try {
    const auth = getAuthInstance();
    const result = await getRedirectResult(auth);
    return result ? toAuthUser(result.user) : null;
  } catch (err) {
    console.error("Google redirect sign-in result failed", err);
    return null;
  }
};

export const signOut = async (): Promise<void> => {
  const auth = getAuthInstance();
  await firebaseSignOut(auth);
};

export const onAuthChange = (cb: (user: AuthUser | null) => void): (() => void) => {
  const auth = getAuthInstance();
  return onAuthStateChanged(auth, (u) => cb(u ? toAuthUser(u) : null));
};

const toAuthUser = (u: User): AuthUser => ({
  uid: u.uid,
  displayName: u.displayName,
  email: u.email,
  photoURL: u.photoURL,
  isAdmin: isAdmin(u.uid),
});
