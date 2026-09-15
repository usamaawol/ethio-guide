import type { UniversityRecord } from "../types";

const uid = "wku";
const N = "needs_verification" as const;

export const wolkite: UniversityRecord = {
  university: {
    id: uid,
    slug: "wolkite-university",
    name: "Wolkite University",
    shortName: "WKU",
    amharicName: null,
    alternateNames: ["WKU"],
    type: "Public University",
    regionId: "central-ethiopia",
    city: "Wolkite",
    country: "Ethiopia",
    address: "Wolkite, Central Ethiopia Regional State, Ethiopia",
    coordinates: null,
    googleMapsUrl: null,
    generationId: "gen-3",
    yearEstablished: "2011",
    overview: "Wolkite University is a public university located in Wolkite, Central Ethiopia Regional State.",
    mission: null, vision: null, values: [], goals: [], motto: null,
    logoText: "WKU", heroImageUrl: null,
    verificationStatus: N, lastVerified: null,
  },
  region: null, generation: null, campuses: [], buildings: [], units: [],
  departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2011", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Wolkite University official website", sourceUrl: "https://www.wku.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.wku.edu.et", email: null, phone: null, address: "Wolkite, Central Ethiopia Regional State, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset. Information will be added as verified from official sources."],
};
