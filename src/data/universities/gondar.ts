import type { UniversityRecord } from "../types";

const uid = "uog";
const P = "partially_verified" as const;
const N = "needs_verification" as const;

export const gondar: UniversityRecord = {
  university: {
    id: uid,
    slug: "university-of-gondar",
    name: "University of Gondar",
    shortName: "UoG",
    amharicName: null,
    alternateNames: ["UoG", "Gondar University"],
    type: "Public Research University",
    regionId: "amhara",
    city: "Gondar",
    country: "Ethiopia",
    address: "Gondar, Amhara Region, Ethiopia",
    coordinates: null,
    googleMapsUrl: null,
    generationId: "gen-1",
    yearEstablished: "1954",
    overview:
      "University of Gondar is one of Ethiopia's oldest and most prominent public research universities, located in the historic city of Gondar in the Amhara Region. It is particularly well-known for its College of Medicine and Health Sciences.",
    mission: null,
    vision: null,
    values: [],
    goals: [],
    motto: null,
    logoText: "UoG",
    heroImageUrl: null,
    verificationStatus: N,
    lastVerified: null,
  },
  region: null,
  generation: null,
  campuses: [],
  buildings: [],
  units: [],
  departments: [],
  programs: [],
  facilities: [],
  photos: [],
  history: [
    {
      id: `${uid}-h1`,
      universityId: uid,
      year: "1954",
      title: "Founded as Public Health College",
      description: "Established in 1954 as one of Ethiopia's earliest higher education institutions with a focus on public health.",
      verificationStatus: N,
    },
  ],
  sources: [
    {
      id: `${uid}-s1`,
      universityId: uid,
      sourceName: "University of Gondar official website",
      sourceUrl: "https://www.uog.edu.et",
      sourceType: "official_website",
      lastVerified: null,
      verificationStatus: N,
    },
  ],
  contact: {
    universityId: uid,
    website: "https://www.uog.edu.et",
    email: null,
    phone: null,
    address: "Gondar, Amhara Region, Ethiopia",
  },
  orgUnits: [],
  statistics: [],
  library: null,
  leadership: null,
  dataNotes: [
    "Detailed profile information for University of Gondar is not yet available in this dataset.",
    "Information will be added as it is verified from official sources.",
  ],
};
