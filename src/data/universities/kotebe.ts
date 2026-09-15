import type { UniversityRecord } from "../types";
const uid = "keu"; const N = "needs_verification" as const;
export const kotebe: UniversityRecord = {
  university: { id: uid, slug: "kotebe-education-university", name: "Kotebe Education University", shortName: "KEU", amharicName: null, alternateNames: ["KEU", "Kotebe Metropolitan University"], type: "Public University", regionId: "addis-ababa", city: "Addis Ababa", country: "Ethiopia", address: "Addis Ababa, Ethiopia", coordinates: null, googleMapsUrl: null, generationId: "gen-3", yearEstablished: "2011", overview: "Kotebe Education University (formerly Kotebe College of Teacher Education) is a public university in Addis Ababa focused on education.", mission: null, vision: null, values: [], goals: [], motto: null, logoText: "KEU", heroImageUrl: null, verificationStatus: N, lastVerified: null },
  region: null, generation: null, campuses: [], buildings: [], units: [], departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2011", title: "Founded / upgraded to university", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Kotebe Education University official website", sourceUrl: "https://www.kmu.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.kmu.edu.et", email: null, phone: null, address: "Addis Ababa, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset."],
};
