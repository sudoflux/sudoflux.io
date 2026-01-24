---
sidebar_position: 1
title: Jellyfin Transcoding
description: Playback decision tree and transcoding configuration
---

# Jellyfin Transcoding

Understanding when Jellyfin transcodes and how to optimize.

## Verification Status

| Field | Value |
|-------|-------|
| Last verified | — |
| Jellyfin version | — |
| GPU | — |

---

## Decision Tree

```
Client requests playback
         │
         ▼
   Container supported?
         │
    ┌────┴────┐
    No       Yes
    │         │
    ▼         ▼
  Remux    Video codec supported?
         │
    ┌────┴────┐
    No       Yes
    │         │
    ▼         ▼
Transcode   Audio codec supported?
  Video
         │
    ┌────┴────┐
    No       Yes
    │         │
    ▼         ▼
Transcode  Subtitles burn-in required?
  Audio
         │
    ┌────┴────┐
    Yes      No
    │         │
    ▼         ▼
Transcode  Direct Play
  Video
```

---

## Transcode Triggers

### Video (High Cost)

| Trigger | Resolution |
|---------|------------|
| HEVC on unsupported client | h264 encode or HEVC-capable client |
| Resolution exceeds client | Client setting or lower-res encode |
| HDR on SDR display | Tone-mapping transcode (expensive) |
| Bitrate limit | Raise limit or lower-bitrate encode |

### Audio (Low Cost)

| Trigger | Resolution |
|---------|------------|
| TrueHD/DTS-HD unsupported | Stereo transcode acceptable |
| Channel count | Stereo mixdown acceptable |

### Subtitles (Triggers Video Transcode)

| Type | Behavior |
|------|----------|
| SRT | Delivered separately, no transcode |
| ASS/SSA | Burned in = video transcode |
| PGS/VOBSUB | Burned in = video transcode |

**Resolution**: Convert image-based subtitles to SRT.

---

## Hardware Transcoding

### NVIDIA

```yaml
services:
  jellyfin:
    image: jellyfin/jellyfin
    runtime: nvidia
    environment:
      - NVIDIA_VISIBLE_DEVICES=all
    devices:
      - /dev/dri:/dev/dri
```

Dashboard → Playback → Transcoding:
- Hardware acceleration: NVIDIA NVENC
- Enable decoding: H264, HEVC, VP9, AV1 (if supported)
- Enable encoding

### Verification

```bash
nvidia-smi  # Should show jellyfin process during transcode
```

---

## Client Compatibility

| Client | Direct Play Support |
|--------|---------------------|
| Jellyfin Media Player | Excellent |
| Web browser | Limited (no HEVC) |
| Roku | Good |
| Apple TV | Good (MKV remux) |
| Chromecast | Limited |

---

## Optimization Priority

1. Direct Play — Zero load
2. Direct Stream (Remux) — Minimal load
3. Audio transcode — Light load
4. Video transcode (HW) — Moderate load
5. Video transcode (SW) — Heavy load

---

## Revision History

| Date | Change |
|------|--------|
| — | Initial document |
