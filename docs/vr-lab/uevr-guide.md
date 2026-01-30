---
title: UEVR Settings Guide
description: Performance-optimized UEVR settings for Pimax Crystal Super (50 PPD)
last_verified: 2026-01-30
status: WIP
---

# UEVR Settings Guide (Pimax Crystal Super)

:::caution Work in Progress
This guide is actively being tested and updated. Settings may change as we validate performance.
:::

## Overview

[UEVR](https://uevr.io/) (Universal Unreal Engine VR Mod) converts flat Unreal Engine 4/5 games into VR experiences. This guide covers optimized settings for the **Pimax Crystal Super at 50 PPD** with an **RTX 5090**.

## Hardware Reference

| Component | Spec |
|-----------|------|
| Headset | Pimax Crystal Super (50 PPD mode) |
| GPU | RTX 5090 |
| CPU | Ryzen 9950X3D |

## Quick Start Settings

### Runtime Selection

- **OpenXR** recommended for Pimax (native runtime, better performance)
- OpenVR works but adds SteamVR overhead
- If using Virtual Desktop: **must use OpenXR** to avoid rotation lag

### Rendering Method

Choose based on game compatibility:

| Method | When to Use | Performance | Notes |
|--------|-------------|-------------|-------|
| **Native Stereo** | First choice | Best | Uses UE's actual stereo pipeline. Can crash some games |
| **Synchronized Sequential** | Fallback | Good | More compatible, temporal effects intact |
| **Alternating/AFR** | Last resort | Variable | For stubborn games only |

### Essential Settings

```ini
# Start with these
VR_UncapFramerate = true
VR_DecoupledPitch = true          # Reduces motion sickness
VR_CustomZNear = 0.01             # Prevents face clipping
OpenXR_ResolutionScale = 1.0      # Adjust based on GPU headroom
```

## Pimax-Specific Considerations

### Resolution Scaling

At 50 PPD, the Crystal Super is already pushing high resolution. Consider:

- **PimaxXR render scale**: Start at 1.0, adjust in Pimax Play
- **UEVR OpenXR_ResolutionScale**: Keep at 1.0 unless GPU-bound
- **In-game resolution**: Match or slightly below native

### Parallel Projection

Some UEVR games may require Parallel Projection (PP) enabled in Pimax Play:
- **PP Off**: Better performance, may have edge distortion
- **PP On**: Fixes geometry at FOV edges, ~20% performance hit

Test each game - most modern UE5 titles work fine without PP.

### FOV Settings

For 50 PPD mode:
- Large FOV = more GPU load
- Consider Normal FOV for demanding titles
- Small FOV only if desperate for frames

## Performance Optimization

### In-Game Settings

Before UEVR tweaks, optimize the base game:

1. **Disable TAA** if using DLSS (prevents double-blur)
2. **Enable DLSS/FSR2** when available (works with Native Stereo)
3. **Reduce shadow quality** - heavy VR cost, minimal visual gain
4. **Lower volumetric effects** - fog/clouds murder framerates
5. **Disable motion blur** - useless in VR, wastes GPU

### UEVR Compatibility Settings

If a game has issues:

```ini
# For games that crash on launch
VR_Compatibility_SkipPostInitPr = true

# For HUD not showing
VR_Compatibility_AHUD = true

# For split-screen render bugs
VR_Compatibility_SplitScreen = true

# Nuclear option - use if nothing else works
VR_ExtremeCompatibilityMode = true
```

### Frame Timing

For smooth 90Hz on Crystal Super:

- Target **11.1ms frame time**
- Use PimaxXR's Smart Smoothing if needed
- Enable UEVR's `VR_FrameDelayCompensation` for timing issues

## Per-Game Profiles

:::note Testing Needed
These profiles are pending validation. Check back for updates.
:::

### Template

```
Game: [Name]
Engine: UE4/UE5
Tested: [Date]
Status: Working/Partial/Broken

Rendering Method: [Native Stereo/Synced Sequential/AFR]
PP Required: Yes/No
Known Issues: [List]

Recommended Settings:
- [Setting]: [Value]
```

### Games to Test

- [ ] Hogwarts Legacy
- [ ] Lies of P
- [ ] Atomic Heart
- [ ] Palworld
- [ ] Remnant 2

## Troubleshooting

### Game Won't Inject

1. Run UEVR as administrator
2. Try different injection timing (early/late)
3. Disable overlays (Discord, Steam, etc.)
4. Check antivirus isn't blocking

### Terrible Performance

1. Check in-game settings first (disable RT, lower shadows)
2. Try Synchronized Sequential instead of Native Stereo
3. Reduce OpenXR_ResolutionScale to 0.8
4. Enable DLSS if available

### Motion Sickness

```ini
VR_DecoupledPitch = true
VR_AimSpeed = 0.5              # Lower = less jarring
VR_AimInterp = true            # Smooth aim transitions
```

### Controller Not Working

1. Ensure SteamVR/OpenXR runtime is correct
2. Check `VR_ControllersAllowed = true`
3. Try switching OpenVR ↔ OpenXR

## Resources

- [UEVR Official Docs](https://praydog.github.io/uevr-docs/)
- [Flat2VR Discord](https://discord.gg/flat2vr) - Game-specific profiles
- [UEVR GitHub](https://github.com/praydog/UEVR)
- [Pimax Forums](https://community.pimax.com/) - Headset-specific tips

## Changelog

- **2026-01-30**: Initial WIP draft
