/**
 * Page-view and event tracking for ETHIO UNIVERSITY GUIDE.
 * Uses Firebase Analytics + Firestore to store visitor/user data
 * that the admin dashboard can query.
 */
import { getFirebaseApp } from "./firebase";

// ── Page view tracking ────────────────────────────────────────────────────────

export const trackPageView = async (path: string, userUid?: string): Promise<void> => {
  const app = getFirebaseApp();
  if (!app || typeof window === "undefined") return;
  try {
    const { getFirestore, collection, addDoc, serverTimestamp } = await import("firebase/firestore");
    const db = getFirestore(app);
    await addDoc(collection(db, "pageViews"), {
      path,
      userUid: userUid ?? null,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      referrer: document.referrer || null,
    });
  } catch {
    /* non-critical */
  }
};

// ── User session tracking ─────────────────────────────────────────────────────

export const upsertUserRecord = async (user: {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}): Promise<void> => {
  const app = getFirebaseApp();
  if (!app || typeof window === "undefined") return;
  try {
    const { getFirestore, doc, setDoc, serverTimestamp } = await import("firebase/firestore");
    const db = getFirestore(app);
    await setDoc(
      doc(db, "users", user.uid),
      {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastSeen: serverTimestamp(),
      },
      { merge: true },
    );
  } catch {
    /* non-critical */
  }
};

// ── Admin dashboard queries ───────────────────────────────────────────────────

export interface PageViewRecord {
  id: string;
  path: string;
  userUid: string | null;
  timestamp: Date | null;
}

export interface UserRecord {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  lastSeen: Date | null;
}

export const getRecentPageViews = async (limit = 200): Promise<PageViewRecord[]> => {
  const app = getFirebaseApp();
  if (!app) return [];
  try {
    const { getFirestore, collection, query, orderBy, limit: fsLimit, getDocs } = await import(
      "firebase/firestore"
    );
    const db = getFirestore(app);
    const q = query(collection(db, "pageViews"), orderBy("timestamp", "desc"), fsLimit(limit));
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        path: data["path"] as string,
        userUid: data["userUid"] as string | null,
        timestamp: data["timestamp"]?.toDate() ?? null,
      };
    });
  } catch {
    return [];
  }
};

export const getAllUsers = async (): Promise<UserRecord[]> => {
  const app = getFirebaseApp();
  if (!app) return [];
  try {
    const { getFirestore, collection, getDocs, orderBy, query } = await import("firebase/firestore");
    const db = getFirestore(app);
    const q = query(collection(db, "users"), orderBy("lastSeen", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        uid: d.id,
        email: data["email"] as string | null,
        displayName: data["displayName"] as string | null,
        photoURL: data["photoURL"] as string | null,
        lastSeen: data["lastSeen"]?.toDate() ?? null,
      };
    });
  } catch {
    return [];
  }
};

export const getPageViewStats = async (): Promise<{
  total: number;
  byPath: Record<string, number>;
  today: number;
  thisWeek: number;
}> => {
  const views = await getRecentPageViews(500);
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart.getTime() - 6 * 24 * 60 * 60 * 1000);

  const byPath: Record<string, number> = {};
  let today = 0;
  let thisWeek = 0;

  for (const v of views) {
    byPath[v.path] = (byPath[v.path] ?? 0) + 1;
    if (v.timestamp) {
      if (v.timestamp >= todayStart) today++;
      if (v.timestamp >= weekStart) thisWeek++;
    }
  }

  return { total: views.length, byPath, today, thisWeek };
};
