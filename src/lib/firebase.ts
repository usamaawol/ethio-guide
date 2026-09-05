/**
 * Firebase initialisation for ETHIO UNIVERSITY GUIDE.
 *
 * The app currently reads its university data from the seeded repository in
 * `src/lib/repository.ts`. Firebase is initialised here so Firestore/Analytics
 * can be layered on without touching any UI code.
 *
 * The web API key is a publishable client key; it can be overridden through
 * VITE_FIREBASE_API_KEY.
 */
import { getApps, initializeApp, type FirebaseApp } from "firebase/app";

export const firebaseConfig = {
  apiKey:
    (import.meta.env["VITE_FIREBASE_API_KEY"] as string | undefined) ??
    "AIzaSyDUMMY-replace-with-project-web-api-key",
  authDomain: "ethio-university-guide.firebaseapp.com",
  projectId: "ethio-university-guide",
  storageBucket: "ethio-university-guide.firebasestorage.app",
  messagingSenderId: "468740150831",
  appId: "1:468740150831:web:fa42e4802f538efc6f58da",
  measurementId: "G-VR4N30G0M7",
};

export const isFirebaseConfigured = (): boolean =>
  Boolean(firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith("AIzaSyDUMMY"));

/** Returns the singleton Firebase app (browser only). */
export const getFirebaseApp = (): FirebaseApp | null => {
  if (typeof window === "undefined") return null;
  return getApps()[0] ?? initializeApp(firebaseConfig);
};

/** Starts Google Analytics when the environment supports it. Safe to call twice. */
export const initFirebaseAnalytics = async (): Promise<void> => {
  const app = getFirebaseApp();
  if (!app || !isFirebaseConfigured()) return;
  try {
    const { getAnalytics, isSupported } = await import("firebase/analytics");
    if (await isSupported()) getAnalytics(app);
  } catch {
    /* analytics is optional — never break the app for it */
  }
};
