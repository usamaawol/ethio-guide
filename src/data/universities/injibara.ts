import type { UniversityRecord } from "../types";
const uid = "iju"; const N = "needs_verification" as const;
export const injibara: UniversityRecord = {
  university: { id: uid, slug: "injibara-university", name: "Injibara University", shortName: "IJU", amharicName: null, alternateNames: ["IJU"], type: "Public University", regionId: "amhara", city: "Injibara", country: "Ethiopia", address: "Injibara, Amhara Region, Ethiopia", coordinates: null, googleMapsUrl: null, generationId: "gen-3", yearEstablished: "2013", overview: "Injibara University is a public university located in Injibara, Amhara Region.", mission: null, vision: null, values: [], goals: [], motto: null, logoText: "IJU", heroImageUrl: null, verificationStatus: N, lastVerified: null },
  region: null, generation: null, campuses: [], buildings: [], units: [], departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2013", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Injibara University official website", sourceUrl: "https://www.ibu.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.ibu.edu.et", email: null, phone: null, address: "Injibara, Amhara Region, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset."],
};
