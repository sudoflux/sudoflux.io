---
sidebar_position: 1
title: Jellyfin Playback & Transcode Decision Tree
description: When Jellyfin transcodes and how to optimize
last_verified: 2026-01-24
---

# Jellyfin Playback & Transcode Decision Tree

Understanding when Jellyfin transcodes and how to minimize it.

:::info Last Verified
**Date**: 2026-01-24  
**Jellyfin Version**: X.X.X  
**GPU**: *for hardware transcode*
:::

## The Decision Tree

```
Client requests playback
         │
         ▼
   Container supported?
    (mkv, mp4, etc.)
         │
    ┌────┴────┐
    No       Yes
    │         │
    ▼         ▼
 Remux    Video codec supported?
            (h264, hevc, etc.)
         │
    ┌────┴────┐
    No       Yes
    │         │
    ▼         ▼
Transcode   Audio codec supported?
  Video        (aac, ac3, etc.)
         │
    ┌────┴────┐
    No       Yes
    │         │
    ▼         ▼
Transcode  Subtitles need burning?
  Audio      (ass, image-based)
         │
    ┌────┴────┐
    Yes      No
    │         │
    ▼         ▼
Transcode  Direct Play!
  Video    (no server load)
```

## What Causes Transcoding?

### Video Transcoding (Expensive)

| Cause | Solution |
|-------|----------|
| Client doesn't support HEVC | Use h264 source or HEVC-capable client |
| Resolution too high | Client-side setting, or encode lower res version |
| HDR on SDR display | Tone-mapping transcode, expensive |
| Bitrate limit | Increase client bitrate limit or encode lower bitrate |

### Audio Transcoding (Cheap)

| Cause | Solution |
|-------|----------|
| TrueHD/DTS-HD unsupported | Usually fine, stereo transcode is light |
| Too many channels | Stereo mixdown is fine |

### Subtitle Burning (Triggers Video Transcode)

| Subtitle Type | Behavior |
|---------------|----------|
| SRT | Delivered separately, no transcode |
| ASS/SSA | Burned in = video transcode |
| PGS/VOBSUB | Burned in = video transcode |

**Fix**: Convert image-based subs to SRT, or use clients that support them natively.

## Hardware Transcoding Setup

### NVIDIA (Recommended)

```yaml
# docker-compose.yml excerpt
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
- Enable hardware decoding for: H264, HEVC, VP9, AV1 (if supported)
- Enable hardware encoding

### Intel QuickSync

```yaml
devices:
  - /dev/dri:/dev/dri
```

### Verification

Check if hardware transcode is working:

```bash
# NVIDIA
nvidia-smi  # Should show jellyfin process

# Intel
intel_gpu_top
```

## Client-Specific Notes

| Client | Direct Play Support | Notes |
|--------|--------------------|----|
| Jellyfin Media Player | Excellent | Desktop, supports almost everything |
| Web browser | Limited | No HEVC in most browsers |
| Roku | Good | Some older models struggle |
| Apple TV | Good | MKV remux needed |
| Chromecast | Limited | Transcodes frequently |

## Optimization Strategy

### Priority Order

1. **Direct Play** - Zero server load
2. **Direct Stream (Remux)** - Minimal load
3. **Audio-only transcode** - Light load
4. **Video transcode (HW)** - Moderate load
5. **Video transcode (SW)** - Heavy load

### Quick Wins

1. Use Jellyfin Media Player on desktop
2. Enable hardware transcoding
3. Convert image subs to SRT
4. Encode to h264 for maximum compatibility
5. Keep HEVC for local/high-end clients

## Monitoring

Dashboard shows current streams and transcode status.

For historical data, integrate with:
- Prometheus via Jellyfin plugin
- Tautulli (primarily for Plex, but concept applies)

## Version History

| Date | Change |
|------|--------|
| 2026-01-24 | Initial doc |

## Related

- [Architecture Overview](/docs/homelab/architecture)
- [Field Notes: Jellyfin](/field-notes/tags/homelab)
