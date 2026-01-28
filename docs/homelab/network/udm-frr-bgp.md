---
sidebar_position: 2
title: BGP on UDM SE with FRR
description: Running FRRouting BGP on UniFi Dream Machine
---

# BGP on UDM SE with FRR

How to run BGP on a UniFi Dream Machine SE using FRRouting. Useful for:
- Anycast DNS
- Kubernetes/Cilium peering
- Advanced routing scenarios

Based on the excellent [map59 guide](https://www.map59.com/ubiquiti-udm-running-bgp/).

## Prerequisites

- UniFi OS 3.x
- SSH access to UDM (Settings → System → SSH)

## Install FRRouting

SSH into your UDM:

```bash
ssh root@192.168.1.1
```

Add the FRR repo and install:

```bash
curl -s https://deb.frrouting.org/frr/keys.asc | apt-key add -
echo deb https://deb.frrouting.org/frr $(lsb_release -s -c) frr-stable | tee -a /etc/apt/sources.list.d/frr.list
apt-get update && apt-get -y install frr frr-pythontools
```

:::warning
FRR installed via apt may be removed during UniFi OS updates. See the [on-boot persistence](#on-boot-persistence) section to survive upgrades.
:::

## Enable BGP Daemon

Edit `/etc/frr/daemons` and set:

```
bgpd=yes
```

## Configure BGP

Create/edit `/etc/frr/frr.conf`:

```bash
frr version 8.1
frr defaults traditional
hostname UDMSE
log syslog informational
service integrated-vtysh-config
!
router bgp 64513
 bgp router-id 192.168.1.1
 bgp bestpath as-path multipath-relax
 no bgp ebgp-requires-policy
 
 ! Add your neighbors
 neighbor 192.168.10.21 remote-as 64512
 neighbor 192.168.10.22 remote-as 64512
 
 address-family ipv4 unicast
  redistribute connected
  redistribute static
 exit-address-family
!
```

Set ownership and restart:

```bash
chown frr:frr /etc/frr/frr.conf
systemctl restart frr
```

## Verify BGP

Check neighbors:

```bash
vtysh -c 'show ip bgp summary'
```

Check routes:

```bash
vtysh -c 'show ip bgp'
netstat -ar
```

## On-Boot Persistence

FRR gets wiped on UniFi OS updates. To persist, install [boostchicken's on-boot-script](https://github.com/unifi-utilities/unifios-utilities):

```bash
curl -fsL "https://raw.githubusercontent.com/unifi-utilities/unifios-utilities/HEAD/on-boot-script-2.x/remote_install.sh" | /bin/sh
```

Create `/data/on_boot.d/10-onboot-frr.sh`:

```bash
#!/bin/bash

if ! command -v /usr/lib/frr/frrinit.sh &> /dev/null; then
  echo "FRR not found, installing..."
  rm -f /etc/apt/sources.list.d/frr.list
  curl -s https://deb.frrouting.org/frr/keys.asc | apt-key add -
  echo deb https://deb.frrouting.org/frr $(lsb_release -s -c) frr-stable | tee -a /etc/apt/sources.list.d/frr.list
  apt-get update && apt-get -y install --reinstall frr frr-pythontools
  service frr restart
fi
```

Make it executable:

```bash
chmod +x /data/on_boot.d/10-onboot-frr.sh
```

Your FRR config in `/etc/frr/` survives updates — only the binaries need reinstalling.

## Cleanup (When Done with BGP)

If you no longer need BGP (e.g., cluster decommissioned):

```bash
# Backup current config
cp /etc/frr/frr.conf /etc/frr/frr.conf.bak

# Write minimal clean config
cat > /etc/frr/frr.conf << 'EOF'
frr version 8.1
frr defaults traditional
hostname UDMSE
log syslog informational
service integrated-vtysh-config
!
EOF

# Set ownership and restart
chown frr:frr /etc/frr/frr.conf
systemctl restart frr

# Verify no BGP
vtysh -c 'show ip bgp summary'
# Should show: "% BGP instance not found"
```

To fully remove FRR:

```bash
systemctl stop frr
systemctl disable frr
apt remove frr frr-pythontools
rm -rf /etc/frr
rm -f /data/on_boot.d/10-onboot-frr.sh  # if using on-boot
```

## Common Use Cases

### Kubernetes / Cilium

Peer your UDM with k8s nodes running Cilium BGP:
- UDM: AS 64513
- K8s nodes: AS 64512
- Cilium advertises pod/service CIDRs
- UDM learns routes to cluster services

### Anycast DNS

Multiple DNS servers advertise the same IP (e.g., 192.168.9.9):
- Each server runs FRR, announces the anycast IP
- UDM routes to the nearest/available server
- Automatic failover when a server goes down

## References

- [map59 - Ubiquiti UDM Pro running FRR BGP](https://www.map59.com/ubiquiti-udm-running-bgp/)
- [FRRouting Documentation](https://docs.frrouting.org/)
- [unifios-utilities on-boot-script](https://github.com/unifi-utilities/unifios-utilities)
