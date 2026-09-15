import type { UniversityRecord } from "../types";
const uid = "metu"; const N = "needs_verification" as const;
export const mettu: UniversityRecord = {
  university: { id: uid, slug: "mettu-university", name: "Mettu University", shortName: "MeU", amharicName: null, alternateNames: ["MeU", "Mattu University"], type: "Public University", regionId: "oromia", city: "Mettu", country: "Ethiopia", address: "Mettu, Oromia Region, Ethiopia", coordinates: null, googleMapsUrl: null, generationId: "gen-3", yearEstablished: "2011", overview: "Mettu University is a public university located in Mettu, Oromia Region.", mission: null, vision: null, values: [], goals: [], motto: null, logoText: "MeU", heroImageUrl: null, verificationStatus: N, lastVerified: null },
  region: null, generation: null, campuses: [], buildings: [], units: [], departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2011", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Mettu University official website", sourceUrl: "https://www.meu.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.meu.edu.et", email: null, phone: null, address: "Mettu, Oromia Region, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset."],
};
