import type { UniversityRecord } from "../types";

const uid = "ddu";
const N = "needs_verification" as const;

export const direDawa: UniversityRecord = {
  university: {
    id: uid,
    slug: "dire-dawa-university",
    name: "Dire Dawa University",
    shortName: "DDU",
    amharicName: null,
    alternateNames: ["DDU"],
    type: "Public University",
    regionId: "dire-dawa",
    city: "Dire Dawa",
    country: "Ethiopia",
    address: "Dire Dawa, Ethiopia",
    coordinates: null,
    googleMapsUrl: null,
    generationId: "gen-2",
    yearEstablished: "2007",
    overview: "Dire Dawa University is a public university located in Dire Dawa city administration.",
    mission: null, vision: null, values: [], goals: [], motto: null,
    logoText: "DDU", heroImageUrl: null,
    verificationStatus: N, lastVerified: null,
  },
  region: null, generation: null, campuses: [], buildings: [], units: [],
  departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2007", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Dire Dawa University official website", sourceUrl: "https://www.ddu.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.ddu.edu.et", email: null, phone: null, address: "Dire Dawa, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset. Information will be added as verified from official sources."],
};
