import type { UniversityRecord } from "../types";
const uid = "arsu"; const N = "needs_verification" as const;
export const arsi: UniversityRecord = {
  university: { id: uid, slug: "arsi-university", name: "Arsi University", shortName: "ArsU", amharicName: null, alternateNames: ["ArsU"], type: "Public University", regionId: "oromia", city: "Asella", country: "Ethiopia", address: "Asella, Oromia Region, Ethiopia", coordinates: null, googleMapsUrl: null, generationId: "gen-3", yearEstablished: "2014", overview: "Arsi University is a public university located in Asella, Oromia Region, Ethiopia, established in 2014.", mission: null, vision: null, values: [], goals: [], motto: null, logoText: "ArsU", heroImageUrl: null, verificationStatus: N, lastVerified: null },
  region: null, generation: null, campuses: [], buildings: [], units: [], departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2014", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Arsi University", sourceUrl: "https://www.arsiun.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.arsiun.edu.et", email: null, phone: null, address: "Asella, Oromia Region, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset."],
};
