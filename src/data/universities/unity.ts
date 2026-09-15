import type { UniversityRecord } from "../types";

const uid = "uu";
const N = "needs_verification" as const;

export const unity: UniversityRecord = {
  university: {
    id: uid,
    slug: "unity-university",
    name: "Unity University",
    shortName: "UU",
    amharicName: null,
    alternateNames: ["UU"],
    type: "Private University",
    regionId: "addis-ababa",
    city: "Addis Ababa",
    country: "Ethiopia",
    address: "Addis Ababa, Ethiopia",
    coordinates: null,
    googleMapsUrl: null,
    generationId: null,
    yearEstablished: null,
    overview: "Unity University is a private higher education institution located in Addis Ababa.",
    mission: null, vision: null, values: [], goals: [], motto: null,
    logoText: "UU", heroImageUrl: null,
    verificationStatus: N, lastVerified: null,
  },
  region: null, generation: null, campuses: [], buildings: [], units: [],
  departments: [], programs: [], facilities: [], photos: [], history: [],
  sources: [{ id: `${uid}-s1`, universityId: uid, sourceName: "Unity University official website", sourceUrl: "https://www.unity.edu.et", sourceType: "official_website", lastVerified: null, verificationStatus: N }],
  contact: { universityId: uid, website: "https://www.unity.edu.et", email: null, phone: null, address: "Addis Ababa, Ethiopia" },
  orgUnits: [], statistics: [], library: null, leadership: null,
  dataNotes: ["Detailed profile information is not yet available in this dataset. Information will be added as verified from official sources."],
};
