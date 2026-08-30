import type { UniversityRecord } from "../types";
import { generations, regions } from "../reference";

const uid = "haramaya";
const V = "verified" as const;
const P = "partially_verified" as const;

const college = (
  id: string,
  name: string,
  fieldKeys: string[],
  kind: "college" | "institute" = "college",
  shortName?: string,
) => ({
  id: `${uid}-${id}`,
  universityId: uid,
  parentUnitId: null,
  kind,
  name,
  shortName,
  fieldKeys,
  verificationStatus: V,
});

export const haramaya: UniversityRecord = {
  university: {
    id: uid,
    slug: "haramaya-university",
    name: "Haramaya University",
    shortName: "HU",
    type: "Public Research University",
    regionId: regions.find((r) => r.id === "oromia")!.id,
    city: "Haramaya",
    generationId: null,
    yearEstablished: "1954",
    overview:
      "Haramaya University (HU) is one of Ethiopia's largest and oldest public research universities, originally founded in 1954 with a strong focus on agricultural science, and later expanding into a comprehensive, multi-disciplinary institution.",
    mission: null,
    vision: null,
    values: [],
    goals: [],
    motto: null,
    logoText: "HU",
    heroImageUrl: null,
    verificationStatus: P,
    lastVerified: "2026-08",
  },
  region: null,
  generation: generations.find((g) => g.id === "none") ?? null,
  campuses: [
    {
      id: `${uid}-main`,
      universityId: uid,
      name: "Main Campus",
      city: "Haramaya",
      description: "Alemaya Campus, inaugurated in January 1958.",
      coordinates: null,
      verificationStatus: P,
    },
  ],
  buildings: [],
  units: [
    college("cas", "College of Agriculture & Environmental Sciences", ["agriculture"]),
    college("cbe", "College of Business & Economics", ["business", "economics"]),
    college("cci", "College of Computing & Informatics", [
      "computer-science",
      "information-technology",
    ]),
    college("cebs", "College of Education & Behavioural Sciences", ["education"]),
    college("chms", "College of Health & Medical Sciences", ["medicine"], "college", "CHMS"),
    college("law", "College of Law", ["law"]),
    college("cncs", "College of Natural & Computational Sciences", ["natural-sciences"]),
    college("cssh", "College of Social Sciences & Humanities", ["social-sciences"]),
    college("cvm", "College of Veterinary Medicine", ["veterinary-medicine"]),
    {
      ...college("hit", "Haramaya Institute of Technology", ["engineering"], "institute", "HIT"),
      description: "HIT offers engineering and technology programs.",
    },
  ],
  departments: [],
  programs: [],
  facilities: [],
  photos: [],
  history: [
    {
      id: `${uid}-h1`,
      universityId: uid,
      year: "1954",
      title: "Alemaya College of Agriculture established",
      description:
        "The Haramaya University College of Agriculture, formerly the Alemaya College of Agriculture, was established in 1954.",
      verificationStatus: V,
    },
    {
      id: `${uid}-h2`,
      universityId: uid,
      year: "1957",
      title: "First eleven graduates complete their studies",
      description: "The first eleven graduates completed their studies in the summer of 1957.",
      verificationStatus: V,
    },
    {
      id: `${uid}-h3`,
      universityId: uid,
      year: "1958",
      title: "Convocation and inauguration of Alemaya Campus",
      description:
        "The first graduates were granted BSc degrees in general agriculture at a convocation ceremony held at Alemaya Campus in January 1958. Emperor Haile Selassie I inaugurated Alemaya Campus in January 1958.",
      verificationStatus: V,
    },
  ],
  sources: [
    {
      id: `${uid}-s1`,
      universityId: uid,
      sourceName: "Haramaya University official website",
      sourceUrl: "https://www.haramaya.edu.et",
      sourceType: "official_website",
      lastVerified: "2026-08",
      verificationStatus: V,
    },
  ],
  contact: {
    universityId: uid,
    website: "https://www.haramaya.edu.et",
    email: null,
    phone: null,
    address: null,
  },
  orgUnits: [
    { id: `${uid}-o1`, universityId: uid, name: "Ministry of Education", parentId: null },
    { id: `${uid}-o2`, universityId: uid, name: "University Board", parentId: `${uid}-o1` },
    { id: `${uid}-o3`, universityId: uid, name: "President", parentId: `${uid}-o2` },
    { id: `${uid}-o4`, universityId: uid, name: "Managing Council", parentId: `${uid}-o3` },
    { id: `${uid}-o5`, universityId: uid, name: "University Council", parentId: `${uid}-o3` },
    { id: `${uid}-o6`, universityId: uid, name: "Academic Senate", parentId: `${uid}-o3` },
    {
      id: `${uid}-o7`,
      universityId: uid,
      name: "Institutional Quality Assurance Director",
      parentId: `${uid}-o3`,
    },
    { id: `${uid}-o8`, universityId: uid, name: "Internal Audit", parentId: `${uid}-o3` },
    {
      id: `${uid}-o9`,
      universityId: uid,
      name: "Ethics and Anti-Corruption Director",
      parentId: `${uid}-o3`,
    },
    {
      id: `${uid}-o10`,
      universityId: uid,
      name: "University Protection and Campus Security Director",
      parentId: `${uid}-o3`,
    },
    {
      id: `${uid}-o11`,
      universityId: uid,
      name: "Women, Children and Youth Affairs",
      parentId: `${uid}-o3`,
    },
    { id: `${uid}-o12`, universityId: uid, name: "Liaison Officer", parentId: `${uid}-o3` },
    {
      id: `${uid}-o13`,
      universityId: uid,
      name: "Construction Project Officer",
      parentId: `${uid}-o3`,
    },
    {
      id: `${uid}-o14`,
      universityId: uid,
      name: "Public and International Relations Director",
      parentId: `${uid}-o3`,
    },
    { id: `${uid}-o15`, universityId: uid, name: "Legal Services", parentId: `${uid}-o3` },
    {
      id: `${uid}-o16`,
      universityId: uid,
      name: "Strategic Planning, Monitoring and Evaluation Director",
      parentId: `${uid}-o3`,
    },
    {
      id: `${uid}-o17`,
      universityId: uid,
      name: "Good Governance and Reform Director",
      parentId: `${uid}-o3`,
    },
    {
      id: `${uid}-o18`,
      universityId: uid,
      name: "Information Communication Technology Director",
      parentId: `${uid}-o3`,
    },
    {
      id: `${uid}-o19`,
      universityId: uid,
      name: "Vice President for Academic Affairs",
      parentId: `${uid}-o3`,
    },
    {
      id: `${uid}-o20`,
      universityId: uid,
      name: "Vice President for Research and Community Engagement",
      parentId: `${uid}-o3`,
    },
    {
      id: `${uid}-o21`,
      universityId: uid,
      name: "Vice President for Administration and Development",
      parentId: `${uid}-o3`,
    },
    {
      id: `${uid}-o22`,
      universityId: uid,
      name: "Haramaya Institute of Technology leadership",
      parentId: `${uid}-o3`,
    },
    { id: `${uid}-o23`, universityId: uid, name: "CHMS executive leadership", parentId: `${uid}-o3` },
  ],
  statistics: [
    {
      id: `${uid}-st1`,
      universityId: uid,
      label: "Students enrolled",
      value: "Over 30,000",
      note: "As stated in the supplied source material.",
      verificationStatus: P,
    },
  ],
};

export const haramayaNotes = {
  academicExcellence:
    "Haramaya University aspirations and ambitions can be seen in development activity throughout the campus and in every department and discipline. Through the dedicated efforts of its staff and faculty, long term strategic planning, investment and with a dedication to the development of its student body, Haramaya University is positioning itself to achieve greater academic excellence.",
};
