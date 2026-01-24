---
sidebar_position: 3
title: Docs vs Field Notes
description: Content classification and quality standards
---

# Docs vs Field Notes

This site separates two types of content.

## Docs

Verified procedures. Reproducible claims.

| Property | Standard |
|----------|----------|
| Verification | Tested before publishing |
| Versioning | Software/firmware versions recorded |
| Maintenance | Updated when verified, marked stale otherwise |
| Location | Sidebar navigation |

A doc states: "Do X and Y happens."

## Field Notes

Lab notebook entries. Experiments and observations.

| Property | Standard |
|----------|----------|
| Verification | May be unverified |
| Completeness | May be incomplete |
| Accuracy | May be incorrect |
| Location | Blog feed |

A field note states: "I tried X and observed Y."

## Promotion Path

```
Experiment → Field Note → Verification → Doc
```

Field Notes that prove reliable become Docs. The Field Note remains as historical record.

## Rationale

VR and homelab configurations are version-sensitive. Driver updates, firmware changes, and software patches invalidate configurations regularly.

Separating verified procedures from experiments allows readers to distinguish between:
- Things that work (Docs)
- Things being investigated (Field Notes)
