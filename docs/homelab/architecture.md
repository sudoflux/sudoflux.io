---
sidebar_position: 2
title: Architecture
description: Infrastructure design and system topology
---

# Architecture

System design and topology overview.

## Verification Status

| Field | Value |
|-------|-------|
| Last verified | — |
| OS | — |

---

## Network Topology

```
Internet
    │
    ▼
┌─────────────┐
│   UDM SE    │
└─────────────┘
    │
    ├── Management
    ├── Servers
    ├── IoT
    └── Guest
```

---

## Compute

### Primary Node

| Component | Specification |
|-----------|---------------|
| Hostname | — |
| CPU | — |
| RAM | — |
| GPU | — |
| Boot | — |
| Storage | See Storage section |

**Roles**:
- Container host
- Media transcoding
- Compute workloads

### Network Equipment

| Device | Role |
|--------|------|
| UDM SE | Router, firewall, controller |
| — | — |

---

## Storage

| Pool | Topology | Capacity | Purpose |
|------|----------|----------|---------|
| — | — | — | — |

See [ZFS Gotchas](/docs/homelab/storage/zfs-gotchas) for configuration.

---

## Service Stack

| Service | Purpose | Port |
|---------|---------|------|
| Jellyfin | Media | 8096 |
| Prometheus | Metrics | 9090 |
| Grafana | Dashboards | 3001 |
| — | — | — |

---

## Backup

| Data | Method | Destination | Frequency |
|------|--------|-------------|-----------|
| Configuration | — | — | — |
| Media | — | — | — |
| Databases | — | — | — |

---

## Design Rationale

### Single Node

*Rationale for single-node architecture over distributed.*

### Docker over Kubernetes

*Rationale for orchestration choice.*

### ZFS

*Rationale for filesystem choice.*

---

## Revision History

| Date | Change |
|------|--------|
| — | Initial document |
