import type { APIRoute } from "astro";

// Built per deploy so the sitemap link always uses the site's current address.
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap-index.xml", site)}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
