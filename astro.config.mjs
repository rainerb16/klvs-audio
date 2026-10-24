// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // Netlify sets URL to the site's primary address: klvs-audio.netlify.app now,
  // rainraudio.com once the domain is connected. Canonical links, the sitemap and share images follow it.
  site: process.env.URL || "https://klvs-audio.netlify.app",
  trailingSlash: "always",
  integrations: [sitemap({ filter: page => !page.includes("/thanks/") })],
});
