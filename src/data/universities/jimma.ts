import type { UniversityRecord } from "../types";
import { regions } from "../reference";

const uid = "jimma";
const V = "verified" as const;
const P = "partially_verified" as const;

const unit = (
  id: string,
  name: string,
  fieldKeys: string[],
  kind: "college" | "institute" | "academy" | "campus_unit" = "college",
  description?: string,
) => ({
  id: `${uid}-${id}`,
  universityId: uid,
  parentUnitId: null,
  kind,
  name,
  fieldKeys,
  description,
  verificationStatus: V,
});

export const jimma: UniversityRecord = {
  university: {
    id: uid,
    slug: "jimma-university",
    name: "Jimma University",
    shortName: "JU",
    type: "Public University",
    regionId: regions.find((r) => r.id === "oromia")!.id,
    city: "Jimma",
    generationId: null,
    yearEstablished: null,
    overview:
      "Jimma University was founded through the amalgamation of Jimma Institute of Health Sciences and Jimma College of Agriculture in the 1980s. It emphasises inclusivity, accessibility, openness and responsiveness, and is known for its Community Based Education (CBE) approach.",
    mission:
      "Jimma University is committed to Engaging in Core Functions of Innovative Teaching, Research and Community Services Through its Cherished and Innovative Community Based Education (CBE).",
    vision:
      "Aspires to be one of the Leading Community Based Research Universities in Africa and Renowned in the World by 2030.",
    values: [],
    goals: [
      "To build culture of academic excellence that champions students' success in intellectual expertise, graduation and employability.",
      "To develop highest standards of research that gives solutions to the pressing national and global challenges.",
      "To empower the community to resolve their own issues through our creative and responsive services.",
      "To build a diverse global network in intercultural, curricular and co-curricular opportunities that make students globally competent.",
      "To create mutual partnership for reputation, financial sustainability and maximizing investment.",
    ],
    motto: "We are in the Community!",
    logoText: "JU",
    heroImageUrl: null,
    verificationStatus: P,
    lastVerified: "2026-08",
  },
  region: null,
  generation: null,
  campuses: [
    {
      id: `${uid}-main`,
      universityId: uid,
      name: "Main Campus",
      city: "Jimma",
      coordinates: null,
      verificationStatus: P,
    },
    {
      id: `${uid}-agro`,
      universityId: uid,
      name: "Agro Campus",
      city: "Jimma",
      coordinates: null,
      verificationStatus: P,
    },
  ],
  buildings: [],
  units: [
    unit("clg", "College of Law & Governance", ["law"]),
    unit("cbe", "College of Business & Economics", ["business", "economics"]),
    unit("cebs", "College of Education & Behavioral Science", ["education"]),
    unit("cavm", "College of Agriculture and Veterinary Medicine", [
      "agriculture",
      "veterinary-medicine",
    ]),
    unit("cns", "College of Natural Sciences", ["natural-sciences"]),
    unit("cssh", "College of Social Sciences & Humanities", ["social-sciences"]),
    unit("sport", "Sport Academy", ["sport-science"], "academy"),
    unit(
      "agro-unit",
      "Agro Campus",
      [],
      "campus_unit",
      "Listed as an academic unit in the supplied source material.",
    ),
  ],
  departments: [],
  programs: [],
  facilities: [
    {
      id: `${uid}-f1`,
      universityId: uid,
      name: "Administrative buildings",
      description: "Described as part of ongoing development in the supplied source.",
      verificationStatus: P,
    },
    { id: `${uid}-f2`, universityId: uid, name: "Sports facilities", verificationStatus: P },
    { id: `${uid}-f3`, universityId: uid, name: "Laboratories", verificationStatus: P },
    { id: `${uid}-f4`, universityId: uid, name: "ICT centers", verificationStatus: P },
    { id: `${uid}-f5`, universityId: uid, name: "Hotel", verificationStatus: P },
    { id: `${uid}-f6`, universityId: uid, name: "Additional classrooms", verificationStatus: P },
  ],
  photos: [],
  history: [
    {
      id: `${uid}-h1`,
      universityId: uid,
      year: "1980s",
      title: "Amalgamation of two national institutions",
      description:
        "Jimma University was founded through the amalgamation of Jimma Institute of Health Sciences and Jimma College of Agriculture in the 1980s. Both institutions had been national leaders in their respective fields, and the merger contributed to the development of a multifaceted and development-oriented institution.",
      verificationStatus: V,
    },
    {
      id: `${uid}-h2`,
      universityId: uid,
      year: "1999 E.C. Reg. No. 63",
      title: "Jimma University Establishment Regulation",
      description: "Reg No. 63-1999 Jimma University Establishment Regulation.",
      verificationStatus: V,
    },
  ],
  sources: [
    {
      id: `${uid}-s1`,
      universityId: uid,
      sourceName: "Jimma University official website",
      sourceUrl: "https://ju.edu.et",
      sourceType: "official_website",
      lastVerified: "2026-08",
      verificationStatus: V,
    },
    {
      id: `${uid}-s2`,
      universityId: uid,
      sourceName: "Reg No. 63-1999 Jimma University Establishment Regulation",
      sourceUrl:
        "https://ju.edu.et/wp-content/uploads/2024/04/Reg-No.-63-1999-Jimma-University-EstablishmenRegulation.pdf",
      sourceType: "official_document",
      lastVerified: "2026-08",
      verificationStatus: V,
    },
  ],
  contact: {
    universityId: uid,
    website: "https://ju.edu.et",
    email: null,
    phone: null,
    address: null,
  },
  orgUnits: [],
  statistics: [],
};

export const jimmaNotes = {
  community: [
    "Jimma University emphasizes inclusivity, accessibility, openness and responsiveness.",
    "The university emphasizes gender equality and support for female students.",
    "The university emphasizes inclusion of marginalized groups and people with disabilities.",
    "Students come from all regions of Ethiopia, including Afar, Gambella and Somali regions.",
    "International students and collaborations are part of the university's internationalization effort.",
    "The university emphasizes public-private partnerships to prepare students for industry.",
  ],
  administrativeServices: [
    "Registrar",
    "CDE & E-Learning",
    "Professional Development",
    "Institute & Schools directory",
  ],
};
