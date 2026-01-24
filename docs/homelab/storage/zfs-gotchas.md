---
sidebar_position: 1
title: ZFS Gotchas I Learned the Hard Way
description: ZFS lessons, mistakes, and best practices from real experience
last_verified: 2026-01-24
---

# ZFS Gotchas I Learned the Hard Way

Things I wish I knew before setting up ZFS.

:::info Last Verified
**Date**: 2026-01-24  
**ZFS Version**: X.X.X  
**OS**: Ubuntu XX.XX
:::

## The Big Ones

### 1. You Can't Shrink a Pool

**The gotcha**: ZFS pools can only grow, never shrink. You can't remove vdevs from a pool (with limited exceptions for mirrors).

**What I learned**: Plan your pool topology carefully. If you think you might want flexibility later, use mirrors instead of raidz.

**Mitigation**: 
- Start with the topology you want long-term
- Use mirrors if you value flexibility over space efficiency
- Backup and recreate if you need to restructure

### 2. RAIDZ Expansion Was a Myth (Until Recently)

**The gotcha**: For years, you couldn't expand a raidz vdev by adding drives. You had to add another vdev or replace all drives with larger ones.

**Current status**: OpenZFS 2.3+ supports raidz expansion, but it's still new.

**What I learned**: Check your ZFS version before assuming features exist.

### 3. Dedup Is Probably Not For You

**The gotcha**: Dedup sounds great but requires ~5GB of RAM per TB of deduplicated data. It's also CPU-intensive.

**What I learned**: Unless you have specific workloads with high redundancy AND massive RAM, skip dedup. Use compression instead.

**Better alternative**: `lz4` compression is nearly free and works for most data.

### 4. Scrubs Are Non-Negotiable

**The gotcha**: ZFS won't detect silent data corruption until you try to read the data or run a scrub.

**What I learned**: Schedule scrubs monthly. Yes, they take time. No, you can't skip them.

```bash
# Check last scrub
zpool status

# Manual scrub
zpool scrub poolname
```

### 5. ECC RAM Matters (But Maybe Not How You Think)

**The gotcha**: ZFS doesn't *require* ECC, but a memory bit flip can cause data corruption that ZFS will happily checksum and store.

**What I learned**: ECC is cheap insurance for data you care about. Not strictly required, but strongly recommended.

## Configuration Gotchas

### ARC Size

**The gotcha**: ZFS will use all available RAM for ARC (cache) by default. This can starve applications.

**Fix**: Set explicit limits in `/etc/modprobe.d/zfs.conf`:

```bash
# Limit ARC to 8GB
options zfs zfs_arc_max=8589934592
```

### Ashift

**The gotcha**: ZFS guesses sector size at pool creation. If it guesses wrong (512 instead of 4096), performance suffers forever.

**Fix**: Always specify ashift when creating pools:

```bash
zpool create -o ashift=12 poolname ...
```

### Recordsize for Databases

**The gotcha**: Default recordsize (128K) is bad for databases that do small random I/O.

**Fix**: Set recordsize=8K or 16K for database datasets:

```bash
zfs set recordsize=16K poolname/database
```

## Operational Gotchas

### Send/Receive Resume

**The gotcha**: Large `zfs send` operations can fail and lose progress.

**Fix**: Use resume tokens (ZFS 0.7+):

```bash
zfs send -t <token> | zfs receive ...
```

### Snapshots Aren't Backups

**The gotcha**: Snapshots on the same pool don't protect against drive failure.

**What I learned**: Snapshots are for point-in-time recovery. Backups go to different physical media.

## My Current Configuration

```bash
# Pool status
zpool status

# Key settings
zfs get compression,recordsize,atime poolname
```

| Dataset | Recordsize | Compression | Purpose |
|---------|------------|-------------|---------|
| *dataset* | *size* | *algo* | *use* |

## Version History

| Date | Change |
|------|--------|
| 2026-01-24 | Initial doc |

## Related

- [Architecture Overview](/docs/homelab/architecture)
- [Field Notes: ZFS](/field-notes/tags/homelab)
