---
sidebar_position: 2
title: iRacing
description: VR settings for iRacing on Pimax Crystal Super 50PPD
---

# iRacing

VR-optimized settings for Pimax Crystal Super (50PPD mode) + RTX 5090.

:::caution Work in Progress
These settings are still being tuned. Check back for updates.
:::

## Verification Status

| Field | Value |
|-------|-------|
| Last verified | 2026-01-28 |
| Headset | Pimax Crystal Super (50PPD mode) |
| GPU | RTX 5090 |

---

## Pimax Play Settings

| Setting | Value | Notes |
|---------|-------|-------|
| Eye Tracking | On | Required for foveated rendering |
| Quad Views | **Off** | Conflicts with iRacing's foveated mode |

---

## In-Game VR Settings

| Setting | Value | Notes |
|---------|-------|-------|
| VR Mode | Foveated | Uses eye tracking to render periphery at lower res — massive perf gain |
| MSAA | 4x | Good balance of clarity vs performance |
| Number of Lights | 0 | Disables dynamic car lights — big FPS saver in night races |
| Runtime | OpenXR | Set Pimax as OpenXR runtime in Pimax Play |

---

## Why Foveated + Eye Tracking

iRacing's foveated rendering uses your eye position (from the headset's eye tracker) to:
- Render full resolution only where you're looking
- Reduce resolution in peripheral vision (where you won't notice)

This cuts GPU load significantly without perceptible quality loss. Requires eye tracking enabled in Pimax Play but **Quad Views disabled** — they don't play nice together.

**With foveated rendering enabled, 90 Hz is achievable without heavy tweaking** — unlike AMS2 which struggles at that refresh rate.

---

## Revision History

| Date | Change |
|------|--------|
| 2026-01-28 | Initial document |
