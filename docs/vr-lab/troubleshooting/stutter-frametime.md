---
sidebar_position: 1
title: Stutter & Frametime
description: Systematic diagnosis of VR performance issues
---

# Stutter & Frametime

Systematic approach to diagnosing VR performance problems.

## Verification Status

| Field | Value |
|-------|-------|
| Last verified | 2026-01-28 |
| Headset | Pimax Crystal Super |
| GPU | RTX 5090 (powerflux) |
| GPU driver | 580.x |

---

## Symptom Index

- [Consistent high frametimes](#consistent-high-frametimes)
- [Periodic spikes](#periodic-spikes)
- [Reprojection artifacts](#reprojection-artifacts)

---

## Consistent High Frametimes

**Symptom**: Frametimes consistently above target (e.g., 14ms at 90Hz target of 11.1ms)

| Cause | Diagnostic | Resolution |
|-------|------------|------------|
| GPU bound | GPU usage 100% | Reduce render resolution or detail |
| CPU bound | GPU < 90%, CPU thread maxed | Reduce physics, AI, crowd settings |
| VRAM exhaustion | Stutters after load, VRAM full | Lower textures, close background apps |
| Thermal throttle | Degradation over time | Check temps, improve cooling |

### Diagnostic Steps

1. Open Task Manager → Performance
2. Launch VR title
3. Observe GPU and CPU utilization
4. If GPU 100%: GPU bound
5. If GPU < 90% with poor performance: CPU bound or driver issue

---

## Periodic Spikes

**Symptom**: Stable frametimes with intermittent spikes

| Cause | Diagnostic | Resolution |
|-------|------------|------------|
| Background process | Spikes correlate with app activity | Disable startup apps, check scheduler |
| Asset streaming | Spikes when entering new areas | Move to SSD, adjust streaming settings |
| Driver overhead | Random pattern | Test different driver versions |
| USB bandwidth | Spikes with tracking glitches | Different USB controller or port |

### Diagnostic Steps

1. Note spike timing and pattern
2. Correlate with:
   - Game events (area transitions, combat)
   - System events (notifications, updates)
   - Tracking behavior

---

## Reprojection Artifacts

**Symptom**: Visual doubling, smearing, or wobble

| Cause | Diagnostic | Resolution |
|-------|------------|------------|
| Forced reprojection | Smart smoothing active | Reduce settings for native framerate |
| Tracking issues | Artifacts follow head movement | Check base station visibility |
| Dual smoothing | Both PiTool and SteamVR enabled | Disable SteamVR Motion Smoothing |

---

## Diagnostic Tools

### Built-in

- PiTool overlay: Frametime graph, reprojection status
- SteamVR Frame Timing: Settings → Developer → Display Frame Timing
- fpsVR: Third-party overlay with detailed metrics

### System

- Task Manager: Per-process utilization
- HWiNFO64: Temperature and throttling
- LatencyMon: DPC latency analysis

---

## Version-Specific Issues

| Version | Known Issue | Status |
|---------|-------------|--------|
| — | — | — |

---

## Revision History

| Date | Change |
|------|--------|
| — | Initial document |
