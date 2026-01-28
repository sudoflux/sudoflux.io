---
sidebar_position: 1
title: Baseline Checklist
description: Verified starting configuration for Pimax Crystal Super 50PPD
---

# Baseline Checklist

Known-good starting configuration before game-specific tuning.

## Verification Status

| Field | Value |
|-------|-------|
| Last verified | — |
| PiTool version | — |
| GPU driver | — |
| SteamVR version | — |
| Firmware | — |

## Hardware Tested

| Component | Specification |
|-----------|---------------|
| HMD | Pimax Crystal Super 50PPD |
| GPU | RTX 5090 |
| CPU | Ryzen 9950X3D |
| RAM | 64GB DDR5 |
| Tracking | SLAM (inside-out) |

---

## Pre-Flight

### Physical Setup

- [ ] Headset firmware current
- [ ] Controllers paired (if using)
- [ ] Cable connections secure
- [ ] Tracking space clear of reflective surfaces

### Software State

- [ ] PiTool running, headset detected
- [ ] SteamVR closed before PiTool launch
- [ ] No conflicting VR runtimes active

---

## PiTool Configuration

| Setting | Value | Notes |
|---------|-------|-------|
| Render Quality | 1.0 | Adjust per-game |
| Refresh Rate | 90Hz | Conservative starting point |
| FOV | Normal | Large increases load significantly |
| Smart Smoothing | Off | Enable per-game if needed |
| Parallel Projection | Off | Enable only when required |

## SteamVR Configuration

| Setting | Value | Notes |
|---------|-------|-------|
| Render Resolution | 100% | PiTool handles scaling |
| Motion Smoothing | Off | Use PiTool smoothing instead |
| Advanced Supersample Filtering | On | |

## GPU Configuration (NVIDIA)

| Setting | Value |
|---------|-------|
| Power Management | Prefer Maximum Performance |
| Threaded Optimization | Auto |
| VR Pre-Rendered Frames | Application Controlled |

---

## Verification

1. Launch SteamVR Home
2. Open PiTool overlay
3. Confirm:
   - Frametime stable at target (11.1ms for 90Hz)
   - No reprojection indicators
   - Both eyes rendering

If baseline fails, see [Stutter & Frametime Troubleshooting](/docs/vr-lab/troubleshooting/stutter-frametime).

---

## Revision History

| Date | Change |
|------|--------|
| — | Initial baseline |

---

## OpenXR Runtime

**Critical**: Set Pimax as the default OpenXR runtime.

1. Open **Pimax Play**
2. Go to Settings → OpenXR
3. Click **Set as OpenXR Runtime**

Both iRacing and AMS2 (and most modern VR titles) perform better on OpenXR than SteamVR. If games launch through SteamVR instead of natively, you've got the wrong runtime set.
