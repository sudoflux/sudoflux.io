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
| Last verified | 2026-01-24 |
| OS | Ubuntu 25.04 (Resolute Raccoon) |

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

### Primary Node: sudoflux

| Component | Specification |
|-----------|---------------|
| Hostname | sudoflux |
| CPU | AMD Ryzen 9 9950X (16C/32T) |
| RAM | 96GB DDR5 |
| GPU | NVIDIA RTX 4090 (24GB) |
| Boot | Samsung 980 PRO 2TB (NVMe) |

**Roles**:
- Docker host (all services)
- Media transcoding (NVENC)
- AI/ML workloads

### Secondary Node: powerflux

| Component | Specification |
|-----------|---------------|
| Hostname | powerflux |
| OS | Windows 11 |
| CPU | AMD Ryzen 9950X3D |
| RAM | 64GB DDR5 |
| GPU | NVIDIA RTX 5090 |

**Roles**:
- VR gaming
- Development workstation

### Network Equipment

| Device | Role |
|--------|------|
| UDM SE | Router, firewall, controller |

---

## Storage

### ZFS Pools

| Pool | Topology | Capacity | Used | Purpose |
|------|----------|----------|------|---------|
| tank | Single vdev (expandable) | 58.4TB | 30.9TB (52%) | Bulk storage, media |
| nvmepool | Stripe (2x NVMe) | 3.6TB | 438GB (11%) | Fast storage, containers |

### Physical Drives

| Drive | Size | Purpose |
|-------|------|---------|
| 4x Seagate ST16000VE002 | 16TB | tank pool |
| 2x Samsung 9100 PRO | 4TB | nvmepool (future) |
| Samsung 990 PRO | 2TB | nvmepool |
| Samsung 980 PRO | 2TB | nvmepool / boot |

See [ZFS Gotchas](/docs/homelab/storage/zfs-gotchas) for configuration details.

---

## Service Stack

| Service | Purpose | Port |
|---------|---------|------|
| Jellyfin | Media streaming | 8096 |
| Sonarr | TV management | 8989 |
| Radarr | Movie management | 7878 |
| Prowlarr | Indexer management | 9696 |
| SABnzbd | Download client | 8080 |
| Prometheus | Metrics | 9090 |
| Grafana | Dashboards | 3001 |
| Ollama | Local LLM | 11434 |
| Open WebUI | LLM interface | 3000 |
| Immich | Photo management | 2283 |

---

## Design Rationale

### Single Node

Simplicity over redundancy for home use. Critical data protected by ZFS + offsite backup, not hardware redundancy.

### Docker over Kubernetes

Single node doesn't benefit from K8s orchestration overhead. Compose provides sufficient service management.

### ZFS

Data integrity via checksums, snapshots for rollback, compression for efficiency. Worth the RAM overhead.

---

## Revision History

| Date | Change |
|------|--------|
| 2026-01-24 | Initial document with current specs |
