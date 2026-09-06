/**
 * User-provided historical generation classification and the reported 2025
 * ranking taken from a supplied reference image.
 *
 * Neither dataset is treated as an authoritative fact: both carry an explicit
 * source label and verification status, and neither ever overwrites a verified
 * generation stored on a university record.
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

const USER_SOURCE = "User-provided historical generation classification";
const NEEDS: VerificationStatus = "needs_verification";

const lists: Array<{ id: string; name: string; note: string; universities: string[] }> = [
  {
    id: "gen-1",
    name: "First Generation",
    note: "Described in the supplied classification as the oldest foundational institutions, originally colleges or institutes before upgrading to full universities.",
    universities: [
      "Addis Ababa University",
      "Haramaya University",
      "Jimma University",
      "Bahir Dar University",
      "University of Gondar",
      "Hawassa University",
      "Arba Minch University",
      "Mekelle University",
      "Adama Science and Technology University",
      "Ethiopian Civil Service University",
    ],
  },
  {
    id: "gen-2",
    name: "Second Generation",
    note: "Supplied list. Some entries conflict with official establishment years (for example Adigrat University's official source states 2011), so this classification is kept as reported and not treated as verified.",
    universities: [
      "Ambo University",
      "Dilla University",
      "Debre Berhan University",
      "Wollo University",
      "Debre Markos University",
      "Wolaita Sodo University",
      "Madda Walabu University",
      "Wachamo University",
      "Samara University",
      "Assosa University",
      "Dire Dawa University",
      "Wollega University",
      "Adigrat University",
      "Aksum University",
      "Jigjiga University",
      "Mizan-Tepi University",
      "Arsi University",
    ],
  },
  {
    id: "gen-3",
    name: "Third Generation",
    note: "Supplied list, kept as a reported historical classification pending verification.",
    universities: [
      "Debre Tabor University",
      "Wolkite University",
      "Woldia University",
      "Mettu University",
      "Bule Hora University",
      "Oda Bultum University",
      "Raya University",
      "Injibara University",
      "Selale University",
      "Debark University",
      "Kotebe Education University",
    ],
  },
  {
    id: "gen-4",
    name: "Fourth Generation",
    note: "Described in the supplied classification as the newest wave of public universities created to expand local community development and remote accessibility.",
    universities: [
      "Bonga University",
      "Kebri Dehar University",
      "Gambella University",
      "Mekdela Amba University",
      "Dembi Dolo University",
      "Jinka University",
      "Borena University",
      "Werabe University",
    ],
  },
];

const key = (name: string) => name.trim().toLowerCase();

const index = new Map<string, GenerationClassification>();
for (const list of lists) {
  for (const name of list.universities) {
    index.set(key(name), {
      generationId: list.id,
      generationName: list.name,
      source: USER_SOURCE,
      sourceUrl: null,
      verificationStatus: NEEDS,
      notes: list.note,
    });
  }
}

export const generationLists = lists;

/** Reported classification for a university name, or null when not listed. */
export const reportedGeneration = (
  ...names: Array<string | null | undefined>
): GenerationClassification | null => {
  for (const n of names) {
    if (!n) continue;
    const hit = index.get(key(n));
    if (hit) return hit;
  }
  return null;
};

export interface ReportedRanking {
  rank: number;
  universityName: string;
  year: string;
  rankingSource: string;
  sourceUrl: string | null;
  verificationStatus: VerificationStatus;
  notes: string;
}

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
  "Mattu University",
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
