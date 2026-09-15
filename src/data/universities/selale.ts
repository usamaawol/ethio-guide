import type { UniversityRecord } from "../types";
const uid = "seu"; const N = "needs_verification" as const;
export const selale: UniversityRecord = {
  university: { id: uid, slug: "selale-university", name: "Selale University", shortName: "SeU", amharicName: null, alternateNames: ["SeU"], type: "Public University", regionId: "oromia", city: "Fitche", country: "Ethiopia", address: "Fitche, Oromia Region, Ethiopia", coordinates: null, googleMapsUrl: null, generationId: "gen-3", yearEstablished: "2013", overview: "Selale University is a public university located in Fitche, Oromia Region.", mission: null, vision: null, values: [], goals: [], motto: null, logoText: "SeU", heroImageUrl: null, verificationStatus: N, lastVerified: null },
  region: null, generation: null, campuses: [], buildings: [], units: [], departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2013", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Selale University", sourceUrl: "https://www.seu.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.seu.edu.et", email: null, phone: null, address: "Fitche, Oromia Region, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset."],
};
