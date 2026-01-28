---
slug: ollama-persistence-mode
title: "Fixing Ollama hangs: NVIDIA persistence mode"
authors: [josh]
tags: [homelab, ai, ollama, nvidia]
---

Ollama was randomly hanging during inference. GPU would go idle mid-conversation, requests would timeout.

<!-- truncate -->

## Symptoms

- `nvidia-smi` showing P8 state when it should be active
- Greppable-life daemon logging connection errors:
  ```
  [ERROR] Ollama request failed: ('Connection aborted.', RemoteDisconnected('Remote end closed connection without response'))
  ```
- Docker logs showing NVML initialization failures:
  ```
  ggml_nvml_init unable to initialize NVML: Unknown Error
  unable to refresh free memory, using old values
  ```

## Root Cause

NVIDIA persistence mode was **disabled**. When the GPU goes idle, the driver can fully unload. During reload, NVML queries briefly fail. If Ollama tries to query during that window, it dies.

## Fix

```bash
# Enable persistence mode (immediate)
sudo nvidia-smi -pm 1

# Make it survive reboot
sudo tee /etc/systemd/system/nvidia-persistence.service > /dev/null << 'SERVICE'
[Unit]
Description=Enable NVIDIA Persistence Mode
After=nvidia-persistenced.service

[Service]
Type=oneshot
ExecStart=/usr/bin/nvidia-smi -pm 1
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
SERVICE

sudo systemctl daemon-reload
sudo systemctl enable nvidia-persistence.service
```

## Also helpful

Tuned Ollama Docker settings:

```bash
docker run -d \
  --name ollama \
  --gpus all \
  -v ollama:/root/.ollama \
  -p 11434:11434 \
  -e OLLAMA_NUM_PARALLEL=4 \
  -e OLLAMA_MAX_LOADED_MODELS=2 \
  -e OLLAMA_KEEP_ALIVE=10m \
  --restart unless-stopped \
  ollama/ollama:latest
```

No more random hangs.
