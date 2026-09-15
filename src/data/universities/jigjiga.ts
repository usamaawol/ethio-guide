import type { UniversityRecord } from "../types";

const uid = "jju";
const N = "needs_verification" as const;

export const jigjiga: UniversityRecord = {
  university: {
    id: uid,
    slug: "jigjiga-university",
    name: "Jigjiga University",
    shortName: "JJU",
    amharicName: null,
    alternateNames: ["JJU", "Jijiga University"],
    type: "Public University",
    regionId: "somali",
    city: "Jigjiga",
    country: "Ethiopia",
    address: "Jigjiga, Somali Region, Ethiopia",
    coordinates: null,
    googleMapsUrl: null,
    generationId: "gen-2",
    yearEstablished: "2007",
    overview: "Jigjiga University is a public university located in Jigjiga, the capital of the Somali Region.",
    mission: null, vision: null, values: [], goals: [], motto: null,
    logoText: "JJU", heroImageUrl: null,
    verificationStatus: N, lastVerified: null,
  },
  region: null, generation: null, campuses: [], buildings: [], units: [],
  departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2007", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Jigjiga University official website", sourceUrl: "https://www.jju.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.jju.edu.et", email: null, phone: null, address: "Jigjiga, Somali Region, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset. Information will be added as verified from official sources."],
};
