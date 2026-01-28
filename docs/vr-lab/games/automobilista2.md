---
sidebar_position: 1
title: Automobilista 2
description: VR settings for AMS2 on Pimax Crystal Super 50PPD
---

# Automobilista 2

VR-optimized settings for Pimax Crystal Super (50PPD mode) + RTX 5090.

## Verification Status

| Field | Value |
|-------|-------|
| Last verified | 2026-01-28 |
| Headset | Pimax Crystal Super (50PPD mode) |
| GPU | RTX 5090 |

---

## Anti-Aliasing (Performance Trick)

| Setting | Location | Value |
|---------|----------|-------|
| MSAA | In-game | Low |
| MFAA | NVIDIA Control Panel (game profile) | Enabled |

**Result**: Visual quality comparable to MSAA Medium, performance cost of MSAA Low.

### How it works

MFAA (Multi-Frame Anti-Aliasing) alternates AA sample patterns across consecutive frames. When combined with in-game MSAA, it effectively doubles the apparent sample count without doubling the rendering cost. The temporal nature of MFAA smooths edges across frames.

### NVIDIA Control Panel Setup

1. Open NVIDIA Control Panel
2. Manage 3D Settings → Program Settings
3. Select or add `AMS2AVX.exe`
4. Set "Multi-Frame Sampled AA (MFAA)" → **On**

---

## Other Recommended Settings

| Setting | Value | Notes |
|---------|-------|-------|
| Render resolution | Native | Let Pimax handle supersampling |
| Motion Smoothing | Off | AMS2 handles reprojection poorly |

---

## Revision History

| Date | Change |
|------|--------|
| 2026-01-28 | Initial document with MFAA trick |
