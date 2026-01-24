---
sidebar_position: 2
title: Architecture Overview
description: Homelab infrastructure architecture and design decisions
last_verified: 2026-01-24
---

# Architecture Overview

High-level view of the homelab infrastructure.

:::info Last Verified
**Date**: 2026-01-24
:::

## Network Topology

```
Internet
    │
    ▼
┌─────────────┐
│   UDM SE    │ ← Router/Firewall
└─────────────┘
    │
    ├── VLAN 1: Management (192.168.1.0/24)
    ├── VLAN XX: Servers
    ├── VLAN XX: IoT
    └── VLAN XX: Guest
```

## Compute

### Primary Server: sudoflux

| Component | Spec | Notes |
|-----------|------|-------|
| CPU | *spec* | |
| RAM | *spec* | |
| GPU | *spec* | For transcoding, AI |
| Boot | *spec* | |
| Storage | *spec* | See ZFS section |

**Roles**:
- Docker host for all services
- Media transcoding
- AI/ML workloads

### Network Equipment

| Device | Role |
|--------|------|
| UDM SE | Router, firewall, controller |
| *switches* | |
| *APs* | |

## Storage Architecture

### ZFS Pools

| Pool | Topology | Capacity | Purpose |
|------|----------|----------|---------|
| *name* | *raidz2/mirror* | *TB* | *use* |

See [ZFS Gotchas](/docs/homelab/storage/zfs-gotchas) for configuration details.

## Service Stack

### Container Runtime

- Docker with Compose
- No orchestration (single-node)

### Core Services

| Service | Purpose | Port |
|---------|---------|------|
| Jellyfin | Media streaming | 8096 |
| *arr stack | Media management | various |
| Prometheus | Metrics | 9090 |
| Grafana | Dashboards | 3001 |

See individual service docs for configuration details.

## Backup Strategy

| Data Type | Method | Destination | Frequency |
|-----------|--------|-------------|-----------|
| Configs | *method* | *dest* | *freq* |
| Media | *method* | *dest* | *freq* |
| Databases | *method* | *dest* | *freq* |

## Design Decisions

### Why Single Node?

*Explanation of tradeoffs*

### Why Docker Over K8s?

*Explanation of tradeoffs*

### Why ZFS?

*Explanation of tradeoffs*

## Diagram

*TODO: Add network diagram image*

![Architecture diagram placeholder](/img/homelab/architecture-placeholder.png)
