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

## TL;DR Quick Win Checklist

1. **Use OpenXR** (not OpenVR) for Pimax native runtime
2. **Start with Native Stereo** rendering, fall back to Synced Sequential if crashes
3. **Enable DLSS** in-game when available
4. **Disable motion blur and TAA** (if using DLSS)
5. **Keep render scales at 1.0** and reduce in-game settings first

## Prerequisites

Before starting, ensure you have:

| Software | Version | Notes |
|----------|---------|-------|
| UEVR | Latest (1.0.0+) | [Download](https://github.com/praydog/UEVR/releases) |
| Pimax Play | Latest | [Download](https://pimax.com/pimax-play/) |
| PimaxXR | Enabled | Set as default OpenXR runtime |
| GPU Drivers | Latest | NVIDIA 570+ recommended for 5090 |

**OpenXR Runtime Setup:**
1. Open Pimax Play
2. Go to Settings → OpenXR
3. Set PimaxXR as default runtime
4. Verify in Windows: Settings → Mixed Reality → OpenXR shows Pimax

## Overview

[UEVR](https://uevr.io/) (Universal Unreal Engine VR Mod) converts flat Unreal Engine 4/5 games into VR experiences. This guide covers optimized settings for the **Pimax Crystal Super at 50 PPD** with an **RTX 5090**.

:::danger 50 PPD is Demanding
The 50 PPD engine pushes **6200×6200 per eye** at 100% render scale. Even an RTX 5090 needs careful optimization. Don't expect to max everything - target stable frames over pretty screenshots.
:::

## Hardware Reference

| Component | Spec |
|-----------|------|
| Headset | Pimax Crystal Super (50 PPD mode) |
| GPU | RTX 5090 |
| CPU | Ryzen 9950X3D |

## Expected Performance

Realistic targets at 50 PPD with RTX 5090:

| Game Type | Target FPS | Notes |
|-----------|------------|-------|
| Indie/Stylized (Palworld) | 90 Hz native | Should hit without smoothing |
| AA Titles (Lies of P) | 72-90 Hz | May need Smart Smoothing |
| AAA Heavy (Hogwarts Legacy) | 45-72 Hz | Smart Smoothing likely required |

**If you can't hit 45 FPS consistently:** Drop to Normal FOV or reduce render scale to 0.9.

## Common Mistakes

:::warning Avoid These
- **Stacking upscaling**: Don't use DLSS + UEVR render scale + Pimax render scale all together
- **Leaving RT on**: Ray tracing murders VR framerates - disable it
- **Wrong OpenXR runtime**: Must be PimaxXR, not SteamVR or WMR
- **TAA + DLSS**: Double temporal = double blur - pick one
- **PP when not needed**: Parallel Projection costs 20% - only enable if you see edge distortion
:::

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

### Smart Smoothing

When you can't hit native 90Hz:

- **Smart Smoothing On**: Interpolates to 90Hz from 45 FPS
- Works well for slower-paced games
- Fast action games may show artifacts
- Better than reprojection in most cases

## Performance Optimization

### In-Game Settings Priority

Before UEVR tweaks, optimize the base game (in order of impact):

1. **Disable Ray Tracing** - massive gain, minimal visual loss in VR
2. **Reduce shadow quality** - heavy VR cost, minimal visual gain
3. **Lower volumetric effects** - fog/clouds murder framerates
4. **Disable motion blur** - useless in VR, wastes GPU
5. **Enable DLSS/FSR2** when available (works with Native Stereo)
6. **Disable TAA** if using DLSS (prevents double-blur)

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

### Profile Template

```yaml
Game: [Name]
Engine: UE4 / UE5
UEVR Version: [x.x.x]
Tested: [YYYY-MM-DD]
Status: ✅ Working / ⚠️ Partial / ❌ Broken

# Pimax Settings (Pimax Play)
FOV: Large / Normal / Small
Parallel Projection: Yes / No
Smart Smoothing: Yes / No
Render Scale: [1.0]

# UEVR Settings
Rendering Method: Native Stereo / Synced Sequential / AFR
OpenXR_ResolutionScale: [1.0]
VR_DecoupledPitch: true

# In-Game Settings
Resolution: [Native / Custom]
DLSS/FSR: [Quality / Balanced / Performance / Off]
Ray Tracing: Off
Shadows: [Low / Medium / High]

# Performance
Typical FPS: [XX] @ [FOV]
Frame Time: [XX.X ms]

# Known Issues
- [Issue 1]
- [Issue 2]

# Notes
[Any additional observations]
```

### Example: Placeholder Game

```yaml
Game: Example Game (PLACEHOLDER)
Engine: UE5
UEVR Version: 1.0.0
Tested: 2026-01-30
Status: ⚠️ Partial

# Pimax Settings
FOV: Normal
Parallel Projection: No
Smart Smoothing: Yes
Render Scale: 1.0

# UEVR Settings
Rendering Method: Native Stereo
OpenXR_ResolutionScale: 1.0
VR_DecoupledPitch: true

# In-Game Settings
Resolution: Native
DLSS: Quality
Ray Tracing: Off
Shadows: Medium

# Performance
Typical FPS: 55-70 @ Normal FOV
Frame Time: 14-18ms

# Known Issues
- HUD offset requires manual adjustment
- Cutscenes render in 2D

# Notes
Smart Smoothing compensates well. Playable but not perfect.
```

### Games to Test

- [ ] Hogwarts Legacy
- [ ] Lies of P  
- [ ] Atomic Heart
- [ ] Palworld
- [ ] Remnant 2
- [ ] Star Wars Jedi: Survivor
- [ ] Dead Space (2023)

## Troubleshooting

### Game Won't Inject

1. Run UEVR as administrator
2. Try different injection timing (early/late)
3. Disable overlays (Discord, Steam, etc.)
4. Check antivirus isn't blocking
5. Verify game uses Unreal Engine (`-dx12` / `-dx11` launch flags may help)

### Terrible Performance

1. Check in-game settings first (disable RT, lower shadows)
2. Verify correct OpenXR runtime (PimaxXR, not SteamVR)
3. Try Synchronized Sequential instead of Native Stereo
4. Reduce OpenXR_ResolutionScale to 0.8
5. Enable DLSS if available
6. Drop to Normal FOV

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

### Black Screen / No VR Output

1. Check headset is detected in Pimax Play
2. Verify OpenXR runtime is PimaxXR
3. Try restarting Pimax service
4. Some games need windowed mode first, then switch to VR

## Screenshots

:::note Coming Soon
Screenshots of settings and in-game examples will be added after testing.
:::

## Resources

- [UEVR Official Docs](https://praydog.github.io/uevr-docs/)
- [Flat2VR Discord](https://discord.gg/flat2vr) - Game-specific profiles
- [UEVR GitHub](https://github.com/praydog/UEVR)
- [Pimax Forums](https://community.pimax.com/) - Headset-specific tips
- [VRPUPU Settings Guide](https://vrpupu.us/2025/08/02/uevr-advanced-settings-guide-2025/) - Deep dive on all 150+ settings

## Changelog

- **2026-01-30**: Initial WIP draft - added prerequisites, expected performance, common mistakes, example profile template
