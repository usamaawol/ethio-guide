import type { UniversityRecord } from "../types";
const uid = "wdu"; const N = "needs_verification" as const;
export const woldia: UniversityRecord = {
  university: { id: uid, slug: "woldia-university", name: "Woldia University", shortName: "WdU", amharicName: null, alternateNames: ["WdU", "Woldia"], type: "Public University", regionId: "amhara", city: "Woldia", country: "Ethiopia", address: "Woldia, Amhara Region, Ethiopia", coordinates: null, googleMapsUrl: null, generationId: "gen-3", yearEstablished: "2011", overview: "Woldia University is a public university located in Woldia, Amhara Region.", mission: null, vision: null, values: [], goals: [], motto: null, logoText: "WdU", heroImageUrl: null, verificationStatus: N, lastVerified: null },
  region: null, generation: null, campuses: [], buildings: [], units: [], departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2011", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Woldia University official website", sourceUrl: "https://www.wdu.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.wdu.edu.et", email: null, phone: null, address: "Woldia, Amhara Region, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset."],
};
