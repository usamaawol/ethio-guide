import type { UniversityRecord } from "../types";

const uid = "hu-hawassa";
const V = "verified" as const;
const P = "partially_verified" as const;
const N = "needs_verification" as const;

export const hawassa: UniversityRecord = {
  university: {
    id: uid,
    slug: "hawassa-university",
    name: "Hawassa University",
    shortName: "HwU",
    amharicName: null,
    alternateNames: ["HwU", "Hawasa University"],
    type: "Public Research University",
    regionId: "sidama",
    city: "Hawassa",
    country: "Ethiopia",
    address: "Hawassa, Sidama Region, Ethiopia",
    coordinates: null,
    googleMapsUrl: null,
    generationId: "gen-1",
    yearEstablished: "1999",
    overview:
      "Hawassa University is a public research university located in Hawassa, the capital of the Sidama Region. It is one of Ethiopia's leading comprehensive universities and hosts a full Institute of Technology with five faculties and 19 academic departments, as well as specialised research institutes including the Institute of Policy and Development Research (IPDR) and the Institute of Sidama Studies (IoSS).",
    mission: null,
    vision: null,
    values: [],
    goals: [],
    motto: null,
    logoText: "HwU",
    heroImageUrl: null,
    verificationStatus: P,
    lastVerified: "2026-09",
  },
  region: null,
  generation: null,
  campuses: [],
  buildings: [],

  // ── ACADEMIC UNITS ─────────────────────────────────────────────────────────
  units: [
    // Institute of Technology (parent)
    {
      id: `${uid}-hit`, universityId: uid, parentUnitId: null, kind: "institute",
      name: "Institute of Technology",
      description: "Has 5 faculties and 19 academic departments.",
      fieldKeys: ["engineering"],
      verificationStatus: V,
    },
    // HIT Faculties (children of Institute of Technology)
    {
      id: `${uid}-hit-fbwre`, universityId: uid, parentUnitId: `${uid}-hit`, kind: "school",
      name: "Faculty of Biosystems and Water Resources Engineering",
      fieldKeys: ["engineering"], verificationStatus: V,
    },
    {
      id: `${uid}-hit-fcebe`, universityId: uid, parentUnitId: `${uid}-hit`, kind: "school",
      name: "Faculty of Civil Engineering and Built Environment",
      fieldKeys: ["engineering"], verificationStatus: V,
    },
    {
      id: `${uid}-hit-fee`, universityId: uid, parentUnitId: `${uid}-hit`, kind: "school",
      name: "Faculty of Electrical Engineering",
      fieldKeys: ["engineering"], verificationStatus: V,
    },
    {
      id: `${uid}-hit-fi`, universityId: uid, parentUnitId: `${uid}-hit`, kind: "school",
      name: "Faculty of Informatics",
      fieldKeys: ["computer-science", "information-technology", "information-systems"],
      verificationStatus: V,
    },
    {
      id: `${uid}-hit-fme`, universityId: uid, parentUnitId: `${uid}-hit`, kind: "school",
      name: "Faculty of Manufacturing Engineering",
      fieldKeys: ["engineering"], verificationStatus: V,
    },
    // Research Institutes
    {
      id: `${uid}-ipdr`, universityId: uid, parentUnitId: null, kind: "research_center",
      name: "Institute of Policy and Development Research (IPDR)",
      description: "A research institute rather than a conventional college organised around undergraduate departments.",
      fieldKeys: ["social-sciences"],
      verificationStatus: V,
    },
    {
      id: `${uid}-ioss`, universityId: uid, parentUnitId: null, kind: "research_center",
      name: "Institute of Sidama Studies (IoSS)",
      description: "Focuses on research and academic work related to Sidama studies rather than being structured like a conventional undergraduate college.",
      fieldKeys: ["social-sciences"],
      verificationStatus: V,
    },
  ],

  // ── DEPARTMENTS (19 HIT departments) ──────────────────────────────────────
  departments: [
    // Faculty of Biosystems and Water Resources Engineering (4 departments)
    { id: `${uid}-d1`, universityId: uid, unitId: `${uid}-hit-fbwre`, name: "Agricultural Engineering", verificationStatus: V },
    { id: `${uid}-d2`, universityId: uid, unitId: `${uid}-hit-fbwre`, name: "Water Supply and Environmental Engineering", verificationStatus: V },
    { id: `${uid}-d3`, universityId: uid, unitId: `${uid}-hit-fbwre`, name: "Water Resources and Irrigation Engineering", verificationStatus: V },
    { id: `${uid}-d4`, universityId: uid, unitId: `${uid}-hit-fbwre`, name: "Hydraulic and Water Resources Engineering", verificationStatus: V },

    // Faculty of Civil Engineering and Built Environment (4 departments)
    { id: `${uid}-d5`, universityId: uid, unitId: `${uid}-hit-fcebe`, name: "Civil Engineering", verificationStatus: V },
    { id: `${uid}-d6`, universityId: uid, unitId: `${uid}-hit-fcebe`, name: "Architecture", verificationStatus: V },
    { id: `${uid}-d7`, universityId: uid, unitId: `${uid}-hit-fcebe`, name: "Construction Technology and Management", verificationStatus: V },
    { id: `${uid}-d8`, universityId: uid, unitId: `${uid}-hit-fcebe`, name: "Urban Planning and Design", verificationStatus: V },

    // Faculty of Electrical Engineering (2 departments)
    { id: `${uid}-d9`, universityId: uid, unitId: `${uid}-hit-fee`, name: "Electrical and Computer Engineering", verificationStatus: V },
    { id: `${uid}-d10`, universityId: uid, unitId: `${uid}-hit-fee`, name: "Biomedical Engineering", verificationStatus: V },

    // Faculty of Informatics (3 departments)
    { id: `${uid}-d11`, universityId: uid, unitId: `${uid}-hit-fi`, name: "Computer Science", verificationStatus: V },
    { id: `${uid}-d12`, universityId: uid, unitId: `${uid}-hit-fi`, name: "Information Technology", verificationStatus: V },
    { id: `${uid}-d13`, universityId: uid, unitId: `${uid}-hit-fi`, name: "Information Systems", verificationStatus: V },

    // Faculty of Manufacturing Engineering (6 departments)
    { id: `${uid}-d14`, universityId: uid, unitId: `${uid}-hit-fme`, name: "Mechanical Engineering", verificationStatus: V },
    { id: `${uid}-d15`, universityId: uid, unitId: `${uid}-hit-fme`, name: "Electromechanical Engineering", verificationStatus: V },
    { id: `${uid}-d16`, universityId: uid, unitId: `${uid}-hit-fme`, name: "Chemical Engineering", verificationStatus: V },
    { id: `${uid}-d17`, universityId: uid, unitId: `${uid}-hit-fme`, name: "Industrial Engineering", verificationStatus: V },
    { id: `${uid}-d18`, universityId: uid, unitId: `${uid}-hit-fme`, name: "Textile Engineering", verificationStatus: V },
    { id: `${uid}-d19`, universityId: uid, unitId: `${uid}-hit-fme`, name: "Garment Engineering", verificationStatus: V },
  ],

  programs: [],
  facilities: [],
  photos: [],

  history: [
    {
      id: `${uid}-h1`, universityId: uid, year: "1999", title: "Founded",
      description: "Hawassa University was established in 1999.",
      verificationStatus: N,
    },
  ],

  sources: [
    {
      id: `${uid}-s1`, universityId: uid,
      sourceName: "Hawassa University official website",
      sourceUrl: "https://www.hu.edu.et",
      sourceType: "official_website",
      lastVerified: "2026-09",
      verificationStatus: P,
    },
  ],

  contact: {
    universityId: uid,
    website: "https://www.hu.edu.et",
    email: null,
    phone: null,
    address: "Hawassa, Sidama Region, Ethiopia",
  },

  orgUnits: [],

  statistics: [
    {
      id: `${uid}-st1`, universityId: uid,
      label: "Institute of Technology faculties",
      value: "5",
      verificationStatus: V,
    },
    {
      id: `${uid}-st2`, universityId: uid,
      label: "Institute of Technology departments",
      value: "19",
      verificationStatus: V,
    },
  ],

  library: null,
  leadership: null,

  dataNotes: [
    "The School of Medicine (where applicable) lists units including Psychiatry, ENT, Dermatology, Oncology and Forensic Medicine. These are identified as units rather than departments and are not counted in the department totals.",
    "The Institute of Policy and Development Research (IPDR) is a research institute — not a conventional college with undergraduate departments.",
    "The Institute of Sidama Studies (IoSS) focuses on research related to Sidama studies and is not structured like a conventional undergraduate college.",
    "Full college and department listings beyond the Institute of Technology are not yet available in this dataset and will be added as verified.",
  ],
};
