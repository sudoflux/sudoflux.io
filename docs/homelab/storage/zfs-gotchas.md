---
sidebar_position: 1
title: ZFS Gotchas
description: ZFS lessons and operational knowledge
---

# ZFS Gotchas

Operational knowledge from running ZFS in production.

## Verification Status

| Field | Value |
|-------|-------|
| Last verified | — |
| ZFS version | — |
| OS | — |

---

## Critical Knowledge

### Pools Cannot Shrink

ZFS pools grow only. Vdevs cannot be removed (with limited mirror exceptions).

**Implication**: Plan topology before creation. Mirrors offer flexibility over raidz.

### RAIDZ Expansion

OpenZFS 2.3+ supports raidz expansion. Earlier versions do not.

**Implication**: Verify ZFS version before assuming expansion capability.

### Dedup Requires Significant RAM

Deduplication requires ~5GB RAM per TB of deduplicated data.

**Recommendation**: Use compression (`lz4`) instead. Nearly free and effective.

### Scrubs Are Required

ZFS detects silent corruption only on read or scrub.

**Requirement**: Monthly scrubs. Non-negotiable.

```bash
zpool scrub poolname
zpool status  # Check scrub state
```

### ECC RAM

ZFS checksums data. Memory corruption can corrupt data before checksum.

**Recommendation**: ECC RAM for data integrity. Not required, but strongly advised.

---

## Configuration

### ARC Size

ZFS uses available RAM for ARC. Can starve applications.

```bash
# /etc/modprobe.d/zfs.conf
options zfs zfs_arc_max=8589934592  # 8GB limit
```

### Ashift

Sector size must be correct at pool creation.

```bash
# Always specify ashift
zpool create -o ashift=12 poolname ...
```

### Recordsize

Default 128K inappropriate for databases.

```bash
# Database datasets
zfs set recordsize=16K poolname/database
```

---

## Operations

### Send/Receive

Large transfers can fail. Use resume tokens (ZFS 0.7+).

```bash
zfs send -t <token> | zfs receive ...
```

### Snapshots vs Backups

Snapshots are point-in-time recovery on same pool. Not backup.

**Backup**: Different physical media. Different location.

---

## Current Configuration

```bash
zpool status
zfs get compression,recordsize,atime poolname
```

| Dataset | Recordsize | Compression | Purpose |
|---------|------------|-------------|---------|
| — | — | — | — |

---

## Revision History

| Date | Change |
|------|--------|
| — | Initial document |
