import type { UniversityRecord } from "../types";

const uid = "dbu";
const N = "needs_verification" as const;

export const debreBerhan: UniversityRecord = {
  university: {
    id: uid,
    slug: "debre-berhan-university",
    name: "Debre Berhan University",
    shortName: "DBU",
    amharicName: null,
    alternateNames: ["DBU"],
    type: "Public University",
    regionId: "amhara",
    city: "Debre Berhan",
    country: "Ethiopia",
    address: "Debre Berhan, Amhara Region, Ethiopia",
    coordinates: null,
    googleMapsUrl: null,
    generationId: "gen-2",
    yearEstablished: "2007",
    overview: "Debre Berhan University is a public university located in Debre Berhan, Amhara Region.",
    mission: null, vision: null, values: [], goals: [], motto: null,
    logoText: "DBU", heroImageUrl: null,
    verificationStatus: N, lastVerified: null,
  },
  region: null, generation: null, campuses: [], buildings: [], units: [],
  departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2007", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Debre Berhan University official website", sourceUrl: "https://www.dbu.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.dbu.edu.et", email: null, phone: null, address: "Debre Berhan, Amhara Region, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset. Information will be added as verified from official sources."],
};
