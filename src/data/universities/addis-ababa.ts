import type { UniversityRecord } from "../types";
import { regions } from "../reference";

const uid = "aau";
const V = "verified" as const;
const P = "partially_verified" as const;

export const addisAbaba: UniversityRecord = {
  university: {
    id: uid,
    slug: "addis-ababa-university",
    name: "Addis Ababa University",
    shortName: "AAU",
    type: "Public Research University",
    regionId: regions.find((r) => r.id === "addis-ababa")!.id,
    city: "Addis Ababa",
    generationId: null,
    yearEstablished: "1950",
    overview:
      "Addis Ababa University is a pioneer university in Ethiopia located in Addis Ababa, the capital city of Ethiopia, and is described as one of Ethiopia's major national universities. It commenced as the University College of Addis Ababa in 1950.",
    mission:
      "To pursue transformative education, cutting-edge research and innovation, and impactful services and engagement in advancing socio-economic, cultural, and technological needs and interests.",
    vision:
      "To become a leading research university in Africa, to advance national needs and be responsive to global development.",
    values: [
      { name: "Excellence" },
      { name: "Academic Freedom" },
      { name: "Integrity and Accountability" },
      { name: "Diversity, Equity, and Inclusion" },
      { name: "Collaboration" },
      { name: "Care" },
    ],
    goals: [],
    motto: null,
    logoText: "AAU",
    heroImageUrl: null,
    verificationStatus: P,
    lastVerified: "2026-08",
  },
  region: null,
  generation: null,
  campuses: [
    {
      id: `${uid}-sidist-kilo`,
      universityId: uid,
      name: "Sidist Kilo Main Campus",
      city: "Addis Ababa",
      description:
        "Guenete Leul Palace, located at the heart of the Sidist Kilo main campus, was offered to serve as the nucleus of administration.",
      coordinates: null,
      verificationStatus: P,
    },
  ],
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
      year: "1950",
      title: "Founded as the University College of Addis Ababa",
      description: "Initially it consisted of the Faculties of Arts and Science.",
      verificationStatus: V,
    },
    {
      id: `${uid}-h2`,
      universityId: uid,
      year: "1954",
      title: "Chartered college status obtained",
      verificationStatus: V,
    },
    {
      id: `${uid}-h3`,
      universityId: uid,
      year: "1961",
      title: "Haile Selassie I University formed",
      description:
        "In February 1961, various colleges including the Theological College formed Haile Selassie I University. The emperor offered Guenete Leul Palace at the heart of the Sidist Kilo main campus to serve as the nucleus of administration.",
      verificationStatus: V,
    },
    {
      id: `${uid}-h4`,
      universityId: uid,
      year: "1974-1975",
      title: "Renamed Addis Ababa University",
      description:
        "Following the 1974 Ethiopian Revolution the institution was briefly renamed the University of Ethiopia (National University), before assuming its present name, Addis Ababa University, in 1975.",
      verificationStatus: V,
    },
    {
      id: `${uid}-h5`,
      universityId: uid,
      year: "1979",
      title: "First master's programs opened",
      verificationStatus: V,
    },
    {
      id: `${uid}-h6`,
      universityId: uid,
      year: "1987",
      title: "First PhD programs began",
      verificationStatus: V,
    },
    {
      id: `${uid}-h7`,
      universityId: uid,
      year: "2023",
      title: "Autonomous establishment draft regulation approved",
      description:
        "The Council of Ministers of the Federal Democratic Republic of Ethiopia approved an autonomous establishment draft regulation for Addis Ababa University during its 23rd regular meeting on 4 August 2023. Since September 2023, AAU has been carrying out technical and professional tasks related to the reform process.",
      verificationStatus: V,
    },
    {
      id: `${uid}-h8`,
      universityId: uid,
      year: "2024-2028",
      title: "Five-year Strategic Plan",
      description:
        "AAU prepared a five-year Strategic Plan for 2024-2028, intended to maintain the university's position and support progress toward full autonomy. It addresses nine strategic themes and initiatives.",
      verificationStatus: V,
    },
  ],
  sources: [
    {
      id: `${uid}-s1`,
      universityId: uid,
      sourceName: "Addis Ababa University official website",
      sourceUrl: "https://www.aau.edu.et",
      sourceType: "official_website",
      lastVerified: "2026-08",
      verificationStatus: V,
    },
  ],
  contact: {
    universityId: uid,
    website: "https://www.aau.edu.et",
    email: null,
    phone: null,
    address: null,
  },
  orgUnits: [],
  statistics: [],
};

export const aauNotes = {
  autonomy:
    "The federal government issued a University Autonomy Proclamation concerning higher education institutional academic independence. AAU's stated goal is to become a self-governing, autonomous university.",
};
