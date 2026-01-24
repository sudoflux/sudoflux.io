---
sidebar_position: 3
title: Docs vs Field Notes
description: The information architecture philosophy
---

# Docs vs Field Notes

This site enforces a clear separation between two types of content.

## Docs: Reproducible Claims

Docs are **verified procedures** that should work if you follow them. They:

- Use consistent templates
- Include "Last verified" dates with version numbers
- Are tested before publishing
- Get updated when things break
- Live in the sidebar navigation

A doc says: "Do X, Y, Z and you will get result W."

## Field Notes: Experiments & Observations

Field Notes are **lab notebook entries**. They:

- Capture what I tried and what happened
- May be incomplete or wrong
- Are tagged for searchability
- Live in the blog/feed
- May eventually become docs

A field note says: "I tried X, observed Y, not sure why yet."

## The Promotion Path

```
Experiment → Field Note → Verified → Doc
```

1. I try something new
2. I write a Field Note capturing the attempt
3. If it works reliably after multiple tests, I write a Doc
4. The Field Note stays as historical context

## Why This Matters

VR and homelab configs are **version-sensitive**. A setting that works today breaks tomorrow after a driver update. By separating "things I tried" from "things that work," readers know what to trust.

When a doc breaks:
1. It gets marked stale/outdated
2. I investigate in Field Notes
3. Once fixed, the doc gets updated with new version info
