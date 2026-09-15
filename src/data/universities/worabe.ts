import type { UniversityRecord } from "../types";

const uid = "wru";
const N = "needs_verification" as const;

export const worabe: UniversityRecord = {
  university: {
    id: uid,
    slug: "worabe-university",
    name: "Worabe University",
    shortName: "WrU",
    amharicName: null,
    alternateNames: ["WrU", "Werabe University"],
    type: "Public University",
    regionId: "central-ethiopia",
    city: "Worabe",
    country: "Ethiopia",
    address: "Worabe, Central Ethiopia Regional State, Ethiopia",
    coordinates: null,
    googleMapsUrl: null,
    generationId: "gen-4",
    yearEstablished: null,
    overview: "Worabe University is a public university located in Worabe, Central Ethiopia Regional State.",
    mission: null, vision: null, values: [], goals: [], motto: null,
    logoText: "WrU", heroImageUrl: null,
    verificationStatus: N, lastVerified: null,
  },
  region: null, generation: null, campuses: [], buildings: [], units: [],
  departments: [], programs: [], facilities: [], photos: [], history: [],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Worabe University", sourceUrl: "https://www.wu.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: null, email: null, phone: null, address: "Worabe, Central Ethiopia Regional State, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset. Information will be added as verified from official sources."],
};
