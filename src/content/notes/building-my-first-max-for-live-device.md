---
title: Building my first Max for Live device
summary: Arrangr was supposed to be a plugin. A few days of tests turned it into a Max for Live device that builds the arrangement inside Live.
tag: Max for Live
date: 2026-10-21
---

I have a folder full of 8-bar loops that never became songs. Most producers I know have one too. Making the loop is fun. Stretching it into six minutes with an intro, a breakdown and a drop is where I lose steam.

Arrangr is my fix for that. You give it the stems of a loop and a length, and it lays out a house or techno arrangement. Each clip comes with a reason, like "Bars 53–56: the riser builds into the Drop, ending on its first beat." You still do the editing. It gets you past the empty timeline.

## It started as a plugin

I wanted a regular plugin: drag stems in, get audio out, drag it back into the DAW. Before building that, I tested the parts I was least sure of.

Dragging failed first. Ableton hands a plugin the clip's original file, not the trimmed clip you're looking at, and dragging several clips out of Arrangement View sends nothing.

Then I tried a small Max for Live device. It read the loops from my set, put them on new Arrangement tracks, named each clip with its reason and added a locator for each section. One Cmd+Z undid the lot. No rendering, no WAV files, no dragging, and it sounded identical to my reference render.

That settled it. Version 1 is a Max for Live device. A plugin for other DAWs can come later.

## Python and JavaScript have to agree

I prototype in Python, but Python can't run inside Max, so I rewrote the arranger in JavaScript. With the same input, length and take, both versions have to produce the exact same plan, down to the byte.

That meant copying Python's quirks: how it rounds, how it prints numbers, how its random numbers come out. I compared 450 plans across 5 loop sets, 9 lengths and 10 takes, and all 450 matched. To make sure the comparison could catch a mistake, I broke the code on purpose a few times. Every bug showed up as hundreds of differences.

## Telling a kick from a hat

Arrangr has to know which stem is the kick, the bass, the hats or a riser. It listens for that instead of reading file names: energy across five bands, how fast hits die away, how pitched a sound is, how busy each beat is.

It got 35 of 41 stems right on my test loops, and when it isn't sure, it asks. I don't trust that 85% yet. I wrote the rules while listening to those same files, so the real test is loops it hasn't heard.

## Three things Live taught me

You can't shorten a clip in the Arrangement from code. I tried three different ways and every clip stayed at 32 beats. What works: set the loop length on a Session clip, then copy it over. It lands at the right length.

Live warps short samples to whole bars. My one-shot check was "not a whole number of bars", so it never fired, and a crash looped through the entire song. Now Arrangr spots one-shots by their shape: a hit that fades, or a swell that rises.

The locator button is a toggle. After the device moved the playhead, Live kept reporting the old position for a moment, so all ten presses hit the same spot and flipped one locator on and off ten times. Now the device waits for Live to confirm where the playhead is, presses once, and checks the locator is there. The last run placed all ten.

## Where it's at

The latest run built a whole track in 15 seconds: 98 loop pieces, 14 hits and 10 named locators. The arrangement was good. Next I want it to build onto your existing tracks so they keep their effects and mix, get the build under 5 seconds, and throw loops at it that it's never heard.
