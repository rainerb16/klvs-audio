---
title: Null-testing a saturator
summary: How I check that the WRM1 plugin sounds the same as the Python model it came from. Flip one against the other and measure what's left.
tag: DSP
date: 2026-10-24
draft: false
---

If you've mixed for long enough, you've done a null test. Flip the polarity of one file against another and play them together. Whatever you still hear is the difference between them. Silence means they match.

I use the same trick to check that the C++ version of WRM1 matches the Python model I built it from.

## How the test works

A Python script runs a short test signal through the model with ten different settings: default Tube, dark Tape with Low Protect all the way up, Console driven hot, a couple of parallel blends, and every oversampling mode. The signal is half a second of pink noise with a few low and mid tones, different on each side.

The C++ test plays the same signal through the plugin in 333-sample blocks. That odd number is deliberate, because hosts don't always send neat buffer sizes. Then it lines up the two outputs, subtracts one from the other and measures what's left.

## The results

With oversampling off, what's left sits 142 to 145 dB below the signal. That's rounding error, nowhere near anything you could hear. The test fails if it ever comes up past −90 dB.

At 2x and 4x it's 61 to 68 dB down. The Python model and the plugin use different anti-aliasing filters, both fine, so they'll never cancel completely. The limit there is −50 dB.

## More things that should null

The output has to be identical whether the host sends buffers of 512 samples or 37. A mono track has to match the left side of a stereo one. Changing sample rate has to give the same result as loading a fresh copy.

Bypass needed work. With oversampling on, WRM1 adds a few samples of latency, and the framework's bypass assumed there was none, so bypassing would pull the track slightly ahead of everything else. Now the bypassed signal gets delayed by the same amount.

## Things that can't null

Some tests check that nothing breaks. One throws 400 blocks of random settings at the plugin, flipping Character and oversampling mid-stream, and makes sure the output stays sane. Another feeds it a NaN, the kind of broken value a misbehaving plugin upstream can pass along. Without a fix, that gets stuck in the filters and silences the bus for good. Now WRM1 resets itself and keeps going. A third loads an old session with a setting missing and checks it comes back at its default.

All of this runs every time I push code, on Mac (Apple Silicon and Intel) and Windows, along with Apple's AU validator and pluginval on its strictest setting. On my 2017 MacBook Pro, WRM1 uses 0.4% of one core with oversampling off and 2.1% at 4x.

None of it tells me whether WRM1 sounds good. That's the listening I'm doing now, on real mixes.
