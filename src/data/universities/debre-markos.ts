import type { UniversityRecord } from "../types";

const uid = "dmu";
const N = "needs_verification" as const;

export const debreMarkos: UniversityRecord = {
  university: {
    id: uid,
    slug: "debre-markos-university",
    name: "Debre Markos University",
    shortName: "DMU",
    amharicName: null,
    alternateNames: ["DMU"],
    type: "Public University",
    regionId: "amhara",
    city: "Debre Markos",
    country: "Ethiopia",
    address: "Debre Markos, Amhara Region, Ethiopia",
    coordinates: null,
    googleMapsUrl: null,
    generationId: "gen-2",
    yearEstablished: "2007",
    overview: "Debre Markos University is a public university located in Debre Markos, Amhara Region.",
    mission: null, vision: null, values: [], goals: [], motto: null,
    logoText: "DMU", heroImageUrl: null,
    verificationStatus: N, lastVerified: null,
  },
  region: null, generation: null, campuses: [], buildings: [], units: [],
  departments: [], programs: [], facilities: [], photos: [],
  history: [{ id: `${uid}-h1`, universityId: uid, year: "2007", title: "Founded", verificationStatus: N }],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Debre Markos University official website", sourceUrl: "https://www.dmu.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.dmu.edu.et", email: null, phone: null, address: "Debre Markos, Amhara Region, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset. Information will be added as verified from official sources."],
};
