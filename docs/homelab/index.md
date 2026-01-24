---
sidebar_position: 1
title: Homelab
description: Infrastructure documentation for storage, media, containers, and networking
---

# Homelab

Documentation for production-style home infrastructure.

## Hardware Reference

| Node | CPU | RAM | GPU | Role |
|------|-----|-----|-----|------|
| sudoflux | Ryzen 9 9950X | 96GB DDR5 | RTX 4090 | Server, services |
| powerflux | Ryzen 9950X3D | 64GB DDR5 | RTX 5090 | VR, gaming |

## Scope

This section covers:

- **Architecture** — System design and topology
- **Storage** — ZFS configuration and management
- **Media** — Jellyfin and media automation stack
- **Containers & Ops** — Docker, deployment, operations
- **Networking** — Network design and configuration
- **Troubleshooting** — Issue diagnosis and resolution

## Document Standards

Every page includes:

- **Last verified** — Date with relevant software versions
- **Versions tested** — Container tags, OS versions, firmware
- **Hardware notes** — When configuration is hardware-specific

## Philosophy

- Reproducible: Documentation sufficient to rebuild from scratch
- Versioned: All software versions recorded
- Tested: Only verified configurations documented
- Honest: Failures and limitations documented
