import type { UniversityRecord } from "../types";
const uid = "obu"; const N = "needs_verification" as const;
export const odaBultum: UniversityRecord = {
  university: { id: uid, slug: "oda-bultum-university", name: "Oda Bultum University", shortName: "OBU", amharicName: null, alternateNames: ["OBU"], type: "Public University", regionId: "oromia", city: "Chiro", country: "Ethiopia", address: "Chiro, Oromia Region, Ethiopia", coordinates: null, googleMapsUrl: null, generationId: "gen-3", yearEstablished: "2011", overview: "Oda Bultum University is a public university located in Chiro, Oromia Region.", mission: null, vision: null, values: [], goals: [], motto: null, logoText: "OBU", heroImageUrl: null, verificationStatus: N, lastVerified: null },
  region: null, generation: null, campuses: [], buildings: [], units: [], departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2011", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Oda Bultum University official website", sourceUrl: "https://www.obu.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.obu.edu.et", email: null, phone: null, address: "Chiro, Oromia Region, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset."],
};
