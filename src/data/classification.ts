/**
 * Generation classification and the reported 2025 ranking.
 *
 * TWO classification sources are stored side-by-side:
 *
 *  1. VERIFIED_SOURCE  — cited classification from Tom1 Tube / ResearchGate
 *     (Mekonnen Yimer et al., 2022 + Facebook post Oct 31 2025).
 *     Status: partially_verified — sourced but not yet cross-checked against
 *     every individual university's official founding documents.
 *
 *  2. USER_SOURCE — earlier user-provided historical list.
 *     Status: needs_verification.
 *
 * The VERIFIED_SOURCE takes precedence and is used to set generationId on
 * each university record. The USER_SOURCE is preserved for transparency.
 */
import type { VerificationStatus } from "./types";

export interface GenerationClassification {
  generationId: string;
  generationName: string;
  source: string;
  sourceUrl: string | null;
  verificationStatus: VerificationStatus;
  notes: string;
}

// ── Source labels ─────────────────────────────────────────────────────────────

const VERIFIED_SOURCE =
  'Tom1 Tube / ResearchGate (Mekonnen Yimer et al., 2022) — cited in Facebook post "Which University did you attend?" Oct 31, 2025';
const VERIFIED_SOURCE_URL =
  "https://www.facebook.com/tom1tube"; // closest public attribution available
const VERIFIED: VerificationStatus = "partially_verified";

// ── Verified generation lists (primary) ──────────────────────────────────────

export const verifiedLists: Array<{
  id: string;
  name: string;
  description: string;
  note: string;
  universities: string[];
}> = [
  {
    id: "gen-1",
    name: "First Generation",
    description: "Established before 2007 — the oldest foundational higher-learning institutions.",
    note: "Source: Tom1 Tube / ResearchGate (Mekonnen Yimer et al., 2022). Partially verified.",
    universities: [
      "Addis Ababa University",
      "Jimma University",
      "Haramaya University",
      "University of Gondar",
      "Hawassa University",
      "Bahir Dar University",
      "Mekelle University",
      "Arba Minch University",
    ],
  },
  {
    id: "gen-2",
    name: "Second Generation",
    description: "Established around 2007 — first major wave of the national university expansion.",
    note: "Source: Tom1 Tube / ResearchGate (Mekonnen Yimer et al., 2022). Partially verified.",
    universities: [
      "Adama Science and Technology University",
      "Ambo University",
      "Dilla University",
      "Dire Dawa University",
      "Jigjiga University",
      "Madda Walabu University",
      "Debre Markos University",
      "Aksum University",
      "Debre Berhan University",
      "Wollega University",
      "Wollo University",
      "Mizan-Tepi University",
      "Samara University",
      "Kotebe Education University",
      "Wolaita Sodo University",
    ],
  },
  {
    id: "gen-3",
    name: "Third Generation",
    description: "Established around 2011 — widened regional access and specialised technical fields.",
    note: "Source: Tom1 Tube / ResearchGate (Mekonnen Yimer et al., 2022). Partially verified.",
    universities: [
      "Adigrat University",
      "Mettu University",
      "Woldia University",
      "Wolkite University",
      "Debre Tabor University",
      "Wachamo University",
      "Assosa University",
      "Addis Ababa Science and Technology University",
      "Arsi University",
      "Gambella University",
      "Bule Hora University",
    ],
  },
  {
    id: "gen-4",
    name: "Fourth Generation",
    description: "Established around 2016 and later — newest public institutions for local and remote community access.",
    note: "Source: Tom1 Tube / ResearchGate (Mekonnen Yimer et al., 2022). Partially verified.",
    universities: [
      "Jinka University",
      "Bonga University",
      "Worabe University",
      "Injibara University",
      "Debark University",
      "Mekdela Amba University",
      "Dembi Dolo University",
      "Oda Bultum University",
      "Borena University",
      "Kebri Dehar University",
      "Selale University",
    ],
  },
];

// ── Build lookup index (verified source) ─────────────────────────────────────

const key = (name: string) => name.trim().toLowerCase();

