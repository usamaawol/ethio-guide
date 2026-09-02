/**
 * Data access layer.
 *
 * Every page and the AI advisor read through this module — never from the seed
 * files directly. Swapping the seeded in-memory source for Firestore (or any
 * other backend) means re-implementing these functions against
 * `getDataSource()` only; no UI code changes.
 */
import { generations, programFieldLabel, programFields, regions } from "@/data/reference";
import { aastu } from "@/data/universities/aastu";
import { adigrat } from "@/data/universities/adigrat";
import type {
  AcademicUnit,
  Generation,
  Region,
  University,
  UniversityRecord,
} from "@/data/types";

const records: UniversityRecord[] = [aastu, adigrat];

const hydrate = (record: UniversityRecord): UniversityRecord => ({
  ...record,
  region: regions.find((r) => r.id === record.university.regionId) ?? null,
  generation: generations.find((g) => g.id === record.university.generationId) ?? null,
});

export const getAllRecords = (): UniversityRecord[] => records.map(hydrate);

export const getRecordBySlug = (slug: string): UniversityRecord | null =>
  getAllRecords().find((r) => r.university.slug === slug) ?? null;

export const getRecordById = (id: string): UniversityRecord | null =>
  getAllRecords().find((r) => r.university.id === id) ?? null;

export const getRegions = (): Region[] => regions;
export const getGenerations = (): Generation[] => generations;
export const getProgramFields = () => programFields;
export const fieldLabel = programFieldLabel;

export const getUniversityTypes = (): string[] =>
  Array.from(new Set(getAllRecords().map((r) => r.university.type))).sort();

export const countByRegion = (regionId: string): number =>
  getAllRecords().filter((r) => r.university.regionId === regionId).length;

export const countByGeneration = (generationId: string): number =>
  getAllRecords().filter((r) => r.university.generationId === generationId).length;

export const unverifiedGenerationCount = (): number =>
  getAllRecords().filter((r) => !r.university.generationId).length;

export interface UniversityQuery {
  q?: string;
  regionId?: string;
  generationId?: string;
  type?: string;
  fieldKey?: string;
  sort?: "name" | "location" | "generation" | "established" | "verified";
}

const matchesText = (record: UniversityRecord, q: string): boolean => {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  const haystack = [
    record.university.name,
    record.university.shortName,
    record.university.city ?? "",
    record.region?.name ?? "",
    record.university.overview ?? "",
    ...record.units.map((u) => u.name),
    ...record.units.flatMap((u) => u.fieldKeys.map(programFieldLabel)),
    ...record.departments.map((d) => d.name),
    ...record.programs.map((p) => p.name),
  ]
    .join(" ")
    .toLowerCase();
  // also match canonical field aliases, e.g. "software" -> computing units
  const aliasHit = programFields.some(
    (f) =>
      (f.key.includes(needle) ||
        f.label.toLowerCase().includes(needle) ||
        f.aliases.some((a) => a.includes(needle))) &&
      record.units.some((u) => u.fieldKeys.includes(f.key)),
  );
  return haystack.includes(needle) || aliasHit;
};

export const queryUniversities = (query: UniversityQuery = {}): UniversityRecord[] => {
  let results = getAllRecords();
  if (query.q) results = results.filter((r) => matchesText(r, query.q!));
  if (query.regionId) results = results.filter((r) => r.university.regionId === query.regionId);
  if (query.generationId)
    results = results.filter((r) => r.university.generationId === query.generationId);
  if (query.type) results = results.filter((r) => r.university.type === query.type);
  if (query.fieldKey)
    results = results.filter((r) => r.units.some((u) => u.fieldKeys.includes(query.fieldKey!)));

  const sort = query.sort ?? "name";
  return [...results].sort((a, b) => {
    if (sort === "location")
      return (a.region?.name ?? "zz").localeCompare(b.region?.name ?? "zz");
    if (sort === "generation")
      return (a.generation?.order ?? 99) - (b.generation?.order ?? 99);
    if (sort === "established")
      return (a.university.yearEstablished ?? "9999").localeCompare(
        b.university.yearEstablished ?? "9999",
      );
    if (sort === "verified")
      return (b.university.lastVerified ?? "").localeCompare(a.university.lastVerified ?? "");
    return a.university.name.localeCompare(b.university.name);
  });
};

export interface ProgramMatch {
  university: University;
  region: Region | null;
  unit: AcademicUnit;
  /** Verified department name, when the source data supplies one. */
  departmentName: string | null;
  programName: string | null;
  degreeLevel: string;
  campusName: string | null;
  sourceUrl: string | null;
  lastVerified: string | null;
}

/** Universities whose verified academic units cover a canonical study field. */
export const findByProgramField = (fieldKey: string): ProgramMatch[] => {
  const matches: ProgramMatch[] = [];
  for (const record of getAllRecords()) {
    for (const unit of record.units) {
      if (!unit.fieldKeys.includes(fieldKey)) continue;
      const program = record.programs.find((p) => p.fieldKey === fieldKey);
      const department = program?.departmentId
        ? (record.departments.find((d) => d.id === program.departmentId) ?? null)
        : null;
      matches.push({
        university: record.university,
        region: record.region,
        unit,
        departmentName: department?.name ?? null,
        programName: program?.name ?? null,
        degreeLevel: program?.degreeLevel ?? "Unknown",
        campusName: null,
        sourceUrl: record.sources[0]?.sourceUrl ?? null,
        lastVerified: record.university.lastVerified,
      });
    }
  }
  return matches;
};

/** Field keys that at least one university in the database covers. */
export const availableProgramFields = () =>
  programFields.filter((f) => findByProgramField(f.key).length > 0);

export const searchEverything = (q: string) => {
  const needle = q.trim().toLowerCase();
  if (!needle) return { universities: [], units: [], fields: [] };
  const universities = queryUniversities({ q }).slice(0, 6);
  const units = getAllRecords()
    .flatMap((r) => r.units.map((u) => ({ unit: u, university: r.university })))
    .filter((x) => x.unit.name.toLowerCase().includes(needle))
    .slice(0, 6);
  const fields = programFields
    .filter(
      (f) =>
        f.label.toLowerCase().includes(needle) || f.aliases.some((a) => a.includes(needle)),
    )
    .filter((f) => findByProgramField(f.key).length > 0)
    .slice(0, 6);
  return { universities, units, fields };
};
