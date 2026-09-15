/**
 * Firebase initialisation for ETHIO UNIVERSITY GUIDE.
 * Real API key is now wired in — Analytics, Auth, and Firestore are all available.
 */
import { getApps, initializeApp, type FirebaseApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyDDQgSmWNhKFgLpwYmE7kFcVO47lSmnstw",
  authDomain: "ethio-university-guide.firebaseapp.com",
  projectId: "ethio-university-guide",
  storageBucket: "ethio-university-guide.firebasestorage.app",
  messagingSenderId: "468740150831",
  appId: "1:468740150831:web:fa42e4802f538efc6f58da",
  measurementId: "G-VR4N30G0M7",
};

export const isFirebaseConfigured = (): boolean => true;

/** Returns the singleton Firebase app (browser only). */
export const getFirebaseApp = (): FirebaseApp | null => {
  if (typeof window === "undefined") return null;
  return getApps()[0] ?? initializeApp(firebaseConfig);
};

/** Starts Google Analytics when the environment supports it. */
export const initFirebaseAnalytics = async (): Promise<void> => {
  const app = getFirebaseApp();
  if (!app) return;
  try {
    const { getAnalytics, isSupported } = await import("firebase/analytics");
    if (await isSupported()) getAnalytics(app);
  } catch {
    /* analytics is optional */
  }
};
