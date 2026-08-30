/**
 * Retrieval-first advisor engine.
 *
 * The pipeline is: user message -> intent + entity extraction -> repository
 * lookup -> answer assembled ONLY from returned records. A real LLM can be
 * dropped in later by replacing `composeAnswer` with a model call that receives
 * `retrieve()` output as its sole grounding context. The retrieval contract
 * (AdvisorContext) is what the model must be restricted to.
 */
import {
  fieldLabel,
  findByProgramField,
  getAllRecords,
  getProgramFields,
  getRegions,
  queryUniversities,
} from "./repository";
import type { UniversityRecord } from "@/data/types";

export const NO_DATA_REPLY = "I don't currently have verified information about that.";

export type AdvisorIntent =
  | "find_by_program"
  | "find_by_region"
  | "find_by_generation"
  | "university_info"
  | "compare"
  | "unknown";

export interface AdvisorCitation {
  label: string;
  url: string | null;
  lastVerified: string | null;
}

export interface AdvisorContext {
  intent: AdvisorIntent;
  fieldKey: string | null;
  regionId: string | null;
  universitySlugs: string[];
  records: UniversityRecord[];
}

export interface AdvisorReply {
  text: string;
  intent: AdvisorIntent;
  citations: AdvisorCitation[];
  universitySlugs: string[];
}

const norm = (s: string) => s.toLowerCase();

export const retrieve = (message: string): AdvisorContext => {
  const m = norm(message);

  const field =
    getProgramFields().find(
      (f) => m.includes(norm(f.label)) || f.aliases.some((a) => m.includes(a)),
    ) ?? null;

  const region = getRegions().find((r) => m.includes(norm(r.name))) ?? null;

  const mentioned = getAllRecords().filter(
    (r) =>
      m.includes(norm(r.university.name)) ||
      m.includes(norm(r.university.name.replace(" University", ""))) ||
      new RegExp(`\\b${norm(r.university.shortName)}\\b`).test(m),
  );

  let intent: AdvisorIntent = "unknown";
  if (mentioned.length >= 2 || m.includes("compare")) intent = "compare";
  else if (field) intent = "find_by_program";
  else if (region) intent = "find_by_region";
  else if (m.includes("generation")) intent = "find_by_generation";
  else if (mentioned.length === 1) intent = "university_info";

  let records: UniversityRecord[] = [];
  if (intent === "compare" || intent === "university_info") records = mentioned;
  else if (intent === "find_by_program" && field) {
    const slugs = new Set(findByProgramField(field.key).map((x) => x.university.slug));
    records = getAllRecords().filter((r) => slugs.has(r.university.slug));
    if (region) records = records.filter((r) => r.university.regionId === region.id);
  } else if (intent === "find_by_region" && region) {
    records = queryUniversities({ regionId: region.id });
  } else if (intent === "find_by_generation") {
    records = getAllRecords().filter((r) => r.university.generationId);
  }

  return {
    intent,
    fieldKey: field?.key ?? null,
    regionId: region?.id ?? null,
    universitySlugs: records.map((r) => r.university.slug),
    records,
  };
};

const citationsFor = (records: UniversityRecord[]): AdvisorCitation[] =>
  records.flatMap((r) =>
    r.sources.map((s) => ({
      label: `${r.university.shortName} — ${s.sourceName}`,
      url: s.sourceUrl,
      lastVerified: s.lastVerified,
    })),
  );

const listLine = (r: UniversityRecord) =>
  `• ${r.university.name} (${r.university.shortName}) — ${r.region?.name ?? "Region not yet verified"}${
    r.university.city ? ` · ${r.university.city}` : ""
  }`;

export const composeAnswer = (message: string, ctx: AdvisorContext): AdvisorReply => {
  const base = { intent: ctx.intent, universitySlugs: ctx.universitySlugs };

  if (ctx.intent === "find_by_program" && ctx.fieldKey) {
    const matches = findByProgramField(ctx.fieldKey).filter(
      (x) => !ctx.regionId || x.university.regionId === ctx.regionId,
    );
    if (matches.length === 0)
      return { ...base, text: NO_DATA_REPLY, citations: [] };
    const lines = matches.map(
      (x) =>
        `• ${x.university.name} — ${x.unit.name}${
          x.departmentName ? ` › ${x.departmentName}` : " (specific departments not yet verified)"
        }`,
    );
    return {
      ...base,
      text: `Based on verified academic units in the database, these universities cover ${fieldLabel(
        ctx.fieldKey,
      )}:\n${lines.join("\n")}\n\nDegree-level and department detail is only shown when the source data supplies it.`,
      citations: citationsFor(ctx.records),
    };
  }

  if (ctx.intent === "find_by_region") {
    if (ctx.records.length === 0) return { ...base, text: NO_DATA_REPLY, citations: [] };
    return {
      ...base,
      text: `Universities in the database for that region:\n${ctx.records.map(listLine).join("\n")}`,
      citations: citationsFor(ctx.records),
    };
  }

  if (ctx.intent === "find_by_generation") {
    if (ctx.records.length === 0)
      return {
        ...base,
        text: "Generation information has not been verified for any university in the database yet, so I can't group them by generation.",
        citations: [],
      };
    return {
      ...base,
      text: ctx.records
        .map((r) => `${listLine(r)} — ${r.generation?.name ?? "Generation not yet verified"}`)
        .join("\n"),
      citations: citationsFor(ctx.records),
    };
  }

  if (ctx.intent === "university_info" && ctx.records[0]) {
    const r = ctx.records[0];
    const parts = [
      `${r.university.name} (${r.university.shortName}) — ${r.university.type}`,
      `${r.region?.name ?? "Region not yet verified"}${r.university.city ? ` · ${r.university.city}` : ""}`,
      r.university.overview ?? "Overview not yet available.",
      r.units.length
        ? `Verified academic units:\n${r.units.map((u) => `• ${u.name}`).join("\n")}`
        : "Academic units have not been added yet for this university.",
    ];
    return { ...base, text: parts.join("\n\n"), citations: citationsFor([r]) };
  }

  if (ctx.intent === "compare" && ctx.records.length >= 2) {
    const rows = ctx.records.map(
      (r) =>
        `${r.university.name}\n  Region: ${r.region?.name ?? "Not yet verified"}\n  Established: ${
          r.university.yearEstablished ?? "Not yet available"
        }\n  Type: ${r.university.type}\n  Academic units on record: ${r.units.length || "Not yet added"}`,
    );
    return { ...base, text: rows.join("\n\n"), citations: citationsFor(ctx.records) };
  }

  return {
    ...base,
    text: `${NO_DATA_REPLY}\n\nYou can ask me things like "Which universities offer Law?", "Which universities are in Oromia?" or "Compare Haramaya University and Jimma University."`,
    citations: [],
  };
};

export const askAdvisor = (message: string): AdvisorReply =>
  composeAnswer(message, retrieve(message));
