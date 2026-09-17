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
    shortName: "HWU",
    amharicName: "ሀዋሳ ዩኒቨርስቲ",
    alternateNames: ["HwU", "HWU", "Hawasa University", "Hawassa", "ሀዋሳ ዩኒቨርስቲ"],
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
      "Hawassa University is a public research university located in Hawassa, the capital of the Sidama Region. It is one of Ethiopia's leading comprehensive universities and hosts a full Institute of Technology with five faculties and 19 academic departments, as well as specialised research institutes including the Institute of Policy and Development Research (IPDR) and the Institute of Sidama Studies (IoSS). It also has branch campuses in Wondo Genet and Yirgalem, adopts a semesters academic calendar, and applies a selective admission policy based on students' past academic records and grades.",
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
      id: `${uid}-hit`,
      universityId: uid,
      parentUnitId: null,
      kind: "institute",
      name: "Institute of Technology",
      description: "Has 5 faculties and 19 academic departments.",
      fieldKeys: ["engineering"],
      verificationStatus: V,
    },
    // HIT Faculties (children of Institute of Technology)
    {
      id: `${uid}-hit-fbwre`,
      universityId: uid,
      parentUnitId: `${uid}-hit`,
      kind: "school",
      name: "Faculty of Biosystems and Water Resources Engineering",
      fieldKeys: ["engineering"],
      verificationStatus: V,
    },
    {
      id: `${uid}-hit-fcebe`,
      universityId: uid,
      parentUnitId: `${uid}-hit`,
      kind: "school",
      name: "Faculty of Civil Engineering and Built Environment",
      fieldKeys: ["engineering"],
      verificationStatus: V,
    },
    {
      id: `${uid}-hit-fee`,
      universityId: uid,
      parentUnitId: `${uid}-hit`,
      kind: "school",
      name: "Faculty of Electrical Engineering",
      fieldKeys: ["engineering"],
      verificationStatus: V,
    },
    {
      id: `${uid}-hit-fi`,
      universityId: uid,
      parentUnitId: `${uid}-hit`,
      kind: "school",
      name: "Faculty of Informatics",
      fieldKeys: ["computer-science", "information-technology", "information-systems"],
      verificationStatus: V,
    },
    {
      id: `${uid}-hit-fme`,
      universityId: uid,
      parentUnitId: `${uid}-hit`,
      kind: "school",
      name: "Faculty of Manufacturing Engineering",
      fieldKeys: ["engineering"],
      verificationStatus: V,
    },
    // Research Institutes
    {
      id: `${uid}-ipdr`,
      universityId: uid,
      parentUnitId: null,
      kind: "research_center",
      name: "Institute of Policy and Development Research (IPDR)",
      description:
        "A research institute rather than a conventional college organised around undergraduate departments.",
      fieldKeys: ["social-sciences"],
      verificationStatus: V,
    },
    {
      id: `${uid}-ioss`,
      universityId: uid,
      parentUnitId: null,
      kind: "research_center",
      name: "Institute of Sidama Studies (IoSS)",
      description:
        "Focuses on research and academic work related to Sidama studies rather than being structured like a conventional undergraduate college.",
      fieldKeys: ["social-sciences"],
      verificationStatus: V,
    },
  ],

  // ── DEPARTMENTS (19 HIT departments) ──────────────────────────────────────
  departments: [
    // Faculty of Biosystems and Water Resources Engineering (4 departments)
    {
      id: `${uid}-d1`,
      universityId: uid,
      unitId: `${uid}-hit-fbwre`,
      name: "Agricultural Engineering",
      verificationStatus: V,
    },
    {
      id: `${uid}-d2`,
      universityId: uid,
      unitId: `${uid}-hit-fbwre`,
      name: "Water Supply and Environmental Engineering",
      verificationStatus: V,
    },
    {
      id: `${uid}-d3`,
      universityId: uid,
      unitId: `${uid}-hit-fbwre`,
      name: "Water Resources and Irrigation Engineering",
      verificationStatus: V,
    },
    {
      id: `${uid}-d4`,
      universityId: uid,
      unitId: `${uid}-hit-fbwre`,
      name: "Hydraulic and Water Resources Engineering",
      verificationStatus: V,
    },

    // Faculty of Civil Engineering and Built Environment (4 departments)
    {
      id: `${uid}-d5`,
      universityId: uid,
      unitId: `${uid}-hit-fcebe`,
      name: "Civil Engineering",
      verificationStatus: V,
    },
    {
      id: `${uid}-d6`,
      universityId: uid,
      unitId: `${uid}-hit-fcebe`,
      name: "Architecture",
      verificationStatus: V,
    },
    {
      id: `${uid}-d7`,
      universityId: uid,
      unitId: `${uid}-hit-fcebe`,
      name: "Construction Technology and Management",
      verificationStatus: V,
    },
    {
      id: `${uid}-d8`,
      universityId: uid,
      unitId: `${uid}-hit-fcebe`,
      name: "Urban Planning and Design",
      verificationStatus: V,
    },

    // Faculty of Electrical Engineering (2 departments)
    {
      id: `${uid}-d9`,
      universityId: uid,
      unitId: `${uid}-hit-fee`,
      name: "Electrical and Computer Engineering",
      verificationStatus: V,
    },
    {
      id: `${uid}-d10`,
      universityId: uid,
      unitId: `${uid}-hit-fee`,
      name: "Biomedical Engineering",
      verificationStatus: V,
    },

    // Faculty of Informatics (3 departments)
    {
      id: `${uid}-d11`,
      universityId: uid,
      unitId: `${uid}-hit-fi`,
      name: "Computer Science",
      verificationStatus: V,
    },
    {
      id: `${uid}-d12`,
      universityId: uid,
      unitId: `${uid}-hit-fi`,
      name: "Information Technology",
      verificationStatus: V,
    },
    {
      id: `${uid}-d13`,
      universityId: uid,
      unitId: `${uid}-hit-fi`,
      name: "Information Systems",
      verificationStatus: V,
    },

    // Faculty of Manufacturing Engineering (6 departments)
    {
      id: `${uid}-d14`,
      universityId: uid,
      unitId: `${uid}-hit-fme`,
      name: "Mechanical Engineering",
      verificationStatus: V,
    },
    {
      id: `${uid}-d15`,
      universityId: uid,
      unitId: `${uid}-hit-fme`,
      name: "Electromechanical Engineering",
      verificationStatus: V,
    },
    {
      id: `${uid}-d16`,
      universityId: uid,
      unitId: `${uid}-hit-fme`,
      name: "Chemical Engineering",
      verificationStatus: V,
    },
    {
      id: `${uid}-d17`,
      universityId: uid,
      unitId: `${uid}-hit-fme`,
      name: "Industrial Engineering",
      verificationStatus: V,
    },
    {
      id: `${uid}-d18`,
      universityId: uid,
      unitId: `${uid}-hit-fme`,
      name: "Textile Engineering",
      verificationStatus: V,
    },
    {
      id: `${uid}-d19`,
      universityId: uid,
      unitId: `${uid}-hit-fme`,
      name: "Garment Engineering",
      verificationStatus: V,
    },
  ],

  programs: [],
  facilities: [
    {
      id: `${uid}-f1`,
      universityId: uid,
      name: "University library",
      description: "Reported in the supplied institutional profile.",
      verificationStatus: P,
    },
    {
      id: `${uid}-f2`,
      universityId: uid,
      name: "University housing",
      description: "Reported in the supplied institutional profile.",
      verificationStatus: P,
    },
    {
      id: `${uid}-f3`,
      universityId: uid,
      name: "Sports facilities",
      description: "Reported in the supplied institutional profile.",
      verificationStatus: P,
    },
  ],
  photos: [],

  history: [
    {
      id: `${uid}-h1`,
      universityId: uid,
      year: "1999",
      title: "Founded",
      description: "Current dataset reports 1999; a third-party profile reports 1976.",
      verificationStatus: N,
    },
  ],

  sources: [
    {
      id: `${uid}-s1`,
      universityId: uid,
      sourceName: "Hawassa University official website",
      sourceUrl: "https://www.hu.edu.et",
      sourceType: "official_website",
      lastVerified: "2026-09",
      verificationStatus: P,
    },
    {
      id: `${uid}-s2`,
      universityId: uid,
      sourceName: "Third-party reported institutional profile",
      sourceUrl: "https://www.hu.edu.et",
      sourceType: "user_supplied",
      lastVerified: "2026-09",
      verificationStatus: N,
    },
  ],

  contact: {
    universityId: uid,
    website: "https://www.hu.edu.et",
    email: null,
    phone: "(46) 220 9676",
    fax: "(46) 220 5421",
    address: "Hawassa, Sidama Region, Ethiopia",
    poBox: "PO Box 5",
  },

  orgUnits: [],

  statistics: [
    {
      id: `${uid}-st1`,
      universityId: uid,
      label: "Institute of Technology faculties",
      value: "5",
      verificationStatus: V,
    },
    {
      id: `${uid}-st2`,
      universityId: uid,
      label: "Institute of Technology departments",
      value: "19",
      verificationStatus: V,
    },
    {
      id: `${uid}-st3`,
      universityId: uid,
      label: "Total student enrollment",
      value: "20,000–24,999",
      note: "Third-party reported range — large-sized institution.",
      verificationStatus: N,
    },
    {
      id: `${uid}-st4`,
      universityId: uid,
      label: "Academic staff",
      value: "4,000–4,499",
      note: "Third-party reported range.",
      verificationStatus: N,
    },
  ],

  library: {
    universityId: uid,
    services: [],
    description: "A university library is reported in the supplied institutional profile.",
    verificationStatus: P,
  },
  leadership: null,

  academicFields: [
    "Arts & Humanities",
    "Language & Cultural Studies",
    "Business & Social Sciences",
    "Medicine & Health",
    "Science & Technology",
    "Engineering",
  ],
  degreeLevels: ["Bachelor"],
  establishmentClaims: [
    { sourceLabel: "Current dataset", year: "1999" },
    { sourceLabel: "Third-party profile (uniRank)", year: "1976" },
  ],
  profileFacts: [
    { label: "Control", value: "Public" },
    { label: "Entity", value: "Non-profit" },
    { label: "Coeducational", value: "Yes" },
    { label: "Religious affiliation", value: "None" },
    { label: "Motto", value: "Not available" },
    { label: "Campus setting", value: "Urban" },
    { label: "Academic calendar", value: "Semesters" },
    { label: "Disabled students", value: "Not reported" },
    { label: "University library", value: "Yes" },
    { label: "Housing", value: "Yes" },
    { label: "Sports facilities", value: "Yes" },
    { label: "Institutional hospital", value: "Not reported" },
    { label: "Financial aid", value: "Yes" },
    { label: "Study abroad", value: "Not reported" },
    { label: "Distance learning", value: "Yes" },
    { label: "Academic counseling", value: "Not reported" },
    { label: "Career services", value: "Not reported" },
    { label: "Minority serving", value: "No special focus" },
    { label: "Recognition", value: "Ministry of Education of Ethiopia" },
    { label: "Programmatic accreditation", value: "Not available" },
    { label: "Affiliations and memberships", value: "Not yet available" },
  ],
  admission: [
    { label: "Coeducational", value: "Yes" },
    {
      label: "Admission selection",
      value: "Selective admission policy based on students' past academic records and grades",
    },
    { label: "Acceptance rate", value: "Not reported" },
    { label: "Admission requirements", value: "Not reported" },
    { label: "International students", value: "Yes" },
    { label: "Admission office", value: "PO Box 05, Hawassa" },
  ],
  tuition: [
    { label: "Local undergraduate", value: "Not reported" },
    { label: "Local postgraduate", value: "Not reported" },
    { label: "International undergraduate", value: "Not reported" },
    { label: "International postgraduate", value: "Not reported" },
  ],
  socialPlatforms: ["Facebook", "X", "YouTube", "LinkedIn"],

  dataNotes: [
    "The School of Medicine (where applicable) lists units including Psychiatry, ENT, Dermatology, Oncology and Forensic Medicine. These are identified as units rather than departments and are not counted in the department totals.",
    "The Institute of Policy and Development Research (IPDR) is a research institute — not a conventional college with undergraduate departments.",
    "The Institute of Sidama Studies (IoSS) focuses on research related to Sidama studies and is not structured like a conventional undergraduate college.",
    "Full college and department listings beyond the Institute of Technology are not yet available in this dataset and will be added as verified.",
    "Spelling noted: the third-party profile uses 'Awasa'; this dataset uses 'Hawassa'.",
    "Branch campuses are located in Wondo Genet and Yirgalem.",
    "A third-party profile reports the establishment year as 1976; this dataset records 1999. Both are shown rather than merged.",
    'The phrase "Not reported" does not mean "No".',
    "Social media accounts are referenced but individual URLs are not verified, so no links are shown.",
    "A Wikipedia entry exists as an external reference only — it is not the official university source.",
  ],
};
