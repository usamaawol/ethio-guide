import type { UniversityRecord } from "../types";

const uid = "dtu";
const N = "needs_verification" as const;

export const debreTabor: UniversityRecord = {
  university: {
    id: uid,
    slug: "debre-tabor-university",
    name: "Debre Tabor University",
    shortName: "DTU",
    amharicName: null,
    alternateNames: ["DTU"],
    type: "Public University",
    regionId: "amhara",
    city: "Debre Tabor",
    country: "Ethiopia",
    address: "Debre Tabor, Amhara Region, Ethiopia",
    coordinates: null,
    googleMapsUrl: null,
    generationId: "gen-3",
    yearEstablished: "2011",
    overview: "Debre Tabor University is a public university located in Debre Tabor, Amhara Region.",
    mission: null, vision: null, values: [], goals: [], motto: null,
    logoText: "DTU", heroImageUrl: null,
    verificationStatus: N, lastVerified: null,
  },
  region: null, generation: null, campuses: [], buildings: [], units: [],
  departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2011", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Debre Tabor University official website", sourceUrl: "https://www.dtu.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.dtu.edu.et", email: null, phone: null, address: "Debre Tabor, Amhara Region, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset. Information will be added as verified from official sources."],
};
