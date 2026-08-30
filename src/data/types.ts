/**
 * Normalized data model for the University Guide platform.
 *
 * Every entity is stored separately and linked by id so the same shapes can be
 * mapped 1:1 onto Firestore collections later (see src/lib/backend/README notes
 * in src/lib/repository.ts). Nothing is stored as one giant nested blob.
 */

export type VerificationStatus = "verified" | "partially_verified" | "needs_verification";

export type UniversityType =
  | "Public Research University"
  | "Public University"
  | "Private University"
  | "Unknown";

export type DegreeLevel = "Undergraduate" | "Masters" | "PhD" | "Unknown";

export type AcademicUnitKind = "college" | "school" | "institute" | "research_center" | "academy" | "campus_unit";

export interface Region {
  id: string;
  name: string;
  kind: "regional_state" | "city_administration";
}

export interface Generation {
  id: string;
  name: string;
  order: number;
  description?: string;
}

export interface Source {
  id: string;
  universityId: string;
  sourceName: string;
  sourceUrl: string;
  sourceType: "official_website" | "official_document" | "user_supplied";
  lastVerified: string | null;
  verificationStatus: VerificationStatus;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Campus {
  id: string;
  universityId: string;
  name: string;
  city: string | null;
  description?: string;
  coordinates: Coordinates | null;
  verificationStatus: VerificationStatus;
}

export interface Building {
  id: string;
  campusId: string;
  universityId: string;
  name: string;
  buildingType: string | null;
  description?: string;
  coordinates: Coordinates | null;
  relatedUnitId?: string;
  photoIds: string[];
  verificationStatus: VerificationStatus;
}

/** Colleges, schools, institutes, research centers and academies. */
export interface AcademicUnit {
  id: string;
  universityId: string;
  parentUnitId: string | null;
  kind: AcademicUnitKind;
  name: string;
  shortName?: string;
  description?: string;
  verificationStatus: VerificationStatus;
}

export interface Department {
  id: string;
  universityId: string;
  unitId: string;
  name: string;
  verificationStatus: VerificationStatus;
}

export interface Program {
  id: string;
  universityId: string;
  unitId: string | null;
  departmentId: string | null;
  name: string;
  /** Canonical field key used for cross-university program search. */
  fieldKey: string;
  degreeLevel: DegreeLevel;
  campusId: string | null;
  verificationStatus: VerificationStatus;
}

export interface Facility {
  id: string;
  universityId: string;
  name: string;
  description?: string;
  verificationStatus: VerificationStatus;
}

export interface UniversityPhoto {
  id: string;
  universityId: string;
  campusId: string | null;
  caption: string;
  /** null means no official image supplied yet — render a placeholder. */
  url: string | null;
  isOfficial: boolean;
}

export interface HistoryEvent {
  id: string;
  universityId: string;
  year: string;
  title: string;
  description?: string;
  verificationStatus: VerificationStatus;
}

export interface UniversityContact {
  universityId: string;
  website: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
}

export interface OrgUnit {
  id: string;
  universityId: string;
  name: string;
  parentId: string | null;
}

export interface UniversityStatistic {
  id: string;
  universityId: string;
  label: string;
  value: string;
  note?: string;
  verificationStatus: VerificationStatus;
}

export interface University {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  type: UniversityType;
  regionId: string | null;
  city: string | null;
  /** null renders as "Generation not yet verified". */
  generationId: string | null;
  yearEstablished: string | null;
  overview: string | null;
  mission: string | null;
  vision: string | null;
  values: Array<{ name: string; description?: string }>;
  goals: string[];
  motto: string | null;
  logoText: string;
  heroImageUrl: string | null;
  verificationStatus: VerificationStatus;
  lastVerified: string | null;
}

export interface UniversityRecord {
  university: University;
  region: Region | null;
  generation: Generation | null;
  campuses: Campus[];
  buildings: Building[];
  units: AcademicUnit[];
  departments: Department[];
  programs: Program[];
  facilities: Facility[];
  photos: UniversityPhoto[];
  history: HistoryEvent[];
  sources: Source[];
  contact: UniversityContact | null;
  orgUnits: OrgUnit[];
  statistics: UniversityStatistic[];
}
