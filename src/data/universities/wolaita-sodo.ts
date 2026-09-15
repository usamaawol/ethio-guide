import type { UniversityRecord } from "../types";

const uid = "wsu";
const N = "needs_verification" as const;

export const wolaitaSodo: UniversityRecord = {
  university: {
    id: uid,
    slug: "wolaita-sodo-university",
    name: "Wolaita Sodo University",
    shortName: "WSU",
    amharicName: null,
    alternateNames: ["WSU", "Wolayta Sodo University"],
    type: "Public University",
    regionId: "south-ethiopia",
    city: "Wolaita Sodo",
    country: "Ethiopia",
    address: "Wolaita Sodo, South Ethiopia Regional State, Ethiopia",
    coordinates: null,
    googleMapsUrl: null,
    generationId: "gen-2",
    yearEstablished: "2007",
    overview: "Wolaita Sodo University is a public university located in Wolaita Sodo, South Ethiopia Regional State.",
    mission: null, vision: null, values: [], goals: [], motto: null,
    logoText: "WSU", heroImageUrl: null,
    verificationStatus: N, lastVerified: null,
  },
  region: null, generation: null, campuses: [], buildings: [], units: [],
  departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2007", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Wolaita Sodo University official website", sourceUrl: "https://www.wsu.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.wsu.edu.et", email: null, phone: null, address: "Wolaita Sodo, South Ethiopia Regional State, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset. Information will be added as verified from official sources."],
};
