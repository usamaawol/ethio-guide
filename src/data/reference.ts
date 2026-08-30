import type { Generation, Region } from "./types";

export const regions: Region[] = [
  { id: "addis-ababa", name: "Addis Ababa", kind: "city_administration" },
  { id: "dire-dawa", name: "Dire Dawa", kind: "city_administration" },
  { id: "oromia", name: "Oromia", kind: "regional_state" },
  { id: "amhara", name: "Amhara", kind: "regional_state" },
  { id: "tigray", name: "Tigray", kind: "regional_state" },
  { id: "afar", name: "Afar", kind: "regional_state" },
  { id: "somali", name: "Somali", kind: "regional_state" },
  { id: "benishangul-gumuz", name: "Benishangul-Gumuz", kind: "regional_state" },
  { id: "gambela", name: "Gambela", kind: "regional_state" },
  { id: "harari", name: "Harari", kind: "regional_state" },
  { id: "sidama", name: "Sidama", kind: "regional_state" },
  { id: "south-ethiopia", name: "South Ethiopia Regional State", kind: "regional_state" },
  { id: "central-ethiopia", name: "Central Ethiopia Regional State", kind: "regional_state" },
  { id: "south-west-ethiopia", name: "South West Ethiopia Peoples' Region", kind: "regional_state" },
];

/**
 * Generation categories exist as a taxonomy. A university is only attached to a
 * generation when that link is verified in the source data — otherwise the UI
 * shows "Generation not yet verified".
 */
export const generations: Generation[] = [
  { id: "gen-1", name: "First Generation", order: 1 },
  { id: "gen-2", name: "Second Generation", order: 2 },
  { id: "gen-3", name: "Third Generation", order: 3 },
  { id: "gen-4", name: "Fourth Generation", order: 4 },
  { id: "gen-5", name: "Fifth Generation", order: 5 },
];

/** Canonical program fields used for cross-university program search. */
export const programFields: Array<{ key: string; label: string; aliases: string[] }> = [
  { key: "software-engineering", label: "Software Engineering", aliases: ["software", "swe"] },
  { key: "computer-science", label: "Computer Science", aliases: ["computer", "cs", "computing"] },
  { key: "information-technology", label: "Information Technology", aliases: ["it", "computer", "informatics"] },
  { key: "information-systems", label: "Information Systems", aliases: ["computer", "informatics"] },
  { key: "medicine", label: "Medicine", aliases: ["medical", "doctor", "health"] },
  { key: "nursing", label: "Nursing", aliases: ["health"] },
  { key: "public-health", label: "Public Health", aliases: ["health"] },
  { key: "law", label: "Law", aliases: ["legal", "governance"] },
  { key: "agriculture", label: "Agriculture", aliases: ["agricultural", "farming"] },
  { key: "veterinary-medicine", label: "Veterinary Medicine", aliases: ["vet", "animal"] },
  { key: "business", label: "Business & Management", aliases: ["management", "commerce"] },
  { key: "economics", label: "Economics", aliases: ["economy"] },
  { key: "engineering", label: "Engineering & Technology", aliases: ["technology", "engineer"] },
  { key: "education", label: "Education", aliases: ["teaching", "behavioural"] },
  { key: "natural-sciences", label: "Natural & Computational Sciences", aliases: ["science", "physics", "chemistry"] },
  { key: "social-sciences", label: "Social Sciences & Humanities", aliases: ["humanities", "sociology"] },
  { key: "sport-science", label: "Sport Science", aliases: ["sport", "athletics"] },
];

export const programFieldLabel = (key: string) =>
  programFields.find((f) => f.key === key)?.label ?? key;
