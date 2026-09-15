import type { UniversityRecord } from "../types";

const uid = "asu-assosa";
const N = "needs_verification" as const;

export const assosa: UniversityRecord = {
  university: {
    id: uid,
    slug: "assosa-university",
    name: "Assosa University",
    shortName: "AsU",
    amharicName: null,
    alternateNames: ["AsU", "Assosa"],
    type: "Public University",
    regionId: "benishangul-gumuz",
    city: "Assosa",
    country: "Ethiopia",
    address: "Assosa, Benishangul-Gumuz Region, Ethiopia",
    coordinates: null,
    googleMapsUrl: null,
    generationId: "gen-2",
    yearEstablished: "2011",
    overview: "Assosa University is a public university located in Assosa, the capital of the Benishangul-Gumuz Region.",
    mission: null, vision: null, values: [], goals: [], motto: null,
    logoText: "AsU", heroImageUrl: null,
    verificationStatus: N, lastVerified: null,
  },
  region: null, generation: null, campuses: [], buildings: [], units: [],
  departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2011", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Assosa University official website", sourceUrl: "https://www.asu.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.asu.edu.et", email: null, phone: null, address: "Assosa, Benishangul-Gumuz Region, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset. Information will be added as verified from official sources."],
};
