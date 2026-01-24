---
sidebar_position: 1
title: "Troubleshooting: Stutter & Frametime"
description: Diagnosing VR performance issues
last_verified: 2026-01-24
---

# Stutter & Frametime Troubleshooting

Systematic approach to diagnosing VR performance problems.

:::info Last Verified
**Date**: 2026-01-24  
**PiTool Version**: X.X.X  
**GPU Driver**: XXX.XX
:::

## Symptom Categories

### 1. Consistent High Frametimes

**Symptom**: Frametimes consistently above target (e.g., 14ms instead of 11.1ms for 90Hz)

| Possible Cause | Diagnostic | Fix |
|----------------|------------|-----|
| GPU bottleneck | GPU usage at 100% in task manager | Lower render resolution or detail settings |
| CPU bottleneck | GPU usage below 90%, CPU thread maxed | Reduce physics, AI, or crowd settings |
| VRAM exhaustion | Stutters after loading, VRAM full | Lower texture quality, close background apps |
| Thermal throttling | Performance degrades over time | Check temps, improve cooling |

### 2. Frametime Spikes

**Symptom**: Mostly good frametimes with periodic spikes

| Possible Cause | Diagnostic | Fix |
|----------------|------------|-----|
| Background process | Spikes correlate with specific app activity | Close unnecessary apps, check task scheduler |
| Asset streaming | Spikes when moving to new areas | Game-specific, may need SSD or settings tweak |
| Driver overhead | Random spikes, no clear pattern | Try different driver version |
| USB bandwidth | Spikes with tracking loss | Check USB controller, try different port |

### 3. Reprojection/Smoothing Artifacts

**Symptom**: Visible doubling, smearing, or wobble

| Possible Cause | Diagnostic | Fix |
|----------------|------------|-----|
| Forced reprojection | Smart smoothing indicator on | Reduce settings until native framerate achieved |
| Tracking issues | Artifacts correlate with head movement | Check base station visibility, reflections |
| Wrong smoothing settings | Both PiTool and SteamVR smoothing enabled | Disable one, use only PiTool's |

## Diagnostic Tools

### Built-in

- **PiTool Overlay**: Shows frametimes, reprojection status
- **SteamVR Frame Timing**: Advanced > Developer > Display Frame Timing
- **fpsVR**: Third-party overlay with detailed stats

### System-level

- **Task Manager**: CPU/GPU usage per process
- **HWiNFO64**: Temperatures, throttling detection
- **LatencyMon**: DPC latency issues

## Diagnostic Flowchart

```
Start: Experiencing stutter?
  │
  ├─► Constant high frametimes?
  │     └─► Check GPU/CPU usage → Bottleneck section above
  │
  ├─► Periodic spikes?
  │     └─► Note when they occur → Spike section above
  │
  └─► Visual artifacts only?
        └─► Check smoothing settings → Reprojection section above
```

## Version Notes

| Driver/Firmware | Known Issues |
|-----------------|--------------|
| *Add as discovered* | |

## Related

- [VR Baseline Checklist](/docs/vr-lab/baseline-checklist)
- [Field Notes: VR](/field-notes/tags/vr)
