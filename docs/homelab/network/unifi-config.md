---
sidebar_position: 1
title: UniFi Network Configuration
description: Network architecture and VLAN setup
---

# UniFi Network Configuration

## Hardware

**UniFi Dream Machine SE (UDM-SE)**
- All-in-one router, switch, and controller
- 2.5GbE WAN, 8-port GbE switch with PoE+
- Built-in NVR capabilities

## WAN Configuration

| Interface | Type | Speed | Role |
|-----------|------|-------|------|
| Internet 1 | DHCP | 900/600 Mbps | Primary |
| Internet 2 | DHCP | — | Failover only |

DNS: 8.8.8.8, 8.8.4.4 (manual)

## VLANs

| VLAN | Name | Subnet | DHCP Range | Purpose |
|------|------|--------|------------|---------|
| — | Default | 192.168.1.0/24 | .10-.254 | Main network, trusted devices |
| 10 | Management | 192.168.10.0/24 | .140-.149 | Lab/infrastructure management |
| 66 | PIA | 192.168.66.0/24 | .6-.99 | VPN-routed traffic |
| 99 | IOT | 192.168.99.0/24 | .10-.200 | Isolated IoT devices |
| 100 | Compute Management | 192.168.100.0/24 | .240-.254 | Proxmox/hypervisor management |
| 101 | VM/Workload | 192.168.101.0/24 | .240-.254 | VM traffic |
| 102 | Storage | 192.168.102.0/24 | .222-.254 | Storage network (NFS, iSCSI) |

### VLAN Design Philosophy

- **Default (untagged)**: Trusted devices that need full network access
- **Management (10)**: Infrastructure that needs to be reachable but segmented
- **IOT (99)**: Untrusted smart home devices, isolated from main network
- **Compute stack (100-102)**: Proxmox cluster networking
  - 100: Hypervisor management interfaces
  - 101: VM traffic (guest networks)
  - 102: Storage backend (NFS, replication)

## VPN

### Servers (inbound)

| Type | Subnet | Port | Purpose |
|------|--------|------|---------|
| OpenVPN | 192.168.3.0/24 | 1194 | Legacy clients |
| WireGuard | 192.168.4.0/24 | 51820 | Primary remote access |
| WireGuard | 192.168.8.0/24 | 51821 | Secondary/devices |

### Clients (outbound)

- **ProtonVPN** (WireGuard + OpenVPN configs available, currently disabled)
- Traffic on VLAN 66 (PIA) can be policy-routed through VPN when enabled

## WiFi Networks

| SSID | Band | VLAN | Purpose |
|------|------|------|---------|
| alphaomega | 2.4 GHz | Default | Main network |
| alphapia | 2.4 GHz | Default | Secondary/legacy |
| alphanovlan | 5 GHz | Default | High-speed devices |
| vr-6g | 6 GHz | Default | VR headsets (low latency) |

### VR Network Notes

The `vr-6g` SSID is dedicated to VR headsets (Quest 3, Pimax) for:
- Lowest possible latency
- Less congestion on 6 GHz band
- Dedicated bandwidth for wireless PCVR streaming

## Inter-VLAN Routing

- VLAN 4040 (10.255.253.0/24) handles inter-VLAN routing
- IGMP proxy enabled for multicast (streaming, discovery)
- mDNS enabled on most networks for device discovery

## Firewall Notes

*(To be documented: traffic rules, port forwards, threat management)*