// Aliases so lookup works for both "Samara University" and "Semera University" etc.
const ALIASES: Record<string, string> = {
  "semera university": "samara university",
  "salale university": "selale university",
  "werabe university": "worabe university",
  "mattu university": "mettu university",
  "adama science & technology university": "adama science and technology university",
  "addis ababa science & technology university": "addis ababa science and technology university",
};

const verifiedIndex = new Map<string, GenerationClassification>();
for (const list of verifiedLists) {
  for (const name of list.universities) {
    const entry: GenerationClassification = {
      generationId: list.id,
      generationName: list.name,
      source: VERIFIED_SOURCE,
      sourceUrl: VERIFIED_SOURCE_URL,
      verificationStatus: VERIFIED,
      notes: list.note,
    };
    verifiedIndex.set(key(name), entry);
  }
}

/** Verified generation classification for a university name, or null. */
export const reportedGeneration = (
  ...names: Array<string | null | undefined>
): GenerationClassification | null => {
  for (const n of names) {
    if (!n) continue;
    const k = key(n);
    const hit = verifiedIndex.get(k) ?? verifiedIndex.get(ALIASES[k] ?? "");
    if (hit) return hit;
  }
  return null;
};

// Keep the old name for backwards compat
export const generationLists = verifiedLists;

// ── Reported 2025 ranking ─────────────────────────────────────────────────────

export interface ReportedRanking {
  rank: number;
  universityName: string;
  year: string;
  rankingSource: string;
  sourceUrl: string | null;
  verificationStatus: VerificationStatus;
  notes: string;
}

const NEEDS: VerificationStatus = "needs_verification";
const RANK_NOTE =
  "Reported ranking shown in a supplied 2025 reference image. The image contains visible numbering inconsistencies, so positions are not treated as accurate.";

const rankedNames = [
  "Addis Ababa University",
  "University of Gondar",
  "Bahir Dar University",
  "Jimma University",
  "Mekelle University",
  "Hawassa University",
  "Haramaya University",
  "Adama Science & Technology University",
  "Arba Minch University",
  "Jigjiga University",
  "Addis Ababa Science & Technology University",
  "Ambo University",
  "Dilla University",
  "Unity University",
  "Debre Berhan University",
  "Wollo University",
  "Debre Markos University",
  "Wolaita Sodo University",
  "Madda Walabu University",
  "Worabe University",
  "Wachamo University",
  "Debre Tabor University",
  "Wolkite University",
  "Samara University",
  "Assosa University",
  "Dire Dawa University",
  "Wollega University",
  "Mettu University",
  "Mizan-Tepi University",
  "Kotebe Education University",
  "Adigrat University",
  "Woldia University",
  "Oromia State University",
  "Bule Hora University",
  "Aksum University",
  "Bonga University",
  "Rift Valley University",
  "Oda Bultum University",
  "Raya University",
  "Injibara University",
  "Selale University",
  "Debark University",
  "Kebri Dehar University",
  "Gambella University",
  "Mekdela Amba University",
  "Dembi Dolo University",
];

export const reportedRankings2025: ReportedRanking[] = rankedNames.map((name, i) => ({
  rank: i + 1,
  universityName: name,
  year: "2025",
  rankingSource: "UNIRANKS / UniRank, as displayed in the supplied 2025 reference image",
  sourceUrl: null,
  verificationStatus: NEEDS,
  notes: RANK_NOTE,
}));

const rankIndex = new Map(reportedRankings2025.map((r) => [key(r.universityName), r]));

const simplify = (n: string) =>
  key(n)
    .replace(/&/g, "and")
    .replace(/\bsci\b/g, "science")
    .replace(/\btech\b/g, "technology")
    .replace(/[^a-z0-9]/g, "");

const simpleIndex = new Map(reportedRankings2025.map((r) => [simplify(r.universityName), r]));

export const reportedRankingFor = (
  ...names: Array<string | null | undefined>
): ReportedRanking | null => {
  for (const n of names) {
    if (!n) continue;
    const hit = rankIndex.get(key(n)) ?? simpleIndex.get(simplify(n));
    if (hit) return hit;
  }
  return null;
};
