# Rainr Audio website

Static site for Rainr Audio (formerly KLVS Audio Group): audio plugins and Max for Live devices for Ableton Live.
Built with [Astro](https://astro.build), hosted on Netlify.

## Run it

Needs Node 24 (`nvm use` picks it up from `.nvmrc`).

```sh
npm install
npm run dev       # local dev server, shows drafts
npm run build     # production build into dist/
npm run preview   # serve the production build
```

## Posting

Everything you change regularly is a Markdown file. Commit and push, and Netlify rebuilds the site.

**Lab notes** live in `src/content/notes/`, one file per post. The file name becomes the URL (`/notes/<file-name>/`).

```markdown
---
title: Null-testing a saturator
summary: Flip the phase, then listen to what's left over.
tag: Mixing
date: 2026-11-12
draft: false      # true = hidden on the live site, still visible in npm run dev
upcoming: false   # true = listed as "Soon" with no page yet
---

The post itself, in Markdown.
```

**In the lab cards** live in `src/content/lab/`, one file per plugin or Max for Live device.

```markdown
---
name: Saturator
type: plugin              # plugin | device
formats: VST3 / AU
status: testing           # plugin: prototype, build, testing, beta, release
                          # device: idea, build, testing, beta, release
blurb: A mix-bus saturator for warmth without mud.
order: 1
---
```

Change `status` to move the progress bar. A new product is a new file.

## Editing in the browser (Pages CMS)

You can also write posts and update the lab cards without touching code:

1. Go to [app.pagescms.org](https://app.pagescms.org) and sign in with GitHub.
2. Open the `klvs-audio` repo and pick the branch (`main` once the site is live).
3. **Lab notes**: new posts start as drafts. Turn **Draft** off to publish.
4. **In the lab**: change **Progress** to move a card's progress bar.

Each save is a commit, and Netlify rebuilds the site in about a minute. The editor is set up in `.pages.yml`.
Images you add to a post are saved in `public/images/notes/`.

## Where things are

| What | Where |
| --- | --- |
| Name, email, social links | `src/config.ts` |
| Colours and type | `src/styles/global.css` |
| Logo (outlined SVG) | `src/components/Logo.astro`, files in `public/brand/` |
| Favicon, share image | `public/favicon.svg`, `public/og.png` |
| Hero 3D spectrum | `src/scripts/waterfall.ts` |
| Scroll and tilt motion | `src/scripts/motion.ts` |
| Waitlist (Netlify Forms) | `src/components/WaitlistForm.astro` |
| Redirects from the old site, headers | `netlify.toml` |
