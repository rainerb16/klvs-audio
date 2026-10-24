---
title: Why every plugin starts in Python
summary: Before WRM1 had a line of C++, it was a Python model I could measure, render and listen to.
tag: DSP
date: 2026-10-22
draft: false
---

WRM1 is a saturator for the mix bus. It adds mostly second-harmonic colour, rolls off a little top end, can add some low-mid body, and rounds off peaks the way a signal does when it leans into a curve. I built all of it in Python before writing a line of C++.

## Why Python first

In Python I can change a curve, render a mix, measure it and hear it in a minute. No compiling, no reloading the plugin in Live. The Python model is the reference for how WRM1 should sound. If the written spec ever disagrees with it, the Python wins.

Three small scripts do most of the work. One renders A/B files of fifteen or so settings, matched in loudness to the dry mix, and can shuffle them into a blind test with an answer key. One measures harmonics, distortion and aliasing with test tones, and checks what a 50 Hz sine does with Low Protect on and off. The third builds the Auto Gain table.

## Louder wins every A/B

Saturation makes things louder, and louder sounds better in a quick comparison. If WRM1 didn't correct for that, you'd be judging volume, not tone.

A lot of plugins handle this with a level follower. On a mix bus that pumps and fights your fader moves, so WRM1 uses a fixed table. I took the loudest 20 seconds of three real mixes and set them all to −16 LUFS. Then I stepped the drive up 3 dB at a time for every character and Low Protect setting, and measured how much louder each step got. Tube at full Warmth with Low Protect off comes out 2.7 dB louder, and Auto Gain takes that back off.

In normal use it's within 0.2 LU. On a quiet mix pushed hard it can be off by up to 0.6 LU. I'll take that in exchange for no detector, no pumping and no latency.

A script writes the table into the C++ code, so I never copy a number over by hand.

## What the measurements decided

Warmth changes colour, not level. The drive gets divided back out after the curve, so the plugin doesn't jump in volume when you turn Warmth up, even with Auto Gain off.

Low Protect doesn't split the signal. A 100 Hz shelf cuts the lows before the curve and boosts them back after it, and the two cancel almost perfectly. The tone stays flat. Only the amount of saturation in the low end changes, and there's no phase smear around the kick.

I modelled tape wobble, then couldn't hear it in a blind test. It sat 45 dB down and made zero latency harder, so I cut it.

An Input knob made it in. A quiet −20 LUFS mix needs 5 dB more drive to react like a −16 LUFS one.

## Next: the port

Once the Python version sounded right, I froze the spec and ported it to C++. To prove the port sounds the same, I null it against the Python. That's the next note.
