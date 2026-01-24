---
sidebar_position: 1
title: Homelab Overview
description: Infrastructure, storage, media, and operations
---

# Homelab

Documentation for my home infrastructure, storage systems, media stack, and operational practices.

## Infrastructure at a Glance

| Role | Hardware | OS | Purpose |
|------|----------|-----|---------|
| *primary* | *spec* | *os* | Main workloads |
| *storage* | *spec* | *os* | ZFS pools |
| *network* | *device* | - | Routing/firewall |

See [Architecture](/docs/homelab/architecture) for the full diagram and details.

## Sections

### Storage

ZFS configuration, best practices, and lessons learned.

- [ZFS Gotchas](/docs/homelab/storage/zfs-gotchas) - Things I learned the hard way

### Media Stack

Jellyfin, *arr apps, and media management.

- [Jellyfin Transcode Decision Tree](/docs/homelab/media/jellyfin-transcode) - When and how to transcode

### Services

Per-service documentation.

- Service docs will appear here as they are added

### Troubleshooting

Issue-driven guides.

- Troubleshooting guides will appear here as they are added

## Philosophy

Homelab documentation should be:

1. **Reproducible**: Someone else (or future me) can rebuild from these docs
2. **Version-aware**: Container tags, configs, and dependencies are recorded
3. **Honest about failures**: Document what didn't work and why
