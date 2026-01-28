---
sidebar_position: 2
title: powerflux Configuration
description: VR gaming rig - 9950X3D + RTX 5090 tuning
---

# powerflux Configuration

Primary VR and gaming workstation.

## Verification Status

| Field | Value |
|-------|-------|
| Last verified | 2026-01-28 |
| CPU | AMD Ryzen 9 9950X3D |
| Motherboard | ASUS ProArt X870E Creator |
| GPU | NVIDIA RTX 5090 |
| OS | Windows 11 |

---

## CPU Configuration

### BIOS Settings (ASUS ProArt X870E)

| Setting | Value | Notes |
|---------|-------|-------|
| CCD Controller | Driver-controlled | Lets Windows/AMD chipset driver handle thread scheduling |
| X3D Core Flex | Gaming profile | ASUS algorithm for X3D chips — optimizes scheduling between V-Cache CCD (cache-sensitive workloads) and standard CCD (frequency-sensitive). Gaming profile biases toward cache-heavy game threads. |
| Curve Optimizer | -15 (all-core) | Undervolt for better thermals without sacrificing performance |

### Ryzen Master

| Setting | Value |
|---------|-------|
| Overclock offset | +200 MHz |

:::caution Mixed Configuration
Running both BIOS Curve Optimizer and Ryzen Master overclock can cause conflicts. Ryzen Master settings don't persist across reboots and may clash with BIOS-level tuning. Consider consolidating all CPU settings into BIOS for stability.
:::

---

## Windows Configuration

| Setting | Value | Rationale |
|---------|-------|-----------|
| Power Plan | Balanced | AMD-recommended; aggressive plans can cause boost issues |
| Game Mode | Enabled | Reduces background task interference during gaming |

---

## GPU Configuration (NVIDIA Control Panel)

| Setting | Value | Rationale |
|---------|-------|-----------|
| Power Management | Prefer Maximum Performance | **Per-game, not global** — saves power at desktop, full performance in games |
| Threaded Optimization | Auto | Let driver decide per-game |
| Low Latency Mode | Ultra (for competitive) / Off (for VR) | VR benefits more from consistent frametimes than minimum latency |

---

## Revision History

| Date | Change |
|------|--------|
| 2026-01-28 | Initial document |
