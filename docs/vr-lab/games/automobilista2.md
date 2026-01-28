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

## Refresh Rate & Display Settings

| Setting | Location | Value | Notes |
|---------|----------|-------|-------|
| Refresh Rate | Pimax Play | 72 Hz | Prioritizes stable frametimes over high refresh |
| Brightness | Pimax Play | -1 | Reduces eye strain on OLED panel |
| Contrast | Pimax Play | -1 | Better dark detail, less crushing |
| Exposure Compensation | In-game (Video Settings) | 0.90 | Tames overblown highlights |

---

## Graphics Settings (72 Hz @ 6200×6200)

These settings target stable 72 Hz at full 50PPD resolution.

| Setting | Value | Notes |
|---------|-------|-------|
| Shadows | Medium | Major performance saver |
| Reflections | Medium | Minor visual loss, big FPS gain |
| Particle Density | Medium | No noticeable difference in VR, frees headroom |
| Grass | High | Can drop to Low for 90 Hz |
| Everything else | High–Ultra | Mix to taste |

:::tip 90 Hz Target
Running 90 Hz at 6200×6200 is brutal. Drop **Grass** and **Particle Effects** to Low first — they're the biggest gains with least visual impact in VR.
:::

:::note Work in Progress
Particle and grass settings still being fine-tuned. Your mileage may vary depending on track/weather.
:::

---

## Other Recommended Settings

| Setting | Value | Notes |
|---------|-------|-------|
| Render resolution | Native (6200×6200) | Let Pimax handle supersampling |
| Motion Smoothing | Off | AMS2 handles reprojection poorly |
| Runtime | OpenXR via **OpenComposite** | AMS2 is OpenVR-native; use OpenComposite to translate to OpenXR |

---

## OpenComposite Setup

AMS2 uses OpenVR (SteamVR) natively, not OpenXR. To bypass SteamVR and run directly on Pimax's OpenXR runtime, use **OpenComposite**:

1. Download [OpenComposite (64-bit DLL)](https://znix.xyz/OpenComposite/download.php?arch=x64&branch=openxr)
2. Extract to AMS2 install folder
3. Run `OpenComposite.exe` or copy the DLL override

OpenComposite translates OpenVR calls → OpenXR, giving you the performance benefits of native OpenXR without SteamVR overhead.

:::note OpenXR Toolkit
Used only for performance overlay (FPS + GPU/CPU bound indicator). No visual tweaks enabled — no sharpening, no Toolkit foveated rendering.
:::

---

## Revision History

| Date | Change |
|------|--------|
| 2026-01-28 | Initial document with MFAA trick |
