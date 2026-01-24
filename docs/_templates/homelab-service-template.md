---
sidebar_position: 999
title: "Service Template"
description: Template for documenting homelab services
draft: true
---

# Service Name

Brief description of what this service does and why it's in the stack.

:::info Last Verified
**Date**: YYYY-MM-DD  
**Image**: `image:tag`
:::

## Purpose

*What problem does this solve? Why was it chosen over alternatives?*

## Quick Reference

| Property | Value |
|----------|-------|
| Container | `container-name` |
| Port | XXXX |
| Data Path | `/path/to/data` |
| Config Path | `/path/to/config` |
| Upstream | [link](https://...) |

## Deployment

### Docker Compose

```yaml
services:
  service-name:
    image: image:tag
    container_name: service-name
    restart: unless-stopped
    ports:
      - "XXXX:XXXX"
    volumes:
      - ./config:/config
      - ./data:/data
    environment:
      - TZ=America/New_York
```

### Required Setup

*Steps needed after first deployment*

1. Step one
2. Step two

## Configuration

### Key Settings

| Setting | Value | Notes |
|---------|-------|-------|
| *setting* | *value* | *why* |

### Integration Points

| Service | How |
|---------|-----|
| *other service* | *API/webhook/etc* |

## Backup

| Data | Method | Location |
|------|--------|----------|
| Config | *method* | *path* |
| Data | *method* | *path* |

### Restore Procedure

```bash
# Restore commands
```

## Monitoring

- Health check: `curl http://localhost:XXXX/health`
- Prometheus metrics: `http://localhost:XXXX/metrics`

## Troubleshooting

### Common Issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| *symptom* | *cause* | *fix* |

### Logs

```bash
docker logs service-name -f --tail 100
```

## Version History

| Date | Change |
|------|--------|
| YYYY-MM-DD | Initial deployment |

## Related

- [Architecture Overview](/docs/homelab/architecture)
- [Field Notes](/field-notes/tags/relevant-tag)
