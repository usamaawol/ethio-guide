import type { UniversityRecord } from "../types";
const uid = "bhu"; const N = "needs_verification" as const;
export const buleHora: UniversityRecord = {
  university: { id: uid, slug: "bule-hora-university", name: "Bule Hora University", shortName: "BHU", amharicName: null, alternateNames: ["BHU"], type: "Public University", regionId: "oromia", city: "Bule Hora", country: "Ethiopia", address: "Bule Hora, Oromia Region, Ethiopia", coordinates: null, googleMapsUrl: null, generationId: "gen-3", yearEstablished: "2011", overview: "Bule Hora University is a public university located in Bule Hora, Oromia Region.", mission: null, vision: null, values: [], goals: [], motto: null, logoText: "BHU", heroImageUrl: null, verificationStatus: N, lastVerified: null },
  region: null, generation: null, campuses: [], buildings: [], units: [], departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2011", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Bule Hora University official website", sourceUrl: "https://www.bhu.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.bhu.edu.et", email: null, phone: null, address: "Bule Hora, Oromia Region, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset."],
};
