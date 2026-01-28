---
title: AI Assistant (Molt)
description: Local AI assistant with persistent memory and context recovery
---

# AI Assistant Setup

Running a personal AI assistant with local memory, context recovery, and chat integration.

## Stack Overview

| Component | Purpose |
|-----------|---------|
| **Clawdbot** | Gateway that connects Claude to Discord, manages sessions |
| **Ollama** | Local model hosting (RTX 4090) |
| **GPT-OSS 20B** | Summarization model for context recovery |
| **greppable-life** | Daemon that watches sessions and maintains memory |

## Architecture

```
Discord ←→ Clawdbot Gateway ←→ Claude API
                ↓
         Session JSONL
                ↓
         greppable-life daemon
                ↓
         Ollama (GPT-OSS)
                ↓
         memory-context.md
```

When context fills up and compaction triggers, the assistant reads `memory-context.md` to recover what was happening.

## Ollama Setup

Running in Docker with GPU passthrough:

```yaml
# docker-compose.yml
services:
  ollama:
    image: ollama/ollama
    container_name: ollama
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    environment:
      - NVIDIA_VISIBLE_DEVICES=all
      - OLLAMA_NUM_PARALLEL=4
      - OLLAMA_MAX_LOADED_MODELS=2
      - OLLAMA_KEEP_ALIVE=10m
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
    restart: unless-stopped
```

Models:
- `gpt-oss:20b` (13GB) — summarization
- `bge-m3` (1.2GB) — embeddings for memory search

## greppable-life Daemon

Watches Clawdbot session files and generates rolling summaries.

**Install:**
```bash
cd ~/clawd/greppable-life
python -m venv venv
source venv/bin/activate
pip install watchdog pyyaml requests
```

**Config (`config.yaml`):**
```yaml
ollama:
  base_url: http://localhost:11434
  model: gpt-oss:20b

sessions:
  paths:
    - ~/.clawdbot/agents/main/sessions
  max_age_days: 7

processing:
  batch_size: 10
  interval_seconds: 30

output:
  base_dir: ./output
  daily_dir: daily
  decisions_file: decisions.md

molt:
  memory_file: ~/.clawdbot/memory-context.md
  recent_count: 20
  include_summary: true
  include_recent: true
```

**Systemd service:**
```ini
[Unit]
Description=Greppable Life - LLM Conversation Processor
After=network.target ollama.service

[Service]
Type=simple
User=josh
WorkingDirectory=/home/josh/clawd/greppable-life
ExecStart=/home/josh/clawd/greppable-life/venv/bin/python daemon.py
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

## Compaction Handshake

Problem: When Clawdbot compacts context, messages sent during compaction could get lost.

Solution: A Clawdbot plugin that coordinates with greppable-life.

**Plugin (`~/.clawdbot/extensions/greppable-sync/index.ts`):**
```typescript
import type { ClawdbotPluginApi } from "clawdbot/plugin-sdk";
import fs from "node:fs";
import path from "node:path";

const CLAWDBOT_DIR = path.join(process.env.HOME || "", ".clawdbot");
const PENDING_FILE = path.join(CLAWDBOT_DIR, "compaction-pending");
const READY_FILE = path.join(CLAWDBOT_DIR, "summary-ready");

async function waitForFile(filePath: string, timeoutMs: number): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (fs.existsSync(filePath)) return true;
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  return false;
}

const plugin = {
  id: "greppable-sync",
  register(api: ClawdbotPluginApi) {
    api.registerHook("before_compaction", async () => {
      // Signal greppable-life
      fs.writeFileSync(PENDING_FILE, new Date().toISOString());
      
      // Wait for summary (5s timeout)
      await waitForFile(READY_FILE, 5000);
      
      // Cleanup
      if (fs.existsSync(PENDING_FILE)) fs.unlinkSync(PENDING_FILE);
      if (fs.existsSync(READY_FILE)) fs.unlinkSync(READY_FILE);
    }, { name: "greppable-sync-before-compaction" });
  },
};

export default plugin;
```

The daemon watches for `compaction-pending`, flushes any pending summaries, then writes `summary-ready`.

## Workspace Structure

```
~/clawd/
├── AGENTS.md      # Operating instructions
├── SOUL.md        # Personality/identity
├── USER.md        # Context about me
├── MEMORY.md      # Long-term curated memories
├── TOOLS.md       # Local tool notes
├── HEARTBEAT.md   # Periodic check tasks
├── memory/        # Daily notes (YYYY-MM-DD.md)
└── vault/         # Obsidian second brain (synced)
```

## Why This Setup?

1. **Context recovery** — LLMs have finite context windows. When compaction happens, the assistant needs to know what was being discussed.

2. **Local processing** — Summaries run on local hardware (RTX 4090), no external API calls for memory.

3. **Coordination** — The handshake ensures no messages are lost during compaction.

4. **Persistence** — Daily logs, decision tracking, and curated long-term memory.

## Monitoring

```bash
# Check daemon status
systemctl status greppable

# Watch logs
journalctl -u greppable -f

# Check memory context
cat ~/.clawdbot/memory-context.md
```
