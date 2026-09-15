import type { UniversityRecord } from "../types";

const uid = "wu-wollo";
const N = "needs_verification" as const;

export const wollo: UniversityRecord = {
  university: {
    id: uid,
    slug: "wollo-university",
    name: "Wollo University",
    shortName: "WU",
    amharicName: null,
    alternateNames: ["WU"],
    type: "Public University",
    regionId: "amhara",
    city: "Dessie",
    country: "Ethiopia",
    address: "Dessie, Amhara Region, Ethiopia",
    coordinates: null,
    googleMapsUrl: null,
    generationId: "gen-2",
    yearEstablished: "2007",
    overview: "Wollo University is a public university located in Dessie, Amhara Region.",
    mission: null, vision: null, values: [], goals: [], motto: null,
    logoText: "WU", heroImageUrl: null,
    verificationStatus: N, lastVerified: null,
  },
  region: null, generation: null, campuses: [], buildings: [], units: [],
  departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2007", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Wollo University official website", sourceUrl: "https://www.wu.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.wu.edu.et", email: null, phone: null, address: "Dessie, Amhara Region, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset. Information will be added as verified from official sources."],
};
