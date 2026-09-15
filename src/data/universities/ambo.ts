import type { UniversityRecord } from "../types";

const uid = "au-ambo";
const N = "needs_verification" as const;

export const ambo: UniversityRecord = {
  university: {
    id: uid,
    slug: "ambo-university",
    name: "Ambo University",
    shortName: "AU",
    amharicName: null,
    alternateNames: ["AU", "Ambo"],
    type: "Public University",
    regionId: "oromia",
    city: "Ambo",
    country: "Ethiopia",
    address: "Ambo, Oromia Region, Ethiopia",
    coordinates: null,
    googleMapsUrl: null,
    generationId: "gen-2",
    yearEstablished: "2007",
    mission: null, vision: null, values: [], goals: [], motto: null,
    logoText: "AU", heroImageUrl: null,
    verificationStatus: N, lastVerified: null,
  },
  region: null, generation: null, campuses: [], buildings: [], units: [],
  departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2007", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Ambo University official website", sourceUrl: "https://www.ambou.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.ambou.edu.et", email: null, phone: null, address: "Ambo, Oromia Region, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset. Information will be added as verified from official sources."],
};
