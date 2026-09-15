import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { useState } from "react";

import { LoginRequired } from "@/components/site/LoginRequired";
import { PageHeader } from "@/components/site/PageHeader";
import { SiteLayout } from "@/components/site/SiteLayout";
import { askAdvisor, type AdvisorReply } from "@/lib/ai-advisor";

export const Route = createFileRoute("/ai-advisor")({
  head: () => ({
    meta: [
      { title: "AI University Advisor | ETHIO UNIVERSITY GUIDE" },
      {
        name: "description",
        content:
          "Ask about Ethiopian universities in plain language. Answers come only from verified records in the guide, with the source behind every reply.",
      },
      { property: "og:title", content: "AI University Advisor | ETHIO UNIVERSITY GUIDE" },
      {
        property: "og:description",
        content: "Grounded answers about Ethiopian universities — no invented information.",
      },
    ],
  }),
  component: AdvisorPage,
});

const examples = [
  "Tell me about ASTU.",
  "Tell me about Adigrat University.",
  "Tell me about Aksum University.",
  "Which universities are in Tigray?",
  "Compare Adigrat and Aksum.",
  "What academic fields does Aksum University have?",
  "What is Adigrat University's motto?",
  "What is ASTU focused on?",
];

interface Turn {
  question: string;
  reply: AdvisorReply;
}

function AdvisorPage() {
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);

  const ask = (question: string) => {
    const q = question.trim();
    if (!q) return;
    setTurns((prev) => [...prev, { question: q, reply: askAdvisor(q) }]);
    setInput("");
  };

  return (
    <SiteLayout>
      <LoginRequired>
      <PageHeader
        eyebrow="Ethio University Guide"
        title="AI advisor"
        description="The advisor answers only from records stored in this guide. If something has not been verified, it says so instead of guessing."
      />

      <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {examples.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => ask(e)}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-secondary"
            >
              {e}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {turns.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border p-6 text-sm italic text-muted-foreground">
              Ask a question, or tap one of the examples above.
            </p>
          ) : (
            turns.map((t, i) => (
              <div key={i} className="space-y-3">
                <p className="ml-auto max-w-[85%] rounded-2xl bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                  {t.question}
                </p>
                <div className="max-w-[95%] rounded-2xl border border-border bg-card px-4 py-3">
                  <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">
                    {t.reply.text}
                  </p>
                  {t.reply.citations.length ? (
                    <div className="mt-3 border-t border-border pt-3">
                      <p className="text-xs font-semibold text-muted-foreground">Sources</p>
                      <ul className="mt-1 space-y-1 text-xs">
                        {t.reply.citations.slice(0, 6).map((c, ci) => (
                          <li key={ci}>
                            {c.url ? (
                              <a
                                href={c.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-primary hover:underline"
                              >
                                {c.label}
                              </a>
                            ) : (
                              <span className="text-muted-foreground">{c.label}</span>
                            )}
                            {c.lastVerified ? (
                              <span className="text-muted-foreground"> · {c.lastVerified}</span>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
          className="sticky bottom-4 flex gap-2 rounded-xl border border-border bg-card p-2 shadow-sm"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a university, region, field of study…"
            aria-label="Ask the advisor"
            className="flex-1 rounded-lg bg-transparent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Send className="h-4 w-4" /> Ask
          </button>
        </form>
      </div>
      </LoginRequired>
    </SiteLayout>
  );
}
