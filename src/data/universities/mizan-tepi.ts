import type { UniversityRecord } from "../types";
const uid = "mtu"; const N = "needs_verification" as const;
export const mizanTepi: UniversityRecord = {
  university: { id: uid, slug: "mizan-tepi-university", name: "Mizan-Tepi University", shortName: "MTU", amharicName: null, alternateNames: ["MTU"], type: "Public University", regionId: "south-west-ethiopia", city: "Mizan Aman", country: "Ethiopia", address: "Mizan Aman, South West Ethiopia Peoples' Region", coordinates: null, googleMapsUrl: null, generationId: "gen-2", yearEstablished: "2011", overview: "Mizan-Tepi University is a public university with campuses in Mizan Aman and Tepi, South West Ethiopia Peoples' Region.", mission: null, vision: null, values: [], goals: [], motto: null, logoText: "MTU", heroImageUrl: null, verificationStatus: N, lastVerified: null },
  region: null, generation: null, campuses: [], buildings: [], units: [], departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2011", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Mizan-Tepi University official website", sourceUrl: "https://www.mtu.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.mtu.edu.et", email: null, phone: null, address: "Mizan Aman, South West Ethiopia Peoples' Region" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset."],
};
