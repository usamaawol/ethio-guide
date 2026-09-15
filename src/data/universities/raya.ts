import type { UniversityRecord } from "../types";
const uid = "rau"; const N = "needs_verification" as const;
export const raya: UniversityRecord = {
  university: { id: uid, slug: "raya-university", name: "Raya University", shortName: "RaU", amharicName: null, alternateNames: ["RaU"], type: "Public University", regionId: "amhara", city: "Maichew", country: "Ethiopia", address: "Maichew, Amhara Region, Ethiopia", coordinates: null, googleMapsUrl: null, generationId: "gen-3", yearEstablished: "2013", overview: "Raya University is a public university located in Maichew.", mission: null, vision: null, values: [], goals: [], motto: null, logoText: "RaU", heroImageUrl: null, verificationStatus: N, lastVerified: null },
  region: null, generation: null, campuses: [], buildings: [], units: [], departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2013", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Raya University official website", sourceUrl: "https://www.raya.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.raya.edu.et", email: null, phone: null, address: "Maichew, Amhara Region, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset."],
};
