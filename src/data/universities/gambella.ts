import type { UniversityRecord } from "../types";
const uid = "gamu"; const N = "needs_verification" as const;
export const gambella: UniversityRecord = {
  university: { id: uid, slug: "gambella-university", name: "Gambella University", shortName: "GamU", amharicName: null, alternateNames: ["GamU"], type: "Public University", regionId: "gambela", city: "Gambella", country: "Ethiopia", address: "Gambella, Gambella Regional State, Ethiopia", coordinates: null, googleMapsUrl: null, generationId: "gen-3", yearEstablished: "2011", overview: "Gambella University is a public university located in Gambella, Gambella Regional State, Ethiopia.", mission: null, vision: null, values: [], goals: [], motto: null, logoText: "GamU", heroImageUrl: null, verificationStatus: N, lastVerified: null },
  region: null, generation: null, campuses: [], buildings: [], units: [], departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2011", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Gambella University", sourceUrl: "https://www.gambu.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.gambu.edu.et", email: null, phone: null, address: "Gambella, Gambella Regional State, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset."],
};
