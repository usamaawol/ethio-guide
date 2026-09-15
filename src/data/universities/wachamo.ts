import type { UniversityRecord } from "../types";

const uid = "wachu";
const N = "needs_verification" as const;

export const wachamo: UniversityRecord = {
  university: {
    id: uid,
    slug: "wachamo-university",
    name: "Wachamo University",
    shortName: "WaCU",
    amharicName: null,
    alternateNames: ["WaCU", "Wachemo University"],
    type: "Public University",
    regionId: "central-ethiopia",
    city: "Hossana",
    country: "Ethiopia",
    address: "Hossana, Central Ethiopia Regional State, Ethiopia",
    coordinates: null,
    googleMapsUrl: null,
    generationId: "gen-3",
    yearEstablished: "2011",
    overview: "Wachamo University is a public university located in Hossana, Central Ethiopia Regional State.",
    mission: null, vision: null, values: [], goals: [], motto: null,
    logoText: "WaCU", heroImageUrl: null,
    verificationStatus: N, lastVerified: null,
  },
  region: null, generation: null, campuses: [], buildings: [], units: [],
  departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2011", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Wachamo University official website", sourceUrl: "https://www.wachamo.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.wachamo.edu.et", email: null, phone: null, address: "Hossana, Central Ethiopia Regional State, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset. Information will be added as verified from official sources."],
};
