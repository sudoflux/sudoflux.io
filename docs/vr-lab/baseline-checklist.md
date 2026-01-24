---
sidebar_position: 1
title: VR Baseline Checklist
description: Known-good starting configuration for Pimax Super 50PPD
last_verified: 2026-01-24
---

# VR Baseline Checklist

A verified starting point before any game-specific tuning.

:::info Last Verified
**Date**: 2026-01-24  
**PiTool Version**: X.X.X  
**GPU Driver**: XXX.XX  
**SteamVR Version**: X.X.X
:::

## Pre-Flight Checklist

### Hardware Setup

- [ ] Headset firmware is up to date
- [ ] Base stations powered and visible
- [ ] Controllers paired and charged
- [ ] Cable connections secure (no bent pins)

### Software Configuration

#### PiTool Settings

| Setting | Value | Notes |
|---------|-------|-------|
| Render Quality | 1.0 | Per-game adjustment |
| Refresh Rate | 90Hz | Start conservative |
| FOV | Normal | Large has diminishing returns |
| Smart Smoothing | Off | Enable per-game if needed |
| Compatible with Parallel Projection | Off | Enable only if game requires |

#### SteamVR Settings

| Setting | Value | Notes |
|---------|-------|-------|
| Render Resolution | 100% | Let PiTool handle scaling |
| Motion Smoothing | Off | Use PiTool's smart smoothing instead |
| Advanced Supersample Filtering | On | |

#### NVIDIA Control Panel (if applicable)

| Setting | Value |
|---------|-------|
| Power Management | Prefer Maximum Performance |
| Threaded Optimization | Auto |
| VR Pre-Rendered Frames | Use Application Setting |

### Verification Steps

1. Launch SteamVR Home
2. Check frametimes in PiTool overlay (should be stable, no spikes)
3. Look for:
   - Consistent frametimes at your target (11.1ms for 90Hz)
   - No reprojection indicators
   - Both eyes rendering correctly

## Troubleshooting Baseline Issues

If you can't achieve stable frametimes in SteamVR Home with these settings:

1. See [Stutter & Frametime Troubleshooting](/docs/vr-lab/troubleshooting/stutter-frametime)
2. Check [Field Notes](/field-notes/tags/vr) for recent experiments

## Version History

| Date | Change | Reason |
|------|--------|--------|
| 2026-01-24 | Initial baseline | First verified config |
