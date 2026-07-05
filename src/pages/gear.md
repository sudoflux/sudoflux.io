---
title: Recommended Gear
description: Owned, tested, rejected, and researched gear notes for local AI, homelab infrastructure, and VR rigs.
---

# Recommended Gear

This is not a fake review farm. Gear on this page must be labeled by evidence level.

## Evidence labels

| Label | Meaning |
| --- | --- |
| **Owned / current** | In the active lab right now. Notes can include firsthand failures and fixes. |
| **Owned / previous** | Used before, replaced, retired, or moved to another role. |
| **Rejected / avoid** | Tested or considered and intentionally rejected. Explain why. |
| **Researched candidate** | Not personally tested yet. Listed only because it matches a known requirement. |
| **Needs Josh confirmation** | Draft placeholder. Do not treat as a recommendation yet. |

Affiliate links may be added later, but they do not change the label. If something is only researched, it stays marked as researched.

## Local AI / GPU compute

| Item | Status | Notes |
| --- | --- | --- |
| NVIDIA RTX 4090 | **Owned / current** | Practical local-AI card because 24GB VRAM can run useful quantized models, but it should be treated like one shared model service rather than a zoo of resident large models. |
| NVIDIA RTX 5090 | **Owned / current** | Used in the high-end VR / workstation lane. Needs a separate, current page before being treated as a general AI recommendation. |
| Ollama | **Owned / current** | Local model serving layer. See the field note on NVIDIA persistence mode for a real failure/fix. |
| Qwen3 30B-class quantized model | **Owned / current** | Used as the local utility model lane for memory/compression experiments. Exact public recommendation needs a dedicated versioned page. |

## Homelab storage / networking

| Item | Status | Notes |
| --- | --- | --- |
| ZFS media storage | **Owned / current** | Public pages should focus on dataset layout, snapshots, failure modes, and recovery discipline rather than vague NAS advice. |
| 10GbE networking | **Owned / current** | Useful for media, backups, and workstation/server workflows. Needs a parts-list page before individual NIC/switch recommendations are added. |
| UniFi network stack | **Owned / current** | Good candidate for practical VLAN/routing pages because configuration screenshots and caveats matter. |

## VR / sim racing

| Item | Status | Notes |
| --- | --- | --- |
| Pimax headset lane | **Owned / current** | Needs refreshed docs to distinguish current headset, tracking mode, and experimental hardware. |
| Quest 3 | **Owned / current** | Secondary/standalone/PCVR comparison material. |
| Sim racing cockpit / controls | **Owned / current** | Good buyer-guide candidate because ergonomics and compatibility matter more than generic rankings. |

## Draft buyer-guide queue

These are good monetizable pages because they can be useful without fake testimonials:

1. RTX 4090 local AI server: what 24GB VRAM actually buys you.
2. 10GbE homelab networking: what to buy before you blame ZFS.
3. ZFS media server parts: drives, HBAs, cooling, and backup mistakes.
4. Pimax + sim racing VR checklist: where stutter actually comes from.
5. Ollama on NVIDIA: persistence mode, loaded models, and avoiding idle hangs.

## Editorial rule

A page can say “I have not tested this yet.” That is better than pretending.
