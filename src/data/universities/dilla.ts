import type { UniversityRecord } from "../types";

const uid = "du";
const N = "needs_verification" as const;

export const dilla: UniversityRecord = {
  university: {
    id: uid,
    slug: "dilla-university",
    name: "Dilla University",
    shortName: "DU",
    amharicName: null,
    alternateNames: ["DU"],
    type: "Public University",
    regionId: "south-ethiopia",
    city: "Dilla",
    country: "Ethiopia",
    address: "Dilla, South Ethiopia Regional State, Ethiopia",
    coordinates: null,
    googleMapsUrl: null,
    generationId: "gen-2",
    yearEstablished: "2007",
    overview: "Dilla University is a public university located in Dilla, South Ethiopia Regional State.",
    mission: null, vision: null, values: [], goals: [], motto: null,
    logoText: "DU", heroImageUrl: null,
    verificationStatus: N, lastVerified: null,
  },
  region: null, generation: null, campuses: [], buildings: [], units: [],
  departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2007", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Dilla University official website", sourceUrl: "https://www.dillauniversity.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.dillauniversity.edu.et", email: null, phone: null, address: "Dilla, South Ethiopia Regional State, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset. Information will be added as verified from official sources."],
};
