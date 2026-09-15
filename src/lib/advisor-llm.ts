/**
 * LLM-backed advisor (OpenRouter).
 *
 * The pipeline: user message -> retrieval (`retrieve()` from ai-advisor) picks
 * the most relevant university records and program fields -> we build a
 * GROUNDING payload from the guide's own verified data -> the model answers
 * USING ONLY that grounding. If the API key/model is unavailable, the rule-based
 * `composeAnswer` engine takes over so the feature never hard-fails.
 *
 * The API key is read from process.env (OPENROUTER_API_KEY) on the SERVER only
 * — never sent to the browser.
 */
import { createServerFn } from "@tanstack/react-start";
import {
  retrieve,
  composeAnswer,
  citationsFor,
  type AdvisorReply,
  type AdvisorContext,
} from "./ai-advisor";
import { getAllRecords, findByProgramField, fieldLabel } from "./repository";
import type { UniversityRecord } from "@/data/types";

export type AdvisorResponse = AdvisorReply & { source: "llm" | "local" };

const env = (name: string): string | undefined => {
  if (typeof process === "undefined") return undefined;
  return (process as unknown as { env?: Record<string, string | undefined> }).env?.[name];
};

const uniq = (arr: string[]): string[] => Array.from(new Set(arr));

const compact = (s: string | null | undefined, max = 700): string | null => {
  if (!s) return null;
  const clean = s.replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, max) + "…" : clean;
};

const catalogLine = (r: UniversityRecord): string => {
  const fields = uniq(r.units.flatMap((u) => u.fieldKeys).map(fieldLabel));
  return [
    r.university.name,
    `(${r.university.shortName})`,
    `— ${r.university.type}`,
    r.region ? `— ${r.region.name}` : "",
    r.university.city ? `, ${r.university.city}` : "",
    r.university.yearEstablished ? `— est. ${r.university.yearEstablished}` : "",
    fields.length ? `— fields: ${fields.join(", ")}` : "",
  ]
    .filter(Boolean)
    .join(" ");
};

const detailBlock = (r: UniversityRecord): string => {
  const u = r.university;
  const lines: string[] = [`### ${u.name} (${u.shortName})`];
  lines.push(`- Type: ${u.type}`);
  lines.push(`- Region: ${r.region?.name ?? "Not verified"}`);
  lines.push(`- City: ${u.city ?? "Not verified"}`);
  lines.push(`- Established: ${u.yearEstablished ?? "Not available"}`);
  lines.push(`- Generation: ${r.generation?.name ?? "Not verified"}`);
  lines.push(`- Motto: ${u.motto ?? "Not available"}`);
  const overview = compact(u.overview);
  if (overview) lines.push(`- Overview: ${overview}`);
  const mission = compact(u.mission);
  if (mission) lines.push(`- Mission: ${mission}`);

  if (r.units.length) {
    lines.push("- Academic units:");
    for (const unit of r.units) {
      const f = uniq(unit.fieldKeys.map(fieldLabel));
      lines.push(`  * ${unit.name}${f.length ? ` (${f.join(", ")})` : ""}`);
    }
  }

  if (r.departments.length) {
    lines.push(
      `- Departments: ${r.departments
        .slice(0, 40)
        .map((d) => d.name)
        .join(", ")}`,
    );
  }

  if (r.programs.length) {
    lines.push("- Programs:");
    for (const p of r.programs.slice(0, 40)) {
      lines.push(`  * ${p.name} — ${fieldLabel(p.fieldKey)} (${p.degreeLevel})`);
    }
  }

  if (r.statistics.length) {
    lines.push("- Key statistics:");
    for (const s of r.statistics.slice(0, 12)) {
      lines.push(`  * ${s.label}: ${s.value}${s.note ? ` (${s.note})` : ""}`);
    }
  }

  for (const [title, rows] of [
    ["Tuition", r.tuition ?? []],
    ["Admission", r.admission ?? []],
    ["Profile", r.profileFacts ?? []],
  ] as const) {
    if (rows.length) {
      lines.push(`- ${title}:`);
      for (const row of rows.slice(0, 20)) {
        lines.push(`  * ${row.label}: ${row.value}${row.note ? ` (${row.note})` : ""}`);
      }
    }
  }

  if (r.sources.length) {
    lines.push("- Sources:");
    for (const s of r.sources) {
      lines.push(
        `  * ${s.sourceName} (${s.sourceUrl})${s.lastVerified ? ` — verified ${s.lastVerified}` : ""}`,
      );
    }
  }

  return lines.join("\n");
};

const buildGrounding = (message: string, ctx: AdvisorContext): string => {
  const parts: string[] = [];
  parts.push("CATALOG OF EVERY UNIVERSITY IN THE GUIDE");
  parts.push(getAllRecords().map(catalogLine).join("\n"));

  if (ctx.fieldKey) {
    const matches = findByProgramField(ctx.fieldKey);
    parts.push("");
    parts.push(`UNIVERSITIES WHOSE VERIFIED UNITS COVER "${fieldLabel(ctx.fieldKey)}":`);
    parts.push(
      matches.length
        ? matches
            .map(
              (m) =>
                `- ${m.university.name}${m.unit ? ` (${m.unit.name})` : ""}${
                  m.departmentName ? ` — department: ${m.departmentName}` : ""
                }${m.programName ? ` — e.g. ${m.programName}` : ""}`,
            )
            .join("\n")
        : "None verified yet.",
    );
  }

  if (ctx.records.length) {
    parts.push("");
    parts.push("DETAILED RECORDS FOR THE MOST RELEVANT UNIVERSITIES");
    for (const r of ctx.records.slice(0, 8)) parts.push("", detailBlock(r));
  }

  return parts.join("\n");
};

