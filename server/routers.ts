import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { invokeLLM } from "./_core/llm";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { IS_COMING_SOON } from "../shared/siteMode";

const playingFieldSummaryInputs = {
  all: {
    label: "the full Sustainability Playing Field",
    topics: [
      "Energy efficiency", "Procurement", "Climate risk", "Productivity",
      "Water strategy", "Clean air", "Financing", "Maintenance",
      "Building envelope", "Electrification", "Supply chain", "Extreme weather",
      "Fleet transition", "Waste systems", "Climate resilience", "Asset performance",
    ],
  },
  operations: {
    label: "Asset & operations",
    topics: ["Energy efficiency", "Procurement", "Climate risk", "Productivity"],
  },
  resources: {
    label: "Resources & resilience",
    topics: ["Water strategy", "Clean air", "Financing", "Maintenance"],
  },
  market: {
    label: "Market & delivery",
    topics: ["Building envelope", "Electrification", "Supply chain", "Extreme weather"],
  },
  capital: {
    label: "Capital & performance",
    topics: ["Fleet transition", "Waste systems", "Climate resilience", "Asset performance"],
  },
} as const;

const playingFieldCategorySchema = z.enum(["all", "operations", "resources", "market", "capital"]);
const playingFieldSummaryCache = new Map<keyof typeof playingFieldSummaryInputs, string>();

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  playingField: router({
    summary: publicProcedure
      .input(z.object({ category: playingFieldCategorySchema }))
      .query(async ({ input }) => {
        // The public site is intentionally limited to the holding page. Avoid
        // exposing or spending on an otherwise public AI route until the full
        // site is intentionally restored.
        if (IS_COMING_SOON) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Not found" });
        }

        const cached = playingFieldSummaryCache.get(input.category);
        if (cached) return { summary: cached, source: "cached" as const };

        const selection = playingFieldSummaryInputs[input.category];
        try {
          const result = await invokeLLM({
            model: "gpt-5-mini",
            messages: [
              {
                role: "system",
                content: "Write two concise sentences in Canadian English, maximum 55 words. Explain how the listed sustainability topics can orient a first evidence review. Do not recommend a project, partner, or vendor. Do not claim outcomes, facts, or proprietary methods. Do not mention actio. Do not use em dashes. Output only the overview text.",
              },
              {
                role: "user",
                content: `Selected category: ${selection.label}\nTopics: ${selection.topics.join(", ")}`,
              },
            ],
          });
          const content = result.choices[0]?.message.content;
          const summary = typeof content === "string" ? content.trim() : "";
          if (!summary) throw new Error("The AI summary response was empty.");

          playingFieldSummaryCache.set(input.category, summary);
          return { summary, source: "generated" as const };
        } catch (error) {
          console.error("Playing Field summary generation failed", error);
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Overview unavailable" });
        }
      }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
