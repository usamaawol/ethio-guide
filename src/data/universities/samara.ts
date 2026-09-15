import type { UniversityRecord } from "../types";

const uid = "su-samara";
const N = "needs_verification" as const;

export const samara: UniversityRecord = {
  university: {
    id: uid,
    slug: "samara-university",
    name: "Samara University",
    shortName: "SamU",
    amharicName: null,
    alternateNames: ["SamU", "Semera University"],
    type: "Public University",
    regionId: "afar",
    city: "Samara",
    country: "Ethiopia",
    address: "Samara, Afar Region, Ethiopia",
    coordinates: null,
    googleMapsUrl: null,
    generationId: "gen-2",
    yearEstablished: "2007",
    overview: "Samara University is a public university located in Samara, the capital of the Afar Region.",
    mission: null, vision: null, values: [], goals: [], motto: null,
    logoText: "SamU", heroImageUrl: null,
    verificationStatus: N, lastVerified: null,
  },
  region: null, generation: null, campuses: [], buildings: [], units: [],
  departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2007", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Samara University official website", sourceUrl: "https://www.su.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.su.edu.et", email: null, phone: null, address: "Samara, Afar Region, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset. Information will be added as verified from official sources."],
};
