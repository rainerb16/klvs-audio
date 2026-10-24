import { getCollection, type CollectionEntry } from "astro:content";

export type Note = CollectionEntry<"notes">;

/** Notes to list: drafts are hidden on the live site but shown in `npm run dev`. Published first, newest first. */
export async function listNotes(): Promise<Note[]> {
  const all = await getCollection("notes", n => !(import.meta.env.PROD && n.data.draft));
  return all.sort((a, b) => {
    if (a.data.upcoming !== b.data.upcoming) return a.data.upcoming ? 1 : -1;
    return (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0);
  });
}

/** Notes that get their own page. */
export const hasPage = (n: Note) => !n.data.upcoming;
