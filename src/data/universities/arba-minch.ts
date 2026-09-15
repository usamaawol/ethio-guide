import type { UniversityRecord } from "../types";

const uid = "amu";
const N = "needs_verification" as const;

export const arbaMinch: UniversityRecord = {
  university: {
    id: uid,
    slug: "arba-minch-university",
    name: "Arba Minch University",
    shortName: "AMU",
    amharicName: null,
    alternateNames: ["AMU", "Arba Minch"],
    type: "Public University",
    regionId: "south-ethiopia",
    city: "Arba Minch",
    country: "Ethiopia",
    address: "Arba Minch, South Ethiopia Regional State, Ethiopia",
    coordinates: null,
    googleMapsUrl: null,
    generationId: "gen-1",
    yearEstablished: "1986",
    overview:
      "Arba Minch University is a public university located in Arba Minch, South Ethiopia Regional State.",
    mission: null, vision: null, values: [], goals: [], motto: null,
    logoText: "AMU", heroImageUrl: null,
    verificationStatus: N, lastVerified: null,
  },
  region: null, generation: null, campuses: [], buildings: [], units: [],
  departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "1986", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Arba Minch University official website", sourceUrl: "https://www.amu.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.amu.edu.et", email: null, phone: null, address: "Arba Minch, South Ethiopia Regional State, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset. Information will be added as verified from official sources."],
};
