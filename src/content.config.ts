import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { STAGES } from "./config";

const allStages = [...new Set([...STAGES.plugin, ...STAGES.device])] as [string, ...string[]];

// "In the lab" cards: one file per plugin or Max for Live device. A new product is a new file.
const lab = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/lab" }),
  schema: z
    .object({
      name: z.string(),
      type: z.enum(["plugin", "device"]),
      formats: z.string(),               // e.g. "VST3 / AU" or "Ableton Live"
      status: z.enum(allStages),         // lights up this stage on the card
      blurb: z.string(),
      badge: z.string().default("Coming soon"),
      order: z.number().default(0),
    })
    .refine(d => (STAGES[d.type] as readonly string[]).includes(d.status), {
      message: "status must be one of the stages for this type (see STAGES in src/config.ts)",
    }),
});

// Lab notes. draft: hidden on the live site. upcoming: listed as "Soon" without a page.
const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tag: z.string(),
    date: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    upcoming: z.boolean().default(false),
  }),
});

export const collections = { lab, notes };