const SYSTEM_PROMPT = `You are the AI University Advisor for ETHIO UNIVERSITY GUIDE — a website holding verified information about Ethiopian universities, sourced only from official websites/documents. Students ask which universities offer specific programs or departments (e.g. Software Engineering, Medicine, Law, Nursing, Computer Science), ask about regions, university generations, comparisons, admission, tuition, and university profiles.

STRICT RULES:
1. Answer ONLY from the GROUNDING DATA in the user message. NEVER invent a university, department, program, city, year, motto, or any fact.
2. If the requested information is not present in the grounding data, say so honestly (e.g. "I don't have verified information about that in the guide yet") and suggest a related question the guide CAN answer.
3. The "CATALOG OF EVERY UNIVERSITY IN THE GUIDE" section lists every university on the site plus the study fields each one covers — use it for "which university offers X" questions.
4. Use the "DETAILED RECORDS" section for facts about a specific university (motto, mission, overview, units, departments, programs, tuition, admission, statistics).
5. For comparisons, compare using ONLY fields present in the data, and only compare universities listed in the catalog.
6. Be concise and student-friendly. Use short bullet lists where helpful, plain text.
7. Respond with ONLY a JSON object in this exact shape: {"answer":"your answer text here"}. No markdown fences, no commentary around the JSON. Use \\n for newlines inside the answer string.`;

const extractAnswer = (raw: string): string => {
  const trimmed = raw.trim();
  const fence = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  const candidate = (fence?.[1] ?? trimmed).trim();

  const tryJson = (text: string): string | null => {
    try {
      const obj = JSON.parse(text) as { answer?: unknown };
      return typeof obj.answer === "string" ? obj.answer : null;
    } catch {
      return null;
    }
  };

  const direct = tryJson(candidate);
  if (direct) return direct;

  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start !== -1 && end > start) {
    const extracted = tryJson(candidate.slice(start, end + 1));
    if (extracted) return extracted;
  }

  return candidate;
};

export const askAdvisorLLM = createServerFn({ method: "POST" })
  .validator((d: { message: string }) => d)
  .handler(async ({ data }): Promise<AdvisorResponse> => {
    const message = data.message.trim();
    const ctx = retrieve(message);

    const localReply = (): AdvisorResponse => ({
      ...composeAnswer(message, ctx),
      source: "local",
    });

    const apiKey = env("OPENROUTER_API_KEY");
    if (!apiKey) {
      console.warn("[ai-advisor] OPENROUTER_API_KEY not set — using local rule engine.");
      return localReply();
    }

    // Free OpenRouter models rotate and are rate-limited, so we try the
    // configured model first (if any), then fall back through a list of
    // currently-available free models before degrading to the local engine.
    const configured = env("OPENROUTER_MODEL");
    const candidateModels = configured
      ? [
          configured,
          "google/gemma-4-31b-it:free",
          "google/gemma-4-26b-a4b-it:free",
          "z-ai/glm-5.2:free",
        ]
      : [
          "google/gemma-4-31b-it:free",
          "google/gemma-4-26b-a4b-it:free",
          "z-ai/glm-5.2:free",
          "nvidia/nemotron-3-super-120b-a12b:free",
        ];
    const grounding = buildGrounding(message, ctx);

    let lastError: unknown = new Error("No models attempted");
    for (const model of candidateModels) {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
            "HTTP-Referer": "https://ethio-university-guide.firebaseapp.com",
            "X-Title": "ETHIO UNIVERSITY GUIDE",
          },
          body: JSON.stringify({
            model,
            temperature: 0.3,
            max_tokens: 900,
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              {
                role: "user",
                content: `Student question: ${message}\n\n---\n\nGROUNDING DATA\n${grounding}`,
              },
            ],
          }),
          signal: AbortSignal.timeout(60000),
        });

        if (!response.ok) {
          const detail = (await response.json().catch(() => null)) as {
            error?: { message?: string } | string;
          } | null;
          const reason =
            detail && typeof detail.error === "object"
              ? detail.error.message
              : detail && typeof detail.error === "string"
                ? detail.error
                : response.statusText;
          throw new Error(`OpenRouter ${model} ${response.status}: ${reason}`);
        }

        const data = (await response.json()) as {
          choices?: Array<{ message?: { content?: unknown } }>;
        };
        const content = data.choices?.[0]?.message?.content;
        if (typeof content !== "string" || !content.trim()) throw new Error("Empty model response");

        return {
          text: extractAnswer(content),
          intent: ctx.intent,
          citations: citationsFor(ctx.records),
          universitySlugs: ctx.universitySlugs,
          source: "llm",
        };
      } catch (err) {
        lastError = err;
        console.warn(`[ai-advisor] model ${model} failed:`, err);
      }
    }

    console.error(
      "[ai-advisor] All OpenRouter models failed — falling back to local engine.",
      lastError,
    );
    return localReply();
  });
