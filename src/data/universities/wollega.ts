import type { UniversityRecord } from "../types";
const uid = "wou"; const N = "needs_verification" as const;
export const wollega: UniversityRecord = {
  university: { id: uid, slug: "wollega-university", name: "Wollega University", shortName: "WoU", amharicName: null, alternateNames: ["WoU"], type: "Public University", regionId: "oromia", city: "Nekemte", country: "Ethiopia", address: "Nekemte, Oromia Region, Ethiopia", coordinates: null, googleMapsUrl: null, generationId: "gen-2", yearEstablished: "2007", overview: "Wollega University is a public university located in Nekemte, Oromia Region.", mission: null, vision: null, values: [], goals: [], motto: null, logoText: "WoU", heroImageUrl: null, verificationStatus: N, lastVerified: null },
  region: null, generation: null, campuses: [], buildings: [], units: [], departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2007", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Wollega University official website", sourceUrl: "https://www.wuni.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.wuni.edu.et", email: null, phone: null, address: "Nekemte, Oromia Region, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset. Information will be added as verified from official sources."],
};
